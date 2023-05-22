import _ from 'lodash';
import {
  mkfile,
  mkdir,
  isDirectory,
  isFile,
  map,
  getName,
  getChildren,
  getMeta,
} from '@hexlet/immutable-fs-trees';

const tree = mkdir('/', [
  mkdir('etc', [mkfile('bashrc'), mkfile('consul.cfg')]),
  mkfile('hexletrc'),
  mkdir('bin', [mkfile('ls'), mkfile('cat')]),
]);

const changeOwner = (tree, owner) => {
  const name = getName(tree);
  const newMeta = getMeta(tree);
  newMeta.owner = owner;

  if (isFile(tree)) {
    return mkfile(name, newMeta);
  }

  const children = getChildren(tree);
  const newChildren = children.map((child) => changeOwner(child, owner));

  const newTree = mkdir(name, newChildren, newMeta);

  return newTree;
};

console.log(changeOwner(tree, 'John Doe'));
