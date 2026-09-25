## Quick Reference — Git Push Error Codes

| Error Message | Cause | Fix |
|--------------|-------|-----|
| `rejected (non-fast-forward)` | Remote mein nayi commits hain | `git pull --rebase origin main` |
| `Permission denied (publickey)` | SSH key issue | SSH key re-add karo ya HTTPS use karo |
| `Authentication failed` | Wrong credentials | Token refresh karo GitHub Settings pe |
| `remote: Repository not found` | Wrong remote URL | `git remote set-url origin <correct-url>` |
| `Updates were rejected` | Force push needed | `git push --force-with-lease` (carefully) |

Ye errors fix ho jaate hain zyada tar `git pull origin main --rebase` se pehle check karo ki remote pe kya changes hain.

## Preventive Best Practices

- Har kaam shuru karte waqt `git pull` karo
- Feature branches banao — direct main pe kaam mat karo
- Small, frequent commits karo — large monolithic commits avoid karo
- Push karne se pehle `git status` aur `git log --oneline -5` check karo
