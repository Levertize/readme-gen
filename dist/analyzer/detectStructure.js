"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectStructure = detectStructure;
const glob_1 = require("glob");
const path_1 = __importDefault(require("path"));
async function detectStructure(root) {
    const files = await (0, glob_1.glob)('**/*', {
        cwd: root,
        ignore: ['node_modules/**', '.git/**', 'dist/**', 'build/**', '.next/**', 'coverage/**'],
        maxDepth: 2,
        nodir: false
    });
    const structure = {};
    const rootFiles = [];
    files.sort().forEach(file => {
        const parts = file.split(path_1.default.sep);
        if (parts.length === 1) {
            rootFiles.push(parts[0]);
        }
        else {
            const parent = parts[0];
            if (!structure[parent])
                structure[parent] = [];
            structure[parent].push(parts[1]);
        }
    });
    let output = '```\n';
    output += path_1.default.basename(root) + '/\n';
    const dirs = Object.keys(structure).sort();
    const topLevelFiles = rootFiles.filter(f => !dirs.includes(f)).sort();
    topLevelFiles.forEach((f, idx) => {
        const isLast = idx === topLevelFiles.length - 1 && dirs.length === 0;
        output += `${isLast ? '└──' : '├──'} ${f}\n`;
    });
    dirs.forEach((dir, idx) => {
        const isLastDir = idx === dirs.length - 1;
        output += `${isLastDir ? '└──' : '├──'} ${dir}/\n`;
        const subItems = [...new Set(structure[dir])].sort();
        subItems.forEach((sub, subIdx) => {
            const isLastSub = subIdx === subItems.length - 1;
            output += `${isLastDir ? ' ' : '│'}   ${isLastSub ? '└──' : '├──'} ${sub}\n`;
        });
    });
    output += '```';
    return output;
}
