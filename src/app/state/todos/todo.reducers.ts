import { createReducer, on } from "@ngrx/store";
import * as TodoActions from "./todo.actions";
import { Todo } from "../../todo/todo.model";

export interface TodoState {
    todos: Todo[];
    searchTerm: string;
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: TodoState = {
    todos: [],
    searchTerm: '',
    error: null,
    status: 'pending'
}

export const todoReducer = createReducer (
    initialState,
    on(TodoActions.createTodo, (state, { content }) => ({
        ...state,
        todos: [...state.todos, { id: Date.now().toString(), content: content, progress: <'active'> 'active' }],
    })),
    on(TodoActions.deleteTodo, (state, { id }) => ({
        ...state,
        todos: state.todos.filter((todo) => todo.id !== id),
    })),
    on(TodoActions.updateTodo, (state, { id, progress }) => ({
        ...state,
        todos: state.todos.map((todo) => todo.id === id ? { ...todo, progress } : todo),
    })),
    on(TodoActions.loadTodos, (state) => ({ ...state, status: <'loading'> 'loading' })),
    on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
        ...state,
        todos: todos,
        error: null,
        status: <'success'> 'success',
    })),
    on(TodoActions.loadTodosFail, (state, { error }) => ({
        ...state,
        error: error,
        status: <'error'> 'error',
    })),
    on(TodoActions.setSearchTerm, (state, { term }) => ({
        ...state,
        searchTerm: term,
    })),
    on(TodoActions.clearSearchTerm, (state) => ({
        ...state,
        searchTerm: '',
    }))
)