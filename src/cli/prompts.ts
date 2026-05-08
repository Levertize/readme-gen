import inquirer from 'inquirer';
import { ProjectContext } from '../analyzer';

export interface PromptResults {
  name: string;
  description: string;
  template: string;
  useAi: boolean;
  outputFile: string;
  overwrite: boolean;
}

export async function runInteractivePrompts(ctx: ProjectContext): Promise<PromptResults> {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Project name:',
      default: ctx.name,
      prefix: '◆'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Project description:',
      default: ctx.description,
      prefix: '◆'
    },
    {
      type: 'list',
      name: 'template',
      message: 'Choose template:',
      choices: ['full', 'minimal', 'library'],
      default: 'full',
      prefix: '◆'
    },
    {
      type: 'confirm',
      name: 'useAi',
      message: 'Enable AI descriptions?',
      default: false,
      prefix: '◆'
    },
    {
      type: 'input',
      name: 'outputFile',
      message: 'Output file name:',
      default: 'README.md',
      prefix: '◆'
    },
    {
      type: 'confirm',
      name: 'overwrite',
      message: 'Overwrite if exists?',
      default: true,
      prefix: '◆'
    }
  ]);
}
