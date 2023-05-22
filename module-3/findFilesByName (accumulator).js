import path from 'path';
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
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [mkfile('nginx.conf', { size: 800 })]),
    mkdir('consul', [
      mkfile('config.json', { size: 1200 }),
      mkfile('data', { size: 8200 }),
      mkfile('raft', { size: 80 }),
    ]),
  ]),
  mkfile('hosts', { size: 3500 }),
  mkfile('resolve', { size: 1000 }),
]);

const findFilesByName = (tree, sbstr) => {
  const iter = (node, ancestry) => {
    const name = getName(node);
    ancestry += `${name}/`;
    const children = getChildren(node);

    if (name.includes(sbstr) && isFile(node)) {
      return ancestry.slice(1, -1);
    }

    if (isFile(node)) {
      return [];
    }

    return children.flatMap((child) => iter(child, ancestry));
  };

  return iter(tree, '');
};

console.log(findFilesByName(tree, 'co'));

// ['/etc/nginx/nginx.conf', '/etc/consul/config.json']
