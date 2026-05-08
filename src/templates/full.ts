import { ProjectContext } from '../analyzer';
import { generateBadges } from '../generators/badges';
import { generateInstallation } from '../generators/installation';
import { generateUsage } from '../generators/usage';
import { generateEnvVars } from '../generators/envVars';
import { generateContributing } from '../generators/contributing';

export function fullTemplate(ctx: ProjectContext): string {
  let output = `# ${ctx.name}\n\n`;
  
  if (ctx.description) {
    output += `${ctx.description}\n\n`;
  }

  output += generateBadges(ctx);
  output += '\n';

  if (ctx.framework) {
    output += `**Built with ${ctx.framework}**\n\n`;
  }

  output += '## ✨ Features\n\n';
  output += '- [Add feature here]\n\n';

  output += generateInstallation(ctx);
  output += generateUsage(ctx);
  output += generateEnvVars(ctx);

  output += '## 🗂️ Project Structure\n\n';
  output += ctx.structure + '\n\n';

  output += generateContributing(ctx);

  return output;
}
