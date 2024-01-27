import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
    createTodo,
    deleteTodo,
    loadTodos,
    loadTodosSuccess,
    loadTodosFail
} from "./todo.actions";
import { TodoService } from "src/app/todo/todo.service";
import { of, from } from "rxjs";
import { switchMap, map, catchError, withLatestFrom } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { selectAllTodos } from "./todo.selectors";
import { AppState } from "../app.state"; 

@Injectable()
export class TodoEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private todoService: TodoService
    ) {}

    loadTodos$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadTodos),
            switchMap(() => 
                from(this.todoService.getTodos()).pipe(
                    map((todos) => loadTodosSuccess({ todos: todos })),
                    catchError((error) => of(loadTodosFail({ error })))
                )
            )
        )
    );

    saveTodos$ = createEffect(() => 
        this.actions$.pipe(
            ofType(createTodo, deleteTodo),
            withLatestFrom(this.store.select(selectAllTodos)),
            switchMap(([action, todos]) => from(this.todoService.saveTodos(todos)))
        ),
        { dispatch: false }
    );
}