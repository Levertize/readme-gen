"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeProject = analyzeProject;
const path_1 = __importDefault(require("path"));
const fileSystem_1 = require("../utils/fileSystem");
const detectFramework_1 = require("./detectFramework");
const detectScripts_1 = require("./detectScripts");
const detectLicense_1 = require("./detectLicense");
const detectEnv_1 = require("./detectEnv");
const detectStructure_1 = require("./detectStructure");
async function analyzeProject(root) {
    const pkg = await (0, fileSystem_1.readJson)(path_1.default.join(root, 'package.json'));
    const [framework, language, scripts, packageManager, license, envVars, structure] = await Promise.all([
        (0, detectFramework_1.detectFramework)(root),
        (0, detectFramework_1.detectLanguage)(root),
        (0, detectScripts_1.detectScripts)(root),
        (0, detectScripts_1.detectPackageManager)(root),
        (0, detectLicense_1.detectLicense)(root),
        (0, detectEnv_1.detectEnv)(root),
        (0, detectStructure_1.detectStructure)(root)
    ]);
    return {
        name: pkg?.name || path_1.default.basename(root),
        description: pkg?.description || '',
        version: pkg?.version || '1.0.0',
        language,
        framework,
        packageManager,
        scripts,
        license,
        envVars,
        hasTests: !!(scripts.test || await (0, fileSystem_1.fileExists)(path_1.default.join(root, 'vitest.config.ts')) || await (0, fileSystem_1.fileExists)(path_1.default.join(root, 'jest.config.js'))),
        hasDocker: await (0, fileSystem_1.fileExists)(path_1.default.join(root, 'Dockerfile')),
        hasCI: await (0, fileSystem_1.fileExists)(path_1.default.join(root, '.github')) || await (0, fileSystem_1.fileExists)(path_1.default.join(root, '.gitlab-ci.yml')),
        structure
    };
}
