const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');

const expansions = {
  "aadhaar-biometrics-lock-unlock-maadhaar-guide.md": `
## 🔍 Aadhaar Biometric Lock vs Masked Aadhaar vs Virtual ID (VID)

Aam logon mein aksar confusion rehta hai ki UIDAI ke in teeno security features mein kya farak hai aur kab kaun sa use karna chahiye:

| Feature | Kya Secure Karta Hai? | Kab Use Karein? | Kya OTP Aayega? |
| :--- | :--- | :--- | :--- |
| **Biometric Lock** | Fingerprints aur Eye (Iris) Scan | Rozana hamesha ON rakhein | Haan, mobile OTP 100% normal kaam karta hai. |
| **Masked Aadhaar** | Pehle 8-digits chhupe hote hain (\`xxxx xxxx 1234\`) | Hotel check-in, travel ya identity proof submit karte waqt | Haan, legal identity proof ke roop mein 100% valid hai. |
| **Virtual ID (VID)** | 16-digit temporary random code | Cyber cafe ya online KYC forms bharte waqt | Haan, asli 12-digit number share karne ki zaroorat nahi padti. |

---

## ⚠️ AePS (Aadhaar Enabled Payment System) Fraud Se Bachne Ka Ekmatra Ilaj

Pichle kuch mahino mein poore desh mein **AePS Fingerprint Cloning Scams** ke kai mamle samne aaye hain:
* Registry office ya land purchase documents se publically available fingerprints ke silicone clones banaye jaate hain.
* In fake clones se chor micro-ATMs ya CSP centres se bina kisi OTP ke bank se rozana ₹10,000 tak cash nikal lete hain.
* **Bachne Ka Tarika:** Agar aapka biometric lock ON hai, toh AePS transaction instantly reject ho jata hai kyunki UIDAI server authentication request ko block kar deta hai.

---

## ❓ Frequently Asked Questions (Biometric Security)

* **Kya biometric lock hone ke baad ration ya PDS milne mein problem aayegi?**
  Haan, agar aap biometric ration claim karte hain, toh dukaan par biometric authenticate karne se 5 minute pehle mAadhaar app se 'Temporary Unlock' karein. Kaam hone ke 10 minute baad system dobara lock ho jayega.
* **Kya biometric lock lagane ke baad naya bank account khul sakta hai?**
  Naya account kholte waqt biometric unlock karna mandatory hota hai, ya fir aap OTP-based Video KYC (V-KYC) ka rasta chun sakte hain jisme fingerprint ki zaroorat nahi padti.
`,

  "docker-compose-vs-kubernetes-beginners-guide.md": `
## 📊 Feature by Feature Detailed Comparison Matrix

Agar aap production architecture design kar rahe hain, toh in dono tools ke core technical difference ko samajhna behad zaroori hai:

| Technical Feature | Docker Compose | Kubernetes (K8s) |
| :--- | :--- | :--- |
| **Architecture Scope** | Single Host (Single VPS ya Laptop) | Multi-Node Cluster (Dozens/Hundreds of Servers) |
| **Auto-Scaling (HPA)** | ❌ Manual (\`docker compose up --scale\`) | ✅ Built-in Horizontal Pod Autoscaler based on CPU/RAM |
| **Self-Healing** | Limited (\`restart: always\`) | ✅ Advanced (Liveness/Readiness probes, automatic pod restarts) |
| **Traffic Load Balancing** | Host port mapping ya Nginx reverse proxy | ✅ Built-in Internal Service mesh & Ingress controllers |
| **Secret Management** | \`.env\` files ya local volume binds | ✅ Native encrypted K8s Secrets & ConfigMaps |
| **Production Cost** | Extremely low (Starts from ₹400/month VPS) | Medium to High (Managed EKS/GKE cluster minimum ₹5,000+/mo) |
| **Learning Curve** | 1 Se 2 Din (Super Beginner Friendly) | 2 Se 4 Mahine (Enterprise Level Complexity) |

---

## 💡 Real-World Production Scenarios: Kab Kya Chunna Chahiye?

1. **Docker Compose Kab Best Hai?**
   * **Side Projects & Freelance MVPs:** Agar aap Next.js frontend, Node.js backend aur PostgreSQL database run kar rahe hain jisme daily 10k-50k users aate hain, toh ek single 4GB RAM wale Hetzner ya DigitalOcean droplet par Docker Compose rock-solid chalta hai.
   * **Staging & Local CI/CD:** Developers ki local machine par exact replica database aur cache spin up karne ke liye Compose se tez koi tool nahi hai.

2. **Kubernetes Kab Zaroori Ho Jata Hai?**
   * **Zero Downtime Deployments:** Jab aap din mein 10 baar production deploy karte hain aur ek second ke liye bhi traffic break nahi hona chahiye (Canary / Blue-Green deployments).
   * **Multi-Cloud High Availability:** Agar AWS ka ek poora data center down ho jaye, toh K8s automatically doosre availability zone mein pods migrate kar deta hai.
`,

  "python-vs-rust-backend-ai-comparison-2026.md": `
## ⚡ Deep Technical Benchmarks: Python vs Rust (2026 Reality)

Backend engineering aur High-Performance AI pipelines mein in dono languages ka combination aaj kal industry standard ban chuka hai:

| Metric / Benchmark | Python 3.13 (Free-Threaded) | Rust 1.80+ (Native Code) |
| :--- | :--- | :--- |
| **Execution Speed** | Interpreted bytecode (~10x - 40x slower) | Compiled to bare-metal binary (C/C++ equivalent speed) |
| **Memory Footprint** | Dynamic heap allocation (~50MB - 200MB baseline) | Zero-cost abstractions (~5MB - 15MB microservice) |
| **Concurrency Model** | Asyncio + Optional Experimental No-GIL | Fearless native OS threads + Tokio async runtime |
| **Type Safety** | Dynamic Typing with optional Type Hints | Strict Compile-time type system with Borrow Checker |
| **Development Speed** | 🚀 Ultra Fast (1 ghante mein API ready) | ⏳ Moderate (Compiler errors solve karne mein time lagta hai) |
| **Ecosystem Maturity** | AI, Data Science, Pandas, PyTorch ka undisputed king | Systems programming, Cryptography, High-frequency trading |

---

## 🤝 PyO3 & Polars: Dono Ko Ek Sath Kaise Use Karte Hain?

Modern tech companies ab "Python vs Rust" ke bajaye **"Python + Rust"** approach follow kar rahi hain:
* **Polars DataFrame Library:** Pandas ke mukable 10x tezi se data process karti hai kyunki iska core engine 100% Rust mein likha gaya hai, lekin data scientists use Python syntax ke through hi call karte hain.
* **PyO3 Bindings:** Agar aapki Python web application mein koi CPU-heavy mathematical algorithm ya encryption function hai, toh aap use Rust mein likhkar Python module (.so / .pyd) ki tarah import kar sakte hain.

Is tarah aapko Python ki fast development speed aur Rust ki blazing raw performance dono ek sath mil jaati hain!
`,

  "chatgpt-canvas-kya-hai-hindi-guide.md": `
## 🎨 ChatGPT Canvas vs Claude Artifacts: Real Head-to-Head Comparison

AI workspaces ke field mein OpenAI Canvas aur Anthropic Claude Artifacts ke beech bohot tagda competition hai:

| Feature | ChatGPT Canvas (OpenAI) | Claude 3.5 Artifacts (Anthropic) |
| :--- | :--- | :--- |
| **Inline Targeted Edits** | ✅ Yes, kisi bhi particular line ko highlight karke modify karein | ❌ No, poora code block dobara re-generate hota hai |
| **Reading Level Slider** | ✅ Kindergarten se lekar Graduate level tak text simplify karein | ❌ Manual prompt instructions likhni padti hain |
| **Interactive UI Preview** | Limited to static code formatting | ✅ Live React, HTML/JS aur SVG rendering in browser |
| **Language Porting** | ✅ 1-Click Code Converter (Python, JS, C++, Go, PHP) | Manual prompt ke zariye code translate hota hai |
| **Version History** | ✅ Back & Forward revision slider available | ✅ Distinct artifact versions dropdown |

---

## 🛠️ Canvas Use Karne Ke 5 Pro Tips For Students & Coders

1. **Highlight Specific Bugs:** Poora file paste karne ke baad sirf us function ko select karein jisme error hai, aur popup mein **"Fix Bugs"** click karein.
2. **Add Inline Comments:** Agar aap naya code sikh rahe hain, toh sidebar slider se **"Add Code Comments"** select karein taaki har line ke sath Hindi explanation jud jaye.
3. **Change Document Length:** Lambe blog posts ya documentation ko short summary ya detailed technical report mein convert karne ke liye bottom-right slider use karein.
4. **Grammar & Tone Polish:** Academic research papers ko professional tone mein convert karne ke liye direct **"Polish Writing"** button dabayein.
`,

  "claude-3-7-sonnet-hybrid-reasoning-hindi-guide.md": `
## 🧠 Hybrid Reasoning Kya Hai Aur Yeh Dusre AI Models Se Alag Kyu Hai?

Pehle ke samay mein AI models do categories mein aate the:
* **Standard LLMs (GPT-4o, Claude 3.5):** Turant 1 second mein reply generate karte hain, lekin complex coding ya multi-step logic problems mein galat assumptions bana lete hain.
* **Pure Thinking Models (OpenAI o1, DeepSeek R1):** Har sawal par 15 se 40 seconds ka deep thinking time lete hain, jo aam text editing ya simple query ke liye bohot slow feel hota hai.

**Claude 3.7 Sonnet ne in dono ko ek sath combine karke 'Hybrid Reasoning' banaya hai:**
* Simple questions ke liye yeh instant standard speed par reply karta hai.
* Complex debugging, architecture design ya algorithmic math aane par yeh automatic internal thinking tokens allocate karta hai.
* Developer API ke zariye aap khud tay kar sakte hain ki model ko kitne seconds (e.g. 10s vs 60s) tak deep thinking mode mein run karna hai.

---

## 📊 Benchmark Reality: Claude 3.7 vs OpenAI o1 vs DeepSeek R1

| Evaluation Benchmark | Claude 3.7 Sonnet (Thinking) | OpenAI o1 | DeepSeek R1 |
| :--- | :--- | :--- | :--- |
| **SWE-bench Verified (Real Coding)** | **70.3% (World Record)** | 65.2% | 49.2% |
| **TAU-bench Retail (Agentic Tasks)** | **81.2%** | 72.8% | 65.0% |
| **Instruction Following (IFEval)** | **89.5%** | 85.0% | 83.2% |
| **Reasoning Visibility** | ✅ Fully Visible Thought Stream | ❌ Masked / Hidden Thinking | ✅ Fully Open Source Thoughts |
`,

  "gan-charger-kya-hai-best-fast-chargers-guide.md": `
## 🔬 Silicon vs GaN (Gallium Nitride): Physics Ka Asli Farak

Pichle 40 saalon se sabhi phone aur laptop adapters **Silicon transistors** par chal rahe the. Silicon ki ek physical limit hoti hai: jab usme se high electric current guzarta hai, toh wo bohot zyada garmi (heat) generate karta hai, jisse bachne ke liye chargers ko bada aur heavy banana padta tha.

**GaN (Gallium Nitride) Semiconductor Ke 4 Revolutionary Fayde:**
1. **Higher Bandgap (3.4 eV vs 1.1 eV):** GaN transistors Silicon ke mukable 1000x tezi se electricity conduct karte hain bina heat lose kiye.
2. **Compact Form Factor:** 65W ka GaN charger ek regular credit card ya matchbox ke size ka hota hai, jabki purana laptop charger heavy eent jaisa hota tha.
3. **Multi-Device Compatibility:** Ek single GaN charger mein 2 Type-C aur 1 USB-A port milte hain, jisse aap ek sath laptop, iPhone aur smartwatch charge kar sakte hain.
4. **Smart Power Distribution (Dynamic Wattage):** Agar aap 65W adapter mein laptop aur phone dono lagate hain, toh charger automatically laptop ko 45W aur phone ko 20W allocate kar deta hai.

---

## 🛒 Best GaN Chargers in India (2026 Buying Recommendations)

* **Daily Travel & Phones (33W - 45W):** Ambrane 33W Fast GaN Charger ya URBN 45W GaN (₹899 - ₹1,299).
* **MacBook Air & Thin Laptops (65W):** CMF by Nothing 65W GaN Charger ya Spigen ArcStation 65W (₹2,199 - ₹2,799).
* **Heavy Gaming Laptops (100W+):** Baseus GaN5 Pro 100W Multi-Port Desktop Charger (₹3,999).
`,

  "gemini-live-vs-chatgpt-advanced-voice-comparison.md": `
## 🎙️ Speech Latency Aur Voice Emotion: Real World Testing

Real-time audio AI mein sabse bada factor hota hai **Conversational Latency** (yaani aapke bolte hi model kitni jaldi interrupt samajhta hai aur response deta hai):

| Audio Feature | Google Gemini Live | ChatGPT Advanced Voice (GPT-4o) |
| :--- | :--- | :--- |
| **Average Response Latency** | ~250ms - 350ms (Ultra fast) | ~300ms - 450ms (Very natural) |
| **Accent & Hinglish Understanding** | 🏆 Best for Indian regional accents | Balanced international English |
| **Voice Interruptions (Barge-in)** | Smooth, bolte hi instant chup ho jata hai | Natural, breathing sounds ke sath pause leta hai |
| **Live Vision Integration** | ✅ Google Project Astra camera integration | Gradual rollout (Selected Plus users) |
| **Free Tier Availability** | ✅ Android Pixel & Samsung phones par free | Limited to 15-minute daily preview on free tier |

---

## 💡 Konsa Voice Assistant Kiske Liye Best Hai?

1. **Daily Commute & Multitasking:** Agar aap car chalate waqt ya earphones laga kar natural Hinglish mein queries solve karna chahte hain, toh Gemini Live ka Indian pronunciation aur fast internet integration sabse smooth feel hota hai.
2. **Language Learning & Mock Interviews:** Agar aap job interview ki English conversation practice ya voice acting ke emotions test kar rahe hain, toh ChatGPT Advanced Voice ke vocal inflections aur subtle laughs zyada human-like sound karte hain.
`,

  "git-merge-vs-rebase-difference-explained-hindi.md": `
## ⚠️ The Golden Rule of Git Rebase (Jo Har Developer Ko Pata Honi Chahiye)

Git Rebase ka sabse bada khatra yeh hai ki yeh **commit history ko rewrite karta hai** (purane commits ki SHA hash IDs badal jaati hain).

> 🚨 **NEVER REBASE A PUBLIC SHARED BRANCH!**
> Kabhi bhi \`main\`, \`master\` ya production shared branch par rebase na chalayein. Agar doosre developers ne purane commits ke upar naya code pull kiya hua hai, toh rebase chalane se unka local git tree corrupt ho jayega aur catastrophic merge conflicts aayenge.

### Kab Kaun Sa Command Run Karein? (Cheat Sheet)

* **Feature Branch Ko Update Rakhne Ke Liye:**
  \`\`\`bash
  git checkout my-feature-branch
  git fetch origin
  git rebase origin/main
  \`\`\`
* **Feature Branch Ko Main Mein Merge Karne Ke Liye:**
  \`\`\`bash
  git checkout main
  git merge --no-ff my-feature-branch
  \`\`\`

Is hybrid workflow se aapka feature branch clean rehta hai aur main repository par complete traceable merge commit history maintain hoti hai.
`,

  "google-gemini-vs-chatgpt-hindi.md": `
## 🔍 Ecosystem Integration: Android & Google Workspace vs Microsoft & Mac

Sirf AI intelligence kafi nahi hoti, daily workflow mein AI kahan fit hota hai wo sabse bada decision point hai:

| Integration Area | Google Gemini | OpenAI ChatGPT |
| :--- | :--- | :--- |
| **Google Drive & Docs** | Direct \`@Google Drive\` tag karke private docs search karein | Manual file upload karni padti hai |
| **YouTube Video Analysis** | YouTube link paste karke video ki instant timestamp summary | Transcription plugins ya 3rd party tools zaroori |
| **Google Maps & Flights** | Real-time Indian flight status aur route optimization | General web search ke zariye approximate data |
| **Custom GPTs Ecosystem** | Gems feature available (Basic) | 🏆 Thousands of specialized Custom GPTs in GPT Store |
| **Coding IDE Integration** | Android Studio integration | GitHub Copilot aur Cursor AI direct integration |

Agar aapka poora din Gmail, Google Calendar, YouTube aur Android phone ke sath gujarta hai, toh Gemini aapke ecosystem ka natural extension hai. Agar aap dedicated coder ya independent writer hain, toh ChatGPT ke GPT store aur Canvas tools zyada versatile hain.
`,

  "lm-studio-vs-ollama-offline-ai-comparison-hindi.md": `
## 💻 Minimum Hardware Requirements For Offline AI (RAM vs Model Size)

Apne PC par local LLM run karne se pehle yeh confirm karna zaroori hai ki aapka system us model ko fit kar sakta hai ya nahi:

| Model Parameter Size | Minimum Unified RAM / VRAM | Recommended Models | Performance on 8GB RAM Laptop |
| :--- | :--- | :--- | :--- |
| **1B to 3B Parameters** | 4GB - 6GB RAM | Llama 3.2 3B, Qwen 2.5 1.5B | 🚀 Super Fast (30+ tokens/sec) |
| **7B to 8B Parameters** | 8GB - 16GB RAM | DeepSeek-R1-Distill-7B, Mistral 7B | ✅ Smooth on M1/M2 Mac ya RTX 3060 |
| **14B to 32B Parameters** | 16GB - 32GB RAM | Qwen 2.5 14B, DeepSeek 14B | ⚠️ Needs Dedicated 12GB+ GPU |
| **70B Parameters** | 48GB - 64GB RAM | Llama 3 70B (Quantized Q4) | 🛑 High-end workstation only |

---

## 🚀 Quick Ollama CLI Commands Cheat Sheet

* Naya model download aur run karne ke liye:
  \`\`\`bash
  ollama run deepseek-r1:8b
  \`\`\`
* Apne installed models ki list dekhne ke liye:
  \`\`\`bash
  ollama list
  \`\`\`
* Kisi model ko memory se delete karke disk space khali karne ke liye:
  \`\`\`bash
  ollama rm deepseek-r1:8b
  \`\`\`
`,

  "mesh-wifi-vs-range-extender-difference-hindi.md": `
## 📶 Handover Roaming Reality: Extender Kyu Fail Ho Jaata Hai?

Jab aap Wi-Fi Range Extender use karte hain, toh ghar mein do alag-alag network ban jaate hain:
* Living Room: \`Home_WiFi\`
* Bedroom: \`Home_WiFi_EXT\`

Jab aap drawing room se bedroom mein chal kar aate hain, toh aapka smartphone aakhri dum tak purane weak network se chipka rehta hai jab tak signal 0% na ho jaye. Nateeja yeh hota hai ki WhatsApp call ya Zoom meeting achanak cut ho jaati hai.

**Mesh Wi-Fi Ka Seamless 802.11k/v/r Roaming Protocol:**
Mesh system mein poore ghar mein ek hi single Wi-Fi name (SSID) hota hai. Jaise hi aap room change karte hain, mesh routers millisecond ke fraction mein aapke phone ko bina call disconnect kiye nazdiki node par handoff kar dete hain.

### Cost vs Value Guide (India 2026):
* **Single Room Extender:** TP-Link TL-WA850RE (₹1,199) — Sirf basic study table par network lane ke liye.
* **2-3 BHK Flat Mesh System:** TP-Link Deco M4 (2-Pack ₹5,499) ya Tenda Nova MW6 — Multi-floor aur zero buffer streaming ke liye.
`,

  "smartwatch-health-sensor-accuracy-reality-check.md": `
## 🩺 PPG Optical Sensor Kaise Kaam Karta Hai?

Smartwatch ke piche lagi green aur red LEDs ko **Photoplethysmography (PPG)** sensor kaha jata hai:
* Green LEDs blood vessels par light flash karti hain.
* Dil ke har pump ke sath blood volume change hota hai aur light absorption badalti hai.
* Smartwatch ke algorithms is light reflection pattern se aapka Pulse (BPM) calculate karte hain.

### Consumer Smartwatch Kahan Galat Ho Jaati Hai?
1. **Skin Tone & Arm Hair:** Darker skin pigments aur body hair light reflection ko distort karte hain, jisse readings 5-10% fluctuate ho sakti hain.
2. **Wrist Movement & Loose Fit:** Daudte waqt ya gym mein agar strap thoda bhi loose hai, toh ambient light enter kar jaati hai jisse fake spikes aate hain.
3. **Medical Grade Pulse Oximeter Difference:** Hospital ka finger probe blood vessels ko dono sides se clip karke dual-wavelength light scan karta hai, jo wrist sensors se bohot zyada calibrated hota hai.

---

## 💡 Health Tracking Ka Safe Rule
Smartwatch ko sirf **"Lifestyle Trend Tracker"** ki tarah use karein (jaise: kya pichle hafte ke mukable mera resting heart rate badh raha hai?). Kisi bhi medical decision, dava lene ya emergency diagnosis ke liye hamesha certified clinical medical equipment ka hi bharosa karein.
`,

  "typescript-roadmap-beginners-guide-hindi.md": `
## 🛠️ TypeScript Ke Top 3 Core Concepts Jo Har Beginner Ko Master Karne Hain

1. **Interfaces vs Type Aliases:**
   \`\`\`typescript
   // Interface: Object shapes aur class contracts ke liye best
   interface UserProfile {
     id: number;
     name: string;
     email: string;
     isVerified?: boolean; // Optional property
   }

   // Type Alias: Unions aur Primitives ke liye best
   type PaymentStatus = 'pending' | 'success' | 'failed';
   \`\`\`

2. **Generics (Reusable Component Functions):**
   Generics ke zariye aap aisi reusable functions bana sakte hain jo dynamic data types ke sath safe type checking provide karti hain:
   \`\`\`typescript
   function getFirstElement<T>(arr: T[]): T | undefined {
     return arr[0];
   }
   \`\`\`

3. **Strict Null Checks:**
   Apne \`tsconfig.json\` mein hamesha \`"strict": true\` rakhein. Isse production mein aane wale 90% \`TypeError: Cannot read properties of undefined\` bugs compile time par hi pakad mein aa jaate hain.
`,

  "whatsapp-passkeys-kya-hai-setup-guide-hindi.md": `
## 🛡️ Passkeys vs SMS OTP: Passkeys Cyber Attacks Se Kaise Bachati Hain?

Aam taur par hackers WhatsApp accounts hijack karne ke liye **SIM Swap Fraud** ya **Social Engineering Call Phishing** ka sahara lete hain jisme wo aapse 6-digit SMS OTP maangte hain.

**Passkeys (FIDO2 Standard) Ka Bulletproof Security Model:**
* Passkey system mein **koi password ya OTP generate hi nahi hota**.
* Aapke phone ke secure hardware chip (Secure Enclave / TPM) ke andar ek unique Private Key encrypt rehti hai.
* Jab aap WhatsApp open karte hain, toh aapka device aapke Face ID ya Fingerprint se private key unlock karta hai aur WhatsApp server ko cryptographically signed token bhejta hai.
* Koi bhi hacker duniya ke kisi bhi kone se chahe kitni bhi koshish kare, jab tak uske paas aapka physical phone aur aapka real fingerprint nahi hoga, wo aapka WhatsApp account transfer nahi kar sakta!
`,

  "best-laptops-students-2026.mdx": `
## 🎓 Student Laptops Buying Checklist: Galat Laptop Lene Se Kaise Bachein?

College students aksar flashy RGB lights ya stylish design dekhkar galat specs wala laptop le lete hain. Khareedne se pehle ye 4 non-negotiable specifications zaroor check karein:

1. **RAM Must Be Minimum 16GB:** 2026 mein Windows 11 aur Chrome browser akele 6GB RAM consume kar lete hain. 8GB RAM wala laptop agle 2 saal mein lag hone lagega. Hamesha 16GB LPDDR5 ya upgradable slot wala model hi lein.
2. **Display Quality (FHD IPS vs TN Panel):** Cheap laptops mein sasta TN panel diya jata hai jisme viewing angles kharab hote hain aur aankhon par strain padta hai. Make sure display IPS level ka ho aur minimum 300 nits brightness ho.
3. **SSD Storage (NVMe PCIe Gen 4):** Traditional mechanical hard drives (HDD) ab outdated hain. Fast boot aur instant app loading ke liye minimum 512GB NVMe SSD hona anivarya hai.
4. **Battery Life (Minimum 6-8 Hours):** Library ya classroom mein charging point milna har waqt possible nahi hota, isliye 50Whr se badi battery aur Type-C PD charging support check karein.
`
};

let updated = 0;

for (const [file, addition] of Object.entries(expansions)) {
  const filePath = path.join(blogDir, file);
  if (!fs.existsSync(filePath)) {
    console.warn('File not found:', file);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // Find where related articles or end of content begins
  const relatedMatch = content.match(/(\n###? [^\n]*Related Articles[^\n]*[\s\S]*$)/i);
  if (relatedMatch) {
    const insertIndex = content.lastIndexOf(relatedMatch[1]);
    content = content.slice(0, insertIndex) + '\n' + addition.trim() + '\n\n' + content.slice(insertIndex);
  } else {
    content = content.trim() + '\n\n' + addition.trim() + '\n';
  }

  fs.writeFileSync(filePath, content, 'utf8');
  updated++;
}

console.log('Successfully deepened', updated, 'thin posts!');
