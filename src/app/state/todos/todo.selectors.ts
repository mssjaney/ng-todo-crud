import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { TodoState } from "./todo.reducers";

export const selectTodos = (state: AppState) => state.todos;

export const selectAllTodos = createSelector (
    selectTodos,
    (state: TodoState) => state.todos
);

export const selectSearchTerm = createSelector(
    selectTodos,
    (state: TodoState) => state.searchTerm
);
  
export const selectFilteredTodos = createSelector(
    selectTodos,
    selectSearchTerm,
    (state: TodoState, searchTerm) => {
        const term = searchTerm.toLowerCase();
        
        return state.todos.filter((todo) => todo.content.toLowerCase().includes(term));
    }
);
