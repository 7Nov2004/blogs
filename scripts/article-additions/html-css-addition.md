## CSS Animation — Aapki Site Ko Life Do

Subtle animations website ko professional feel dete hain. Basic example:

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card {
  animation: fadeIn 0.5s ease forwards;
}

/* Hover effect */
.button {
  transition: background 0.3s ease, transform 0.2s ease;
}
.button:hover {
  background: #2980b9;
  transform: scale(1.05);
}
```

**Performance tip:** Animations sirf `opacity` aur `transform` pe karo — `width`, `height`, `margin` animate karna GPU ka load badhata hai aur janky lagta hai.

## CSS Best Practices — Clean Code Ke Liye

| Practice | Bad Example | Good Example |
|----------|------------|-------------|
| Naming | `.d1`, `.box2` | `.hero-section`, `.nav-link` |
| Specificity | `!important` har jagah | Proper selector hierarchy |
| Units | `px` everywhere | `rem` for fonts, `%` for layouts |
| Comments | No comments | Section comments add karo |

**BEM Methodology** follow karo bade projects mein:
```css
/* Block */
.card { }
/* Element */
.card__title { }
.card__image { }
/* Modifier */
.card--featured { }
.card--disabled { }
```

Clean CSS = easy maintenance = happy developer!
