const fs = require('fs');
const path = require('path');

// Append to git-push article
const gp = 'src/content/blog/git-push-rejected-error-solution-hindi.md';
const ga = 'scripts/article-additions/git-push-addition.md';
const gcontent = fs.readFileSync(gp, 'utf8').trimEnd() + '\n\n' + fs.readFileSync(ga, 'utf8').trim() + '\n';
fs.writeFileSync(gp, gcontent);

// Append to html-css article
const hp = 'src/content/blog/html-css-guide-hindi.md';
const ha = 'scripts/article-additions/html-css-addition.md';
const hcontent = fs.readFileSync(hp, 'utf8').trimEnd() + '\n\n' + fs.readFileSync(ha, 'utf8').trim() + '\n';
fs.writeFileSync(hp, hcontent);

console.log('Files appended');

// Verify word counts
[gp, hp].forEach(fp => {
  const full = fs.readFileSync(fp, 'utf8');
  const body = full.replace(/^---[\s\S]*?---/, '').trim();
  const words = body.split(/\s+/).filter(w => w.length > 1).length;
  console.log(path.basename(fp), '->', words, 'words');
});

// Final audit
const dir = 'src/content/blog';
const files = fs.readdirSync(dir);
let thin = 0, longDesc = 0;
files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const fm = (content.match(/^---[\s\S]*?---/) || [''])[0];
  const body = content.replace(/^---[\s\S]*?---/, '').trim();
  const words = body.split(/\s+/).filter(w => w.length > 1).length;
  const dm = fm.match(/description:\s*['"]([^'"]+)['"]/);
  const desc = dm ? dm[1] : '';
  if (words < 700) { thin++; console.log('STILL THIN:', f, words + 'w'); }
  if (desc.length > 160) { longDesc++; console.log('LONG DESC:', f, desc.length + 'c'); }
});
console.log('\nFINAL: Thin=' + thin + ' LongDesc=' + longDesc);
