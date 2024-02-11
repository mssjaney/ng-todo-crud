import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { createTodo, deleteTodo, loadTodos, setSearchTerm, updateTodo } from '../state/todos/todo.actions';
import { selectFilteredTodos, selectSearchTerm } from '../state/todos/todo.selectors';
import { Todo } from './todo.model';
import { AppState } from '../state/app.state';
import { TodoService } from './todo.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public allTodos$: Observable<Todo[]> = this.store.select(selectFilteredTodos);
  public searchTerm$: Observable<string> = this.store.select(selectSearchTerm);
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
    this.initializeData();
    this.calculateCumulativeProgress();
  }

  private initializeData() {
    this.store.dispatch(loadTodos());
    
    this.searchTerm$.subscribe((term) => {
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

  updateProgress(id: string, progress: 'active' | 'postponed' | 'completed') {
    this.store.dispatch(updateTodo({ id, progress }));
  }

  searchTodos(): void {
    this.store.dispatch(setSearchTerm({ term: this.searchTerm }));
  }

  getTodosByStatus(todos: Todo[], status: string): Todo[] {
    return todos.filter((todo) => todo.progress === status);
  }

  calculateCumulativeProgress(): void {
    this.allTodos$.pipe(
      map((todos) => ({
        completed: this.calculateStatusPercentage(todos, 'completed'),
        deleted: this.calculateStatusPercentage(todos, 'active'),
        postponed: this.calculateStatusPercentage(todos, 'postponed'),
      }))
    ).subscribe((progress) => this.cumulativeProgress = progress);
  }

  calculateStatusPercentage(todos: Todo[], status: string): number {
    const totalTodos = todos.length;
    const statusTodos = todos.filter((todo) => todo.progress === status).length;

    return (statusTodos / totalTodos) * 100 || 0;
  }

  clearAllTodos(): void {
    this.todoService.clearAllTodos();
    this.store.dispatch(loadTodos());
  }
}
