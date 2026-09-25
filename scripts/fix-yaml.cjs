/**
 * Fix ALL broken YAML frontmatter descriptions - the desc fix scripts appended
 * old content after the new description causing invalid YAML
 */
const fs = require('fs');
const path = require('path');

const dir = 'src/content/blog';
const files = fs.readdirSync(dir);
let fixed = 0;
let errors = [];

files.forEach(f => {
  const filepath = path.join(dir, f);
  const content = fs.readFileSync(filepath, 'utf8');

  // Extract frontmatter
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) return;

  const frontmatter = fmMatch[0];
  const body = content.slice(fmMatch[0].length);

  // Find description line - check if it's broken (contains multiple quotes)
  const lines = frontmatter.split('\n');
  let descLineIdx = -1;
  let isMultiline = false;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^description:/)) {
      descLineIdx = i;
      // Check if description line has mismatched quotes (broken)
      const line = lines[i];
      const dq = (line.match(/"/g) || []).length;
      const sq = (line.match(/'/g) || []).length;
      if (dq % 2 !== 0 || sq % 2 !== 0) {
        isMultiline = true;
      }
      break;
    }
  }

  if (descLineIdx === -1 || !isMultiline) return;

  // Try to extract just the first valid description value
  const descLine = lines[descLineIdx];

  // Find the actual valid description - extract content up to first quote mismatch
  let validDesc = '';

  // Try double-quote wrapped
  const dqMatch = descLine.match(/^description:\s*"([^"]+)"/);
  if (dqMatch) {
    validDesc = dqMatch[1];
  } else {
    // Try single-quote wrapped
    const sqMatch = descLine.match(/^description:\s*'([^']+)'/);
    if (sqMatch) {
      validDesc = sqMatch[1];
    }
  }

  if (!validDesc) {
    errors.push('Could not extract valid desc from: ' + f);
    return;
  }

  // Replace the broken line with clean version
  lines[descLineIdx] = `description: '${validDesc}'`;
  const newFrontmatter = lines.join('\n');
  const newContent = newFrontmatter + body;
  fs.writeFileSync(filepath, newContent);
  console.log('FIXED: ' + f + ' -> "' + validDesc.substring(0, 60) + '..."');
  fixed++;
});

console.log('\nFixed: ' + fixed + ' files');
if (errors.length) {
  console.log('Errors:');
  errors.forEach(e => console.log('  ' + e));
}
