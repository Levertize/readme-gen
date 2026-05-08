import { readJson, fileExists } from '../utils/fileSystem';
import fs from 'fs-extra';
import path from 'path';
import { isPackageJson } from './index';

export async function detectLicense(root: string): Promise<string | null> {
  const data = await readJson(path.join(root, 'package.json'));
  if (isPackageJson(data) && data.license) return data.license;

  const licenseFiles = ['LICENSE', 'LICENSE.md', 'LICENSE.txt'];
  for (const f of licenseFiles) {
    const fullPath = path.join(root, f);
    if (await fileExists(fullPath)) {
      const content = await fs.readFile(fullPath, 'utf8');
      // Simple heuristic for license type if not in package.json
      if (content.includes('MIT License')) return 'MIT';
      if (content.includes('Apache License')) return 'Apache-2.0';
      if (content.includes('GNU General Public License')) return 'GPL';
      return 'Custom';
    }
  }

  return null;
}
