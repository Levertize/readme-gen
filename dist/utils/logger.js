"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.colors = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.colors = {
    primary: chalk_1.default.white,
    accent: chalk_1.default.cyan,
    success: chalk_1.default.green,
    warning: chalk_1.default.yellow,
    error: chalk_1.default.red,
    muted: chalk_1.default.gray,
    bold: chalk_1.default.bold.white,
    dim: chalk_1.default.dim,
};
exports.logger = {
    info: (msg) => console.log(exports.colors.primary(msg)),
    success: (msg) => console.log(`${exports.colors.success('✓')} ${exports.colors.primary(msg)}`),
    accent: (msg, value) => console.log(`${exports.colors.success('✓')} ${exports.colors.primary(msg)}: ${exports.colors.accent(value)}`),
    warn: (msg) => console.log(`${exports.colors.warning('⚠')} ${exports.colors.warning(msg)}`),
    error: (msg) => console.log(`${exports.colors.error('✗')} ${exports.colors.error(msg)}`),
    muted: (msg) => console.log(exports.colors.muted(msg)),
    header: (msg) => console.log(`\n${exports.colors.accent('◆')} ${exports.colors.bold(msg)}\n`),
};
