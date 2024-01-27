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

export const loadTodosSuccess = createAction (
    '[Todo API] Load Todos Success',
    props<{ todos: Todo[] }>()
);

export const loadTodosFail = createAction (
    '[Todo API] Load Todos Fail',
    props<{ error: string }>()
);