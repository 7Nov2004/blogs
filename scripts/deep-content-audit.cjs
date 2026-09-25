const fs = require('fs');
const path = require('path');

const dir = 'src/content/blog';
const files = fs.readdirSync(dir);

const results = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf-8');
  const fmMatch = content.match(/^---[\r\n]+([\s\S]*?)[\r\n]+---/);
  const frontmatter = fmMatch ? fmMatch[1] : '';
  const body = content.replace(/^---[\r\n]+[\s\S]*?[\r\n]+---/, '').trim();

  // Raw total words
  const totalWords = body.split(/\s+/).filter(w => w.length > 0).length;

  // Prose words (stripping code blocks, markdown tables, html, symbols)
  const proseText = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^\|.*?\|$/gm, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*`_~|>\-+=]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const proseWords = proseText ? proseText.split(' ').filter(w => w.length > 0).length : 0;

  // Title
  const seoTitleMatch = frontmatter.match(/seoTitle:\s*['"](.+?)['"]/);
  const titleMatch = frontmatter.match(/title:\s*['"](.+?)['"]/);
  const title = (seoTitleMatch && seoTitleMatch[1]) || (titleMatch && titleMatch[1]) || '';

  // Description
  const descMatch = frontmatter.match(/description:\s*['"]([^'"]+)['"]/);
  const desc = (descMatch && descMatch[1]) || '';

  // Internal links
  const linksMatch = body.match(/\/blog\/[a-z0-9-]+/g);
  const internalLinks = linksMatch ? linksMatch.length : 0;

  // H2 count
  const h2Match = body.match(/^##\s+/gm);
  const h2Count = h2Match ? h2Match.length : 0;

  // Tables count
  const tableLines = (body.match(/^\|/gm) || []).length;

  results.push({
    file,
    totalWords,
    proseWords,
    title,
    titleLen: title.length,
    desc,
    descLen: desc.length,
    internalLinks,
    h2Count,
    tableLines
  });
}

results.sort((a, b) => a.proseWords - b.proseWords);

console.log('========================================================================');
console.log('   DEEP DIVE PROSE & CONTENT AUDIT (TECHVERSEBLOGS.IN)');
console.log('========================================================================\n');

console.log(`Total Articles Analyzed: ${results.length}`);

// Critical check 1: Prose words < 700
const criticalProse = results.filter(r => r.proseWords < 700);
console.log(`\n🔴 ARTICLES WITH PROSE WORDS < 700: ${criticalProse.length}`);
criticalProse.forEach(r => {
  console.log(`- ${r.file}: Prose=${r.proseWords}w, Total=${r.totalWords}w, H2=${r.h2Count}, Links=${r.internalLinks}`);
});

// Warning check: Prose words between 700 and 850
const mildProse = results.filter(r => r.proseWords >= 700 && r.proseWords < 850);
console.log(`\n🟡 ARTICLES WITH PROSE WORDS 700-850: ${mildProse.length}`);
mildProse.forEach(r => {
  console.log(`- ${r.file}: Prose=${r.proseWords}w, Total=${r.totalWords}w, H2=${r.h2Count}, Links=${r.internalLinks}`);
});

// Check titles > 60 chars
const longTitles = results.filter(r => r.titleLen > 60);
console.log(`\n🔴 TITLES > 60 CHARACTERS: ${longTitles.length}`);
longTitles.forEach(r => console.log(`- ${r.file} (${r.titleLen}c): "${r.title}"`));

// Check descriptions > 160 or < 120
const badDesc = results.filter(r => r.descLen > 160 || r.descLen < 120);
console.log(`\n🔴 DESCRIPTIONS OUTSIDE 120-160 CHARS: ${badDesc.length}`);
badDesc.forEach(r => console.log(`- ${r.file} (${r.descLen}c): "${r.desc}"`));

// Check internal links < 2
const lowLinks = results.filter(r => r.internalLinks < 2);
console.log(`\n🔴 ARTICLES WITH < 2 INTERNAL LINKS: ${lowLinks.length}`);
lowLinks.forEach(r => console.log(`- ${r.file} (${r.internalLinks} links)`));

// Check H2 < 3
const lowH2 = results.filter(r => r.h2Count < 3);
console.log(`\n🔴 ARTICLES WITH < 3 H2 HEADINGS: ${lowH2.length}`);
lowH2.forEach(r => console.log(`- ${r.file} (${r.h2Count} H2s)`));
