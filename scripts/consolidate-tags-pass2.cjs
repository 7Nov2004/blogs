const fs = require('fs');
const path = require('path');
const blogDir = 'src/content/blog';
const files = fs.readdirSync(blogDir);

// Complete map of all remaining niche/singular tags to authoritative topic hubs
const finalTagMap = {
  // TV & Entertainment -> gadgets
  'smart-tv': 'gadgets',
  '4k-tv': 'gadgets',
  'home-entertainment': 'gadgets',
  'best-tv-under-30000': 'gadgets',
  'google-tv': 'gadgets',
  'qled-tv': 'gadgets',
  'smartwatches': 'gadgets',
  'fitness-tracker': 'gadgets',
  'wearables': 'gadgets',
  'tablets': 'gadgets',
  'budget-tablets': 'gadgets',
  'study-gear': 'students',
  'power-banks': 'gadgets',
  'charging': 'tech-tips',
  'travel': 'tech-tips',

  // Audio -> earbuds
  'audio-problems': 'earbuds',
  'tws-fix': 'earbuds',
  'tws': 'earbuds',
  'budget-audio': 'earbuds',
  'bgmi-gear': 'gadgets',
  'pc-accessories': 'pc-tips',
  'audio': 'earbuds',
  'budget-earphones': 'earbuds',
  'gaming': 'pc-tips',

  // Smartphones & Brands -> smartphones
  'budget-smartphones': 'smartphones',
  'budget-phones': 'smartphones',
  'phones-under-20000': 'smartphones',
  'camera-phones': 'smartphones',
  'camera-phone': 'smartphones',
  'xiaomi': 'smartphones',
  'realme': 'smartphones',
  'vivo': 'smartphones',
  'smartphone-settings': 'tech-tips',
  'call-recording': 'tech-tips',
  'google-dialer': 'tech-tips',

  // Laptops & PC -> laptops / pc-tips
  'gaming-laptops': 'laptops',
  'pc-gaming': 'pc-tips',
  'best-laptops-2026': 'laptops',
  'coding-laptops': 'laptops',
  'keyboards': 'pc-tips',
  'mechanical-keyboard': 'pc-tips',
  'pc-build': 'pc-tips',

  // Deals -> shopping-deals
  'festive-deals': 'shopping-deals',
  'cashback-offers': 'shopping-deals',

  // Finance & Credit -> fintech
  'personal-finance': 'fintech',
  'credit-cards': 'fintech',
  'lifetime-free-credit-card': 'fintech',
  'amazon-pay-icici': 'fintech',
  'rupay-credit-card': 'fintech',
  'credit-card': 'fintech',
  'banking-tips': 'fintech',

  // Coding & Developer Tools -> webdev
  'vscode': 'developer-tools',
  'coding-tips': 'developer-tools',
  'extensions': 'developer-tools',
  'coding-roadmap': 'webdev',

  // Lost phone & Portals -> government-services
  'lost-phone': 'government-services',
  'troubleshooting': 'tech-tips',
  'chakshu-portal': 'government-services',
  'fraud-call-report': 'cyber-safety',
  'spam-sms': 'cyber-safety',
  'digital-safety': 'cyber-safety',
  'cyber-crime': 'cyber-safety',

  // AI & Search -> ai
  'ai-comparison': 'ai',
  'coding-ai': 'ai',
  'anthropic': 'ai',
  'deepseek': 'ai',
  'notebooklm': 'ai',
  'chatgpt-search': 'ai',
  'google-search': 'tech-tips',
  'ai-search': 'ai',
  'perplexity': 'ai',
  'seo-2026': 'tech-tips',
  'passive-income': 'online-earning',

  // Internet & Connectivity -> telecom
  'internet': 'telecom',
  'smart-home': 'gadgets',
  'comparison': 'reviews',
  'battery-drain': 'tech-tips',
  'battery-saver': 'tech-tips',
  'tech-news': 'tech-tips',
  'productivity-tools': 'productivity',
  'gadget-reviews': 'reviews'
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
    const mapped = finalTagMap[slug] || slug;
    cleanTags.add(mapped);
  });

  const formatted = 'tags: [' + Array.from(cleanTags).map(t => `"${t}"`).join(', ') + ']';
  const updated = content.replace(/tags:\s*\[(.*?)\]/s, formatted);

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, 'utf8');
    modified++;
  }
}

console.log(`Cleaned up and consolidated tags in ${modified} files.`);
