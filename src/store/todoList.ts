import {atom, selector} from 'recoil';

export const todoListState = atom<{id: string; content: string}[]>({
  key: 'todoList',
  default: [{id: Date.now().toString(), content: '吃饭'}],
});

export const todoListSelector = selector({
  key: 'todoListSelector',
  get: ({get}) => {
    const todo = get(todoListState);
    return todo.length;
  },
});
