const fs = require('fs');
const path = require('path');
const blogDir = 'src/content/blog';
const files = fs.readdirSync(blogDir);

const tagMap = {};

for (const file of files) {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
  const tagsMatch = content.match(/tags:\s*\[(.*?)\]/s);
  if (tagsMatch) {
    const tags = tagsMatch[1].split(',').map(t => t.replace(/['"\[\]]/g, '').trim()).filter(Boolean);
    tags.forEach(t => {
      const slug = t.toLowerCase().replace(/\s+/g, '-');
      if (!tagMap[slug]) tagMap[slug] = { name: t, count: 0, posts: [] };
      tagMap[slug].count++;
      tagMap[slug].posts.push(file);
    });
  }
}

const entries = Object.entries(tagMap).sort((a, b) => b[1].count - a[1].count);

console.log('Total unique tags:', entries.length);
console.log('Tags with >= 3 posts:', entries.filter(e => e[1].count >= 3).length);
console.log('Tags with < 3 posts:', entries.filter(e => e[1].count < 3).length);
console.log('Tags with exactly 1 post:', entries.filter(e => e[1].count === 1).length);

console.log('\n--- TOP TAGS (>= 3 posts) ---');
entries.filter(e => e[1].count >= 3).forEach(([slug, data]) => {
  console.log(`${slug} (${data.count} posts)`);
});

console.log('\n--- TAGS WITH 1 OR 2 POSTS ---');
entries.filter(e => e[1].count < 3).forEach(([slug, data]) => {
  console.log(`${slug} (${data.count} post): ${data.posts.join(', ')}`);
});
