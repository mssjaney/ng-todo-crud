import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoRxjsComponent } from './todo-rxjs.component';

const routes: Routes = [
    { path: 'rxjs', component: TodoRxjsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }