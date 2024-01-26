import { TodoState } from "./todos/todo.reducers";

export interface AppState {
    todos: TodoState;
}