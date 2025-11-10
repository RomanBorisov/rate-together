# Rate Together - Documentation

> **For**: AI coding assistants (Claude Code, etc.)
> **Purpose**: Complete technical specification for autonomous implementation

---

## Documentation Structure

### 📂 development/

Technical implementation details:

- **[coding-rules.md](./development/coding-rules.md)** - Mandatory Angular patterns, component types, naming conventions
- **[data-models.md](./development/data-models.md)** - TypeScript interfaces for all entities and DTOs
- **[folder-structure.md](./development/folder-structure.md)** - Complete project structure and file organization
- **[architecture.md](./development/architecture.md)** - High-level architecture, layers, state management
- **[backend-api.md](./development/backend-api.md)** - API endpoints reference
- **[styling.md](./development/styling.md)** - Tailwind CSS, theme system, FontAwesome
- **[i18n.md](./development/i18n.md)** - Multi-language support (EN/RU)

### 📂 content/

Business logic and features:

- **[project-concept.md](./content/project-concept.md)** - Core concept, roles, permissions, user flows
- **[features.md](./content/features.md)** - Detailed feature specifications

### 📂 todo/

Implementation roadmap:

- **[implementation-checklist.md](./todo/implementation-checklist.md)** - Step-by-step implementation checklist (10 phases)

---

## Quick Start

### Essential Reading Order

1. **[project-concept.md](./content/project-concept.md)** - Understand what to build
2. **[architecture.md](./development/architecture.md)** - Understand how to structure it
3. **[coding-rules.md](./development/coding-rules.md)** - Understand coding patterns
4. **[implementation-checklist.md](./todo/implementation-checklist.md)** - Follow step-by-step

### Key Concepts

**What**: Collaborative movie rating app where users create boards, add movies, and rate them (0-10)

**Tech Stack**:
- Angular 19 (standalone components, signals, OnPush)
- Tailwind CSS + Custom SCSS
- FontAwesome 6
- TypeScript 5.6
- Custom REST API

**Core Pattern**:
```
Rating Board = Group of users + movies
Table: Users (rows) × Movies (columns) = Ratings (cells)
```

---

## Critical Rules

### Component Structure
```typescript
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.active]': 'isActive()' }
})
export class Component {
  private service = inject(Service);
  data = input.required<Data>();
  event = output<string>();
  state = signal(value);
}
```

### Template Syntax
```html
@if (condition()) { }
@for (item of items(); track item.id) { }
[class.active]="isActive()"
```

### Never Use
- `@Input()` / `@Output()` decorators
- `*ngIf` / `*ngFor` / `*ngSwitch`
- `[ngClass]` / `[ngStyle]`
- `@HostBinding` / `@HostListener`
- `constructor` injection

---

## Implementation Flow

**Phase 1**: Setup (Tailwind + FontAwesome)
**Phase 2**: Core (Services + Guards + Interceptors)
**Phase 3**: Theme & i18n
**Phase 4**: Layout
**Phase 5**: Shared Components
**Phase 6**: Auth Feature
**Phase 7**: Rating Boards Feature
**Phase 8**: Movies Feature
**Phase 9**: Polish
**Phase 10**: Final Testing

---

**Version**: 1.0
**Last Updated**: 2025-11-10
