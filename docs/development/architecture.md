# Architecture - Rate Together

> **For**: AI assistants
> **Purpose**: High-level architecture overview

---

## Architecture Type

**Modular Angular Application** with:
- Standalone components
- Lazy-loaded features
- Signal-based state management
- OnPush change detection

---

## Layers

### 1. Core Layer

**Location**: `src/app/core/`

**Purpose**: Singleton services, guards, interceptors, models

**Contains**:
- `services/` - Auth, API, Theme, Internationalization services
- `guards/` - Authentication and authorization guards
- `interceptors/` - HTTP interceptors (auth tokens, error handling)
- `models/` - All TypeScript interfaces and types

**Rules**:
- Import once, use everywhere
- Never depends on features
- Always `providedIn: 'root'`

### 2. Features Layer

**Location**: `src/app/features/`

**Purpose**: Business logic modules (lazy-loaded)

**Structure**:
```
features/{feature-name}/
├── {feature-name}.routes.ts
├── pages/           - Smart components
├── components/      - Presentation components
└── services/        - Feature-specific services
```

**Features**:
- `auth/` - Login, Register
- `rating-boards/` - Board CRUD, members, ratings
- `movies/` - Movie details, add/edit
- `profile/` - User profile

**Rules**:
- Self-contained
- Can import from core and shared
- Cannot import from other features

### 3. Shared Layer

**Location**: `src/app/shared/`

**Purpose**: Reusable UI components

**Contains**:
- `components/` - Button, Input, Modal, Table, etc.
- `directives/` - Custom directives
- `pipes/` - TranslatePipe

**Rules**:
- No business logic
- Highly reusable
- Only UI concerns

### 4. Layout Layer

**Location**: `src/app/layout/`

**Purpose**: App shell components

**Contains**:
- `header/` - Top navigation
- `footer/` - Footer
- `sidebar/` - Side navigation (if needed)
- `main-layout/` - Layout wrapper

---

## Component Types

### Smart Components (Containers)

**Location**: `features/{feature}/pages/`

**Responsibilities**:
- Inject services
- Manage state
- Handle routing
- Pass data to dumb components

### Dumb Components (Presentation)

**Location**: `features/{feature}/components/` or `shared/components/`

**Responsibilities**:
- Receive data via `input()`
- Emit events via `output()`
- Pure UI rendering
- No service injection

---

## State Management

**Approach**: Angular Signals (built-in)

**Pattern**:
- Services hold signals for shared state
- Components use computed() for derived state
- No external state management library

**State Location**:
- **Global state**: Core services (authentication, theme, language, etc.)
- **Feature state**: Feature services (boards, movies, ratings, etc.)
- **Local state**: Component signals

---

## Data Flow

```
User Action
    ↓
Component Method
    ↓
Service Method (API call)
    ↓
Signal Update
    ↓
Computed Signals React
    ↓
Template Re-renders (OnPush)
```

---

## Routing Strategy

- **Lazy Loading**: All features lazy-loaded
- **Guards**: Auth and role-based
- **Structure**: Hierarchical routes

---

## HTTP Communication

```
Component
    ↓
Feature Service
    ↓
ApiService
    ↓
HttpClient → Interceptors → Backend
```

**Interceptors**:
1. Auth interceptor - Adds authentication tokens to requests
2. Error interceptor - Handles HTTP errors globally

---

## Theme System

- CSS custom properties for theming (`--color-*`)
- `data-theme` attribute on `<html>` element
- Theme service manages state and persistence
- Automatic persistence to localStorage

---

## i18n System

- JSON translation files in `assets/i18n/` folder
- i18n service loads and manages translations
- Translate pipe for template usage
- Language persistence in localStorage

---

## Security

- JWT tokens in localStorage
- Auth guard for protected routes
- Role guard for permission checks
- Angular's built-in XSS protection
- HTTPS in production

---

**Version**: 1.0
**Updated**: 2025-11-10
