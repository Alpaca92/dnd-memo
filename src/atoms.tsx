import { atom } from "recoil";

interface Todo {
  id: number;
  text: string;
}

export interface ITodoState {
  [category: string]: Todo[];
}

export const todoState = atom<ITodoState>({
  key: "todoState",
  default: JSON.parse(localStorage.getItem("memo") as string) || {
    Todo: [
      { id: 1, text: "hello" },
      { id: 2, text: "hello2" },
      { id: 3, text: "hello3" },
      { id: 4, text: "hello4" },
    ],
    Doing: [
      { id: 5, text: "doing" },
      { id: 6, text: "doing2" },
      { id: 7, text: "doing3" },
      { id: 8, text: "doing4" },
    ],
    Done: [
      { id: 9, text: "done" },
      { id: 10, text: "done2" },
    ],
  },
});
