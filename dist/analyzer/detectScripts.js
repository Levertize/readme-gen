"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectScripts = detectScripts;
exports.detectPackageManager = detectPackageManager;
const fileSystem_1 = require("../utils/fileSystem");
const path_1 = __importDefault(require("path"));
async function detectScripts(root) {
    const pkg = await (0, fileSystem_1.readJson)(path_1.default.join(root, 'package.json'));
    return pkg?.scripts || {};
}
async function detectPackageManager(root) {
    if (await (0, fileSystem_1.fileExists)(path_1.default.join(root, 'pnpm-lock.yaml')))
        return 'pnpm';
    if (await (0, fileSystem_1.fileExists)(path_1.default.join(root, 'yarn.lock')))
        return 'yarn';
    if (await (0, fileSystem_1.fileExists)(path_1.default.join(root, 'bun.lockb')))
        return 'bun';
    return 'npm';
}
