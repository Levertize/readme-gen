import { ProjectContext } from '../analyzer';

export function generateEnvVars(ctx: ProjectContext): string {
  if (ctx.envVars.length === 0) return '';

  let output = '## 🔑 Environment Variables\n\n';
  output += 'Create a `.env` file in the root directory and add the following variables:\n\n';
  output += '| Variable | Default | Description |\n';
  output += '| :--- | :--- | :--- |\n';
  
  ctx.envVars.forEach(env => {
    output += `| \`${env.name}\` | \`${env.defaultValue || ''}\` | ${env.description || ''} |\n`;
  });

  return output + '\n';
}
