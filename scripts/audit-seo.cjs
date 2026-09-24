const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

let longTitles = [];
let shortDesc = [];
let longDesc = [];
let thinPosts = [];
let lowInternalLinks = [];
let wordCounts = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) continue;
  const fm = fmMatch[1];
  const body = content.slice(fmMatch[0].length);

  const titleMatch = fm.match(/title:\s*['"]?(.*?)['"]?$/m);
  const seoTitleMatch = fm.match(/seoTitle:\s*['"]?(.*?)['"]?$/m);
  const descMatch = fm.match(/description:\s*['"]?(.*?)['"]?$/m);
  const seoDescMatch = fm.match(/seoDescription:\s*['"]?(.*?)['"]?$/m);

  const finalTitle = (seoTitleMatch && seoTitleMatch[1]) || (titleMatch && titleMatch[1]) || '';
  const finalDesc = (seoDescMatch && seoDescMatch[1]) || (descMatch && descMatch[1]) || '';

  const words = body.trim().split(/\s+/).filter(Boolean).length;
  wordCounts.push(words);
  const internalLinks = (body.match(/\[.*?\]\(\/blog\/.*?\)/g) || []).length;

  if (finalTitle.length > 60) longTitles.push({ file, len: finalTitle.length, title: finalTitle });
  if (finalDesc.length < 120) shortDesc.push({ file, len: finalDesc.length });
  if (finalDesc.length > 160) longDesc.push({ file, len: finalDesc.length });
  if (words < 700) thinPosts.push({ file, words });
  if (internalLinks < 2) lowInternalLinks.push({ file, internalLinks });
}

const avgWords = Math.round(wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length);

console.log('=== SEO AUDIT SUMMARY ===');
console.log('Total Blog Posts:', files.length);
console.log('Average Words per Post:', avgWords);
console.log('Long Titles (> 60 chars):', longTitles.length, 'out of', files.length);
console.log('Short Descriptions (< 120 chars):', shortDesc.length);
console.log('Long Descriptions (> 160 chars):', longDesc.length);
console.log('Thin Posts (< 700 words):', thinPosts.length);
console.log('Posts with < 2 internal links:', lowInternalLinks.length);

if (longTitles.length > 0) {
  console.log('\nSample Long Titles:');
  longTitles.slice(0, 5).forEach(t => console.log(`- [${t.len} chars] ${t.file}: "${t.title}"`));
}

if (thinPosts.length > 0) {
  console.log('\nSample Thin Posts:');
  thinPosts.slice(0, 5).forEach(p => console.log(`- [${p.words} words] ${p.file}`));
}
