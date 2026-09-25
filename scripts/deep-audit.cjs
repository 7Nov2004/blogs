const fs = require('fs');
const path = require('path');

const dir = 'src/content/blog';
const files = fs.readdirSync(dir);
let results = [];
let flaggedCount = 0;
let cleanCount = 0;

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const frontmatterMatch = content.match(/^---[\s\S]*?---/);
  const frontmatter = frontmatterMatch ? frontmatterMatch[0] : '';
  const body = content.replace(/^---[\s\S]*?---/, '').trim();

  // Word count (strip code blocks, markdown symbols)
  const cleanBody = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/[#*|>\[\]!]/g, '')
    .replace(/https?:\/\/\S+/g, '');
  const words = cleanBody.split(/\s+/).filter(w => w.length > 1).length;

  // Title (seoTitle preferred)
  let title = 'UNKNOWN';
  const seoTitleMatch = frontmatter.match(/seoTitle:\s*['"](.+?)['"]/);
  const titleMatch = frontmatter.match(/title:\s*['"](.+?)['"]/);
  if (seoTitleMatch) title = seoTitleMatch[1].trim();
  else if (titleMatch) title = titleMatch[1].trim();

  // Description
  let desc = '';
  const descMatch = frontmatter.match(/description:\s*['"]([^'"]+)['"]/);
  if (descMatch) desc = descMatch[1].trim();

  // Hero image check
  const hasHeroImage = /heroImage\s*:/.test(frontmatter) || /image\s*:/.test(frontmatter);

  // In-body images
  const imgCount = (body.match(/!\[/g) || []).length + (body.match(/<img/g) || []).length;

  // Internal links (links pointing to other blog posts)
  const internalLinks = (body.match(/\(\/blog\//g) || []).length + (body.match(/href="\/blog\//g) || []).length;

  // Headings
  const h2count = (body.match(/^## /gm) || []).length;
  const h3count = (body.match(/^### /gm) || []).length;

  // Tables (good E-E-A-T signal)
  const tableCount = (body.match(/^\|/gm) || []).length;

  // Build flags
  const flags = [];
  if (words < 700) flags.push('🔴 THIN<700w');
  else if (words < 900) flags.push('🟡 LOW 700-900w');
  if (title.length > 60) flags.push(`🔴 TITLE_LONG(${title.length}c)`);
  if (desc.length > 160) flags.push(`🔴 DESC_LONG(${desc.length}c)`);
  if (desc.length < 120 && desc.length > 0) flags.push(`🟡 DESC_SHORT(${desc.length}c)`);
  if (desc.length === 0) flags.push('🔴 NO_DESC');
  if (!hasHeroImage) flags.push('🟡 NO_HERO_IMG');
  if (h2count < 3) flags.push(`🟡 FEW_H2(${h2count})`);
  if (internalLinks < 2) flags.push(`🟡 FEW_INT_LINKS(${internalLinks})`);

  results.push({ file: f, words, titleLen: title.length, descLen: desc.length, h2: h2count, h3: h3count, internalLinks, imgCount, tableCount, flags });
});

// Sort by words ascending
results.sort((a, b) => a.words - b.words);

console.log('\n========================================');
console.log('   TECHVERSEBLOGS.IN — DEEP SEO AUDIT');
console.log('========================================\n');

const flagged = results.filter(r => r.flags.length > 0);
const clean = results.filter(r => r.flags.length === 0);

flaggedCount = flagged.length;
cleanCount = clean.length;

if (flagged.length === 0) {
  console.log('✅ ZERO FLAGGED ARTICLES! Sab articles pass hain.\n');
} else {
  console.log(`⚠️  FLAGGED ARTICLES (${flagged.length} found):\n`);
  flagged.forEach(r => {
    console.log(`📄 ${r.file}`);
    console.log(`   Words: ${r.words} | Title: ${r.titleLen}c | Desc: ${r.descLen}c | H2s: ${r.h2} | Internal Links: ${r.internalLinks} | Images: ${r.imgCount} | Tables: ${r.tableCount}`);
    console.log(`   Issues: ${r.flags.join(' | ')}`);
    console.log('');
  });
}

console.log(`\n--- CLEAN ARTICLES (${clean.length}) ---`);
clean.forEach(r => {
  console.log(`✅ ${r.file.padEnd(70)} ${r.words}w | H2:${r.h2} | Links:${r.internalLinks}`);
});

console.log('\n========================================');
console.log('             AUDIT SUMMARY');
console.log('========================================');
const allWords = results.map(r => r.words);
const avgWords = Math.round(allWords.reduce((a,b)=>a+b,0)/allWords.length);
const minWords = Math.min(...allWords);
const maxWords = Math.max(...allWords);
console.log(`Total Articles    : ${results.length}`);
console.log(`Clean (No Flags)  : ${cleanCount}`);
console.log(`Flagged Articles  : ${flaggedCount}`);
console.log(`Avg Word Count    : ${avgWords}`);
console.log(`Min Word Count    : ${minWords}`);
console.log(`Max Word Count    : ${maxWords}`);
console.log(`🔴 Critical Issues: ${results.filter(r => r.flags.some(f => f.includes('🔴'))).length} articles`);
console.log(`🟡 Warnings       : ${results.filter(r => r.flags.some(f => f.includes('🟡')) && !r.flags.some(f => f.includes('🔴'))).length} articles`);
