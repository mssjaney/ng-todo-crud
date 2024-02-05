import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './todo-rxjs-routing.module';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TodoRxjsComponent } from './todo-rxjs.component';

@NgModule({
  declarations: [
    TodoRxjsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule
  ]
})
export class TodoRxjsModule { }
