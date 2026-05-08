import { readJson, fileExists } from '../utils/fileSystem';
import path from 'path';
import { isPackageJson } from './index';

export async function detectScripts(root: string): Promise<Record<string, string>> {
  const data = await readJson(path.join(root, 'package.json'));
  if (isPackageJson(data)) {
    return data.scripts || {};
  }
  return {};
}

export async function detectPackageManager(root: string): Promise<"npm" | "yarn" | "pnpm" | "bun"> {
  if (await fileExists(path.join(root, 'pnpm-lock.yaml'))) return 'pnpm';
  if (await fileExists(path.join(root, 'yarn.lock'))) return 'yarn';
  if (await fileExists(path.join(root, 'bun.lockb'))) return 'bun';
  return 'npm';
}
