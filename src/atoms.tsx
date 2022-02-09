import { atom } from 'recoil';

interface Todo {
  id: number;
  text: string;
}

interface todoState {
  [category: string]: Todo[];
}

export const todoState = atom<todoState>({
  key: 'todoState',
  default: {
    Todo: [],
    Doing: [],
    Done: []
  }
})