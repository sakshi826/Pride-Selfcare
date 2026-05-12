import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src', 'features', 'pride');
const publicLocalesDir = path.join(rootDir, 'public', 'locales');

// Ensure public/locales exists
if (!fs.existsSync(publicLocalesDir)) {
  fs.mkdirSync(publicLocalesDir, { recursive: true });
}

// Find all i18n folders in features
const features = fs.readdirSync(srcDir).filter(f => fs.statSync(path.join(srcDir, f)).isDirectory());

console.log(`Syncing locales for features: ${features.join(', ')}`);

features.forEach(feature => {
  const i18nDir = path.join(srcDir, feature, 'i18n');
  if (fs.existsSync(i18nDir)) {
    const files = fs.readdirSync(i18nDir).filter(f => f.endsWith('.json'));
    files.forEach(file => {
      const lang = file.replace('.json', '');
      const targetDir = path.join(publicLocalesDir, lang);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      const sourceFile = path.join(i18nDir, file);
      const targetFile = path.join(targetDir, `${feature}.json`);
      
      fs.copyFileSync(sourceFile, targetFile);
      console.log(`Copied ${feature}/${file} -> locales/${lang}/${feature}.json`);
    });
  }
});

console.log('Locales sync complete.');
