import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('src');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    let modified = false;
    
    if (content.includes('window.location.href = "/pride/lgbtq-hub"')) {
        content = content.replace(/window\.location\.href = "\/pride\/lgbtq-hub"/g, 'window.location.href = "/pride/lgbtq-hub" + window.location.search');
        modified = true;
    }
    
    if (content.includes("navigate('/lgbtq-hub')")) {
        content = content.replace(/navigate\('\/lgbtq-hub'\)/g, "navigate('/lgbtq-hub' + window.location.search)");
        modified = true;
    }

    if (content.includes('navigate("/lgbtq-hub")')) {
        content = content.replace(/navigate\("\/lgbtq-hub"\)/g, 'navigate("/lgbtq-hub" + window.location.search)');
        modified = true;
    }

    if (modified) {
        console.log(`Fixing ${file}`);
        fs.writeFileSync(file, content);
    }
});
console.log("Done.");
