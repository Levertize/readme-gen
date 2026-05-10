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

/**
 * Represents the comprehensive context of a project, used for generating the README.
 */
export interface ProjectContext {
  /** The name of the project. */
  name: string;
  /** A brief description of the project. */
  description: string;
  /** The version of the project. */
  version: string;
  /** The primary programming language used. */
  language: "JavaScript" | "TypeScript" | "Python" | "Go" | "Rust" | "Unknown";
  /** The detected web framework (e.g., Next.js, Express), if any. */
  framework: string | null;
  /** The detected package manager (npm, yarn, pnpm, bun). */
  packageManager: "npm" | "yarn" | "pnpm" | "bun";
  /** A dictionary of npm scripts from package.json. */
  scripts: Record<string, string>;
  /** The detected license type (e.g., MIT). */
  license: string | null;
  /** List of environment variables found in .env.example. */
  envVars: EnvVar[];
  /** Whether the project has tests configured. */
  hasTests: boolean;
  /** Whether a Dockerfile is present. */
  hasDocker: boolean;
  /** Whether CI configuration (GitHub Actions, GitLab CI) exists. */
  hasCI: boolean;
  /** Whether the project is a monorepo. */
  isMonorepo: boolean;
  /** ASCII tree representation of the project structure. */
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

/**
 * Orchestrates the full analysis of the project.
 * Runs all sub-analyzers in parallel to gather metadata.
 * 
 * @param root - The absolute path to the project root directory.
 * @returns A Promise resolving to a ProjectContext object.
 */
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
