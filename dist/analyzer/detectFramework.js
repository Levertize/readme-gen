"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectFramework = detectFramework;
exports.detectLanguage = detectLanguage;
const fileSystem_1 = require("../utils/fileSystem");
const path_1 = __importDefault(require("path"));
async function detectFramework(root) {
    const pkg = await (0, fileSystem_1.readJson)(path_1.default.join(root, 'package.json'));
    if (!pkg)
        return null;
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    if (deps['next'])
        return 'Next.js';
    if (deps['react'] && deps['vite'])
        return 'React (Vite)';
    if (deps['react'])
        return 'React';
    if (deps['express'])
        return 'Express';
    if (deps['@nestjs/core'])
        return 'NestJS';
    if (deps['vue'])
        return 'Vue';
    if (deps['svelte'])
        return 'Svelte';
    return null;
}
async function detectLanguage(root) {
    const pkg = await (0, fileSystem_1.readJson)(path_1.default.join(root, 'package.json'));
    if (pkg) {
        const deps = { ...pkg.dependencies, ...pkg.devDependencies };
        if (deps['typescript'] || await (0, fileSystem_1.readJson)(path_1.default.join(root, 'tsconfig.json'))) {
            return 'TypeScript';
        }
        return 'JavaScript';
    }
    // Check for Python
    const pyFiles = ['requirements.txt', 'pyproject.toml', 'setup.py'];
    for (const f of pyFiles) {
        if (await (0, fileSystem_1.fileExists)(path_1.default.join(root, f)))
            return 'Python';
    }
    return 'Unknown';
}
