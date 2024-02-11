import { Component } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from '../todo/todo.model';

@Component({
  selector: 'app-todo-rxjs',
  templateUrl: './todo-rxjs.component.html',
  styleUrls: ['./todo-rxjs.component.scss']
})
export class TodoRxjsComponent {
  public allTodos$ = this.todoService.getTodos();
  public todo = '';

  public currentDate: Date = new Date();

  constructor(private todoService: TodoService) { }

  addTodo() {
    this.todoService.addTodo(this.todo);
    this.todo = '';
  }

  removeTodo(todo: Todo) {
    this.todoService.removeTodo(todo.id);
  }

  clearAllTodos() {
    this.todoService.clearAll();
  }
}
