const htmlTree = {
  name: 'html',
  type: 'tag-internal',
  children: [
    {
      name: 'body',
      type: 'tag-internal',
      children: [
        {
          name: 'h1',
          type: 'tag-internal',
          children: [
            {
              type: 'text',
              content: 'Сообщество',
            },
          ],
        },
        {
          name: 'p',
          type: 'tag-internal',
          children: [
            {
              type: 'text',
              content: 'Общение между пользователями Хекслета',
            },
          ],
        },
        {
          name: 'hr',
          type: 'tag-leaf',
        },
        {
          name: 'input',
          type: 'tag-leaf',
        },
        {
          name: 'div',
          type: 'tag-internal',
          className: 'hexlet-community',
          children: [
            {
              name: 'div',
              type: 'tag-internal',
              className: 'text-xs-center',
              children: [],
            },
            {
              name: 'div',
              type: 'tag-internal',
              className: 'fa fa-spinner',
              children: [],
            },
          ],
        },
      ],
    },
  ],
};

const filterEmpty = (tree) => {
  const filtered = tree.children
    .map((node) => {
      // Перед фильтрацией отфильтровываем всех потомков
      if (node.type === 'tag-internal') {
        // Тут самый важный момент. Рекурсивно вызываем функцию фильтрации.
        // Дальнейшая работа не завершится, пока функция фильтрации не отфильтрует вложенные пустые узлы.
        return filterEmpty(node);
      }
      return node;
    })
    .filter((node) => {
      const { type } = node;
      // Каждый тип фильтруется по-своему, удобно для этого использовать switch
      switch (type) {
        case 'tag-internal': {
          // К этому моменту в текущем узле отфильтрованы потомки (остались только те, которые имеют своих детей)
          const { children } = node;
          // Проверяем текущий узел, если он не пустой, возвращаем true (узел остается)
          return children.length > 0;
        }
        case 'tag-leaf':
          // Листовые узлы всегда выводятся
          return true;
        case 'text': {
          const { content } = node;
          // Для текстовых узлов просто проверяем существование контента,
          return !!content; // Для однозначности приводим значение к булевому типу
        }
      }
    });
  console.log({ ...tree, children: filtered });
  return { ...tree, children: filtered };
};

filterEmpty(htmlTree);
