const fs = require('fs');
const path = require('path');
const blogDir = 'src/content/blog';
const files = fs.readdirSync(blogDir);

// Map remaining lone tags into our strong core topic hubs
const remainingTagMap = {
  // Mobile / OS
  'android': 'android-tips',
  'android-network-tips': 'android-tips',
  '4636-dialer-code': 'android-tips',
  'nr-only-mode': 'telecom',
  'force-5g-only': 'telecom',
  'jio-true-5g': 'telecom',
  'airtel-5g': 'telecom',
  'whatsapp': 'tech-tips',
  'mobile-tips': 'smartphone-tips',
  'smartphone-repair': 'smartphone-tips',
  'phone-speaker-water': 'smartphone-tips',
  'mobile-speaker-sound-fix': 'smartphone-tips',
  'clear-wave-sound': 'smartphone-tips',
  'water-eject-sound': 'smartphone-tips',

  // Cyber security / scams
  'digital-arrest': 'cyber-safety',
  'cyber-crime': 'cyber-safety',
  'police-scam': 'cyber-safety',
  'fake-cbi-call': 'cyber-safety',

  // Finance
  'finance': 'fintech',

  // AI
  'ai-tools': 'ai',
};

let modified = 0;

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const tagsMatch = content.match(/tags:\s*\[(.*?)\]/s);
  if (!tagsMatch) continue;

  const rawTags = tagsMatch[1].split(',').map(t => t.replace(/['"\[\]]/g, '').trim()).filter(Boolean);

  const cleanTags = new Set();
  rawTags.forEach(t => {
    const slug = t.toLowerCase().replace(/\s+/g, '-');
    const mapped = remainingTagMap[slug] || slug;
    cleanTags.add(mapped);
  });

  const formatted = 'tags: [' + Array.from(cleanTags).map(t => `"${t}"`).join(', ') + ']';
  const updated = content.replace(/tags:\s*\[(.*?)\]/s, formatted);

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, 'utf8');
    modified++;
  }
}

console.log(`Successfully mapped remaining lone tags across ${modified} files.`);
