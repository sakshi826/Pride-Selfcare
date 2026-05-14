import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.join(__dirname, '..');

function extractFromT(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const strings = new Set();
  
  const regex = /t\((["'])([\s\S]*?)(?<!\\)\1/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    let s = match[2];
    strings.add(s);
  }

  return Array.from(strings);
}

function processDirectory(dir, namespace) {
  const allStrings = new Set();
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const p = path.join(dir, file);
      extractFromT(p).forEach(s => allStrings.add(s));
    }
  });

  const result = {};
  Array.from(allStrings).sort().forEach(s => {
    result[s] = s;
  });

  const i18nDir = path.join(dir, 'i18n');
  if (!fs.existsSync(i18nDir)) {
    fs.mkdirSync(i18nDir, { recursive: true });
  }

  fs.writeFileSync(path.join(i18nDir, 'en.json'), JSON.stringify(result, null, 2));
  console.log(`[${namespace}] Extracted ${Object.keys(result).length} strings to ${namespace}/i18n/en.json`);
}

const hubFiles = fs.readdirSync(path.join(ROOT, 'src/features/pride/hub'));
const hubI18nDir = path.join(ROOT, 'src/features/pride/hub/i18n');
if (!fs.existsSync(hubI18nDir)) {
    fs.mkdirSync(hubI18nDir, { recursive: true });
}

// 1. Core Hub
const hubStrings = new Set();
hubFiles.forEach(file => {
    if (file.endsWith('.tsx') && !file.includes('Tips') && !file.includes('Guide')) {
        extractFromT(path.join(ROOT, 'src/features/pride/hub', file)).forEach(s => hubStrings.add(s));
    }
});

// Add Dynamic Identity Exploration strings to hub namespace
const exploreDir = path.join(ROOT, 'src/features/pride/dynamic/identity-exploration/components/explore');
if (fs.existsSync(exploreDir)) {
    fs.readdirSync(exploreDir).forEach(file => {
        if (file.endsWith('.tsx')) {
            extractFromT(path.join(exploreDir, file)).forEach(s => hubStrings.add(s));
        }
    });
}

const hubResult = {};
Array.from(hubStrings).sort().forEach(s => hubResult[s] = s);
fs.writeFileSync(path.join(hubI18nDir, 'en.json'), JSON.stringify(hubResult, null, 2));
console.log(`[hub] Extracted ${Object.keys(hubResult).length} strings to hub/i18n/en.json`);

// 2. Tips
const tipsStrings = new Set();
hubFiles.forEach(file => {
    if (file.includes('Tips')) {
        extractFromT(path.join(ROOT, 'src/features/pride/hub', file)).forEach(s => tipsStrings.add(s));
    }
});
const tipsResult = {};
Array.from(tipsStrings).sort().forEach(s => tipsResult[s] = s);
fs.writeFileSync(path.join(hubI18nDir, 'tips.en.json'), JSON.stringify(tipsResult, null, 2));
console.log(`[tips] Extracted ${Object.keys(tipsResult).length} strings to hub/i18n/tips.en.json`);

// 3. Guides
const guidesStrings = new Set();
hubFiles.forEach(file => {
    if (file.includes('Guide')) {
        extractFromT(path.join(ROOT, 'src/features/pride/hub', file)).forEach(s => guidesStrings.add(s));
    }
});
const guidesResult = {};
Array.from(guidesStrings).sort().forEach(s => guidesResult[s] = s);
fs.writeFileSync(path.join(hubI18nDir, 'guides.en.json'), JSON.stringify(guidesResult, null, 2));
console.log(`[guides] Extracted ${Object.keys(guidesResult).length} strings to hub/i18n/guides.en.json`);

// 4. Trackers
const trackersDir = path.join(ROOT, 'src/features/pride/trackers');
processDirectory(trackersDir, 'trackers');
