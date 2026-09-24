const fs = require('fs');
const path = require('path');

const seoDescMap = {
  "best-4k-smart-tv-under-25000-india.mdx": "₹25,000 ke budget mein best 4K Ultra HD Smart TV kaun sa hai? 43-inch screen, Dolby Vision HDR aur Google TV wale top 4 picks reviewed.", // 139 chars
  "best-smartphones-under-15000.mdx": "₹15,000 ke budget mein best 5G phone kaun sa hai? 6000mAh battery, 120Hz display aur OIS camera wale top 5 phones ka in-depth comparison.", // 138 chars
  "best-vs-code-extensions-2026.md": "Visual Studio Code ko supercharge karein! Web developers ke liye 12 must-have extensions, settings.json setup aur shortcuts guide.", // 131 chars
  "chatgpt-canvas-kya-hai-hindi-guide.md": "OpenAI ChatGPT Canvas feature kya hai aur ise writing & coding mein kaise use karein? Side-by-side editing interface aur Claude comparison.", // 139 chars
  "javascript-roadmap-hindi.md": "JavaScript shuru se advance tak kaise sikhein? Modern ES6+, DOM manipulation, Async/Await aur frontend developer banne ka complete roadmap.", // 139 chars
  "lm-studio-vs-ollama-offline-ai-comparison-hindi.md": "Apne PC par DeepSeek aur Llama 3 offline kaise chalayein? LM Studio (GUI) vs Ollama (CLI) comparison aur RAM/VRAM setup guide.", // 128 chars
  "mesh-wifi-vs-range-extender-difference-hindi.md": "Wi-Fi dead zones aur slow speed se kaise bachein? Mesh Wi-Fi System vs Range Extender ka complete technical comparison aur buyer guide.", // 137 chars
  "python-vs-rust-backend-ai-comparison-2026.md": "2026 mein Python vs Rust mein se kya sikhein? Backend performance, memory safety, GIL-free Python 3.13 aur career roadmap comparison.", // 134 chars
  "smartwatch-health-sensor-accuracy-reality-check.md": "Smartwatch Heart Rate aur SpO2 sensors kitne accurate hote hain? PPG optical sensor mechanism aur medical pulse oximeter se real comparison.", // 141 chars
  "top-free-ai-photo-editing-tools-2026.md": "Photo background remove karna ya low-res photo ko 4K mein convert karna? 2026 ke top 5 free AI photo editing tools ka complete review.", // 137 chars
  "typescript-roadmap-beginners-guide-hindi.md": "TypeScript sikhna kyu zaroori hai? JavaScript vs TypeScript comparison, TSConfig setup aur Next.js integration ka beginner roadmap." // 133 chars
};

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
let count = 0;

for (const [file, seoDesc] of Object.entries(seoDescMap)) {
  const filePath = path.join(blogDir, file);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');

  if (/^seoDescription:/m.test(content)) {
    content = content.replace(/^seoDescription:.*$/m, `seoDescription: '${seoDesc}'`);
  } else {
    content = content.replace(/^(description:.*)$/m, `$1\nseoDescription: '${seoDesc}'`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  count++;
}

console.log('Successfully updated', count, 'descriptions with optimized seoDescription!');
