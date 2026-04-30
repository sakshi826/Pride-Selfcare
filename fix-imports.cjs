const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      processDir(p);
    } else if (p.endsWith('.ts') || p.endsWith('.tsx')) {
      let c = fs.readFileSync(p, 'utf8');
      
      // Fix imports like: import { ... } from '..\../data' -> '../../data'
      c = c.replace(/from '([^']+)'/g, (m, p1) => `from '${p1.replace(/\\/g, '/')}'`);
      c = c.replace(/from "([^"]+)"/g, (m, p1) => `from "${p1.replace(/\\/g, '/')}"`);
      
      fs.writeFileSync(p, c);
    }
  }
}

processDir('src/features/pride');
console.log('Fixed imports');
