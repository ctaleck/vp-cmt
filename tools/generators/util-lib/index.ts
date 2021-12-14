import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

export default async function (tree: Tree, schema: any) {
  const name = `util-${schema.name}`;
  const directory = `${schema.directory}`;
  const type = `type:util`;
  const scope = `scope:${directory}`;
  const tags = `${type}, ${scope}`;
  console.log(`You are creating a utility library called '${name}' with tags '${tags}' in '${directory}'`);
  await libraryGenerator(tree, { name, directory, tags});
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
