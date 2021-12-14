import { Tree, updateJson, formatFiles, getProjects, ProjectConfiguration } from '@nrwl/devkit';
import { from } from 'rxjs';

function getScopes(projectMap: Map<string, ProjectConfiguration>) {
  const projects: any[] = Array.from(projectMap).map((p) => p[1]);
  const allScopes: string[] = projects
    .map((project) =>
      project.tags.filter((tag: string) => tag.startsWith('scope:'))
    )
    .reduce((acc, tags) => [...acc, ...tags], [])
    .map((scope: string) => scope.slice(6));
    const scopeSet = new Set(allScopes);
  return Array.from(scopeSet);
}

function replaceScopes(content: string, scopes: string[]): string {
  const joinScopes = scopes.map((s) => `'${s}'`).join(' | ');
  const PATTERN = /interface Schema \{\n.*\n.*\n\}/gm;
  return content.replace(
    PATTERN,
    `interface Schema {
      name: string;
      directory: ${joinScopes};
    }`
  );
}

export default async function (host: Tree) {
  const scopes = getScopes(getProjects(host));
  console.log(`scopes found: ${scopes.concat()}`);
  updateJson(host, 'tools/generators/util-lib/schema.json', (schemaJson) => {
    schemaJson.properties.directory['x-prompt'].items = scopes.map((scope) => ({
      value: scope,
      label: scope,
    }));
    return schemaJson;
  });
  const content = host.read('tools/generators/util-lib/index.ts', 'utf-8');
  console.log(`util-lib content ${content}`)
  const newContent = replaceScopes(content, scopes);
  console.log(`util-lib new content ${newContent}`)
  host.write('tools/generators/util-lib/index.ts', newContent);
  await formatFiles(host);
}