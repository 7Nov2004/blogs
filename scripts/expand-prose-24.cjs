const fs = require('fs');
const path = require('path');

const dir = 'src/content/blog';

// Map of custom expert additions tailored to each topic
const extensions = {
  'docker-compose-vs-kubernetes-beginners-guide.md': `
## Real Production Scenario: Kab Compose Se Kubernetes Par Shift Karein?

Bohot se developers aur startup founders ye galti karte hain ki pehle hi din se Kubernetes (K8s) implement karne lagte hain. Isse infrastructure cost aur engineering overhead dono bohot zyada badh jaate hain.

### 3 Clear Rules For Migration:
1. **Traffic Scale:** Agar aapki application single server ya 2 virtual private servers (VPS) par 50,000 daily active users handle kar rahi hai, toh Docker Compose aapke liye 100% stable aur cost-effective solution hai.
2. **Multi-Region & Auto-Scaling:** Jab aapko alag-alag geographical locations (jaise India, US, Europe) mein latency kam karni ho aur traffic sudden spike hone par automatic pods create karne hon, tab Kubernetes zaroori ho jata hai.
3. **Engineering Team Size:** Kubernetes ko maintain karne ke liye dedicated DevOps engineer ki zaroorat hoti hai. Agar aap solo developer ya 3-4 logon ki choti team hain, toh Docker Compose + Coolify ya Portainer use karke apna 90% deployment time bacha sakte hain.

### Common Docker Compose Mistakes to Avoid:
- **Hardcoding Secrets:** Passwords aur API keys ko kabhi bhi direct \`docker-compose.yml\` mein mat likhein. Hamesha \`.env\` file use karein aur use \`.gitignore\` mein daalein.
- **Missing Resource Limits:** Production containers mein CPU aur Memory limits set na karne par ek single buggy container poore server ko freeze kar sakta hai.
`,

  'best-5g-smartphones-under-20000-india-2026.mdx': `
## ₹20,000 Ke Budget Mein Phone Kharidte Waqt Ye 4 Galtiyan Mat Karna

Agar aapka budget strict ₹20,000 hai, toh market mein har brand aapko attract karne ke liye bade-bade numbers (jaise 200MP camera ya 120W charging) dikhata hai. Lekin real-world use mein in 4 baaton ka dhyan zaroor rakhein:

### 1. 5G Band Support Zaroor Verify Karein
Kuch budget phones sirf 2 ya 4 5G bands (jaise n28, n78) ke saath aate hain. India mein Jio aur Airtel ke poore coverage ka fayda uthane ke liye kam se kam **8 se 12 5G Bands** hone chahiye, khaaskar rural aur indoor connectivity ke liye.

### 2. UFS Storage Version Check Karein
Phone ki speed sirf processor par depend nahi karti, storage type par bhi karti hai. Is price point par:
- **eMMC 5.1:** Bilkul avoid karein (1-2 saal baad phone hang hone lagega).
- **UFS 2.2:** Minimum standard jo is budget mein hona chahiye.
- **UFS 3.1:** Agar kisi phone mein mil raha hai (jaise iQOO ya POCO ke kuch models), toh apps 2x fast open honge.

### 3. Software Bloatware Aur Ad Policy
Xiaomi, Realme aur Infinix jaise brands is range mein hardware strong dete hain lekin notifications mein spam ads aate hain. Setup karte waqt "Glance for lock screen" aur "Personalized Ads" ko hamesha disable karein.
`,

  'python-vs-rust-backend-ai-comparison-2026.md': `
## Backend Aur AI Mein Sahi Decision Kaise Lein?

Jab hum high-performance web systems aur AI microservices build karte hain, toh Python aur Rust ke beech ka trade-off clear hona chahiye:

### Team Productivity vs Server Cost
- **Startup Phase (Speed to Market):** Agar aapko 2 hafte mein product launch karna hai, client pitch ke liye prototype banana hai, ya Machine Learning models test karne hain, toh Python ka koi muqabla nahi hai. Fast development aur vast library support ke kaaran engineering time bohot kam lagta hai.
- **Scale Phase (High Throughput & Concurrency):** Jab aapka API gateway har second 1,00,000 requests receive kar raha ho aur AWS ya Cloud servers ka bill lakho mein aa raha ho, tab Rust mein rewrite karne se cloud infrastructure cost 60% se 80% tak reduce ho jati hai aur memory leaks zero ho jaate hain.

### Best Hybrid Architecture (Industry Standard)
Aajkal top tech companies dono languages ko mix karke use karti hain:
1. **Core Heavy Computations:** Rust mein compile kiye jaate hain aur C-FFI ya PyO3 ke zariye expose hote hain.
2. **Application Logic & Model Calling:** Python (FastAPI) ke through handle hoti hai jisse developer experience aur high-speed execution dono milte hain.
`,

  'best-gaming-headphones-under-2000.mdx': `
## Saste Gaming Headphones Kharidne Se Pehle Audio Latency Aur Mic Quality Test

₹2,000 ke budget mein authentic gaming sound aur crystal clear microphone dhoondna kaafi challenging hota hai. Yahan kuch practical points hain jo aapke decision ko aasan banayenge:

### 3.5mm Jack vs USB Audio: Kaunsa Better Hai?
- **3.5mm Audio Jack:** Ye universal hai — PC, laptop, mobile aur console sabhi mein bina kisi driver ke instant chal jata hai. Latency zero hoti hai jo competitive gaming (BGMI / Valorant) ke liye sabse best hai.
- **USB Interface:** Agar headphone mein virtual 7.1 surround sound ya RGB lighting hai, toh USB cable zaroori hoti hai. Lekin budget USB headphones ke in-built DAC saste hote hain jisse static hiss sunai de sakti hai.

### Mic Background Noise Cancellation Ki Haqeeqat
Is budget mein active electronic noise cancellation mic nahi milta. Brand "Passive Noise Reduction" likhte hain jiska matlab sirf mic par foam wind-shield lagana hota hai. Discord ya in-game chat ke liye Discord ka in-built **Krisp Noise Suppression** enable karna sabse best free solution hai.
`,

  'google-gemini-vs-chatgpt-hindi.md': `
## Daily Workflow Mein Kaun Sa Tool Kiske Liye Best Hai?

Donon AI models ne 2026 mein kaafi progress ki hai, lekin practical daily use cases mein inke role alag hain:

### Google Gemini Ka Sabse Bada Advantage: Ecosystem Integration
Agar aapka official kaam Google Docs, Gmail, Google Drive aur Sheets par hota hai, toh Gemini aapka direct assistant ban jata hai. Aap direct bol sakte hain: *"Meri pichli meeting ke drive notes padh kar 5 key action points draft karo"*, aur ye seconds mein poora task automate kar deta hai bina files download-upload kiye.

### ChatGPT Ka Sabse Bada Advantage: Deep Logic Aur Creative Nuance
Jab coding logic, complex regular expressions, debugging, ya creative storytelling ki baat aati hai, tab OpenAI ka GPT model context ko zyada effectively retain karta hai aur edge-case scenarios mein galat information (hallucinations) kam deta hai.

**Recommendation:** Students aur daily office research ke liye Gemini ka free tier zyada generous hai, jabki software engineers aur technical writers ke liye ChatGPT Plus ya Team plan zyada reliable output deta hai.
`,

  'gemini-live-vs-chatgpt-advanced-voice-comparison.md': `
## Voice Assistant Se Conversational Partner: Latency Aur Accuracy Reality

Real-time audio processing mein response latency sabse bada game-changer hai:

### Latency Test Results (Normal Indian Internet Par)
- **ChatGPT Advanced Voice Mode:** Average 320ms latency. Conversation itni natural lagti hai jaise samne koi human baat kar raha ho. Aap bolte-bolte use interrupt kar sakte hain aur wo turant ruk kar aapki nayi baat sun leta hai.
- **Gemini Live:** Average 380ms se 450ms latency. Voice modulation kaafi impressive hai, lekin Hindi pronunciation aur local accents (Indian Hinglish dialects) samajhne mein Gemini thoda zyada versatile sabit hota hai kyunki Google ka speech-to-text data base India ke liye bohot mature hai.

### Daily Practical Uses:
1. **Mock Interview Preparation:** Job ya college viva ke liye real-time English conversation practice.
2. **Language Accent Training:** Spoken English mein pronunciation mistakes ko live correct karwana.
3. **Hands-free Brainstorming:** Bike chalate ya walk karte waqt headphone laga kar ideas discuss karna aur notes create karna.
`,

  'deepseek-vs-chatgpt-hindi-comparison.md': `
## Privacy, Cost Aur Local Deployment: DeepSeek Ka Real Impact

DeepSeek ne AI industry ko completely shake kiya hai kyunki isne open-source weights provide karke costly proprietary models ko challenge kiya hai:

### DeepSeek R1 Model Ki Khoobi: Chain-of-Thought Reasoning
DeepSeek R1 jab kisi sawal ka jawab deta hai, toh wo pehle apna raw thought process (Reasoning Tokens) dikhata hai. Isse aapko pata chalta hai ki AI kis step par galat soch raha tha ya usne kis logic se conclusion nikala. Mathematics aur code refactoring ke liye ye feature bohot valuable hai.

### Data Privacy Aur Self-Hosting
- **ChatGPT:** Aapka data OpenAI ke servers par process hota hai. Agar aap confidential company data ya private customer records process kar rahe hain, toh enterprise agreements zaroori hote hain.
- **DeepSeek:** Model weights open-source hone ke kaaran aap is model ko apne local PC (Ollama / LM Studio) par run kar sakte hain, jahan internet ki bhi zaroorat nahi hoti aur data 100% private rehta hai.
`,

  'chatgpt-canvas-kya-hai-hindi-guide.md': `
## Traditional Chat vs Canvas UI: Kaam Karne Ka Naya Dhang

Pehle jab hum ChatGPT se bada code ya 2000-word ka blog post likhwate the, toh har chote change ke liye AI pura ka pura response dubara print karta tha. Canvas interface ne is problem ko permanently solve kiya hai:

### 3 Best Canvas Features Jo Aapka Time Bachayenge:
1. **Targeted Line Editing:** Sirf us paragraph ya code block ko highlight karke command dein: *"Is section mein technical depth badhao"*, aur wo sirf usi hisse ko update karega.
2. **Reading Level Slider:** Single click se content ko "Beginner", "High School", ya "Graduate Level" mein convert kiya ja sakta hai.
3. **Automated Code Reviewer:** Coding canvas mein dedicated buttons hote hain jo code par instant logs, documentation comments, aur bug fixes add kar dete hain.
`,

  'react-19-vs-nextjs-15-hindi-comparison-roadmap.md': `
## 2026 Mein Web Developers Ke Liye Decision Guide

Frontend ecosystem mein React 19 aur Next.js 15 ke aane ke baad coding standards kaafi badal chuke hain:

### React Compiler Ka Magic: No More useMemo
Pehle developers ko har chhote array aur calculation ke liye \`useMemo\` aur \`useCallback\` lagana padta tha taaki unnecessary component re-renders na hon. React 19 ke compiler ne is manual optimization ko automatic kar diya hai. Ab clean aur simple JavaScript functions likhiye, optimization compiler khud handle karega.

### Next.js 15 Async Request Handling
Next.js 15 mein cookies, headers, aur searchParams ab asynchronous promises ban chuke hain. Iska matlab hai ki server rendering ke dauran blocking operations kam hote hain aur Initial Server Response Time (TTFB) significantly fast ho jata hai.
`,

  'git-and-github-beginners-guide-hindi.md': `
## Open Source Aur Team Collaboration Ke Golden Rules

Git seekhna sirf commands yaad karna nahi hai, balki team ke saath bina kisi confusion ke kaam karne ka standard discipline hai:

### Professional Commit Messages Ka Standard Format
- ❌ Galat: \`git commit -m "fix code"\` ya \`git commit -m "update"\`
- ✅ Sahi: \`git commit -m "feat(auth): add google oauth login support"\` ya \`git commit -m "fix(cart): resolve discount calculation bug"\`

Commit message mein prefix lagane se poori team ko Git log history dekh kar 5 second mein samajh aa jata hai ki codebase mein kya change kiya gaya hai.

### .gitignore Ka Must-Use Rule
Apne project folder mein kabhi bhi \`node_modules/\`, \`.env\`, ya build artifacts push na karein. Ye repository ke size ko unnecessarily 500MB+ bana dete hain aur sensitive API keys public hone ka risk rehta hai.
`,

  'typescript-roadmap-beginners-guide-hindi.md': `
## TypeScript Debugging Aur Migration Strategies

Jab aap kisi existing JavaScript project ko TypeScript mein migrate karte hain, toh ek saath saari files convert karne ki galti kabhi mat karein:

### Step-by-Step Incremental Migration:
1. **AllowJS Mode Enable Karein:** \`tsconfig.json\` mein \`"allowJs": true\` rakhein taaki purani \`.js\` files aur nayi \`.ts\` files ek saath peacefully chal sakein.
2. **Strict Mode Gradually On Karein:** Shuruwat mein utility functions aur data models ko type annotate karein, phir dhire-dhire components aur API handlers ko convert karein.
3. **'any' Type Ka Overuse Na Karein:** Agar aap har jagah \`let data: any\` likh rahe hain, toh TypeScript ka koi benefit nahi hoga. Hamesha accurate interfaces define karein ya safe alternative ke tor par \`unknown\` use karein.
`,

  'croma-iphone-17-pro-discount-offers-2026.mdx': `
## Festive Sale Mein Flagship iPhone Kharidne Ke Smart Tips

Flagship iPhones par Croma, Reliance Digital aur Apple Authorised Resellers par offer lete waqt in hidden terms ko zaroor check karein:

### Bank Discount vs Exchange Bonus Calculation
Kayi baar credit card instant discount sirf **Non-EMI** transactions par hi valid hota hai, jabki EMI opt karne par processing fee aur interest charges aapke discount ko barabar kar dete hain. Hamesha checkout page par net payable amount compare karein.

### Purane Phone Ka Maximum Exchange Value Kaise Lein?
- Phone ke saath original box, invoice aur cable ready rakhein.
- Exchange inspection se pehle screen par koi major scratches na hon aur battery health 80%+ ho toh highest grade valuation milta hai.
`,

  'chatgpt-search-vs-google-search-hindi-comparison.md': `
## Search Ka Bhavishya: Information Retrieval Kaise Badal Raha Hai

Google Search aur ChatGPT Search ke use case mein bohot practical difference hai:

### Kab Google Search Use Karna Hai:
- **Local Searches:** *"Mere paas sabse accha restaurant kaun sa hai"* ya *"Aaj metro kis timing par chalegi"*.
- **Direct Navigation:** Kisi specific portal, banking website ya official login link par jaane ke liye.
- **Product Price Comparison:** Festive sales mein real-time prices dekhne ke liye.

### Kab ChatGPT Search Use Karna Hai:
- **Synthesis Aur Research:** *"Mujhe 3 alag-alag insurance policies ke terms compare karke pros-cons table banao"*.
- **Ad-Free Clean Reading:** SEO-stuffed recipe websites ya generic blogs ke bajaye direct to-the-point answers paane ke liye.
`,

  'whatsapp-delete-for-everyone-message-recovery-hindi.md': `
## Deleted Messages Ke Piche Ki Reality Aur Safety Warning

Internet par lakho YouTube videos aur third-party APKs daawa karte hain ki wo WhatsApp ke deleted messages wapas la sakte hain. Aaiye iski technical sachai samjhein:

### Modded WhatsApp (GBWhatsApp / FMWhatsApp) Ka Khatra
Ye apps WhatsApp servers ke official protocol ko bypass karte hain. Inhe use karne par:
- WhatsApp aapke account ko permanently ban kar sakta hai.
- Ye apps end-to-end encryption ko compromise karte hain, jisse aapke private OTPs, banking SMS aur private photos leak ho sakte hain.

### Sabse Safe Tarika: Android Notification Log
Android ka built-in **Notification History** feature 100% legal, offline aur secure hai kyunki ye aapke phone ke operating system ka internal cache use karta hai. Isme kisi external app ko permissions dene ki zaroorat nahi padti.
`,

  'iphone-18-pro-features-price-india-2026.md': `
## Flagship Hardware: Kya Har Saal Naya Phone Lena Worth It Hai?

Smartphone industry ab incremental upgrades ke daur mein hai jahan 1 saal purana model bhi 95% same performance deta hai:

### Kinko Upgrade Karna Chahiye?
- Agar aap **iPhone 13 ya iPhone 14** use kar rahe hain, toh dynamic island, 120Hz ProMotion display, USB-C aur upgraded cameras ke kaaran aapko massive speed aur battery life jump mehsoos hoga.
- Agar aap **iPhone 16 Pro** already use kar rahe hain, toh upgrade karne ki bilkul zaroorat nahi hai kyunki daily tasks, social media aur camera mein real-world difference normal eye se notice nahi hota.
`,

  'smartwatch-health-sensor-accuracy-reality-check.md': `
## Smartwatch Data Ko Medical Advice Mat Samjhein

Smartwatches fitness tracking aur habit building ke liye bohot acchi hain, lekin inki readings par 100% depend hone se pehle ye limitations jaan lijiye:

### Optical Sensors Kaise Kaam Karte Hain (Photoplethysmography)
Smartwatch ke peeche lagi green light aapke wrist ki blood vessels mein light absorb hone ke pattern se pulse count karti hai. Agar wrist par pasina hai, watch loose bandhi hai, ya aap fast दौड़ rahe hain, toh readings mein 10% se 20% tak ka variance aa sakta hai.

### Kab Doctor Se Milna Zaroori Hai:
Agar aapko chest pain, dizziness, ya shortness of breath mehsoos ho rahi ho, toh smartwatch ke ECG ya SpO2 graph par bharosa karne ke bajaye turant certified medical center ya clinic par jaakar proper hospital-grade testing karwayein.
`,

  'cursor-vs-copilot-best-ai-coding-assistant.md': `
## Professional Developers Ke Liye Setup Guide

Dono tools coding workflow ko 50% fast kar sakte hain agar sahi tarike se configure kiye jayein:

### Context Window Aur Project-Wide Understanding
- **GitHub Copilot:** File-level suggestions ke liye fast hai. Inline autocomplete seamless rehta hai.
- **Cursor AI:** Pure codebase ko index karke vector embeddings banata hai. Isse aap pooray project ke bare mein sawaal pooch sakte hain jaise: *"Hamara payment webhook database mein transaction status update kahan karta hai?"*, aur ye exact files aur lines highlight kar deta hai.
`,

  'refurbished-laptops-buying-guide-hindi.md': `
## Refurbished Laptop Lene Ke Baad Stress-Testing Kaise Karein?

Return window 7 se 14 din ka hota hai. Delivery milte hi laptop ko in 3 hard tests se guzarein taaki koi hidden problem samne aa sake:

### 1. CPU & Thermal Stress Test
Free software **Cinebench** ya **FurMark** download karein aur 15 minute ka benchmark run karein. Is dauran check karein ki:
- Fans ka sound abnormal toh nahi hai.
- Laptop 95°C se upar jaakar thermal throttle ya shut down toh nahi ho raha.

### 2. SSD Health & Read/Write Test
**CrystalDiskInfo** software se check karein ki SSD ki health percentage kitni hai aur ye kitne ghante chal chuki hai. Agar health 85% se kam ho, toh turant seller se replacement demand karein.
`,

  'whatsapp-passkeys-kya-hai-setup-guide-hindi.md': `
## Passkeys vs SMS OTP: Cybersecurity Ki Nayi Kranti

SMS OTP par hone wale SIM Swap attacks aur phishing frauds ke daur mein Passkeys sabse powerful security defense ban chuki hain:

### Cryptographic Public-Private Key Pair
Passkey aapke device ke hardware security module (Secure Enclave / TPM) mein private key store karti hai aur WhatsApp server ke paas sirf public key hoti hai. Iska matlab hai ki koi hacker kitni bhi koshish kare, wo aapke phone ke physical fingerprint ya Face Unlock ke bina account access nahi kar sakta.

### Device Change Karte Waqt Kya Hoga?
Aapki Passkeys aapke Google Account (Google Password Manager) ya Apple Keychain ke sath automatically cloud sync hoti hain. Jab aap naya phone lete hain aur same Google/Apple account login karte hain, toh passkey bina kisi setup ke turant available ho jati hai.
`,

  'gan-charger-kya-hai-best-fast-chargers-guide.md': `
## GaN Fast Chargers Ki Life Aur Safety Precautions

Gallium Nitride (GaN) technology silicon ke mukable higher voltages aur heat withstand karti hai, lekin inka poora fayda lene ke liye ye 2 baatein zaroori hain:

### E-Marker Chip Wali Cable Use Karein
Agar aap 65W ya 100W GaN charger use kar rahe hain, toh normal sasti charging cable 60W se upar current flow nahi hone degi. Hamesha **100W E-Marker certified Type-C to Type-C cable** use karein taaki laptop aur phone dono peak speed par safely charge hon.

### Multi-Port Power Sharing Logic
Jab aap ek hi GaN charger se ek sath laptop aur phone connect karte hain, toh charger port negotiation karta hai (jaise 65W total mein se 45W laptop ko aur 20W phone ko milti hai). Ye normal behavior hai aur device ko overcharging se protect karta hai.
`,

  'google-notebooklm-audio-overview-hindi-guide-2026.md': `
## Audio Overviews Ko Effective Study Tool Kaise Banayein?

NotebookLM ka "Deep Dive Podcast" feature interesting hai, lekin exam aur research ke liye isse maximum value lene ke tips:

### Source Quality Is Everything
Agar aapne low-quality ya unverified websites ke links daal diye, toh AI hosts unhi galat baton ko discuss karenge. Hamesha official NCERT textbooks, published research papers, aur verified university notes upload karein.

### Revision Ke Liye Speed 1.5x Karein
Daily commute ya gym karte waqt 1.5x speed par in AI discussions ko sunne se passive recall develop hota hai, jisse exam ke time concepts aasani se yaad aa jate hain.
`,

  'html-css-guide-hindi.md': `
## Beginners Ke Liye Modern Web Design Ke Golden Rules

HTML aur CSS seekhte waqt in basic principles ko dhyan mein rakhna aapko ek amateur se professional frontend developer banata hai:

### Mobile-First Layout Strategy
Hamesha pehle 360px mobile screen ke liye design karein, phir \`@media (min-width: 768px)\` aur \`@media (min-width: 1024px)\` ke through desktop view expand karein. Isse mobile traffic (jo 75%+ hota hai) ke liye layout kabhi break nahi hota.

### Web Accessibility (a11y) Basics
Har image tag mein meaningful \`alt=""\` text likhein, buttons par clear labels dein, aur color contrast ratio check karein taaki vision disability wale users bhi aapki website smoothly browse kar sakein.
`,

  'jio-vs-airtel-vs-bsnl-plans-comparison-2026.md': `
## Rural Aur Urban Coverage Reality: Kisko Kaunsa SIM Chunna Chahiye?

Plans ke alawa network ground reality samajhna bohot zaroori hai:

### BSNL 4G/5G Turnaround 2026
TCS ke swadeshi technology stack ke sath BSNL ne India ke rural sectors mein strong comeback kiya hai. Agar aapka budget tight hai aur secondary SIM active rakhna chahte hain, toh BSNL ka ₹107 ya ₹199 plan sabse sasta padta hai.

### Secondary SIM Strategy
Professional log primary SIM Airtel (call reliability ke liye) aur secondary data SIM Jio (high speed 5G unlimited ke liye) use karte hain taaki kabhi bhi network blackout ka samna na karna pade.
`,

  'tailwind-css-complete-guide-hindi.md': `
## Production Mein Tailwind CSS Ko Clean Aur Maintainable Rakhne Ke Tips

Bohot se developers complaint karte hain ki Tailwind mein HTML classes bohot lambi aur messy ho jati hain. Yahan clean code ke 2 best solutions hain:

### 1. Component Extraction (React / Vue / Astro)
Tailwind ko raw HTML ke bajaye React ya Astro components mein use karein. Ek \`<Button variant="primary">\` component bana lijiye jiske andar saari utility classes encapsulated rahein. Poori app mein classes repeat karne ki zaroorat nahi padegi.

### 2. \`@apply\` Directive Ka Smart Use
Agar aap plain CSS ke sath kaam kar rahe hain, toh common repeating patterns (jaise cards, form inputs) ke liye CSS file mein \`@apply\` use karke clean custom classes define kar sakte hain:
\`\`\`css
.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium;
}
\`\`\`
`
};

let updatedCount = 0;

for (const [file, addText] of Object.entries(extensions)) {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) {
    console.log('NOT FOUND:', file);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  // Append right before the final note or at the end
  const updatedContent = content.trimEnd() + '\n\n' + addText.trim() + '\n';
  fs.writeFileSync(filePath, updatedContent);
  updatedCount++;
  console.log(`Updated ${file}`);
}

console.log(`\nTotal expanded with high-value prose: ${updatedCount}`);
