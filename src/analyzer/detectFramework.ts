import { readJson, fileExists } from '../utils/fileSystem';
import path from 'path';
import { isPackageJson } from './index';

export async function detectFramework(root: string): Promise<string | null> {
  const data = await readJson(path.join(root, 'package.json'));
  if (!isPackageJson(data)) return null;

  const deps = { ...data.dependencies, ...data.devDependencies };

  if (deps['next']) return 'Next.js';
  if (deps['react'] && deps['vite']) return 'React (Vite)';
  if (deps['react']) return 'React';
  if (deps['express']) return 'Express';
  if (deps['@nestjs/core']) return 'NestJS';
  if (deps['vue']) return 'Vue';
  if (deps['svelte']) return 'Svelte';

  return null;
}

export async function detectLanguage(root: string): Promise<"JavaScript" | "TypeScript" | "Python" | "Go" | "Rust" | "Unknown"> {
  const data = await readJson(path.join(root, 'package.json'));
  if (isPackageJson(data)) {
    const deps = { ...data.dependencies, ...data.devDependencies };
    if (deps['typescript'] || await fileExists(path.join(root, 'tsconfig.json'))) {
      return 'TypeScript';
    }
    return 'JavaScript';
  }


  // Check for Python
  const pyFiles = ['requirements.txt', 'pyproject.toml', 'setup.py'];
  for (const f of pyFiles) {
    if (await fileExists(path.join(root, f))) return 'Python';
  }

  return 'Unknown';
}
