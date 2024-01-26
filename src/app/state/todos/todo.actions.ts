import { createAction, props } from "@ngrx/store";
import { Todo } from "../../todo/todo.model";

export const createTodo = createAction (
    '[Todo List] Create Todo',
    props<{ content: string }>()
);

export const deleteTodo = createAction (
    '[Todo List] Delete Todo',
    props<{ id: string }>()
);

export const loadTodos = createAction (
    '[Todo List] Load Todos'
);