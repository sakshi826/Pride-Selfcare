import fs from 'fs';
import path from 'path';

const folders = [
    'src/features/pride/dynamic/find-your-right-time',
    'src/features/pride/dynamic/gentle-check-in',
    'src/features/pride/dynamic/identity-exploration',
    'src/features/pride/dynamic/identity-reflection',
    'src/features/pride/dynamic/identity-journey',
    'src/features/pride/dynamic/pride-journal',
    'src/features/pride/dynamic/pride-mirror-moments',
    'src/features/pride/dynamic/pride-spectrum',
    'src/features/pride/static/bi-identity-affirmations',
    'src/features/pride/static/bi-family-friends-convo',
    'src/features/pride/static/bisexual-stories',
    'src/features/pride/static/bi-mental-health',
    'src/features/pride/static/bi-coming-out',
    'src/features/pride/static/dealing-with-dysphoria',
    'src/features/pride/static/joy-pride-trans',
    'src/features/pride/static/medical-transition',
    'src/features/pride/static/trans-and-mental-health',
    'src/features/pride/static/trans-coming-out',
    'src/features/pride/static/lgbtq-stories'
];

const allStrings = new Set();

function extractStrings(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            extractStrings(fullPath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            
            // Regex to find strings in JSX tags: >Text<
            const jsxTextMatches = content.matchAll(/>([^<{}\n\r]+)</g);
            for (const match of jsxTextMatches) {
                const text = match[1].trim();
                if (text && text.length > 1 && !/^[0-9\s\-\/\.]+$/.test(text)) {
                    allStrings.add(text);
                }
            }

            // Regex to find strings in props: title="Text" or label="Text"
            const propMatches = content.matchAll(/(?:title|label|subtitle|desc|text|eyebrow|eyebrow|button|eyebrow|notice)="([^"]+)"/g);
            for (const match of propMatches) {
                const text = match[1].trim();
                if (text && text.length > 1) {
                    allStrings.add(text);
                }
            }
            
            // Regex to find strings in arrays: ["Text", "Text"]
            const arrayMatches = content.matchAll(/"([^"]+)"/g);
            for (const match of arrayMatches) {
                 const text = match[1].trim();
                 if (text && text.length > 2 && text.includes(' ')) {
                     allStrings.add(text);
                 }
            }
        }
    }
}

folders.forEach(f => extractStrings(f));

const result = {};
Array.from(allStrings).sort().forEach(s => {
    result[s] = s;
});

fs.writeFileSync('src/features/pride/hub/i18n/minis.en.json', JSON.stringify(result, null, 2));
console.log(`Extracted ${allStrings.size} strings to minis.en.json`);
