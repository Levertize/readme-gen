# readme-gen: Technical Documentation

This document provides a deep dive into the architecture, configuration, and extension of **readme-gen**.

---

## 🏛️ Architecture

`readme-gen` follows a modular pipeline: **Analyze** → **Process** → **Generate**.

### 1. Analyzer (`src/analyzer/`)
The analyzer is the "brain" of the tool. It scans the filesystem to build a `ProjectContext`.
- **Parallel Execution**: Uses `Promise.all` to run sub-analyzers (scripts, env, framework) concurrently for speed.
- **Heuristics**: Detects frameworks by checking `package.json` dependencies and presence of specific configuration files (e.g., `next.config.js`).
- **Structure**: Generates an ASCII tree of the project structure, limited to 2 levels deep by default.

### 2. Generators (`src/generators/`)
Pure functions that take a `ProjectContext` and return Markdown strings.
- `badges.ts`: Creates Shields.io badges for License, Version, and Language.
- `installation.ts`: Detects the package manager (`npm`, `yarn`, `pnpm`, `bun`) and generates the correct install command.
- `usage.ts`: Lists scripts from `package.json` that are likely intended for user execution.

### 3. Templates (`src/templates/`)
Layout definitions that orchestrate which generators to call and in what order.
- **Full**: Comprehensive layout for applications.
- **Minimal**: Essential sections only.
- **Library**: Focused on installation and API usage.

---

## ⚙️ Configuration (`.readmegenrc`)

The tool supports a persistent configuration file in JSON format. This allows for "one-command" updates after initial setup.

**Example `.readmegenrc`:**
```json
{
  "template": "full",
  "output": "README.md",
  "ai": true
}
```

### Schema
| Key | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `template` | `string` | `"full"` | Layout type to use. |
| `output` | `string` | `"README.md"` | Target filename. |
| `ai` | `boolean` | `false` | Whether to use AI for descriptions. |

---

## 🤖 AI Integration

`readme-gen` uses **Google Gemini** (via `@google/generative-ai`) to generate project descriptions.

### How it works:
1. The `ProjectContext` (framework, scripts, dependencies) is sent as a prompt.
2. Gemini summarizes the project's purpose based on its tech stack.
3. The result is injected into the `description` field of the context before template rendering.

**Setup:**
Export your API key as an environment variable:
```bash
export GEMINI_API_KEY=your_key_here
```

---

## 🛠️ Development

### Setup
```bash
npm install
```

### Build & Run
```bash
npm run build
node dist/index.js
```

### Running Tests
We use `vitest` for unit testing the analyzers and generators.
```bash
npm test
```

### Adding a New Template
1. Create a new file in `src/templates/`.
2. Define your layout function following the `ProjectContext => string` signature.
3. Register it in `src/generators/index.ts`.

---

## 🔍 Troubleshooting

- **AI Generation Fails**: Ensure `GEMINI_API_KEY` is set and you have internet access.
- **Wrong Framework Detected**: The analyzer checks `dependencies` in `package.json`. If multiple frameworks are present, it picks the first match in the priority list.
- **Missing Scripts**: Only scripts found in `package.json` are parsed. Custom non-standard script locations are not currently supported.
