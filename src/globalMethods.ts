import { ITodoState } from './atoms';

export const saveLocalStorage = (todos: ITodoState) =>
localStorage.setItem("memo", JSON.stringify(todos));