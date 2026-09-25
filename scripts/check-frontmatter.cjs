const fs = require('fs');
const path = require('path');

const dir = 'src/content/blog';
const files = fs.readdirSync(dir);
let issues = [];

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  // Count occurrences of --- at start of line
  const dashCount = (content.match(/^---\r?$/gm) || []).length;
  if (dashCount > 2) {
    issues.push(f + ': ' + dashCount + ' --- markers (DUPLICATE FRONTMATTER)');
  }
});

if (issues.length) {
  console.log('Issues found:');
  issues.forEach(i => console.log('  ' + i));
} else {
  console.log('No double frontmatter issues found');
}
