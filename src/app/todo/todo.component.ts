import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { createTodo, deleteTodo, loadTodos } from '../state/todos/todo.actions';
import { selectAllTodos } from '../state/todos/todo.selectors';
import { Todo } from './todo.model';
import { AppState } from '../state/app.state';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public allTodos$ = this.store.select(selectAllTodos);
  public todo = '';

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
  }

  createTodo() {
    this.store.dispatch(createTodo({ content: this.todo }));
    this.todo = '';
  }

  deleteTodo(todo: Todo) {
    this.store.dispatch(deleteTodo({ id: todo.id }));
  }
}
