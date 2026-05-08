"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReadme = generateReadme;
const badges_1 = require("./badges");
const installation_1 = require("./installation");
const usage_1 = require("./usage");
const envVars_1 = require("./envVars");
const contributing_1 = require("./contributing");
async function generateReadme(ctx, templateType) {
    let output = `# ${ctx.name}\n\n`;
    if (ctx.description) {
        output += `${ctx.description}\n\n`;
    }
    output += (0, badges_1.generateBadges)(ctx);
    output += '\n';
    if (templateType === 'minimal') {
        output += (0, installation_1.generateInstallation)(ctx);
        output += (0, usage_1.generateUsage)(ctx);
        output += (0, contributing_1.generateContributing)(ctx);
        return output;
    }
    // Full template
    if (ctx.framework) {
        output += `**Built with ${ctx.framework}**\n\n`;
    }
    output += '## ✨ Features\n\n';
    output += '- [Add feature here]\n\n';
    output += (0, installation_1.generateInstallation)(ctx);
    output += (0, usage_1.generateUsage)(ctx);
    output += (0, envVars_1.generateEnvVars)(ctx);
    output += '## 🗂️ Project Structure\n\n';
    output += ctx.structure + '\n\n';
    output += (0, contributing_1.generateContributing)(ctx);
    return output;
}
