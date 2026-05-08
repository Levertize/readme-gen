import { ProjectContext } from '../analyzer';
import { fullTemplate } from '../templates/full';
import { minimalTemplate } from '../templates/minimal';
import { libraryTemplate } from '../templates/library';

export async function generateReadme(ctx: ProjectContext, templateType: string): Promise<string> {
  switch (templateType) {
    case 'minimal':
      return minimalTemplate(ctx);
    case 'library':
      return libraryTemplate(ctx);
    case 'full':
    default:
      return fullTemplate(ctx);
  }
}
