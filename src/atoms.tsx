import { atom } from "recoil";

interface Todo {
  id: number;
  text: string;
}

export interface ITodoState {
  [category: string]: Todo[];
}

export const todoState = atom<ITodoState[]>({
  key: "todoState",
  default: JSON.parse(localStorage.getItem("memo") as string) || [
    { Todo: [] },
    { Doing: [] },
    { Done: [] },
  ],
});
