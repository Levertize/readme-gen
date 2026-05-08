"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runInteractivePrompts = runInteractivePrompts;
const inquirer_1 = __importDefault(require("inquirer"));
async function runInteractivePrompts(ctx) {
    return inquirer_1.default.prompt([
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
