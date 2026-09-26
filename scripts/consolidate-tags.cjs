const fs = require('fs');
const path = require('path');
const blogDir = 'src/content/blog';
const files = fs.readdirSync(blogDir);

// Mapping of fragmented/single-use tags to standardized authoritative tags
const tagConsolidation = {
  // AI & Models
  'claude-ai': 'ai',
  'claude-3.7': 'ai',
  'hybrid-reasoning': 'ai',
  'chatgpt-vs-claude': 'ai',
  'deepseek-r1': 'ai',
  'local-ai': 'ai',
  'ollama': 'ai',
  'offline-llm': 'ai',
  'tech-comparison': 'tech-tips',
  'gemini-advanced': 'ai',
  'gemini-2.0': 'ai',
  'google-ai': 'ai',
  'audio-overview': 'ai',
  'ai-podcast': 'ai',
  'perplexity-ai': 'ai',
  'search-engine': 'tech-tips',
  'google-vs-ai': 'ai',
  'data-science': 'ai',
  'machine-learning': 'ai',
  'ai-tools': 'ai',
  'artificial-intelligence': 'ai',
  'chatgpt': 'ai',
  'openai': 'ai',
  'gpt-5': 'ai',
  'photo-editing': 'ai',
  'graphic-design': 'tech-tips',
  'video-editing': 'ai',
  'youtube-shorts': 'tech-tips',
  'content-creation': 'tech-tips',

  // Audio & Earbuds
  'boat-airdopes': 'earbuds',
  'realme-buds': 'earbuds',
  'headphones': 'earbuds',
  'best-anc-earbuds': 'earbuds',
  'gaming-earbuds': 'earbuds',

  // Apple & iPhone
  'iphone-17-pro': 'apple',
  'croma-discount': 'shopping-deals',
  'apple-deals': 'apple',
  'iphone-offer': 'apple',
  'exchange-bonus': 'shopping-deals',
  'iphone-update': 'apple',
  'ios-27-release-date': 'apple',
  'apple-intelligence': 'apple',
  'iphone-18': 'apple',
  'iphone-tips': 'apple',
  'ios-27': 'apple',
  'flagship-phone': 'smartphones',
  'smartphone': 'smartphones',
  'budget-phone': 'smartphones',
  'mid-range': 'smartphones',
  'redmi-note-17-pro': 'smartphones',

  // Carrier / Telecom
  'airtel-5g': 'telecom',
  'jio-5g': 'telecom',
  'telecom-plans': 'telecom',
  'sim-comparison': 'telecom',
  'india-telecom': 'telecom',
  'true-5g': 'telecom',
  'network-problem': 'tech-tips',
  'unlimited-data-fix': 'telecom',
  'apn-settings': 'tech-tips',
  'sim-plans': 'telecom',
  'jio': 'telecom',
  'airtel': 'telecom',
  'bsnl-5g': 'telecom',
  'telecom-deals': 'telecom',
  'recharge-plans': 'telecom',
  'sim-swap': 'cyber-safety',
  '5g-speed-test': 'telecom',

  // Railways & Government Services
  'irctc': 'government-services',
  'tatkal-booking': 'government-services',
  'train-ticket': 'government-services',
  'travel-hacks': 'tech-tips',
  'indian-railways': 'government-services',
  'digital-tips': 'tech-tips',
  'tafcop': 'government-services',
  'aadhaar-sim-check': 'government-services',
  'aadhaar-auth-history': 'government-services',
  'myaadhaar': 'government-services',
  'aadhaar-misuse': 'cyber-safety',
  'cibil-score': 'fintech',
  'cibil-dispute': 'fintech',
  'credit-score': 'fintech',
  'ceir-portal': 'government-services',

  // PC & Laptop
  'laptop-overheating': 'pc-tips',
  'fan-noise': 'pc-tips',
  'windows-11-tips': 'windows-11',
  'laptop-cooling': 'pc-tips',
  'thermal-throttling': 'pc-tips',
  'pc-maintenance': 'pc-tips',
  'windows-tips': 'windows-11',
  'pc-speed': 'pc-tips',
  'laptop-performance': 'pc-tips',
  'computer-hacks': 'pc-tips',
  'refurbished-laptops': 'laptops',
  'budget-laptops': 'laptops',

  // WebDev & Programming
  'nodejs': 'webdev',
  'full-stack-roadmap': 'webdev',
  'coding-career': 'webdev',
  'learn-to-code': 'webdev',
  'git-push-rejected': 'webdev',
  'coding-errors': 'webdev',
  'programming-tips': 'webdev',
  'version-control': 'webdev',
  'html': 'webdev',
  'css': 'webdev',
  'responsive-design': 'webdev',
  'beginners': 'webdev',
  'js-roadmap': 'webdev',
  'frontend': 'webdev',
  'es6': 'webdev',
  'react-19': 'webdev',
  'nextjs-15': 'webdev',
  'frontend-roadmap': 'webdev',
  'full-stack-2026': 'webdev',
  'server-components': 'webdev',
  'tailwind-css': 'webdev',
  'typescript': 'webdev',
  'javascript': 'webdev',
  'react': 'webdev',
  'nextjs': 'webdev',
  'full-stack': 'webdev',
  'backend': 'webdev',
  'containers': 'webdev',
  'devops': 'webdev',
  'docker': 'webdev',
  'git': 'webdev',
  'github': 'webdev',

  // Mobile Hardware / Display
  'green-line-display': 'smartphones',
  'smartphone-repair': 'tech-tips',
  'oneplus-green-line': 'smartphones',
  'samsung-screen-replacement': 'smartphones',
  'gadget-care': 'tech-tips',
  'fast-charging-fix': 'tech-tips',
  'hardware-fix': 'tech-tips',
  'phone-charging-slow': 'tech-tips',
  'battery-health': 'tech-tips',
  'battery-life': 'tech-tips',
  'phone-storage': 'tech-tips',
  'storage-space-running-out': 'tech-tips',
  'clear-cache': 'tech-tips',
  'whatsapp-backup': 'tech-tips',

  // Security & Scams
  'telegram-scam': 'cyber-safety',
  'scam-alert': 'cyber-safety',
  'privacy-hacks': 'cyber-safety',
  'security-codes': 'cyber-safety',
  'privacy': 'cyber-safety',
  'cyber-safety': 'cyber-safety',
  'passkeys': 'cyber-safety',

  // Career & Freelancing
  'upwork': 'freelancing',
  'fiverr': 'freelancing',
  'remote-jobs': 'freelancing',
  'career-guide': 'freelancing',
  'online-jobs': 'freelancing',
  'exam-prep': 'students',
  'free-tools': 'tech-tips',

  // Shopping & Deals
  'shopping-hacks': 'shopping-deals',
  'flipkart-big-billion-days-2026': 'shopping-deals',
  'amazon-great-indian-festival': 'shopping-deals',
  'iphone-deals': 'shopping-deals',
  'smartphone-sale': 'shopping-deals',
  'festive-offers': 'shopping-deals',

  // Google & Storage
  'google-drive': 'tech-tips',
  'gmail-storage': 'tech-tips',
  'storage-full': 'tech-tips',

  // Fintech
  'upi': 'fintech',
  'payment': 'fintech',
  'nfc': 'fintech',
  'india': 'tech-tips',
  'digital-payment': 'fintech',

  // Social & Apps
  'whatsapp-tips': 'tech-tips',
  'notification-history': 'tech-tips',
  'deleted-messages': 'tech-tips',
  'social-media': 'tech-tips',
  'android': 'smartphones',
  'whatsapp': 'tech-tips',
  'smartwatch': 'gadgets'
};

let filesModified = 0;

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const tagsMatch = content.match(/tags:\s*\[(.*?)\]/s);
  if (!tagsMatch) continue;

  const rawTags = tagsMatch[1].split(',').map(t => t.replace(/['"\[\]]/g, '').trim()).filter(Boolean);

  // Consolidate
  const newTagsSet = new Set();
  rawTags.forEach(t => {
    const slug = t.toLowerCase().replace(/\s+/g, '-');
    if (tagConsolidation[slug]) {
      newTagsSet.add(tagConsolidation[slug]);
    } else {
      newTagsSet.add(slug);
    }
  });

  // Ensure every post has at least 2-4 standard high-authority tags
  const newTagsArray = Array.from(newTagsSet);

  const formattedTags = 'tags: [' + newTagsArray.map(t => `"${t}"`).join(', ') + ']';

  const updatedContent = content.replace(/tags:\s*\[(.*?)\]/s, formattedTags);

  if (updatedContent !== content) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    filesModified++;
  }
}

console.log(`Updated tags across ${filesModified} blog posts.`);
