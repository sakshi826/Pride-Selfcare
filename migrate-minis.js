import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DYNAMIC_SRC = path.join(ROOT, 'lovable/db');
const STATIC_SRC = path.join(ROOT, 'lovable/static');
const CLAUDE_SRC = path.join(ROOT, 'Claude');

const DYNAMIC_DEST = path.join(ROOT, 'src/features/pride/dynamic');
const STATIC_DEST = path.join(ROOT, 'src/features/pride/static');
const CLAUDE_DEST = path.join(ROOT, 'public/static/pride');

// Helper to recursively copy directories
function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  const exists = fs.existsSync(dest);
  const stats = exists && fs.statSync(dest);
  const isDirectory = exists && stats.isDirectory();
  
  if (exists && isDirectory) {
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    // only copy if it's not a node_modules or .git
    if (!src.includes('node_modules') && !src.includes('.git')) {
        if (!fs.existsSync(path.dirname(dest))) {
            fs.mkdirSync(path.dirname(dest), { recursive: true });
        }
        if (fs.lstatSync(src).isDirectory()) {
            fs.mkdirSync(dest, { recursive: true });
            fs.readdirSync(src).forEach(function(childItemName) {
                copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
            });
        } else {
            fs.copyFileSync(src, dest);
        }
    }
  }
}

// 1. Migrate Dynamic Minis
if (fs.existsSync(DYNAMIC_SRC)) {
  const dirs = fs.readdirSync(DYNAMIC_SRC);
  for (const dir of dirs) {
    const slugSrc = path.join(DYNAMIC_SRC, dir, 'src');
    const slugDest = path.join(DYNAMIC_DEST, dir);
    if (fs.existsSync(slugSrc)) {
      copyRecursiveSync(slugSrc, slugDest);
      // Rename App.tsx to index.tsx for easy import
      if (fs.existsSync(path.join(slugDest, 'App.tsx'))) {
        fs.renameSync(path.join(slugDest, 'App.tsx'), path.join(slugDest, 'index.tsx'));
      }
      console.log(`Migrated dynamic mini: ${dir}`);
    }
  }
}

// 2. Migrate Static Minis
if (fs.existsSync(STATIC_SRC)) {
  const dirs = fs.readdirSync(STATIC_SRC);
  for (const dir of dirs) {
    const slugSrc = path.join(STATIC_SRC, dir, 'src');
    const slugDest = path.join(STATIC_DEST, dir);
    if (fs.existsSync(slugSrc)) {
      copyRecursiveSync(slugSrc, slugDest);
      if (fs.existsSync(path.join(slugDest, 'App.tsx'))) {
        fs.renameSync(path.join(slugDest, 'App.tsx'), path.join(slugDest, 'index.tsx'));
      }
      console.log(`Migrated static mini: ${dir}`);
    }
  }
}

// 3. Migrate Claude HTML Minis
if (fs.existsSync(CLAUDE_SRC)) {
  const files = fs.readdirSync(CLAUDE_SRC).filter(f => f.endsWith('.html'));
  for (const file of files) {
    const slug = file.replace('.html', '');
    const destDir = path.join(CLAUDE_DEST, slug);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(path.join(CLAUDE_SRC, file), path.join(destDir, 'index.html'));
    console.log(`Migrated claude mini: ${slug}`);
  }
}

// 4. Strip DB/Auth logic and replace imports
// This will recursively search for @/ and replace it with appropriate relative paths or root aliases.
function processFiles(dir, slug, type) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processFiles(fullPath, slug, type);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Remove local DB files if they were copied
      if (file === 'db.ts' || file === 'db.js' || file === 'auth.ts' || file === 'auth.js') {
        fs.unlinkSync(fullPath);
        continue;
      }

      // Replace Prisma/Supabase with Neon DB and localStorage with sessionStorage
      content = content.replace(/import\s+.*PrismaClient.*?;/g, 'import { sql } from "@/lib/db";');
      content = content.replace(/import\s+.*supabase.*?;/g, 'import { sql } from "@/lib/db";');
      
      // Fix @/ paths to point to their local folder for pages/components if they exist there,
      // but let UI components point to the root.
      // This is a heuristic: if they import "@/components/ui/...", leave it.
      // If they import "@/pages/..." or "@/components/...", replace @/ with relative path.
      // But actually, in Vite, we can just define multiple aliases if we used workspaces.
      // Since it's monolithic, let's let @/ point to root src/, and rewrite local imports 
      // to relative paths. 
      // Easiest is to rewrite `@/` to `../../../../` etc. relative to current file to `src/features/pride/<type>/<slug>/`
      
      const relativeToSlugRoot = path.relative(path.dirname(fullPath), path.join(ROOT, `src/features/pride/${type}/${slug}`));
      const prefix = relativeToSlugRoot === '' ? './' : relativeToSlugRoot + '/';
      
      // Replace @/components/ui with @/components/ui to keep root ui components
      content = content.replace(/@\/components\/ui\//g, 'ROOT_UI_COMPONENT_FLAG');
      content = content.replace(/@\/lib\/utils/g, 'ROOT_UTILS_FLAG');
      
      // Replace remaining @/ with prefix to point to the mini's own src folder
      content = content.replace(/@\//g, prefix);
      
      // Restore root flags
      content = content.replace(/ROOT_UI_COMPONENT_FLAG/g, '@/components/ui/');
      content = content.replace(/ROOT_UTILS_FLAG/g, '@/lib/utils');
      
      // Replace localStorage.getItem('userId') with sessionStorage.getItem('user_id') 
      // based on the AuthGuard implementation
      content = content.replace(/localStorage\.getItem\(['"]userId['"]\)/g, "sessionStorage.getItem('user_id')");

      fs.writeFileSync(fullPath, content);
    }
  }
}

const dynDirs = fs.existsSync(DYNAMIC_DEST) ? fs.readdirSync(DYNAMIC_DEST) : [];
for (const dir of dynDirs) {
  processFiles(path.join(DYNAMIC_DEST, dir), dir, 'dynamic');
}

const statDirs = fs.existsSync(STATIC_DEST) ? fs.readdirSync(STATIC_DEST) : [];
for (const dir of statDirs) {
  processFiles(path.join(STATIC_DEST, dir), dir, 'static');
}

console.log("Migration and stripping complete.");
