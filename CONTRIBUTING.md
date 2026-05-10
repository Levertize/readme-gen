# Contributing to readme-gen

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to **readme-gen**. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## 🚀 How Can I Contribute?

### Reporting Bugs
If you find a bug, please open an issue and include:
- Your OS and Node.js version.
- The command you ran.
- The expected behavior and what actually happened.
- Any error logs or stack traces.

### Suggesting Enhancements
We love new ideas! If you have a feature request:
- Check if the feature already exists or has been requested.
- Open an issue describing the feature, the use case, and how it should work.

### Pull Requests
1. **Fork the repo** and create your branch from `main`.
2. **Install dependencies**: `npm install`.
3. **Make your changes**. If you're adding an analyzer or generator, add tests!
4. **Run tests**: `npm test`.
5. **Lint your code**: `npm run lint`.
6. **Submit a PR** with a clear description of what you've done.

## 🛠️ Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/readme-gen.git
cd readme-gen

# Install dependencies
npm install

# Build & Link for local testing
npm run build
npm link
```

## 🧪 Testing Strategy

All new features should include unit tests. We use **Vitest**.
- Analyzers: Test with mock project structures.
- Generators: Test with various `ProjectContext` scenarios.

## 📜 Code Style

- Use TypeScript.
- Follow the existing camelCase for files and PascalCase for types.
- Ensure all async operations are properly handled.
- Use `logger.ts` for any CLI output.

---

By contributing, you agree that your contributions will be licensed under its MIT License.
