You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection


# Claude Code Rules for Rate Together

## 🚨 CRITICAL: Component Architecture

### НЕ ПИХАЙТЕ ВСЁ В ОДИН КОМПОНЕНТ!

Всегда разделяйте функционал на более мелкие, переиспользуемые компоненты.

## Component Separation Rules

### 1. UI Components (`src/app/components/ui/`)
Create separate components for reusable UI elements:
- Input, Button, Card, Modal, Dropdown, Checkbox, Radio, etc.

**Example:**
```typescript
// ❌ BAD - everything in one component
<div class="form-field">
  <label>Email</label>
  <input type="email" />
</div>

// ✅ GOOD - separate Input component
<app-input
  type="email"
  label="Email"
  icon="fa-envelope"
  [(ngModel)]="email"
/>
```

### 2. Feature Components (`src/app/components/feature/`)
Split large forms and complex components:
- Auth form → LoginForm + RegisterForm
- Profile page → ProfileHeader + ProfileInfo + ProfileSettings
- Dashboard → DashboardHeader + DashboardStats + DashboardCharts

### 3. Smart vs Dumb Components

**Smart (Container) Components:**
- Manage state
- Make API requests
- Contain business logic
- Use services

**Dumb (Presentational) Components:**
- Display only
- Receive data via @Input
- Emit events via @Output
- No business logic

### 4. When to Create New Component

Create a new component if:
- ✅ Code repeats in multiple places
- ✅ Component exceeds 200-300 lines
- ✅ Logically separate part of UI
- ✅ Can be reused
- ✅ Has its own state

### 5. Folder Structure

```
src/app/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── feature/         # Feature components
│   └── layout/          # Layout components
├── pages/               # Pages (Route components)
├── services/            # Services
└── models/              # Interfaces and types
```

## BEM Methodology

All HTML/CSS MUST follow BEM methodology:

```scss
// Block
.button { }

// Element (double underscore)
.button__icon { }
.button__text { }

// Modifier (double dash)
.button--primary { }
.button--disabled { }

// Combination
.button.button--primary .button__icon { }
```

## Code Principles

1. **One component = one responsibility**
2. **Reusability first**
3. **Small, readable components**
4. **Follow BEM in CSS**
5. **Use Angular Signals for reactivity**
6. **Type everything in TypeScript**
7. **NO MAGIC NUMBERS OR STRINGS - Use enums and constants**

### 🚨 NO MAGIC NUMBERS OR STRINGS

**NEVER** use hardcoded values directly in code. Always extract to enums or constants.

**BAD:**
```typescript
// ❌ Magic strings
if (theme === 'dark') { }
if (lang === 'en') { }

// ❌ Magic numbers
setTimeout(() => {}, 1500);
width: 40px;
```

**GOOD:**
```typescript
// ✅ Use enums for string values
enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

enum Language {
  EN = 'en',
  RU = 'ru'
}

if (theme === Theme.DARK) { }
if (lang === Language.EN) { }

// ✅ Use constants for numbers
const TIMEOUTS = {
  LOADING: 1500,
  DEBOUNCE: 300
} as const;

const DIMENSIONS = {
  BUTTON_SIZE: 40,
  HEADER_HEIGHT: 64
} as const;

setTimeout(() => {}, TIMEOUTS.LOADING);
width: ${DIMENSIONS.BUTTON_SIZE}px;
```

**Constants Location:**
- Component-specific: Inside component file at the top
- Shared: Create `src/app/models/constants.ts` or `enums.ts`

## Pre-Component Checklist

- [ ] Can it be split into smaller components?
- [ ] Can existing component be reused?
- [ ] Does component do only one thing?
- [ ] Does CSS follow BEM?
- [ ] Is component standalone?
- [ ] Is everything typed?

---

**Remember: Better 10 small components than 1 huge one!**
