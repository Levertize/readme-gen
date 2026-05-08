import path from 'path';
import { readJson, fileExists } from '../utils/fileSystem';
import { detectFramework, detectLanguage } from './detectFramework';
import { detectScripts, detectPackageManager } from './detectScripts';
import { detectLicense } from './detectLicense';
import { detectEnv } from './detectEnv';
import { detectStructure } from './detectStructure';

export interface EnvVar {
  name: string;
  defaultValue?: string;
  description?: string;
}

export interface ProjectContext {
  name: string;
  description: string;
  version: string;
  language: "JavaScript" | "TypeScript" | "Python" | "Go" | "Rust" | "Unknown";
  framework: string | null;
  packageManager: "npm" | "yarn" | "pnpm" | "bun";
  scripts: Record<string, string>;
  license: string | null;
  envVars: EnvVar[];
  hasTests: boolean;
  hasDocker: boolean;
  hasCI: boolean;
  isMonorepo: boolean;
  structure: string;
}

export interface PackageJson {
  name?: string;
  description?: string;
  version?: string;
  scripts?: Record<string, string>;
  license?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export function isPackageJson(data: unknown): data is PackageJson {
  return typeof data === 'object' && data !== null;
}

export async function analyzeProject(root: string): Promise<ProjectContext> {
  const data = await readJson(path.join(root, 'package.json'));
  const pkg = isPackageJson(data) ? data : null;
  
  const [
    framework,
    language,
    scripts,
    packageManager,
    license,
    envVars,
    structure
  ] = await Promise.all([
    detectFramework(root),
    detectLanguage(root),
    detectScripts(root),
    detectPackageManager(root),
    detectLicense(root),
    detectEnv(root),
    detectStructure(root)
  ]);

  return {
    name: pkg?.name || path.basename(root),
    description: pkg?.description || '',
    version: pkg?.version || '1.0.0',
    language,
    framework,
    packageManager,
    scripts,
    license,
    envVars,
    hasTests: !!(scripts.test || await fileExists(path.join(root, 'vitest.config.ts')) || await fileExists(path.join(root, 'jest.config.js'))),
    hasDocker: await fileExists(path.join(root, 'Dockerfile')),
    hasCI: await fileExists(path.join(root, '.github/workflows')) || await fileExists(path.join(root, '.gitlab-ci.yml')),
    isMonorepo: await fileExists(path.join(root, 'turbo.json')) || await fileExists(path.join(root, 'nx.json')) || !!pkg?.devDependencies?.['lerna'],
    structure
  };
}
