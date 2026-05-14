import fs from 'fs';
import path from 'path';

const files = [
  'src/features/pride/hub/AffirmingSelfTalk.tsx',
  'src/features/pride/hub/CreateSafeSpaces.tsx',
  'src/features/pride/hub/FindYourCommunity.tsx',
  'src/features/pride/hub/HonorYourIdentity.tsx',
  'src/features/pride/hub/ProcessGriefLoss.tsx',
  'src/features/pride/hub/SetGentleBoundaries.tsx',
];

files.forEach(file => {
  const filePath = path.resolve(file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');

  // Add import if missing
  if (!content.includes('useTranslation')) {
    content = content.replace(/import \{.*?\} from "lucide-react";/g, '$&\nimport { useTranslation } from "react-i18next";');
  }

  // Add hook inside component if missing
  const componentName = file.split('/').pop().replace('.tsx', '');
  if (!content.includes('const { t } = useTranslation')) {
    content = content.replace(new RegExp(`export function ${componentName}\\(\\) \\{\n(.*?const navigate = useNavigate\\(\\);)`), 
      `export function ${componentName}() {\n  const { t } = useTranslation("hub");\n$1`);
  }

  // Wrap standard text inside <h1/2/p> with {t("...")}
  // We need to be careful. The text is usually like <h1 className="...">Text Here</h1>
  content = content.replace(/<([hH]1|[hH]2|[pP])([^>]*)>([^<]+?)<\/\1>/g, (match, tag, attrs, text) => {
    const trimmed = text.trim();
    if (!trimmed || trimmed.includes('{') || trimmed.includes('}')) return match;
    return `<${tag}${attrs}>{t("${trimmed.replace(/"/g, '\\"')}")}</${tag}>`;
  });

  // Wrap strings in steps array
  content = content.replace(/const steps = \[\s*([\s\S]*?)\s*\];/g, (match, stepsContent) => {
    const wrappedSteps = stepsContent.split(',').map(step => {
      const trimmed = step.trim();
      if (!trimmed || trimmed.startsWith('t(')) return step;
      // It's a string like "Text"
      return trimmed.replace(/^"(.+)"$/, 't("$1")');
    }).join(',');
    return `const steps = [\n${wrappedSteps}\n];`;
  });

  // Also need to move `const steps` INSIDE the component if it uses `t()`
  if (content.includes('const steps = [') && !content.includes('const { t } = useTranslation("hub");\n\n  const steps =')) {
      const stepsMatch = content.match(/const steps = \[\s*[\s\S]*?\s*\];/);
      if (stepsMatch) {
          content = content.replace(stepsMatch[0], ''); // Remove from global scope
          content = content.replace('const { t } = useTranslation("hub");', `const { t } = useTranslation("hub");\n\n  ${stepsMatch[0]}`);
      }
  }

  // Same for `phases` or `areas` arrays if they exist
  const wrapArray = (arrayName) => {
      const regex = new RegExp(`const ${arrayName} = \\[(\\s*[\\s\\S]*?\\s*)\\];`);
      const match = content.match(regex);
      if (match) {
          content = content.replace(match[0], ''); // Remove from global
          let arrayContent = match[1].split('",\n').map(s => {
              let str = s.trim().replace(/^"/, '').replace(/"$/, '');
              if (!str || str.startsWith('t(')) return s;
              return `t("${str.replace(/"/g, '\\"')}"),\n`;
          }).join('');
          // Re-add to local scope
          content = content.replace('const { t } = useTranslation("hub");', `const { t } = useTranslation("hub");\n\n  const ${arrayName} = [\n${arrayContent}];`);
      }
  }

  fs.writeFileSync(filePath, content);
  console.log(`Processed ${file}`);
});
