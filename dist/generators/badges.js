"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBadges = generateBadges;
function generateBadges(ctx) {
    const badges = [];
    if (ctx.license) {
        badges.push(`![License: ${ctx.license}](https://img.shields.io/badge/License-${ctx.license.replace('-', '--')}-blue.svg)`);
    }
    if (ctx.language === 'TypeScript') {
        badges.push(`![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)`);
    }
    if (ctx.hasCI) {
        badges.push(`![Build Status](https://img.shields.io/badge/build-passing-brightgreen)`);
    }
    return badges.join(' ') + '\n';
}
