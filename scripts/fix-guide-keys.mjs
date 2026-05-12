/**
 * Fixes the "{{label}} Guide" translation key across all hub.json files.
 * The Google Translate API drops the {{label}} template variable.
 * This script restores it by prepending "{{label}}" to each language's guide word.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const i18nDir = path.join(__dirname, '..', 'src', 'features', 'pride', 'hub', 'i18n');

const files = fs.readdirSync(i18nDir).filter(f => f.endsWith('.json'));

let fixedCount = 0;
files.forEach(file => {
  const filePath = path.join(i18nDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  const currentValue = data['{{label}} Guide'];
  if (currentValue && !currentValue.includes('{{label}}')) {
    // Fix: prepend {{label}} to whatever the guide word is in this language
    data['{{label}} Guide'] = `{{label}} ${currentValue}`;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Fixed ${file}: "{{label}} Guide" -> "{{label}} ${currentValue}"`);
    fixedCount++;
  } else {
    console.log(`Skipped ${file}: already correct (${currentValue})`);
  }
});

console.log(`\nFixed ${fixedCount} files.`);
