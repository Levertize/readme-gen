import { Command } from 'commander';
import path from 'path';
import fs from 'fs-extra';
import { logger, colors } from './utils/logger';
import { createSpinner } from './utils/spinner';
import { analyzeProject } from './analyzer';
import { runInteractivePrompts } from './cli/prompts';
import { generateReadme } from './generators';
import { writeReadme, fileExists, readJson } from './utils/fileSystem';
import { generateAiDescription } from './ai/generateDescription';

const program = new Command();

const PKG_VERSION = '1.0.0'; // Could be imported from package.json if desired

program
  .name('readme-gen')
  .description('Generate professional README files automatically')
  .version(PKG_VERSION);

program
  .option('-i, --interactive', 'Interactive mode')
  .option('-t, --template <type>', 'Template type (full, minimal, library)', 'full')
  .option('--ai', 'Enable AI description')
  .option('-o, --output <file>', 'Output file name', 'README.md')
  .option('-u, --update', 'Update existing README using .readmegenrc')
  .option('--dry-run', 'Preview without writing')
  .action(async (options) => {
    const startTime = Date.now();
    logger.brand(PKG_VERSION);

    const root = process.cwd();
    const configPath = path.join(root, '.readmegenrc');
    let config: any = {};

    if (await fileExists(configPath)) {
      try {
        config = await readJson(configPath);
      } catch (e) {}
    }

    // Merge options: CLI > Config > Defaults
    let activeTemplate = options.template || config.template || 'full';
    let activeOutputFile = options.output || config.output || 'README.md';
    let activeUseAi = options.ai || config.ai || false;

    if (options.update && !await fileExists(configPath)) {
      logger.error('No .readmegenrc found. Run with --interactive to create one.');
      process.exit(1);
    }

    logger.header('Analyzing project...');
    
    const spinner = createSpinner('Scanning project structure...').start();
    
    try {
      let ctx = await analyzeProject(root);
      spinner.succeed(`Detected: ${colors.accent(ctx.framework || ctx.language)}${ctx.language === 'TypeScript' ? colors.muted(' (TypeScript)') : ''}`);
      
      if (Object.keys(ctx.scripts).length > 0) {
        logger.success(`Found ${colors.accent(Object.keys(ctx.scripts).length.toString())} npm scripts`);
      }
      
      if (ctx.envVars.length > 0) {
        logger.success(`Found ${colors.accent(ctx.envVars.length.toString())} environment variables`);
      }
      
      if (ctx.license) {
        logger.success(`License: ${colors.accent(ctx.license)}`);
      } else {
        logger.muted('─ No LICENSE file detected');
      }

      if (options.interactive) {
        const answers = await runInteractivePrompts(ctx);
        ctx.name = answers.name;
        ctx.description = answers.description;
        activeTemplate = answers.template;
        activeOutputFile = answers.outputFile;
        activeUseAi = answers.useAi;

        // Save config
        await fs.writeJson(configPath, {
          template: activeTemplate,
          output: activeOutputFile,
          ai: activeUseAi
        }, { spaces: 2 });
      }

      if (activeUseAi) {
        const aiSpinner = createSpinner('Generating AI description...').start();
        try {
          ctx.description = await generateAiDescription(ctx);
          aiSpinner.succeed('AI description generated');
        } catch (err: any) {
          aiSpinner.fail(`AI generation failed: ${err.message}`);
        }
      }

      logger.header('Generating README...');
      const markdown = await generateReadme(ctx, activeTemplate);

      if (options.dryRun) {
        logger.preview(markdown);
      } else {
        await writeReadme(path.join(root, activeOutputFile), markdown);
        logger.success(`${activeOutputFile} written (${colors.accent((Buffer.byteLength(markdown) / 1024).toFixed(1) + ' KB')})`);
      }

      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      logger.summary(duration, !activeUseAi);

    } catch (error: any) {
      spinner.fail('Error analyzing project');
      logger.error(error.message);
      process.exit(1);
    }
  });

program.parse();
