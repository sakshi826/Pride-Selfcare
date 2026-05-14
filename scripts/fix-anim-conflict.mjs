import fs from 'fs';

const filePath = 'src/features/pride/dynamic/identity-exploration/components/explore/ExploreIdentity.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

// Replace all spread usages: { ...t, => { ...anim,
content = content.replace(/\{\s*\.\.\.\s*t,/g, '{ ...anim,');

// Replace transition={t} => transition={anim}
content = content.replace(/transition=\{t\}/g, 'transition={anim}');

fs.writeFileSync(filePath, content);
console.log('Done. Replaced all transition {t} references with {anim}.');
