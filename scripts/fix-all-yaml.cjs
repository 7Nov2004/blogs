/**
 * Scan all blog files for broken description YAML (mixed/unbalanced quotes)
 * and fix them automatically
 */
const fs = require('fs');
const path = require('path');

const dir = 'src/content/blog';
const files = fs.readdirSync(dir);
let fixed = 0;
let skipped = 0;

files.forEach(f => {
  const filepath = path.join(dir, f);
  const content = fs.readFileSync(filepath, 'utf8');
  const lines = content.split('\n');

  // Find description line
  let descIdx = -1;
  let inFrontmatter = false;
  let fmCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed === '---') {
      fmCount++;
      if (fmCount === 1) inFrontmatter = true;
      if (fmCount === 2) break; // past frontmatter
      continue;
    }
    if (inFrontmatter && trimmed.startsWith('description:')) {
      descIdx = i;
      break;
    }
  }

  if (descIdx === -1) {
    skipped++;
    return;
  }

  const descLine = lines[descIdx];

  // Check if it's a broken line: starts with description: "..." then has extra content
  // Detect: description: "GOOD_CONTENT"BAD_CONTENT' or description: "A"B"
  const isDoubleQuoted = descLine.match(/^description:\s*"/);
  const isSingleQuoted = descLine.match(/^description:\s*'/);

  if (!isDoubleQuoted && !isSingleQuoted) {
    skipped++;
    return;
  }

  let validDesc = null;

  if (isDoubleQuoted) {
    // Extract content between first pair of double quotes
    const m = descLine.match(/^description:\s*"([^"]+)"/);
    if (m) validDesc = m[1];
  } else {
    // Extract content between first pair of single quotes
    const m = descLine.match(/^description:\s*'([^']+)'/);
    if (m) validDesc = m[1];
  }

  if (!validDesc) {
    skipped++;
    return;
  }

  // Check if line has extra content after closing quote
  let closingQuote = isDoubleQuoted ? '"' : "'";
  let firstQuoteEnd = descLine.indexOf(closingQuote, descLine.indexOf(closingQuote) + 1);
  let hasExtra = firstQuoteEnd !== -1 && firstQuoteEnd < descLine.length - 1;

  if (!hasExtra) {
    skipped++;
    return; // Line is fine
  }

  // Replace the broken line
  lines[descIdx] = "description: '" + validDesc + "'";
  const newContent = lines.join('\n');
  fs.writeFileSync(filepath, newContent);
  console.log('FIXED: ' + f);
  console.log('       -> "' + validDesc.substring(0, 80) + '"');
  fixed++;
});

console.log('\nFixed: ' + fixed + ' | Skipped: ' + skipped);
