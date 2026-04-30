const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      processDir(p);
    } else if (p.endsWith('.tsx')) {
      let c = fs.readFileSync(p, 'utf8');
      
      // Remove <BrowserRouter> and </BrowserRouter>
      // We also need to remove the import if it's no longer used, 
      // but the main issue is the tags.
      c = c.replace(/<BrowserRouter[^>]*>/g, '');
      c = c.replace(/<\/BrowserRouter>/g, '');
      
      fs.writeFileSync(p, c);
    }
  }
}

processDir('src/features/pride');
console.log('Removed nested routers');
