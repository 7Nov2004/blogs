## Git Cherry-Pick — Selective Commits का जादू

कभी ऐसा हुआ कि किसी दूसरे branch पर एक specific commit है जो तुम्हें अपनी branch में चाहिए — पर पूरा branch merge नहीं करना? यही काम **cherry-pick** करता है।

### Cherry-Pick कब Use करें?

- Hotfix किसी दूसरे branch पर था, उसे production में लाना हो
- Teammate ने एक useful utility function commit किया जो अभी तुम्हें चाहिए
- Experimental branch से कोई specific feature लेना हो

### Example — Commands के साथ

```bash
# पहले commit hash ढूंढो जो चाहिए
git log --oneline feature/payment-module

# Output:
# a3f9c12 Add UPI payment support
# b7e1d34 Fix validation bug
# c0d2a11 Initial payment setup

# सिर्फ UPI payment commit को current branch में लाओ
git cherry-pick a3f9c12

# Multiple commits cherry-pick करने हों तो
git cherry-pick a3f9c12 b7e1d34

# Conflict आए तो resolve करके
git cherry-pick --continue

# गड़बड़ हो गई? वापस जाओ
git cherry-pick --abort
```

> **याद रखो:** Cherry-pick एक new commit बनाता है same changes के साथ — original commit hash change हो जाती है।

---

## Git Stash — काम बीच में छोड़ना हो तो

Boss ने बोला "अभी production bug fix करो" और तुम्हारा आधा feature incomplete है — घबराओ नहीं, **git stash** है ना!

### Basic Stash Commands

```bash
# Current changes temporarily save करो
git stash

# या meaningful name के साथ (recommended!)
git stash save "login form validation wip"

# सभी stashes देखो
git stash list
# Output:
# stash@{0}: On main: login form validation wip
# stash@{1}: On feature/ui: navbar responsive fix

# Latest stash वापस लाओ और list से हटाओ
git stash pop

# Stash वापस लाओ लेकिन list में रहने दो
git stash apply

# Specific stash apply करो
git stash apply stash@{1}

# Stash delete करना हो
git stash drop stash@{0}

# सारे stashes एक साथ clean करो
git stash clear
```

### Pop vs Apply — Difference

| Command | Stash List से हटता है? | Use Case |
|---|---|---|
| `git stash pop` | ✅ हाँ | Single use — एक बार apply करके done |
| `git stash apply` | ❌ नहीं | Multiple branches पर same changes apply करने हों |

---

## Git Log को Visualize करो

Plain `git log` boring और overwhelming होता है। इस command से tree जैसा view मिलेगा:

```bash
# Clean one-line graph view
git log --oneline --graph --all

# Output कुछ ऐसा दिखेगा:
# * a3f9c12 (HEAD -> main) Fix payment bug
# | * b7e1d34 (feature/dashboard) Add analytics chart
# |/
# * c0d2a11 Merge PR #42 - Auth module
# * d1e3f56 Initial commit
```

### Alias Setup — Shortcut बनाओ

हर बार यह लंबा command type करना painful है। एक बार alias set करो:

```bash
# Git config में alias add करो
git config --global alias.lg "log --oneline --graph --all --decorate"

# अब बस इतना type करो
git lg
```

Decorate flag branches और tags के नाम भी दिखाता है — बहुत helpful।

---

## Real-World Team Workflow Example

यह है एक practical team workflow जो most startups follow करते हैं:

### Feature Branch Workflow with Rebase

```bash
# Step 1: Main से fresh feature branch बनाओ
git checkout main
git pull origin main
git checkout -b feature/user-profile

# Step 2: काम करो, commits करो
git add .
git commit -m "feat: add profile avatar upload"
git commit -m "feat: add bio edit functionality"

# Step 3: PR raise करने से पहले — main के साथ sync करो
git fetch origin
git rebase origin/main

# Rebase के दौरान conflict आए तो:
# 1. File manually fix करो
git add resolved-file.js
git rebase --continue

# Step 4: Clean history के साथ push करो
git push origin feature/user-profile --force-with-lease

# Step 5: GitHub/GitLab पर PR open करो
# Team review करे, approve करे

# Step 6: Merge — Squash merge preferred for clean history
# (GitHub पर "Squash and Merge" button use करो)
```

### Merge Strategy Summary

| Strategy | History | Use Case |
|---|---|---|
| **Merge Commit** | Branch history preserve | Long-running features |
| **Squash & Merge** | Clean single commit | Short features, bug fixes |
| **Rebase & Merge** | Linear history | Open source projects |

**Golden Rule:** Team में एक strategy decide करो और consistently follow करो। Mixed strategies से history messy हो जाती है और `git blame` useless हो जाता है। 🎯
