"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileExists = fileExists;
exports.readJson = readJson;
exports.writeReadme = writeReadme;
const fs_extra_1 = __importDefault(require("fs-extra"));
async function fileExists(filePath) {
    return fs_extra_1.default.pathExists(filePath);
}
async function readJson(filePath) {
    if (await fileExists(filePath)) {
        return fs_extra_1.default.readJson(filePath);
    }
    return null;
}
async function writeReadme(filePath, content) {
    await fs_extra_1.default.writeFile(filePath, content, 'utf8');
}
