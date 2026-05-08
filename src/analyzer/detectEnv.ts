import { fileExists } from '../utils/fileSystem';
import fs from 'fs-extra';
import path from 'path';
import { EnvVar } from './index';

export async function detectEnv(root: string): Promise<EnvVar[]> {
  const envFiles = ['.env.example', '.env.sample', '.env.template'];
  for (const f of envFiles) {
    const fullPath = path.join(root, f);
    if (await fileExists(fullPath)) {
      const content = await fs.readFile(fullPath, 'utf8');
      const lines = content.split('\n');
      const envVars: EnvVar[] = [];

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [name, ...rest] = trimmed.split('=');
          if (name) {
            envVars.push({
              name: name.trim(),
              defaultValue: rest.join('=').trim() || undefined
            });
          }
        }
      }
      return envVars;
    }
  }

  return [];
}
