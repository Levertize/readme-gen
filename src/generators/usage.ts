import { ProjectContext } from '../analyzer';

export function generateUsage(ctx: ProjectContext): string {
  let output = '## 🛠️ Usage\n\n';
  
  if (Object.keys(ctx.scripts).length > 0) {
    output += '### Available Scripts\n\n';
    const pm = ctx.packageManager === 'npm' ? 'npm run' : ctx.packageManager;
    
    Object.entries(ctx.scripts).forEach(([name, cmd]) => {
      output += `- **${name}**: \`${pm} ${name}\` — ${cmd}\n`;
    });
    output += '\n';
  } else {
    output += 'Describe how to use your project here.\n';
  }

  return output;
}
