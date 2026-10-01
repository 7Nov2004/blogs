---
title: "SIM Port (MNP) 2026 New Rules: 7-Day Waiting Period, UPC Code Aur Rejection Fix"
seoTitle: "SIM Port (MNP) New Rules 2026: UPC Code & Rejection Fix"
description: "SIM port (MNP) 2026 ke naye rules — 7-day waiting period, PORT SMS send na hone ka solution, UPC code generate karne aur rejection se bachne ka guide."
pubDate: 2026-10-01
category: "tips"
tags: ["telecom", "tech-tips", "cyber-safety", "sanchar-saathi"]
author: "Aayush Kumar"
image: "/images/sim-port-mnp-new-rules-cover.jpg"
coverImage: "/images/sim-port-mnp-new-rules-cover.jpg"
featured: true
faqs:
  - question: "SIM swap ya duplicate SIM lene ke baad porting ke liye kitne din rukna padta hai?"
    answer: "TRAI ke naye 2026 MNP regulations ke mutabiq, agar aapne apna khoya hua SIM replace karwaya hai ya purana SIM naye 5G SIM mein upgrade/swap kiya hai, toh aap theek 7 din (168 ghante) tak koi bhi Unique Porting Code (UPC) generate nahi kar sakte."
  - question: "1900 par PORT SMS send karne par bhi UPC code kyu nahi aata?"
    answer: "Iske do sabse bade kaaran hote hain: Pehla, aapke recharge plan mein outgoing SMS ki suvidha nahi hai ya main balance khatam hai. Doosra, aapka connection abhi current operator par 90 din purana nahi hua hai."
  - question: "UPC (Unique Porting Code) kitne dinon tak valid rehta hai?"
    answer: "India ke lagbhag sabhi telecom circles mein UPC code generate hone ke baad 4 din tak valid rehta hai. Jammu & Kashmir, Assam aur North East circles mein ye validity 30 din tak hoti hai."
  - question: "Porting ke dauran mera mobile number kitni der tak band rehta hai?"
    answer: "Number porting ke process mein purana SIM aadhi raat (lagbhag 1:00 AM se 4:00 AM) ke beech deactivate hota hai aur naya SIM turant activate ho jata hai. Din ke time aapka number ek minute ke liye bhi band nahi hota."
---

Pichle kuch mahinon mein jab se telecom operators (Jio, Airtel aur Vi) ne recharge plans ke daam badhaye hain, tab se lakhon log apne mobile number ko **BSNL ya kisi doosre saste operator par port (MNP)** karne ki koshish kar rahe hain.

Lekin jab log `PORT <Mobile Number>` likhkar `1900` par bhejte hain, toh screen par achanak error aa jata hai:
> *"Your request for UPC could not be processed due to regulatory cooling-off period."* ya *"Porting request rejected!"*

Aisa kyu ho raha hai? 

Telecom Regulatory Authority of India (TRAI) aur Department of Telecommunications (DoT) ne **Mobile Number Portability (MNP) ke naye strict rules** lagu kiye hain. 

Is comprehensive Hindi guide mein hum dekhenge ki ye 7-day rule kya hai, PORT SMS fail hone ki asli wajah kya hai, aur apna number bina kisi rejection ke kaise port karein!

---

## 🛑 TRAI Ka Naya 7-Day Cooling Off Period Rule Kya Hai?

Pehle cyber criminal kya karte the? 
1. Wo kisi user ka SIM chori karte the ya fake ID se uska duplicate SIM nikalwate the (SIM Swap).
2. Agle hi ghante `1900` par SMS bhejkar UPC code nikal lete the.
3. Aur number ko kisi teesre operator par port kar dete the taaki original owner apna number kabhi block hi na karwa sake!

### 2026 Ka Naya Security Rule:
Isi khatarnak cyber crime ko jad se khatam karne ke liye TRAI ne mandatory rule banaya hai:
> **Agar aapne apna SIM card replace, swap, ya upgrade karwaya hai — toh aap agle 7 DIN (168 ghante) tak koi bhi Porting Request generate nahi kar sakte!**

7 din poore hone ke baad hi `1900` server aapke number ke liye Unique Porting Code (UPC) issue karega.

Apne naam par kitne active SIM cards chal rahe hain ye check karne ke liye hamara [TAFCOP Portal Complete Guide](/blog/aapke-naam-par-kitne-sim-hai-tafcop-portal-guide/) zaroor padhein.

---

## 📋 MNP Eligibility Checklist (Apply Karne Se Pehle Check Karein)

Apna number port karne se pehle in 5 mandatory conditions ko pura karein, warna aapka port request 100% reject ho jayega:

| Eligibility Criteria | Rule / Requirement | Rejection Reason Agar Fail Hua |
| :--- | :--- | :--- |
| **Current Network Age** | Kam se kam **90 Din** purana connection hona chahiye | "Age of connection is less than 90 days" |
| **Postpaid Outstanding** | Pichla poora bill clear hona chahiye | "Outstanding dues pending with donor operator" |
| **Legal Ownership** | SIM jiske naam par hai, wahi person KYC karega | "Ownership details mismatch" |
| **Court / Legal Case** | Number kisi police investigation ya legal stay mein na ho | "Prohibited by court of law" |
| **Previous Porting** | Pichla port huye kam se kam 90 din ho chuke hon | "Repeated porting within lock-in window" |

SIM Swap aur banking fraud se bachne ke security tips ke liye hamara [SIM Swap Fraud Protection Guide](/blog/sim-swap-fraud-kya-hai-kaise-bachein/) padhein.

---

## Step-by-Step: Sahi Tarike Se UPC Code Kaise Nikalein?

Bohot se users ka SMS send hi nahi hota kyunki wo basic settings ignore kar dete hain:

```
Default Messages App Kholein 
       ↓ 
Recipient: 1900 
       ↓ 
Message Text: PORT <10-Digit Mobile Number> 
(Example: PORT 9876543210) 
       ↓ 
SIM Card Select Karein (Wahi SIM jise port karna hai) 
       ↓ 
Send Dabayein → 2 Minute Mein UPC SMS Receive Hoga!
```

### SMS Send Na Hone Ke 2 Sabse Bade Kaaran:
1. **SMS Pack Ka Na Hona:** Jio, Airtel aur Vi ke kayi basic data-only packs (jaise ₹149 ya data add-ons) mein **Outgoing SMS service disable** hoti hai. Ensure karein ki aapke pack mein standard SMS allowance ho.
2. **Truecaller Default SMS App:** Agar aapne Truecaller ya koi third-party app default SMS banaya hua hai, toh aksar shortcode `1900` block ho jata hai. Hamesha phone ka **Default System Messaging App** use karein.

---

## ❌ Common MNP Rejection Codes & Unka Solution Table

Agar aapka porting code reject hota hai, toh SMS mein ek reason code likha hota hai. Aaiye dekhte hain unhe kaise fix karein:

| Error Code / Message | Asli Wajah (Cause) | 100% Working Fix |
| :--- | :--- | :--- |
| **"Code 01: Outstanding dues"** | Postpaid bill pending hai | Unbilled amount aur current bill turant pay karein |
| **"Code 02: 90 days not completed"** | Naya SIM liye abhi 3 mahine nahi huye | 90 din poore hone ka intezaar karein |
| **"Code 03: SIM swap cooling-off"** | Haal hi mein naya SIM nikala gaya tha | 7 din (168 ghante) poore hone ke baad SMS bhejein |
| **"Code 04: Contractual obligation"** | Corporate ya postpaid plan agreement active hai | Corporate admin se NOC lein ya connection individual convert karein |
| **"Code 05: Sub-judice matter"** | Number legal investigation mein hai | Police / Telecom nodal authority se clearance lein |

Telecom plans aur 5G unlimited offers compare karne ke liye hamara [Jio vs Airtel vs BSNL Plans Comparison Guide](/blog/jio-vs-airtel-vs-bsnl-plans-comparison-2026/) zaroor check karein.

---

## Store Par Naya SIM Lene Ke Waqt Kya Savdhani Bartein?

Jaise hi aapke paas 8-digit ka UPC code aa jaye (jaise `AB123456`):

1. **Validity Check:** Ye code **4 din** tak valid hota hai. 4 din ke andar kisi bhi retailer ya official brand store par jayein.
2. **Original Documents:** Apna original **Aadhaar Card** lekar jayein.
3. **Biometric e-KYC:** Store executive aapka fingerprint ya facial scan karega. Koi bhi physical photocopy dene ki zaroorat nahi hoti.
4. **Free Porting Charge:** MNP ke liye government fee sirf ₹6.46 hoti hai. Retailer aapse SIM aur first recharge (FRC) ka charge lega.

## Ghar Baithe Online SIM Port Kaise Karein? (Doorstep Delivery)

Agar aap kisi physical telecom store ya retailer par line mein nahi lagna chahte, toh Jio aur Airtel dono official doorstep SIM delivery suvidha dete hain:

1. Jio.com ya Airtel Thanks App par jayein aur **"Port to Jio / Airtel"** section chunein.
2. Apna delivery address aur preferred time slot enter karein.
3. Delivery executive aapke ghar aayega aur biometric device se Aadhaar e-KYC complete karega.
4. **Safety Tip:** Executive aapse koi password, OTP ya debit card details nahi maang sakta; sirf biometric fingerprint aur UPC code verify hota hai.

---

## Conclusion

Mobile Number Portability aapka consumer right hai, lekin cybersecurity aur SIM swap attacks ko rokne ke liye government ke banaye gaye naye rules ko samajhna zaroori hai.

Bas dhyan rakhein ki aapka connection **90 din purana ho, pichle 7 din mein koi SIM swap na hua ho, aur SMS pack active ho**. In simple steps ke saath aapka number bina kisi rukawat ke 3 se 4 working days mein naye operator par transfer ho jayega!
