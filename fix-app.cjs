const fs = require('fs');
let c = fs.readFileSync('src/App.tsx', 'utf8');
c = c.replace(/to="\/pride\//g, 'to="/');
c = c.replace(/path="\/pride\//g, 'path="/');
c = c.replace('<BrowserRouter>', '<BrowserRouter basename="/pride">');
fs.writeFileSync('src/App.tsx', c);
