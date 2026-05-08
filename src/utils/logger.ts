import chalk from 'chalk';

export const colors = {
  primary: chalk.white,
  accent: chalk.cyan,
  success: chalk.green,
  warning: chalk.yellow,
  error: chalk.red,
  muted: chalk.gray,
  bold: chalk.bold.white,
  dim: chalk.dim,
};

const indent = '  ';

export const logger = {
  brand: (version: string) => {
    console.log(`\n${indent}┌─────────────────────────────┐`);
    console.log(`${indent}│   ${colors.bold('readme-gen')}  ${colors.muted('v' + version)}${' '.repeat(26 - version.length - 13)}│`);
    console.log(`${indent}└─────────────────────────────┘\n`);
  },
  info: (msg: string) => console.log(`${indent}${colors.primary(msg)}`),
  success: (msg: string) => console.log(`${indent}${colors.success('✓')} ${colors.primary(msg)}`),
  accent: (msg: string, value: string) => 
    console.log(`${indent}${colors.success('✓')} ${colors.primary(msg)}: ${colors.accent(value)}`),
  warn: (msg: string) => console.log(`${indent}${colors.warning('⚠')} ${colors.warning(msg)}`),
  error: (msg: string) => console.log(`${indent}${colors.error('✗')} ${colors.error(msg)}`),
  muted: (msg: string) => console.log(`${indent}${colors.muted(msg)}`),
  header: (msg: string) => console.log(`\n${indent}${colors.accent('◆')} ${colors.bold(msg)}\n`),
  summary: (duration: string, showAiHint: boolean) => {
    console.log(`\n${indent}╭──────────────────────────────────╮`);
    console.log(`${indent}│  ${colors.primary(`Done in ${duration}s`)}                    │`);
    if (showAiHint) {
      console.log(`${indent}│  ${colors.muted('readme-gen --ai for AI boost')}    │`);
    }
    console.log(`${indent}╰──────────────────────────────────╯\n`);
  },
  preview: (content: string) => {
    console.log(`\n${indent}--- ${colors.bold('DRY RUN PREVIEW')} ---\n`);
    console.log(content.split('\n').map(line => `${indent}${line}`).join('\n'));
    console.log(`\n${indent}--- ${colors.bold('END OF PREVIEW')} ---\n`);
  }
};
