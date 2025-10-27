# 🎬 Rate Together

A collaborative movie rating application where you and your friends can create shared rating tables, add movies, and compare ratings.

## ✨ Features

- 🔐 **User Authentication** - Secure login and registration
- 🎨 **Modern UI** - Beautiful, responsive design with smooth animations
- 🌓 **Dark/Light Theme** - Toggle between themes with smooth transitions
- 🌍 **Multilingual** - Support for English and Russian languages
- 📱 **Responsive** - Works great on desktop, tablet, and mobile
- ⚡ **Modern Stack** - Built with Angular 20 and standalone components

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:4200/`

## 📁 Project Structure

```
src/app/
├── components/
│   ├── ui/              # Reusable UI components (Button, Input, etc.)
│   │   ├── button/
│   │   └── input/
│   ├── feature/         # Feature-specific components
│   └── layout/          # Layout components
│       └── header/
├── pages/               # Route components
│   └── auth/
├── services/            # Application services
│   ├── theme.service.ts # Theme management
│   └── i18n.service.ts  # Internationalization
└── models/              # TypeScript interfaces and types
```

## 🛠️ Tech Stack

- **Frontend:** Angular 20 (Standalone Components)
- **Styling:** SCSS with BEM methodology
- **Icons:** FontAwesome 6
- **State Management:** Angular Signals
- **Routing:** Angular Router
- **i18n:** Custom service with signal-based reactivity

## 🎨 Features Implemented

### Current Features (v0.1.0)

- ✅ User authentication UI (Login/Register)
- ✅ Dark/Light theme switching
- ✅ English/Russian language support
- ✅ Responsive header component
- ✅ Reusable UI components (Button, Input)
- ✅ Modern animations and transitions

### Planned Features

- [ ] Backend integration
- [ ] User profile management
- [ ] Group/Table creation
- [ ] Movie database integration
- [ ] Rating system
- [ ] Permission management
- [ ] Real-time updates

## 🧑‍💻 Development

### Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Development Guidelines

This project follows strict component architecture principles. Please read:

- [Development Guidelines](./DEVELOPMENT_GUIDELINES.md)
- [Claude Code Rules](./.claude.md)
- [Cursor AI Rules](./.cursorrules/cursor.mdc)

**Key Rules:**
- ✅ Split components into smaller, reusable pieces
- ✅ Follow BEM methodology for CSS
- ✅ Use TypeScript strict typing
- ✅ Add i18n for all user-facing text
- ✅ Test in both themes and languages

## 🎯 Roadmap

### Phase 1: Foundation (Current)
- [x] Project setup
- [x] Authentication UI
- [x] Theme system
- [x] i18n system
- [x] Base components

### Phase 2: Backend Integration
- [ ] API integration
- [ ] User authentication
- [ ] State management
- [ ] Error handling

### Phase 3: Core Features
- [ ] Group/Table creation
- [ ] Movie search and addition
- [ ] Rating system
- [ ] Permission management

### Phase 4: Advanced Features
- [ ] Real-time updates
- [ ] Notifications
- [ ] Statistics and charts
- [ ] Export functionality

## 📝 License

This project is private and not licensed for public use.

## 👥 Contributing

This is a private project. If you have access, please follow the development guidelines before submitting any changes.

---

Built with ❤️ using [Angular CLI](https://angular.dev) version 20.1.4
