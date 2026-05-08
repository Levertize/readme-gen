import { describe, it, expect, vi } from 'vitest';
import { detectFramework } from './detectFramework';
import * as fileSystem from '../utils/fileSystem';

vi.mock('../utils/fileSystem', () => ({
  readJson: vi.fn(),
  fileExists: vi.fn()
}));

describe('detectFramework', () => {
  it('should detect Next.js from dependencies', async () => {
    vi.mocked(fileSystem.readJson).mockResolvedValue({
      dependencies: { next: '14.0.0' }
    });

    const result = await detectFramework('.');
    expect(result).toBe('Next.js');
  });

  it('should detect Express from dependencies', async () => {
    vi.mocked(fileSystem.readJson).mockResolvedValue({
      dependencies: { express: '4.18.0' }
    });

    const result = await detectFramework('.');
    expect(result).toBe('Express');
  });

  it('should return null if no framework detected', async () => {
    vi.mocked(fileSystem.readJson).mockResolvedValue({
      dependencies: { lodash: '4.17.21' }
    });

    const result = await detectFramework('.');
    expect(result).toBeNull();
  });
});
