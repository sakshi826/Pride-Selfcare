import fs from 'fs';
import path from 'path';

// Load stories data
const storiesContent = fs.readFileSync('src/features/pride/static/lgbtq-stories/data/stories.ts', 'utf-8');

// Simple regex to extract strings from the stories data
const extractStrings = (content) => {
  const strings = new Set();
  // Match single/double/backtick quoted strings that look like content
  const matches = content.match(/(["'`])((?:(?!\1).|\\\1)*)\1/g);
  if (matches) {
    matches.forEach(m => {
      const s = m.slice(1, -1).replace(/\\/g, '');
      if (s.length > 20 || (s.includes(' ') && s.length > 5)) {
        strings.add(s);
      }
    });
  }
  return Array.from(strings);
};

const storyStrings = extractStrings(storiesContent);

const languages = ['es', 'hi'];

languages.forEach(lang => {
    const filePath = `src/features/pride/hub/i18n/minis.${lang}.json`;
    if (!fs.existsSync(filePath)) return;
    
    let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // Clean garbage keys (those containing code symbols or very short weird ones)
    const cleanData = {};
    Object.keys(data).forEach(key => {
        if (!key.includes('}\r\n') && !key.includes('=>') && !key.includes('&&') && key.length < 1000) {
            cleanData[key] = data[key];
        }
    });
    
    // Add story strings if missing
    storyStrings.forEach(s => {
        if (!cleanData[s]) {
            cleanData[s] = s; // Fallback to English for now, but key exists
        }
    });
    
    fs.writeFileSync(filePath, JSON.stringify(cleanData, null, 2));
    console.log(`Cleaned and updated ${filePath} with ${storyStrings.length} story strings.`);
});
