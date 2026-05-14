import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticDir = path.join(__dirname, '../public/static/pride');

const directories = fs.readdirSync(staticDir).filter(f => fs.statSync(path.join(staticDir, f)).isDirectory());

const translateScript = `
<!-- Auto-Translation Script -->
<script>
(function() {
  const urlParams = new URLSearchParams(window.location.search);
  let lang = urlParams.get('lang');
  if (lang) {
    // Map standard codes to Google Translate codes
    const langMap = {
      'zh-Hans': 'zh-CN',
      'zh-Hant': 'zh-TW',
    };
    lang = langMap[lang] || lang;
    if (lang !== 'en') {
      document.cookie = "googtrans=/en/" + lang + "; path=/";
      document.cookie = "googtrans=/en/" + lang + "; domain=" + window.location.hostname + "; path=/";
      
      const script = document.createElement('script');
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.head.appendChild(script);
      
      window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({pageLanguage: 'en', autoDisplay: false});
        // Hide the Google Translate banner
        const style = document.createElement('style');
        style.innerHTML = 'body { top: 0 !important; } .skiptranslate { display: none !important; }';
        document.head.appendChild(style);
      };
    } else {
      // Clear translation cookie if English
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }
})();
</script>
</head>
`;

let modifiedCount = 0;
directories.forEach(dir => {
  const indexPath = path.join(staticDir, dir, 'index.html');
  if (fs.existsSync(indexPath)) {
    let content = fs.readFileSync(indexPath, 'utf-8');
    if (!content.includes('<!-- Auto-Translation Script -->')) {
      content = content.replace('</head>', translateScript);
      fs.writeFileSync(indexPath, content);
      console.log(`Injected into ${dir}/index.html`);
      modifiedCount++;
    }
  }
});

console.log(`Successfully injected translation script into ${modifiedCount} files.`);
