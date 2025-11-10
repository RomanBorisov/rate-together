# Styling - Rate Together

> **For**: AI assistants
> **Purpose**: Theme system and styling approach

---

## Tech Stack

- **Tailwind CSS** - Utility-first CSS framework
- **Custom SCSS** - For complex components
- **FontAwesome** - Icons (version 6, kit: 9fb209daf6)

---

## Theme System

### CSS Variables Approach

Use CSS custom properties for theming:

```scss
:root {
  --color-primary: #3b82f6;
  --color-background: #ffffff;
  --color-text: #111827;
  --color-border: #e5e7eb;

  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);

  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;

  --transition-base: 250ms ease-in-out;
}

[data-theme="dark"] {
  --color-primary: #60a5fa;
  --color-background: #111827;
  --color-text: #f9fafb;
  --color-border: #374151;
}
```

### Theme Toggle

ThemeService manages theme state and applies `data-theme` attribute to `<html>`.

---

## Tailwind Configuration

### tailwind.config.js

Extend Tailwind with CSS variables:

```js
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        background: 'var(--color-background)',
        // ...
      }
    }
  }
}
```

---

## FontAwesome Setup

### Install

```bash
npm install @fortawesome/fontawesome-free
```

### angular.json

Add to styles array:
```json
"styles": [
  "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
  "src/styles/styles.scss"
]
```

### Usage

```html
<!-- Solid icons -->
<i class="fa-solid fa-star"></i>

<!-- Regular icons -->
<i class="fa-regular fa-heart"></i>

<!-- Brands -->
<i class="fa-brands fa-github"></i>
```

---

## Component Styling

### Prefer Tailwind

```html
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Click me
</button>
```

### SCSS for Complex Components

Use SCSS file when:
- Complex animations
- Heavy nesting needed
- Component-specific variables

```scss
// component.scss
.rating-table {
  display: grid;
  grid-template-columns: 200px repeat(auto-fit, minmax(120px, 1fr));
  gap: 1px;
  background: var(--color-border);

  &__cell {
    padding: 0.75rem;
    background: var(--color-background);

    &:hover {
      background: var(--color-surface-hover);
    }
  }
}
```

---

## Responsive Design

### Tailwind Breakpoints

```
sm:  640px   - Small devices
md:  768px   - Tablets
lg:  1024px  - Laptops
xl:  1280px  - Desktops
2xl: 1536px  - Large screens
```

### Usage

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Cards -->
</div>
```

---

## File Structure

```
src/styles/
├── themes/
│   ├── _variables.scss     - CSS custom properties
│   ├── _light-theme.scss   - Light theme overrides
│   └── _dark-theme.scss    - Dark theme values
├── components/
│   └── _buttons.scss       - Global button styles
├── utilities/
│   └── _spacing.scss       - Custom utilities
└── styles.scss             - Main entry point
```

---

**Version**: 1.0
**Updated**: 2025-11-10
