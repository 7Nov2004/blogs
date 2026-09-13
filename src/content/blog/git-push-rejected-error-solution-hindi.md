---
title: "Git Push Rejected (error: failed to push some refs) Solution in Hindi: 100% Working Fix"
description: "Git push karte waqt 'Updates were rejected because the remote contains work that you do not have locally' error kyu aata hai aur isse bina code khoe kaise theek karein."
pubDate: 2026-03-24
category: "webdev"
tags: ["git", "github", "git push rejected", "web development", "coding errors", "programming tips"]
author: "Team Technical Dikhao"
image: "/images/git-push-rejected-fix-cover.jpg"
faqs:
  - question: "Git push rejected error sabse zyada kyu aata hai?"
    answer: "Ye error tab aata hai jab GitHub par kisi ne (ya aapne hi browser mein README edit karke) naya commit kiya ho jo aapke local computer par download nahi hua hai. Git purane code se naye code ko overwrite hone se rokne ke liye push reject kar deta hai."
  - question: "Kya 'git push --force' use karna chahiye?"
    answer: "Personal private test repo par aap chala sakte hain, lekin team project ya office repo par kabhi nahi! Force push se doosre developers ka kiya hua code GitHub se hamesha ke liye delete (overwrite) ho jata hai."
  - question: "Merge conflict aane par kaun sa option chunna chahiye?"
    answer: "VS Code mein 'Accept Current Change' (aapka local code), 'Accept Incoming Change' (GitHub ka code), ya 'Accept Both Changes' (dono code rakhna) ka option milta hai. Sahi choice code review karke lein."
  - question: "'fatal: refusing to merge unrelated histories' error kaise theek karein?"
    answer: "Agar aapne GitHub par nayi repo banayi aur local mein alag repo initialize ki, to run karein: `git pull origin main --allow-unrelated-histories`."
  - question: "Git pull rebase vs normal git pull mein kya farak hai?"
    answer: "Normal pull ek extra 'Merge commit' generate karta hai jisse git graph messy ho jata hai. `git pull --rebase` aapke local commits ko GitHub ke latest commits ke upar clean linear line mein arrange karta hai."
---

Jab bhi koi beginner developer ya software engineer Git aur GitHub sikhna shuru karta hai, to ek error lagbhag har kisi ko raat bhar pareshaan karta hai:

```bash
! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'github.com/username/repo.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
```

Ye error screen par aate hi beginners darr jaate hain ki unka code delete ho gaya ya repo corrupt ho gayi. Par sach ye hai ki **ye koi bug nahi hai—ye Git ka ek protective security feature hai!**

Iss comprehensive Hindi tutorial mein hum detail mein samjhenge ki ye error kyu aata hai aur bina ek bhi line code khoe isko professionally kaise solve kiya jata hai.

---

## Error Ka Asli Kaaran (Root Cause) Kya Hai?

Git ek **Distributed Version Control System** hai. Iska matlab:
1. Ek repo aapke local PC par hai (Local Repository).
2. Ek repo GitHub ke server par hai (Remote Repository).

Sochiye GitHub par aapki repo mein commits hain: `A -> B -> C`.
Aapke computer par commits hain: `A -> B -> D`.

GitHub ke paas **Commit C** hai jo aapke computer par maujood nahi hai!
Aisa kab hota hai?
- Aapne GitHub website par jaakar direct `README.md` ya koi file edit kar di.
- Aapki team ke kisi doosre developer ne branch par naya code push kar diya.
- Aapne GitHub par repo banate waqt "Add a README file" ya ".gitignore" tick kar diya tha, par local repo alag se `git init` ki thi.

Agar Git aapka push accept kar leta, to GitHub ka **Commit C gayab ho jata**! Isiliye Git kehta hai: *"Pehle GitHub ka latest code apne PC par laao (pull karo), sync karo, phir push karo."*

---

## Method 1: The Clean Professional Way (`git pull --rebase`)

Professional developers hamesha **rebase** ka istemal karte hain taaki git commit history clean rahe.

### Step-by-Step Commands:

**1. Remote changes ko pull aur rebase karein:**
```bash
git pull --rebase origin main
```
*(Note: Agar aapki branch ka naam `master` hai, to `main` ki jagah `master` likhein).*

**2. Agar koi conflict nahi hai, to direct push karein:**
```bash
git push origin main
```
Bas! Aapka code bina kisi jhanjhat ke GitHub par live upload ho jayega.

---

## Method 2: Merge Conflict Aaye To Kaise Solve Karein?

Agar aapne aur kisi doosre developer ne **same file ki same line** ko edit kiya tha, to pull karne par terminal kahega:
`CONFLICT (content): Merge conflict in index.html`

Iska solution bohot aasan hai:

1. **VS Code Editor kholein:** Jis file mein conflict hai wo red ya highlight ho jayegi.
2. File ke andar aapko aisi markings dikhengi:
   ```text
   <<<<<<< HEAD (Current Change - Aapka code)
   <h1>Welcome to My Awesome Portfolio</h1>
   =======
   <h1>Welcome to Technical Dikhao Web App</h1>
   >>>>>>> 7d4a2b1 (Incoming Change - GitHub ka code)
   ```
3. VS Code ke upar clickable buttons dikhenge:
   - **Accept Current Change:** Agar aapko apna likha hua code rakhna hai.
   - **Accept Incoming Change:** Agar GitHub wala code sahi hai.
   - **Accept Both:** Agar dono code chahiye.
4. Correct code chunne ke baad file ko Save karein (`Ctrl + S`).
5. Terminal mein ye 3 commands chalaein:
   ```bash
   git add .
   git rebase --continue
   git push origin main
   ```
Problem 100% solved!

---

## Method 3: Unrelated Histories Error Ka Solution

Agar aapko ye error mile:
`fatal: refusing to merge unrelated histories`

Iska matlab local repo aur GitHub repo dono alag-alag roots se shuru hui hain. Isko bypass karne ke liye ye command use karein:

```bash
git pull origin main --allow-unrelated-histories
```
Iske baad enter dabayein, nano/vim editor khule to `:wq` type karke enter karein, aur phir:
```bash
git push origin main
```

---

## Warning: `git push --force` Kab Use Karein Aur Kab Nahi?

Aapko YouTube par ya StackOverflow par log kahenge:
*"Bhai `git push -f origin main` chala de, sab theek ho jayega!"*

⚠️ **Caution:**
- **Kab Chala Sakte Hain:** Agar repo 100% aapki personal hai, aap akele kaam kar rahe hain, aur GitHub ka puraana code aapko sach mein nahi chahiye.
- **Kab KABHI NAHI Chalana:** Agar aap company mein hain ya college team project par hain. Force push chalate hi aapke doston ka code permanently delete ho jayega aur team repo crash ho jayegi!

---

## Pro Developer Cheat Sheet

| Situation | Best Command |
| :--- | :--- |
| Normal sync update | `git pull --rebase origin main` |
| New branch push | `git push -u origin feature-branch` |
| Check commit difference | `git log --oneline --graph --all` |
| Abort a bad merge/rebase | `git rebase --abort` ya `git merge --abort` |

---

### Related Web Development Guides:
- [Git & GitHub Complete Beginners Guide](/blog/git-github-beginners-guide-hindi)
- [Tailwind CSS Complete Mastery Guide](/blog/tailwind-css-complete-guide-hindi)
- [Web Development Category](/category/webdev)
