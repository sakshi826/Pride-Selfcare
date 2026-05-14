import fs from 'fs';
import path from 'path';

let content = fs.readFileSync('src/features/pride/dynamic/identity-exploration/components/explore/ExploreIdentity.tsx', 'utf-8');

if (!content.includes('useTranslation')) {
  content = content.replace('import { useState', 'import { useTranslation } from "react-i18next";\nimport { useState');
}

const components = ['ExploreIdentity', 'HistoryScreen', 'S0', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10'];

components.forEach(comp => {
  // Arrow functions with block body: const S0 = () => {
  const regex1 = new RegExp(`const ${comp} = \\([^=]*\\) => \\{`);
  if (regex1.test(content) && !content.match(new RegExp(`const ${comp} = [\\s\\S]*?useTranslation`))) {
    content = content.replace(regex1, `$& \n  const { t } = useTranslation("hub");`);
  } 
  // Arrow functions with expression body: const S0 = () => (
  else {
    const regex2 = new RegExp(`const ${comp} = \\(([^=]*)\\) => \\(`);
    if (regex2.test(content)) {
      content = content.replace(regex2, `const ${comp} = ($1) => { const { t } = useTranslation("hub"); return (`);
      // Now we need to find the end of this component and add };
      // This is hacky. Instead of finding the end, I'll just replace the start.
      // But wait, the expression body needs closing braces.
      // E.g., `const S1 = ({ onNext }) => ( ... );` becomes `const S1 = ({ onNext }) => { const { t } = useTranslation("hub"); return ( ... ); };`
      const endRegex = new RegExp(`(const ${comp} = [\\s\\S]*?\\([\\s\\S]*?\\));`);
      content = content.replace(endRegex, `$1; };`);
    }
  }
});

fs.writeFileSync('src/features/pride/dynamic/identity-exploration/components/explore/ExploreIdentity.tsx', content);
