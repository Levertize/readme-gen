import { ProjectContext } from '../analyzer';
import { generateBadges } from '../generators/badges';
import { generateInstallation } from '../generators/installation';
import { generateContributing } from '../generators/contributing';

export function libraryTemplate(ctx: ProjectContext): string {
  let output = `# ${ctx.name}\n\n`;
  
  if (ctx.description) {
    output += `${ctx.description}\n\n`;
  }

  output += generateBadges(ctx);
  output += '\n';

  output += '## 📦 Installation\n\n';
  const installCmd = ctx.packageManager === 'npm' ? `npm install ${ctx.name}` : `${ctx.packageManager} add ${ctx.name}`;
  output += '```bash\n';
  output += `${installCmd}\n`;
  output += '```\n\n';

  output += '## 📖 API Documentation\n\n';
  output += '### `functionName(param)`\n\n';
  output += 'Describe your main functions and classes here.\n\n';

  output += '## 🛠️ Usage\n\n';
  output += '```typescript\n';
  output += `import { ... } from '${ctx.name}';\n\n`;
  output += '// Add usage example here\n';
  output += '```\n\n';

  output += generateContributing(ctx);

  return output;
}
