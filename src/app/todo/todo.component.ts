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

  public cumulativeProgress: {[key: string]: number} = {};

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
    
    this.store.pipe(select(selectSearchTerm))
      .subscribe((term) => {
        this.searchTerm = term;
    });

    this.calculateCumulativeProgress();
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

  calculateCumulativeProgress(): void {
    this.allTodos$.subscribe((todos) => {
      this.cumulativeProgress = {
        completed: this.calculateStatusPercentage(todos, 'completed'),
        deleted: this.calculateStatusPercentage(todos, 'deleted'),
        postponed: this.calculateStatusPercentage(todos, 'postponed'),
      }
    });
  }

  calculateStatusPercentage(todos: Todo[], status: string): number {
    const totalTodos = todos.length;
    const statusTodos = todos.filter((todo) => todo.progress === status).length;
    
    return (statusTodos / totalTodos) * 100 || 0;
  }
}
