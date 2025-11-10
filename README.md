# Rate Together

AI Implementation Project - Collaborative Movie Rating Application

## Tech Stack

- Angular 19 (Standalone Components, Signals)
- Tailwind CSS + Custom SCSS
- FontAwesome
- TypeScript 5.6
- Custom REST API Backend

## Quick Start

```bash
npm install
npm start
```

App runs at: http://localhost:4200

## Documentation

**For AI Assistants**: See [docs/README.md](./docs/README.md)

Complete documentation:
- Development guidelines and coding rules
- Architecture and folder structure
- Data models and API specification
- Feature specifications
- Step-by-step implementation checklist

## Project Structure

```
src/app/
├── core/          # Services, guards, interceptors, models
├── features/      # Lazy-loaded feature modules
├── shared/        # Reusable components
└── layout/        # App layout components
```

## Core Concept

**Rating Boards** = Groups where users rate movies collaboratively

**Table Format**:
- Rows: Users
- Columns: Movies
- Cells: Ratings (0-10)

## Permission Levels

| Role | Access |
|------|--------|
| guest | View only |
| participant | View + edit own ratings |
| user_moderator | + manage users + edit any rating |
| movie_moderator | + manage movies |
| global_moderator | user_moderator + movie_moderator |
| admin | Full access |

## Implementation Phases

1. Setup (Tailwind + FontAwesome)
2. Core (Services + Guards + Interceptors)
3. Layout (Header + Theme + i18n)
4. Auth Feature
5. Rating Boards Feature
6. Movies Feature
7. Shared Components
8. Polish

---

**For AI assistants**: See [docs/README.md](./docs/README.md) for complete technical details.
