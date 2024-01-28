import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { createTodo, deleteTodo, loadTodos, setSearchTerm, updateTodo } from '../state/todos/todo.actions';
import { selectAllTodos, selectFilteredTodos, selectSearchTerm } from '../state/todos/todo.selectors';
import { Todo } from './todo.model';
import { AppState } from '../state/app.state';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public allTodos$ = this.store.select(selectFilteredTodos);
  public searchTerm$ = this.store.select(selectSearchTerm);
  public todo = '';
  public searchTerm = '';

  public cumulativeProgress: {[key: string]: number} = {};
  public todoStatuses: string[] = ['active', 'postponed', 'completed'];
  public currentDate: Date = new Date();

  constructor(
    private store: Store<AppState>,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
    
    this.searchTerm$.subscribe((term) => {
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

  updateProgress(id: string, progress: 'active' | 'postponed' | 'completed') {
    this.store.dispatch(updateTodo({ id, progress }));
  }

  searchTodos() {
    this.store.dispatch(setSearchTerm({ term: this.searchTerm }));
  }

  calculateCumulativeProgress(): void {
    this.allTodos$.subscribe((todos) => {
      this.cumulativeProgress = {
        completed: this.calculateStatusPercentage(todos, 'completed'),
        deleted: this.calculateStatusPercentage(todos, 'active'),
        postponed: this.calculateStatusPercentage(todos, 'postponed'),
      }
    });
  }

  calculateStatusPercentage(todos: Todo[], status: string): number {
    const totalTodos = todos.length;
    const statusTodos = todos.filter((todo) => todo.progress === status).length;

    return (statusTodos / totalTodos) * 100 || 0;
  }

  getTodosByStatus(todos: Todo[], status: string): Todo[] {
    return todos.filter((todo) => todo.progress === status);
  }

  clearAllTodos(): void {
    this.todoService.clearAllTodos();

    this.store.dispatch(loadTodos());
  }
}
