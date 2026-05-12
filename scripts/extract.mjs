import { execSync } from 'child_process';
import path from 'path';

const moduleName = process.argv[2];
if (!moduleName) {
  console.error('Usage: node scripts/extract.mjs <module-name>');
  process.exit(1);
}

const configPath = path.resolve(process.cwd(), 'i18next-parser.config.cjs');
const inputPath = `src/features/pride/${moduleName}/**/*.{ts,tsx}`;
const outputPath = `src/features/pride/${moduleName}/i18n/$LOCALE.json`;

console.log(`🔍 Extracting strings from ${moduleName}...`);

try {
  execSync(`npx i18next-parser "${inputPath}" --config "${configPath}" --output "${outputPath}"`, { stdio: 'inherit' });
  console.log(`✅ Extraction complete for ${moduleName}`);
} catch (error) {
  console.error(`❌ Extraction failed: ${error.message}`);
}
