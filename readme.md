# readme-gen

Generate professional README files automatically by analyzing your project's structure, dependencies, and metadata.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)

## 🚀 Overview

**readme-gen** is a powerful CLI tool designed for developers who want professional documentation without the manual chore. It scans your codebase to detect frameworks, languages, scripts, and environment variables, then weaves them into a structured Markdown file.

## ✨ Features

- **Auto-Detection:** Inferred language, framework, and package manager.
- **Script Parsing:** Automatically lists available `npm`/`yarn`/`pnpm` scripts.
- **Environment Discovery:** Generates tables from `.env.example`.
- **ASCII Tree:** Beautiful project structure visualization.
- **AI Boost:** (Optional) Powered by Google Gemini to write compelling project descriptions.
- **Templates:** Choose between `full`, `minimal`, or `library` layouts.
- **Persistence:** Save preferences to `.readmegenrc` for one-command updates.

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/user/readme-gen.git

# Enter the directory
cd readme-gen

# Install dependencies
npm install

# Build the project
npm run build
```

## 🛠️ Usage

### Basic Commands

```bash
# Analyze and generate README.md
npx ts-node src/index.ts

# Interactive mode (Customization + Config saving)
npx ts-node src/index.ts --interactive

# Use AI for project description (Requires GEMINI_API_KEY)
npx ts-node src/index.ts --ai

# Update based on .readmegenrc
npx ts-node src/index.ts --update

# Preview without saving
npx ts-node src/index.ts --dry-run
```

### CLI Options

| Flag | Description |
| :--- | :--- |
| `-i, --interactive` | Step-by-step setup prompts |
| `-t, --template <type>` | `full` (default), `minimal`, or `library` |
| `--ai` | Enable AI-powered description generation |
| `-o, --output <file>` | Specify output filename (default: `README.md`) |
| `-u, --update` | Refresh README using `.readmegenrc` settings |
| `--dry-run` | Output preview to terminal instead of file |

## 🔑 Environment Variables

If using the `--ai` feature, ensure you have your API key set:

| Variable | Description |
| :--- | :--- |
| `GEMINI_API_KEY` | Your Google AI Studio API Key |

## 🗂️ Project Structure

```
readme-gen/
├── GEMINI.md            # Project specification
├── package.json         # Dependencies & scripts
├── tsconfig.json        # TypeScript configuration
└── src/
    ├── ai/              # AI service integration
    ├── analyzer/        # Project analysis logic
    ├── cli/             # Inquirer prompts
    ├── generators/      # Markdown section logic
    ├── templates/       # README layout definitions
    └── utils/           # Shared helpers (logger, fs)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
