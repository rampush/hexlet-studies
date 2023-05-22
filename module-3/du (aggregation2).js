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
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [mkfile('nginx.conf', { size: 800 })]),
    mkdir('consul', [
      mkfile('config.json', { size: 1200 }),
      mkfile('data', { size: 8200 }),
      mkfile('raft', { size: 80 }),
    ]),
  ]),
  mkfile('hosts', { size: 35000 }),
  mkfile('resolve', { size: 1000 }),
]);

const getSumSizes = (tree) => {
  if (isFile(tree)) {
    return getMeta(tree).size;
  }
  const children = getChildren(tree);
  const sumSizes = children.map(getSumSizes);
  return _.sum(sumSizes);
};

const du = (tree) => {
  const children = getChildren(tree);
  const result = children.map((child) => [getName(child), getSumSizes(child)]);
  return result.sort((a, b) => b[1] - a[1]);
};

console.log(du(tree));

// [
//   ['hosts', 35000],
//   ['etc', 10280],
//   ['resolve', 1000],
// ];
