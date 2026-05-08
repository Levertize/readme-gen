"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInstallation = generateInstallation;
function generateInstallation(ctx) {
    let output = '## 🚀 Installation\n\n';
    if (ctx.language === 'JavaScript' || ctx.language === 'TypeScript') {
        const installCmd = ctx.packageManager === 'npm' ? 'npm install' : `${ctx.packageManager} install`;
        output += '```bash\n';
        output += `git clone <repository-url>\n`;
        output += `cd ${ctx.name}\n`;
        output += `${installCmd}\n`;
        output += '```\n';
    }
    else if (ctx.language === 'Python') {
        output += '```bash\n';
        output += `git clone <repository-url>\n`;
        output += `cd ${ctx.name}\n`;
        output += `pip install -r requirements.txt\n`;
        output += '```\n';
    }
    else {
        output += '1. Clone the repository\n2. Install dependencies\n';
    }
    return output;
}
