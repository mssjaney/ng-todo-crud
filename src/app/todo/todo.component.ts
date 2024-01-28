import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { createTodo, deleteTodo, loadTodos, setSearchTerm, updateTodo } from '../state/todos/todo.actions';
import { selectAllTodos, selectFilteredTodos, selectSearchTerm } from '../state/todos/todo.selectors';
import { Todo } from './todo.model';
import { AppState } from '../state/app.state';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public allTodos$ = this.store.select(selectFilteredTodos);
  public todo = '';
  public searchTerm = '';

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
    
    this.store.pipe(select(selectSearchTerm))
      .subscribe((term) => {
        this.searchTerm = term;
    });
  }

  createTodo() {
    this.store.dispatch(createTodo({ content: this.todo }));
    this.todo = '';
  }

  deleteTodo(todo: Todo) {
    this.store.dispatch(deleteTodo({ id: todo.id }));
  }

  updateProgress(id: string, progress: 'active' | 'completed' | 'deleted' | 'postponed') {
    this.store.dispatch(updateTodo({ id, progress }));
  }

  searchTodos() {
    this.store.dispatch(setSearchTerm({ term: this.searchTerm }));
  }
}
