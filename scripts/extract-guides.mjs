import fs from 'fs';
import path from 'path';

function extractFromT(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const strings = new Set();
  
  // Find t("...") or t('...')
  // Using a simpler regex but being careful with escapes
  const regex = /t\((["'])([\s\S]*?)(?<!\\)\1\)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    let s = match[2];
    // Unescape if needed, but for translation keys we usually want them as they are
    strings.add(s);
  }

  return Array.from(strings);
}

const guides = ['LesbianGuide.tsx', 'GayGuide.tsx', 'BisexualGuide.tsx', 'TransGuide.tsx'];
const allStrings = new Set();

guides.forEach(g => {
  const p = path.join(process.cwd(), 'src/features/pride/hub', g);
  if (fs.existsSync(p)) {
    extractFromT(p).forEach(s => allStrings.add(s));
  }
});

const result = {};
Array.from(allStrings).sort().forEach(s => {
  result[s] = s;
});

fs.writeFileSync(path.join(process.cwd(), 'src/features/pride/hub/i18n/guides.en.json'), JSON.stringify(result, null, 2));
console.log(`Extracted ${Object.keys(result).length} strings to guides.en.json`);
