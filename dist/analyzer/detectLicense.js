"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectLicense = detectLicense;
const fileSystem_1 = require("../utils/fileSystem");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
async function detectLicense(root) {
    const pkg = await (0, fileSystem_1.readJson)(path_1.default.join(root, 'package.json'));
    if (pkg?.license)
        return pkg.license;
    const licenseFiles = ['LICENSE', 'LICENSE.md', 'LICENSE.txt'];
    for (const f of licenseFiles) {
        const fullPath = path_1.default.join(root, f);
        if (await (0, fileSystem_1.fileExists)(fullPath)) {
            const content = await fs_extra_1.default.readFile(fullPath, 'utf8');
            // Simple heuristic for license type if not in package.json
            if (content.includes('MIT License'))
                return 'MIT';
            if (content.includes('Apache License'))
                return 'Apache-2.0';
            if (content.includes('GNU General Public License'))
                return 'GPL';
            return 'Custom';
        }
    }
    return null;
}
