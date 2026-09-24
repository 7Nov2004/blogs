const fs = require('fs');
const path = require('path');

const seoTitlesMap = {
  "5g-phone-battery-drain-problem-solution.md": "5G Phone Battery Drain Problem? 8 Best Fixes (2026)",
  "best-4k-smart-tv-under-25000-india.mdx": "Best 4K Smart TVs Under ₹25,000 in India (2026 Picks)",
  "best-4k-smart-tvs-under-30000-india-2026.mdx": "Best 4K Smart TVs Under ₹30,000 in India (2026 Guide)",
  "best-5g-smartphones-under-20000-india-2026.mdx": "Best 5G Phones Under ₹20,000 in India (2026 Top Picks)",
  "best-anc-earbuds-under-3000-india-2026.mdx": "Best ANC Earbuds Under ₹3,000 in India (2026 Guide)",
  "best-camera-phones-under-20000-india-2026.md": "Best Camera Phones Under ₹20,000 (2026 Top 5 OIS Picks)",
  "best-ergonomic-office-chairs-under-7000-india.mdx": "Best Ergonomic Chairs Under ₹7,000 in India (2026)",
  "best-gaming-earbuds-under-1500-india.mdx": "Best Gaming Earbuds Under ₹1,500 in India (2026 Guide)",
  "best-gaming-headphones-under-2000.mdx": "Best Gaming Headphones Under ₹2,000 in India (2026)",
  "best-mechanical-keyboards-under-3000.mdx": "Best Mechanical Keyboards Under ₹3,000 (2026 Guide)",
  "best-smartphones-under-15000.mdx": "Best 5G Phones Under ₹15,000 (2026 Value Picks)",
  "best-tablets-for-students-under-20000-india.mdx": "Best Tablets for Students Under ₹20,000 (2026 Picks)",
  "best-vs-code-extensions-2026.md": "Top 12 VS Code Extensions for Faster Coding (2026)",
  "chatgpt-5-kya-hai.md": "ChatGPT 5 Kya Hai? 7 Hidden Powers & Features (2026)",
  "chatgpt-canvas-kya-hai-hindi-guide.md": "ChatGPT Canvas Kya Hai? Complete Guide (2026)",
  "chatgpt-se-paise-kaise-kamaye.md": "ChatGPT Se Paise Kaise Kamayein? 8 Real Ways (2026)",
  "chatgpt-search-vs-google-search-hindi-comparison.md": "ChatGPT Search vs Google Search (2026 Comparison)",
  "claude-3-5-sonnet-vs-chatgpt-4o-hindi.md": "Claude 3.5 Sonnet vs ChatGPT-4o (2026 Comparison)",
  "claude-3-7-sonnet-hybrid-reasoning-hindi-guide.md": "Claude 3.7 Sonnet Kya Hai? Hybrid Reasoning Guide (2026)",
  "croma-iphone-17-pro-discount-offers-2026.mdx": "Croma iPhone 17 Pro Discount & Sale Offers (2026)",
  "cursor-vs-copilot-best-ai-coding-assistant.md": "Cursor AI vs GitHub Copilot (2026 Best AI Assistant)",
  "deepseek-locally-windows-11-ollama-guide.md": "DeepSeek Windows 11 Par Locally Kaise Chalaye (2026)",
  "deepseek-vs-chatgpt-hindi-comparison.md": "DeepSeek vs ChatGPT: 2026 Kaun Zyada Smart Hai?",
  "docker-beginners-guide-hindi-web-development.md": "Docker Kya Hai aur Kaise Kaam Karta Hai? (2026 Guide)",
  "freelancing-se-paise-kaise-kamaye.md": "Freelancing Se Paise Kaise Kamayein? (2026 Roadmap)",
  "full-stack-developer-kaise-bane-2026-roadmap.md": "Full Stack Developer Kaise Bane? (2026 Roadmap)",
  "gemini-live-vs-chatgpt-advanced-voice-comparison.md": "Gemini Live vs ChatGPT Voice (2026 AI Comparison)",
  "git-and-github-beginners-guide-hindi.md": "Git & GitHub Complete Guide in Hindi (2026 Tutorial)",
  "git-merge-vs-rebase-difference-explained-hindi.md": "Git Merge vs Rebase Farak: Kab Kya Use Karein? (2026)",
  "git-push-rejected-error-solution-hindi.md": "Git Push Rejected Error Kaise Fix Karein? (2026)",
  "google-drive-storage-full-kaise-khali-kare-tips.md": "Google Drive Storage Full? 5 Free Space Tips (2026)",
  "google-gemini-vs-chatgpt-hindi.md": "Google Gemini vs ChatGPT (2026 India Comparison)",
  "google-notebooklm-audio-overview-hindi-guide-2026.md": "Google NotebookLM Audio Overview Guide (2026)",
  "google-notebooklm-kya-hai-students-guide.md": "Google NotebookLM Kya Hai? Students Study Guide (2026)",
  "html-css-guide-hindi.md": "HTML & CSS Kya Hai? Web Dev Beginner Guide (2026)",
  "ios-27-release-date-in-india-eligible-devices-features.md": "iOS 27 India Release Date, Devices & Features (2026)",
  "iphone-18-pro-features-price-india-2026.md": "iPhone 18 Pro Price, Features & India Launch (2026)",
  "jio-5g-vs-airtel-5g-speed-coverage-comparison-2026.md": "Jio 5G vs Airtel 5G: Kaunsa SIM Best Hai? (2026)",
  "jio-airfiber-vs-airtel-xstream-hindi-2026.md": "Jio AirFiber vs Airtel Xstream (2026 Comparison)",
  "jio-true-5g-unlimited-not-working-problem-solution.md": "Jio True 5G Unlimited Not Working? Fast Fix (2026)",
  "jio-vs-airtel-vs-bsnl-plans-comparison-2026.md": "Jio vs Airtel vs BSNL: Best Recharge Plans (2026)",
  "lm-studio-vs-ollama-offline-ai-comparison-hindi.md": "LM Studio vs Ollama: PC Par Offline AI (2026 Guide)",
  "machine-learning-kya-hai-hindi.md": "Machine Learning Kya Hai? Simple Hindi Guide (2026)",
  "mesh-wifi-vs-range-extender-difference-hindi.md": "Mesh Wi-Fi vs Range Extender: Kaunsa Le? (2026)",
  "perplexity-ai-kya-hai-hindi-guide-2026.md": "Perplexity AI Kya Hai? Google Se Better Search (2026)",
  "phone-battery-life-tips-hindi.md": "Phone Battery Life Kaise Badhayein? 12 Tips (2026)",
  "phone-chori-hone-par-kya-kare-ceir-portal-hindi.md": "Phone Chori Ho Gaya? CEIR Se Block Kaise Karein (2026)",
  "phone-fast-charging-nahi-ho-rahi-problem-solution.md": "Phone Fast Charging Not Working? 7 Best Fixes (2026)",
  "phone-hack-hai-ya-nahi-kaise-pata-kare.md": "Phone Hack Hai Ya Nahi Kaise Pata Karein? (2026)",
  "phone-storage-space-running-out-hidden-system-fix.md": "Phone Storage Full Problem Fix (Gallery Khali Trick)",
  "python-vs-rust-backend-ai-comparison-2026.md": "Python vs Rust: Backend & AI Ke Liye Kaun Sa Sikhein?",
  "react-19-vs-nextjs-15-hindi-comparison-roadmap.md": "React 19 vs Next.js 15: Kaunsa Seekhein? (2026)",
  "redmi-note-17-pro-india-launch-specs-price.md": "Redmi Note 17 Pro India Launch, Specs & Price (2026)",
  "refurbished-laptops-buying-guide-hindi.md": "Refurbished Laptop Lene Ke 5 Zaruri Rules (2026 Guide)",
  "sim-swap-fraud-kya-hai-kaise-bachein.md": "SIM Swap Fraud Kya Hai Aur Kaise Bachein? (2026 Guide)",
  "smartwatch-health-sensor-accuracy-reality-check.md": "Smartwatch Heart Rate & SpO2 Accuracy Reality (2026)",
  "tailwind-css-complete-guide-hindi.md": "Tailwind CSS Complete Guide in Hindi (2026 Tutorial)",
  "telegram-part-time-job-scam-se-kaise-bachein.md": "Telegram Job Scam Kya Hai Aur Kaise Bachein? (2026)",
  "top-5-free-ai-tools-college-students.md": "Top 5 Free AI Tools for College Students (2026)",
  "top-free-ai-photo-editing-tools-2026.md": "Top 5 Free AI Photo Editing Tools (2026 Guide)",
  "top-free-ai-tools-students.md": "Top 10 Free AI Tools for Students (2026 Guide)",
  "top-free-ai-video-generators-youtube-reels.md": "Top 7 Free AI Video Generators for Reels (2026)",
  "typescript-roadmap-beginners-guide-hindi.md": "TypeScript Roadmap for Beginners (2026 Guide)",
  "upi-tap-pay-nfc-payment-kya-hai-2026.md": "UPI Tap Pay Kya Hai? NFC Payment Guide (2026)",
  "web-development-roadmap-college-students-2026.md": "Web Development Roadmap for Students (2026 Guide)",
  "whatsapp-delete-for-everyone-message-recovery-hindi.md": "WhatsApp Delete Messages Kaise Dekhein? (2026 Fix)",
  "whatsapp-new-features-2026-hindi.md": "WhatsApp Ke 12 Naye Hidden Features (2026 Guide)",
  "whatsapp-passkeys-kya-hai-setup-guide-hindi.md": "WhatsApp Passkeys Kya Hai? Setup Guide (2026)"
};

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
let updatedCount = 0;

for (const [file, seoTitle] of Object.entries(seoTitlesMap)) {
  const filePath = path.join(blogDir, file);
  if (!fs.existsSync(filePath)) {
    console.warn('File not found:', file);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if seoTitle already exists
  if (/^seoTitle:/m.test(content)) {
    content = content.replace(/^seoTitle:.*$/m, `seoTitle: '${seoTitle}'`);
  } else {
    // Insert after title
    content = content.replace(/^(title:.*)$/m, `$1\nseoTitle: '${seoTitle}'`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  updatedCount++;
}

console.log('Successfully updated', updatedCount, 'posts with optimized seoTitle!');
