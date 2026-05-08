"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const ora_1 = __importDefault(require("ora"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("./utils/logger");
const analyzer_1 = require("./analyzer");
const prompts_1 = require("./cli/prompts");
const generators_1 = require("./generators");
const fileSystem_1 = require("./utils/fileSystem");
const generateDescription_1 = require("./ai/generateDescription");
const program = new commander_1.Command();
program
    .name('readme-gen')
    .description('Generate professional README files automatically')
    .version('1.0.0');
program
    .option('-i, --interactive', 'Interactive mode')
    .option('-t, --template <type>', 'Template type (full, minimal, library)', 'full')
    .option('--ai', 'Enable AI description')
    .option('-o, --output <file>', 'Output file name', 'README.md')
    .option('--dry-run', 'Preview without writing')
    .action(async (options) => {
    const startTime = Date.now();
    logger_1.logger.header('Analyzing project...');
    const spinner = (0, ora_1.default)('Scanning project structure...').start();
    const root = process.cwd();
    try {
        let ctx = await (0, analyzer_1.analyzeProject)(root);
        spinner.succeed(`Detected: ${ctx.framework || ctx.language}${ctx.language === 'TypeScript' ? ' (TypeScript)' : ''}`);
        if (Object.keys(ctx.scripts).length > 0) {
            logger_1.logger.success(`Found ${Object.keys(ctx.scripts).length} npm scripts`);
        }
        if (ctx.envVars.length > 0) {
            logger_1.logger.success(`Found ${ctx.envVars.length} environment variables`);
        }
        if (ctx.license) {
            logger_1.logger.success(`License: ${ctx.license}`);
        }
        else {
            logger_1.logger.muted('─ No LICENSE file detected');
        }
        let template = options.template;
        let outputFile = options.output;
        if (options.interactive) {
            const answers = await (0, prompts_1.runInteractivePrompts)(ctx);
            ctx.name = answers.name;
            ctx.description = answers.description;
            template = answers.template;
            outputFile = answers.outputFile;
            if (answers.useAi)
                options.ai = true;
        }
        if (options.ai) {
            const aiSpinner = (0, ora_1.default)('Generating AI description...').start();
            try {
                ctx.description = await (0, generateDescription_1.generateAiDescription)(ctx);
                aiSpinner.succeed('AI description generated');
            }
            catch (err) {
                aiSpinner.fail(`AI generation failed: ${err.message}`);
            }
        }
        logger_1.logger.header('Generating README...');
        const markdown = await (0, generators_1.generateReadme)(ctx, template);
        if (options.dryRun) {
            console.log('\n--- DRY RUN PREVIEW ---\n');
            console.log(markdown);
            console.log('\n--- END OF PREVIEW ---\n');
        }
        else {
            await (0, fileSystem_1.writeReadme)(path_1.default.join(root, outputFile), markdown);
            logger_1.logger.success(`${outputFile} written (${(Buffer.byteLength(markdown) / 1024).toFixed(1)} KB)`);
        }
        const duration = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log(`\n╭──────────────────────────────────╮`);
        console.log(`│  Done in ${duration}s                    │`);
        if (!options.ai) {
            console.log(`│  readme-gen --ai for AI boost    │`);
        }
        console.log(`╰──────────────────────────────────╯\n`);
    }
    catch (error) {
        spinner.fail('Error analyzing project');
        logger_1.logger.error(error.message);
        process.exit(1);
    }
});
program.parse();
