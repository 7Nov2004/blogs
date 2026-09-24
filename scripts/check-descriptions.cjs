const fs = require('fs');
const path = require('path');
const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

const longDescs = [];
for (const f of files) {
  const c = fs.readFileSync(path.join(blogDir, f), 'utf8');
  const m = c.match(/description:\s*['"]?(.*?)['"]?$/m);
  if (m && m[1].length > 160) {
    longDescs.push({ file: f, len: m[1].length, desc: m[1] });
  }
}

console.log('Total descriptions > 160 chars:', longDescs.length);
longDescs.forEach(d => console.log(`- ${d.file} (${d.len} chars): "${d.desc}"`));
