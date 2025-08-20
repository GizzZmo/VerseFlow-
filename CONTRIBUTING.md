# Contributing to VerseFlow Architecture Visualizer

Thank you for your interest in contributing to the VerseFlow Architecture Visualizer! We welcome contributions from developers of all experience levels.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.x or v20.x)
- npm (comes with Node.js)
- Git
- A GitHub account

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/VerseFlow-.git
   cd VerseFlow-
   ```

2. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/GizzZmo/VerseFlow-.git
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🔄 Development Workflow

### Branching Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/your-feature-name` - Your feature branch

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing code style and patterns
   - Add comments for complex logic

3. **Test your changes**
   ```bash
   npm run type-check  # Check TypeScript types
   npm run build       # Ensure build works
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```
   
   Use conventional commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests
   - `chore:` for maintenance tasks

5. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 Code Style Guidelines

### TypeScript/React

- Use TypeScript for all new code
- Prefer functional components with hooks
- Use meaningful variable and function names
- Add type annotations for complex types
- Follow React best practices

```typescript
// Good
interface ArchitectureItemProps {
  item: ArchitectureItem;
  onSelect: (item: ArchitectureItem) => void;
}

const ArchitectureCard: React.FC<ArchitectureItemProps> = ({ item, onSelect }) => {
  // Component implementation
};

// Avoid
const Card = (props: any) => {
  // Implementation
};
```

### CSS/Styling

- Use Tailwind CSS classes
- Prefer utility classes over custom CSS
- Maintain responsive design principles
- Use semantic color names

```tsx
// Good
<div className="bg-gray-800 hover:bg-gray-700 transition-colors duration-200">

// Avoid
<div style={{ backgroundColor: '#1f2937' }}>
```

### File Organization

- Keep components small and focused
- Use meaningful file and folder names
- Group related files together
- Export components from index files when appropriate

## 🧪 Testing

Currently, the project uses basic type checking. When contributing:

1. Ensure TypeScript compilation passes
2. Test your changes manually in the browser
3. Verify responsive behavior on different screen sizes
4. Check for console errors

```bash
npm run type-check  # Must pass
npm run build       # Must succeed
```

## 📋 Pull Request Guidelines

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] TypeScript compilation passes without errors
- [ ] Build process completes successfully
- [ ] Changes are responsive and accessible
- [ ] Commit messages follow conventional format

### Pull Request Description

Include:

1. **Description**: What does this PR do?
2. **Motivation**: Why is this change needed?
3. **Changes**: List of specific changes made
4. **Screenshots**: For UI changes (required)
5. **Testing**: How was this tested?

### Example PR Template

```markdown
## Description
Add new component for displaying architecture metrics

## Motivation
Users requested a way to see performance metrics for each architecture component

## Changes
- Add MetricsCard component
- Update ArchitectureCard to show metrics button
- Add metrics data to architectureData.ts

## Screenshots
[Include before/after screenshots for UI changes]

## Testing
- [ ] TypeScript compilation passes
- [ ] Component renders correctly on desktop/mobile
- [ ] Metrics data displays properly
- [ ] No console errors
```

## 🐛 Bug Reports

When reporting bugs, include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, browser, Node.js version
6. **Screenshots**: If applicable

## 💡 Feature Requests

For new features:

1. **Use Case**: Describe the problem this solves
2. **Proposed Solution**: Your suggested approach
3. **Alternatives**: Other solutions considered
4. **Additional Context**: Any other relevant information

## 🔒 Security

If you discover a security vulnerability:

1. **Do NOT** open a public issue
2. Email the maintainers directly
3. Provide detailed information about the vulnerability
4. Allow time for the issue to be addressed before disclosure

## 📚 Resources

### Learning Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

### Project Resources

- [Project Wiki](docs/README.md)
- [Architecture Guide](docs/architecture.md)
- [Help Documentation](HELP.md)

## 🏆 Recognition

Contributors will be recognized in:

- Project README
- Release notes
- GitHub contributors page

Thank you for helping make VerseFlow Architecture Visualizer better! 🎵✨

## 📞 Questions?

- Open a [GitHub Discussion](https://github.com/GizzZmo/VerseFlow-/discussions)
- Check the [Help Documentation](HELP.md)
- Review existing [Issues](https://github.com/GizzZmo/VerseFlow-/issues)

---

*This document is living and will be updated as the project evolves.*