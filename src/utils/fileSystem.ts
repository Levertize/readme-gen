import fs from 'fs-extra';
import path from 'path';

export async function fileExists(filePath: string): Promise<boolean> {
  return fs.pathExists(filePath);
}

export async function readJson(filePath: string): Promise<unknown> {
  if (await fileExists(filePath)) {
    return fs.readJson(filePath);
  }
  return null;
}

export async function writeReadme(filePath: string, content: string): Promise<void> {
  await fs.writeFile(filePath, content, 'utf8');
}
