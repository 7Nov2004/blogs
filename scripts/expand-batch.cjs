/**
 * Simplified batch expander — reads addition files and appends to articles
 */
const fs = require('fs');
const path = require('path');

const BLOG_DIR = 'src/content/blog';
const ADDS_DIR = 'scripts/article-additions';

// Create additions directory
if (!fs.existsSync(ADDS_DIR)) fs.mkdirSync(ADDS_DIR, { recursive: true });

// Map: filename -> addition file
const mapping = {
  'best-4k-smart-tvs-under-30000-india-2026.mdx': '4k-tvs-addition.md',
  'best-anc-earbuds-under-3000-india-2026.mdx': 'anc-earbuds-addition.md',
  'best-ergonomic-office-chairs-under-7000-india.mdx': 'ergonomic-chairs-addition.md',
  'best-laptops-students-2026.mdx': 'student-laptops-addition.md',
  'best-mechanical-keyboards-under-3000.mdx': 'mech-keyboards-addition.md',
  'docker-beginners-guide-hindi-web-development.md': 'docker-addition.md',
  'full-stack-developer-kaise-bane-2026-roadmap.md': 'fullstack-addition.md',
  'git-merge-vs-rebase-difference-explained-hindi.md': 'git-rebase-addition.md',
  'jio-5g-vs-airtel-5g-speed-coverage-comparison-2026.md': 'jio-airtel-5g-addition.md',
  'jio-true-5g-unlimited-not-working-problem-solution.md': 'jio-5g-fix-addition.md',
  'lm-studio-vs-ollama-offline-ai-comparison-hindi.md': 'lm-ollama-addition.md',
  'mesh-wifi-vs-range-extender-difference-hindi.md': 'mesh-wifi-addition.md',
  'phone-battery-life-tips-hindi.md': 'battery-tips-addition.md',
  'redmi-note-17-pro-india-launch-specs-price.md': 'redmi-note17-addition.md',
  'top-free-ai-tools-students.md': 'ai-tools-students-addition.md',
};

let expandCount = 0;
let skipCount = 0;

Object.entries(mapping).forEach(([article, addFile]) => {
  const articlePath = path.join(BLOG_DIR, article);
  const addPath = path.join(ADDS_DIR, addFile);

  if (!fs.existsSync(articlePath)) {
    console.log(`SKIP (not found): ${article}`);
    skipCount++;
    return;
  }

  if (!fs.existsSync(addPath)) {
    console.log(`SKIP (no addition file): ${addFile}`);
    skipCount++;
    return;
  }

  const articleContent = fs.readFileSync(articlePath, 'utf8');
  const addition = fs.readFileSync(addPath, 'utf8');
  const updated = articleContent.trimEnd() + '\n\n' + addition.trim() + '\n';
  fs.writeFileSync(articlePath, updated);

  // Quick word count
  const body = updated.replace(/^---[\s\S]*?---/, '').trim();
  const words = body.replace(/```[\s\S]*?```/g, '').replace(/[#*`|>\[\]]/g, '').split(/\s+/).filter(w => w.length > 1).length;
  console.log(`EXPANDED: ${article} -> ${words} words`);
  expandCount++;
});

console.log(`\nExpanded: ${expandCount} | Skipped: ${skipCount}`);

// Fix remaining long descriptions
const DESC_FIXES = {
  'call-recording-announcement-band-kaise-kare-google-dialer-fix.md': 'Google Dialer call recording announcement band kaise karein 2026 mein — working methods, alternative recorder apps aur India mein legal call recording rules.',
  'chatgpt-canvas-kya-hai-hindi-guide.md': 'ChatGPT Canvas kya hai aur kaise use karein — documents, code editing aur collaborative writing ke liye complete beginner Hindi guide.',
  'git-push-rejected-error-solution-hindi.md': 'Git push rejected error kaise fix karein — authentication failure, non-fast-forward error aur permission denied problems ka step-by-step Hindi solution.',
  'python-vs-rust-backend-ai-comparison-2026.md': 'Python vs Rust backend comparison 2026 — AI/ML, web APIs aur systems programming ke liye kaunsi language better hai, complete Hindi mein.',
};

let descFixed = 0;
Object.entries(DESC_FIXES).forEach(([filename, newDesc]) => {
  const filepath = path.join(BLOG_DIR, filename);
  if (!fs.existsSync(filepath)) return;
  let content = fs.readFileSync(filepath, 'utf8');
  const updated = content.replace(/description:\s*['"][^'"]*['"]/i, `description: "${newDesc}"`);
  if (updated !== content) {
    fs.writeFileSync(filepath, updated);
    console.log(`DESC FIXED: ${filename}`);
    descFixed++;
  }
});
console.log(`Descriptions fixed: ${descFixed}`);

// Final verification
console.log('\n=== FINAL VERIFICATION ===');
const files = fs.readdirSync(BLOG_DIR);
let thin = 0, longDesc = 0, shortDesc = 0;
const issues = [];

files.forEach(f => {
  const content = fs.readFileSync(path.join(BLOG_DIR, f), 'utf8');
  const fm = (content.match(/^---[\s\S]*?---/) || [''])[0];
  const body = content.replace(/^---[\s\S]*?---/, '').trim();
  const words = body.replace(/```[\s\S]*?```/g, '').replace(/[#*`|>\[\]]/g, '').split(/\s+/).filter(w => w.length > 1).length;
  const dm = fm.match(/description:\s*['"]([^'"]+)['"]/);
  const desc = dm ? dm[1] : '';
  const fileIssues = [];
  if (words < 700) { thin++; fileIssues.push(`THIN(${words}w)`); }
  if (desc.length > 160) { longDesc++; fileIssues.push(`LONG_DESC(${desc.length}c)`); }
  if (desc.length > 0 && desc.length < 30) { shortDesc++; fileIssues.push(`SHORT_DESC(${desc.length}c)`); }
  if (fileIssues.length > 0) issues.push(`  ${f}: ${fileIssues.join(', ')}`);
});

if (issues.length > 0) {
  console.log('Remaining issues:');
  issues.forEach(i => console.log(i));
} else {
  console.log('ALL CLEAR — Zero issues!');
}
console.log(`Thin: ${thin} | Long Desc: ${longDesc} | Short Desc: ${shortDesc}`);
