# Development Guide

This guide covers the complete development workflow for the VerseFlow Architecture Visualizer.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or 20.x
- **npm** (comes with Node.js)
- **Git**
- **VS Code** (recommended)

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/GizzZmo/VerseFlow-.git
cd VerseFlow-

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
VerseFlow-/
├── .github/workflows/     # CI/CD pipeline
│   └── ci.yml
├── components/           # React components
│   ├── ArchitectureCard.tsx
│   ├── DetailModal.tsx
│   └── Icons.tsx
├── data/                # Application data
│   └── architectureData.ts
├── docs/                # Documentation
│   ├── README.md
│   ├── architecture.md
│   └── technology-stack.md
├── dist/                # Built application
├── App.tsx              # Main application
├── index.tsx            # Entry point
├── index.html           # HTML template
├── types.ts             # TypeScript types
├── vite.config.ts       # Build configuration
├── package.json         # Dependencies and scripts
├── README.md            # Main documentation
├── CONTRIBUTING.md      # Contribution guidelines
└── HELP.md              # User help guide
```

## 🔧 Development Workflow

### Available Scripts

```bash
# Development
npm run dev              # Start development server with hot reload
npm run build            # Build for production
npm run preview          # Preview production build
npm run type-check       # Run TypeScript type checking

# Planned additions
npm run lint            # Code linting (when added)
npm run test            # Run tests (when added)
```

### Development Server Features

- **Hot Module Replacement**: Changes reflect instantly
- **TypeScript Support**: Full TypeScript integration
- **Path Aliases**: Use `@/` for absolute imports
- **Error Overlay**: Helpful error messages in browser

### Making Changes

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Make Changes**
   - Edit React components in `components/`
   - Update data in `data/architectureData.ts`
   - Modify styles using Tailwind CSS classes

3. **Type Checking**
   ```bash
   npm run type-check
   ```

4. **Build Testing**
   ```bash
   npm run build
   npm run preview
   ```

## 🎨 Component Development

### Component Structure

```typescript
// components/ExampleComponent.tsx
import React from 'react';
import type { ComponentProps } from '../types';

interface ExampleComponentProps {
  title: string;
  description?: string;
  onClick: () => void;
}

const ExampleComponent: React.FC<ExampleComponentProps> = ({ 
  title, 
  description, 
  onClick 
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      {description && (
        <p className="text-gray-400 mt-2">{description}</p>
      )}
      <button 
        onClick={onClick}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Learn More
      </button>
    </div>
  );
};

export default ExampleComponent;
```

### Adding New Architecture Components

1. **Update Data Structure**
   ```typescript
   // data/architectureData.ts
   {
     id: 'new-component',
     component: 'New Component Name',
     tech: 'Technology Used',
     icon: React.createElement(TechIcon),
     paradigm: 'Comprehensive explanation of how this component fits into the overall architecture. Include its responsibilities, technology choices, design patterns used, performance characteristics, and how it integrates with other services. Explain the rationale behind technology selection and any architectural trade-offs made.'
   }
   ```

2. **Create Icon (if needed)**
   ```typescript
   // components/Icons.tsx
   export const NewTechIcon: React.FC<{ className?: string }> = ({ 
     className = "h-12 w-12 text-blue-500" 
   }) => (
     <svg className={className} viewBox="0 0 24 24" fill="currentColor">
       <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" />
     </svg>
   );
   ```

3. **Test Changes**
   - Component appears in correct section
   - Modal opens with detailed information
   - Icon renders properly
   - Responsive behavior works

### Styling Guidelines

**Tailwind CSS Classes:**
```typescript
// Good: Descriptive, utility-first
<div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-sky-400 transition-all duration-300">

// Use semantic color names
<span className="text-sky-300 font-mono">
<span className="text-emerald-400">
<span className="text-orange-500">

// Responsive design
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```

**Component Variants:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', ...props }) => {
  const baseClasses = 'font-semibold rounded transition-all duration-300';
  
  const variantClasses = {
    primary: 'bg-sky-500 text-white hover:bg-sky-600',
    secondary: 'bg-gray-700 text-gray-200 hover:bg-gray-600',
    outline: 'border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  const className = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
  
  return <button className={className} {...props} />;
};
```

## 🧪 Testing Strategy

### Type Safety

```bash
# Run TypeScript compiler
npm run type-check

# Fix common type issues
interface Props {
  data: ArchitectureItem[];  // Use defined types
  onSelect?: (item: ArchitectureItem) => void;  // Optional callbacks
}

// Use type assertions carefully
const element = document.getElementById('root') as HTMLElement;
```

### Manual Testing Checklist

**Component Testing:**
- [ ] Components render without errors
- [ ] Click interactions work properly
- [ ] Modal opens/closes correctly
- [ ] Icons display properly

**Responsive Testing:**
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

**Browser Testing:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Performance Testing:**
- [ ] Initial load time < 3 seconds
- [ ] Smooth animations and transitions
- [ ] No console errors or warnings

### Browser DevTools Usage

**Performance Profiling:**
```javascript
// Measure component render time
console.time('Component Render');
// Component code
console.timeEnd('Component Render');

// Memory usage
console.log(performance.memory);
```

**React DevTools:**
- Component hierarchy inspection
- Props and state debugging
- Performance profiling

## 📦 Build Process

### Development Build

```bash
npm run dev
```

**Features:**
- Source maps for debugging
- Hot module replacement
- Fast rebuild times
- Development server with proxy

### Production Build

```bash
npm run build
```

**Optimizations:**
- Code minification
- Tree shaking (unused code removal)
- Asset optimization
- Bundle splitting

**Build Output:**
```
dist/
├── index.html              # Entry HTML file
├── assets/
│   ├── index-[hash].js     # Main JavaScript bundle
│   └── index-[hash].css    # Compiled CSS (if any)
└── favicon.ico             # Static assets
```

### Build Analysis

```bash
# Analyze bundle size
npm run build -- --analyze

# Manual bundle inspection
npx vite-bundle-analyzer dist
```

## 🔧 Development Tools

### VS Code Extensions

**Essential:**
- **TypeScript and JavaScript Language Features** (built-in)
- **ES7+ React/Redux/React-Native snippets**
- **Prettier - Code formatter**
- **Auto Rename Tag**

**Recommended:**
- **Tailwind CSS IntelliSense**
- **GitLens**
- **Error Lens**
- **Bracket Pair Colorizer**

### VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

### Git Workflow

**Branch Naming:**
```bash
feature/component-name      # New features
fix/bug-description        # Bug fixes
docs/documentation-update  # Documentation changes
refactor/code-improvement  # Code refactoring
```

**Commit Messages:**
```bash
feat: add new architecture component for ML services
fix: resolve modal closing issue on mobile devices
docs: update contributing guidelines
style: improve responsive layout for cards
refactor: extract common component logic
```

## 🐛 Debugging

### Common Issues

**Build Failures:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run type-check

# Verify imports and dependencies
```

**Runtime Errors:**
```typescript
// Add error boundaries for better error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

**Performance Issues:**
```typescript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Expensive rendering */}</div>;
});

// Use useCallback for expensive functions
const handleClick = useCallback(() => {
  // Expensive operation
}, [dependency]);

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data);
}, [data]);
```

### Browser DevTools

**Console Debugging:**
```javascript
// Component debugging
console.log('Component props:', props);
console.table(data);
console.group('Component lifecycle');
console.log('Component mounted');
console.groupEnd();
```

**Network Debugging:**
- Check for failed resource loads
- Verify API calls (if any)
- Monitor bundle sizes

**Performance Tab:**
- Profile React component rendering
- Identify performance bottlenecks
- Check for memory leaks

## 📚 Learning Resources

### React/TypeScript
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Vite
- [Vite Guide](https://vitejs.dev/guide/)
- [Vite Configuration](https://vitejs.dev/config/)

### Tailwind CSS
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)

### Development Best Practices
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)
- [React Best Practices](https://react.dev/learn/thinking-in-react)

## 🚀 Next Steps

### Potential Enhancements

**Testing:**
```bash
# Add testing framework
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom

# Example test structure
src/
├── components/
│   ├── __tests__/
│   │   ├── ArchitectureCard.test.tsx
│   │   └── DetailModal.test.tsx
└── __tests__/
    └── App.test.tsx
```

**Linting:**
```bash
# Add ESLint
npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser

# Add Prettier
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

**State Management:**
```bash
# Add Zustand for complex state
npm install zustand

# Add React Query for data fetching
npm install @tanstack/react-query
```

**Internationalization:**
```bash
# Add i18next for multi-language support
npm install react-i18next i18next
```

### Performance Optimizations

- Add service worker for caching
- Implement code splitting with React.lazy
- Add image optimization
- Implement virtual scrolling for large lists

---

*This development guide will evolve as the project grows. Always refer to the latest version for current best practices.*