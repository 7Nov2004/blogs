const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

const list = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) continue;
  const fm = fmMatch[1];
  
  const titleMatch = fm.match(/title:\s*['"]?(.*?)['"]?$/m);
  const seoTitleMatch = fm.match(/seoTitle:\s*['"]?(.*?)['"]?$/m);
  
  const title = (titleMatch && titleMatch[1]) || '';
  const seoTitle = (seoTitleMatch && seoTitleMatch[1]) || '';
  
  const currentTitle = seoTitle || title;
  if (currentTitle.length > 60) {
    list.push({ file, title, len: currentTitle.length, hasSeoTitle: !!seoTitle });
  }
}

fs.writeFileSync(path.join(__dirname, '..', 'reports', 'titles-to-fix.json'), JSON.stringify(list, null, 2));
console.log('Saved', list.length, 'titles to reports/titles-to-fix.json');
