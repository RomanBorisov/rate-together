# Folder Structure - Rate Together

> **For**: AI assistants
> **Purpose**: Project organization patterns

---

## High-Level Structure

```
src/app/
├── core/               # Singleton services and global utilities
├── features/           # Business domain modules (lazy-loaded)
├── shared/             # Reusable UI components
├── layout/             # Application shell components
├── app.component.*     # Root component files
├── app.config.*        # Application configuration
└── app.routes.*        # Main routing configuration
```

---

## Core Layer

**Location**: `src/app/core/`

**Contains**:
- `services/` - Global singleton services (auth, API client, theme, i18n, etc.)
- `guards/` - Route protection logic
- `interceptors/` - HTTP request/response interceptors
- `models/` - TypeScript interfaces, types, enums

**Pattern**: All items use wildcard naming (*.service.ts, *.guard.ts, *.interceptor.ts, *.model.ts)

---

## Features Layer

**Location**: `src/app/features/`

**Structure per feature**:
```
feature-name/
├── feature-name.routes.*   # Feature routing
├── pages/                  # Smart/container components
│   └── page-name/
├── components/             # Presentation components
│   └── component-name/
└── services/               # Feature-specific services
    └── *.service.*
```

**Common features**:
- Authentication (login, register pages)
- Boards management (list, detail, create, edit pages)
- Content management (detail, add pages)
- User profile

**Each component folder contains**:
- Component class file
- Template file
- Style file
- Optional test file

---

## Shared Layer

**Location**: `src/app/shared/`

**Contains**:
- `components/` - Reusable UI components (buttons, inputs, modals, etc.)
- `directives/` - Custom attribute/structural directives
- `pipes/` - Custom transformation pipes

**Component examples**:
- Form controls (button, input, dropdown, etc.)
- Feedback elements (spinner, alert, modal, etc.)
- Data display (table, card, etc.)

---

## Layout Layer

**Location**: `src/app/layout/`

**Contains**: Application shell components
- Top navigation
- Footer
- Sidebar (if needed)
- Main content wrapper

---

## Assets Structure

```
src/assets/
├── i18n/           # Translation files (*.json)
├── images/         # Static images
└── fonts/          # Custom fonts (if any)
```

---

## Styles Structure

```
src/styles/
├── themes/         # Theme-related SCSS
├── components/     # Global component styles
├── utilities/      # Custom utility classes
└── styles.scss     # Main entry point
```

---

## Environment Configuration

```
src/environments/
├── environment.ts          # Development config
└── environment.prod.ts     # Production config
```

---

## Layer Responsibilities

### Core
- **Purpose**: Application-wide singletons
- **Import**: Once at app bootstrap
- **Dependencies**: None (self-contained)

### Features
- **Purpose**: Business logic domains
- **Import**: Lazy-loaded on demand
- **Dependencies**: Can use core and shared

### Shared
- **Purpose**: Reusable presentation components
- **Import**: By any feature
- **Dependencies**: Can use core, no features

### Layout
- **Purpose**: Application shell structure
- **Import**: By root component
- **Dependencies**: Can use core and shared

---

## Path Aliases

Configure path aliases for cleaner imports:
- `@core/*` → `src/app/core/*`
- `@features/*` → `src/app/features/*`
- `@shared/*` → `src/app/shared/*`
- `@layout/*` → `src/app/layout/*`
- `@environments/*` → `src/environments/*`

---

## File Naming Conventions

- Components: `component-name.component.*`
- Services: `service-name.service.*`
- Guards: `guard-name.guard.*`
- Interceptors: `interceptor-name.interceptor.*`
- Pipes: `pipe-name.pipe.*`
- Models: `model-name.model.*`
- DTOs: `entity-name.dto.*`
- Routes: `feature-name.routes.*`

All names use kebab-case.

---

**Version**: 1.0
**Updated**: 2025-11-10
