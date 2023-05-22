const tree = {
  name: 'div',
  type: 'tag-internal',
  className: 'hexlet-community',
  children: [
    {
      name: 'div',
      type: 'tag-internal',
      className: 'old-class',
      children: [],
    },
    {
      name: 'div',
      type: 'tag-internal',
      className: 'old-class',
      children: [],
    },
  ],
};

const changeClass = (tree, oldClass, newClass) => {
  const newTree = structuredClone(tree);
  const children = newTree.children;
  const updatedChildren = children.map((node) => {
    if (node.className === oldClass) {
      node.className = newClass;
    }
    if (node.type === 'tag-internal') {
      return changeClass(node, oldClass, newClass);
    }
    return node;
  });

  return { ...newTree, children: updatedChildren };
};

console.log(changeClass(tree, 'old-class', 'new-class'));

// {
//   name: 'div',
//   type: 'tag-internal',
//   className: 'hexlet-community',
//   children: [
//     {
//       name: 'div',
//       type: 'tag-internal',
//       className: 'new-class',
//       children: [],
//     },
//     {
//       name: 'div',
//       type: 'tag-internal',
//       className: 'new-class',
//       children: [],
//     },
//   ],
// }
