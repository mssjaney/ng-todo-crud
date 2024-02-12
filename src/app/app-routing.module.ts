import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoComponent } from './todo/todo.component';
import { TodoRxjsComponent } from './todo-rxjs/todo-rxjs.component';

const routes: Routes = [
    { path: 'todo', component: TodoComponent },
    { path: 'rxjs', component: TodoRxjsComponent },
    { path: '', redirectTo: '/todo', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }