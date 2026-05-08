import { ProjectContext } from '../analyzer';

export function generateContributing(ctx: ProjectContext): string {
  let output = '## 🤝 Contributing\n\n';
  output += 'Contributions are welcome! Please feel free to submit a Pull Request.\n\n';
  
  if (ctx.license) {
    output += `## 📄 License\n\n`;
    output += `This project is licensed under the ${ctx.license} License.\n`;
  }

  return output;
}
