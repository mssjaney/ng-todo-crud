import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TodoRxjsComponent } from './todo-rxjs.component';

@NgModule({
  declarations: [
    TodoRxjsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule
  ]
})
export class TodoRxjsModule { }
