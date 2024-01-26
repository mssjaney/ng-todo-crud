import { createReducer, on } from "@ngrx/store";
import {
    createTodo,
    deleteTodo,
    loadTodos
} from "./todo.actions";
import { Todo } from "../../todo/todo.model";

export interface TodoState {
    todos: Todo[];
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: TodoState = {
    todos: [],
    error: null,
    status: 'pending'
}

export const todoReducer = createReducer (
    initialState,
    on(createTodo, (state, { content }) => ({
        ...state,
        todos: [...state.todos, { id: Date.now().toString(), content: content }],
    })),
    on(deleteTodo, (state, { id }) => ({
        ...state,
        todos: state.todos.filter((todo) => todo.id != id),
    })),
    on(loadTodos, (state) => ({ ...state, status: <'loading'> 'loading' }))
)