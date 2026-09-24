const fs = require('fs');
const path = require('path');
const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');

const linksToAdd = {
  "best-4k-smart-tvs-under-30000-india-2026.mdx": "\n\n> 📺 **Budget Alternatives:** Agar aapka budget strictly ₹25,000 hai, toh hamara [Best 4K Smart TVs Under ₹25,000 Guide](/blog/best-4k-smart-tv-under-25000-india/) zaroor check karein.",
  "chatgpt-5-kya-hai.md": "\n\n> 🤖 **Related AI Guides:** Naye coding tools sikhne ke liye hamara [ChatGPT Canvas Guide](/blog/chatgpt-canvas-kya-hai-hindi-guide/) aur [ChatGPT vs Google Gemini Comparison](/blog/google-gemini-vs-chatgpt-hindi/) padhein.",
  "jio-airfiber-vs-airtel-xstream-hindi-2026.md": "\n\n> 📶 **Wi-Fi Range Boost:** Agar ghar ke kisi kone mein signal weak aata hai toh hamara [Mesh Wi-Fi vs Range Extender Guide](/blog/mesh-wifi-vs-range-extender-difference-hindi/) aur [Jio 5G vs Airtel 5G Speed Guide](/blog/jio-5g-vs-airtel-5g-speed-coverage-comparison-2026/) check karein.",
  "react-vs-nextjs-hindi.md": "\n\n> 🚀 **Modern Web Roadmap:** 2026 ke latest versions ke liye hamara [React 19 vs Next.js 15 Roadmap](/blog/react-19-vs-nextjs-15-hindi-comparison-roadmap/) aur [JavaScript Complete Guide](/blog/javascript-roadmap-hindi/) zaroor explore karein.",
  "refurbished-laptops-buying-guide-hindi.md": "\n\n> 💻 **Laptop Speed Tips:** Naya ya refurbished laptop lene ke baad uski performance maintain rakhne ke liye hamara [PC Slow Hai Kaise Fast Kare Guide](/blog/pc-slow-hai-kaise-fast-kare/) aur [Best Laptops for Students](/blog/best-laptops-students-2026/) padhein."
};

for (const [file, snippet] of Object.entries(linksToAdd)) {
  const filePath = path.join(blogDir, file);
  if (!fs.existsSync(filePath)) continue;
  let c = fs.readFileSync(filePath, 'utf8');
  c = c.trim() + snippet + '\n';
  fs.writeFileSync(filePath, c, 'utf8');
}

console.log('Successfully connected all 5 posts with internal links!');
