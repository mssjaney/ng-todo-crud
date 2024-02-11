import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../todo/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  private storageInitialized = false;
  private loaded = false;

  constructor(private storage: Storage) { }

  getTodos(): Observable<Todo[]> {
    if (!this.loaded) {
      this.loadTodos();
      this.loaded = true;
    }

    return this.todos$;
  }

  addTodo(content: string) {
    this.todos$.next([
      ...this.todos$.value,
      { id: Date.now().toString(), content: content, progress: 'active' }
    ]);

    this.saveTodos();
  }

  removeTodo(id: string) {
    this.todos$.next(
      this.todos$.value.filter((todo) => todo.id !== id)
    );

    this.saveTodos();
  }

  clearAll() {
    this.storage.clear();
    this.loadTodos();
  }

  async loadTodos(): Promise<void> {
    if (!this.storageInitialized) await this.storage.create();

    const todos = await this.storage.get('todos');
    this.todos$.next(todos || []);
  }

  async saveTodos(): Promise<void> {
    if (!this.storageInitialized) await this.storage.create();

    return this.storage.set('todos', this.todos$.value);
  }
}
