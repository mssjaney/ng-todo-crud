import { createReducer, on } from "@ngrx/store";
import {
    createTodo,
    deleteTodo,
    loadTodos,
    loadTodosSuccess,
    loadTodosFail,
    setSearchTerm,
    clearSearchTerm,
    updateTodo
} from "./todo.actions";
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
    on(createTodo, (state, { content }) => ({
        ...state,
        todos: [...state.todos, { id: Date.now().toString(), content: content, progress: <'active'> 'active' }],
    })),
    on(deleteTodo, (state, { id }) => ({
        ...state,
        todos: state.todos.filter((todo) => todo.id != id),
    })),
    on(updateTodo, (state, { id, progress }) => ({
        ...state,
        todos: state.todos.map((todo) => todo.id === id ? { ...todo, progress } : todo),
    })),
    on(loadTodos, (state) => ({ ...state, status: <'loading'> 'loading' })),
    on(loadTodosSuccess, (state, { todos }) => ({
        ...state,
        todos: todos,
        error: null,
        status: <'success'> 'success',
    })),
    on(loadTodosFail, (state, { error }) => ({
        ...state,
        error: error,
        status: <'error'> 'error',
    })),
    on(setSearchTerm, (state, { term }) => ({
        ...state,
        searchTerm: term,
    })),
    on(clearSearchTerm, (state) => ({
        ...state,
        searchTerm: '',
    }))
)