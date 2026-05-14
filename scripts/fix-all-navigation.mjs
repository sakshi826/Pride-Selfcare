import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(path.join(ROOT, 'src/features/pride'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    let modified = false;

    // 1. Literal paths: navigate('/...') or navigate(`/...`)
    const literalRegex = /navigate\((['"`])(\/[^'"`]+)\1\)/g;
    content = content.replace(literalRegex, (match, quote, p1) => {
        if (match.includes('window.location.search')) return match;
        modified = true;
        return `navigate(${quote}${p1}${quote} + window.location.search)`;
    });

    // 2. Variable links: navigate(link), navigate(tip.link), navigate(tool.link), navigate(resource.link), navigate(assessment.link)
    const varRegex = /navigate\((link|tip\.link|tool\.link|resource\.link|assessment\.link|guide\.link)\)/g;
    content = content.replace(varRegex, (match, p1) => {
        if (match.includes('window.location.search')) return match;
        modified = true;
        return `navigate(${p1} + window.location.search)`;
    });

    if (modified) {
        console.log(`Fixed navigation in ${file}`);
        fs.writeFileSync(file, content);
    }
});
