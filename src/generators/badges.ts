import { ProjectContext } from '../analyzer';

export function generateBadges(ctx: ProjectContext): string {
  const badges = [];
  
  if (ctx.license) {
    badges.push(`![License: ${ctx.license}](https://img.shields.io/badge/License-${ctx.license.replace('-', '--')}-blue.svg)`);
  }
  
  if (ctx.language === 'TypeScript') {
    badges.push(`![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)`);
  }

  if (ctx.hasCI) {
    badges.push(`![Build Status](https://github.com/${ctx.name}/${ctx.name}/actions/workflows/ci.yml/badge.svg)`);
  }

  return badges.join(' ') + '\n';
}
