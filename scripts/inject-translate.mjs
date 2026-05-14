import fs from 'fs';
import path from 'path';

const staticDir = 'public/static/pride';

const injectScript = `
  <!-- Pride Localization Layer -->
  <div id="google_translate_element" style="display:none"></div>
  <script type="text/javascript">
    function googleTranslateElementInit() {
        const urlParams = new URLSearchParams(window.location.search);
        const lang = urlParams.get('lang') || 'en';
        
        // Force cookie for Google Translate
        const domain = window.location.hostname;
        document.cookie = "googtrans=/en/" + lang + "; path=/; domain=" + domain;
        document.cookie = "googtrans=/en/" + lang + "; path=/";
        
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: true
        }, 'google_translate_element');
        
        // Periodically check and force the dropdown
        let attempts = 0;
        const interval = setInterval(() => {
            const select = document.querySelector('select.goog-te-combo');
            if (select) {
                if (select.value !== lang) {
                    select.value = lang;
                    select.dispatchEvent(new Event('change'));
                }
                attempts++;
                if (attempts > 10) clearInterval(interval);
            }
        }, 1000);
    }
  </script>
  <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
`;

const folders = fs.readdirSync(staticDir).filter(f => fs.statSync(path.join(staticDir, f)).isDirectory());

folders.forEach(folder => {
    const indexPath = path.join(staticDir, folder, 'index.html');
    if (fs.existsSync(indexPath)) {
        let content = fs.readFileSync(indexPath, 'utf8');
        
        // Remove old injection if exists
        content = content.replace(/<!-- Pride Localization Layer -->[\s\S]*?<\/script>\s*<script.*?cb=googleTranslateElementInit"><\/script>/g, '');
        // Also remove any older versions
        content = content.replace(/<div id="google_translate_element"[\s\S]*?<\/script>\s*<script.*?cb=googleTranslateElementInit"><\/script>/g, '');

        // Inject before </body>
        if (content.includes('</body>')) {
            content = content.replace('</body>', injectScript + '\n</body>');
        } else {
            content += injectScript;
        }
        
        fs.writeFileSync(indexPath, content);
        console.log(`Updated ${indexPath}`);
    }
});
