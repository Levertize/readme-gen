import { ProjectContext } from '../analyzer';
import { generateBadges } from '../generators/badges';
import { generateInstallation } from '../generators/installation';
import { generateUsage } from '../generators/usage';
import { generateContributing } from '../generators/contributing';

export function minimalTemplate(ctx: ProjectContext): string {
  let output = `# ${ctx.name}\n\n`;
  
  if (ctx.description) {
    output += `${ctx.description}\n\n`;
  }

  output += generateBadges(ctx);
  output += '\n';

  output += generateInstallation(ctx);
  output += generateUsage(ctx);
  output += generateContributing(ctx);

  return output;
}
