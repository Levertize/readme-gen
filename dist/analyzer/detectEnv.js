"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectEnv = detectEnv;
const fileSystem_1 = require("../utils/fileSystem");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
async function detectEnv(root) {
    const envFiles = ['.env.example', '.env.sample', '.env.template'];
    for (const f of envFiles) {
        const fullPath = path_1.default.join(root, f);
        if (await (0, fileSystem_1.fileExists)(fullPath)) {
            const content = await fs_extra_1.default.readFile(fullPath, 'utf8');
            const lines = content.split('\n');
            const envVars = [];
            for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed && !trimmed.startsWith('#')) {
                    const [name, ...rest] = trimmed.split('=');
                    if (name) {
                        envVars.push({
                            name: name.trim(),
                            defaultValue: rest.join('=').trim() || undefined
                        });
                    }
                }
            }
            return envVars;
        }
    }
    return [];
}
