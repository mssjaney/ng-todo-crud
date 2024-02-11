import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoRxjsComponent } from './todo-rxjs.component';

describe('TodoRxjsComponent', () => {
  let component: TodoRxjsComponent;
  let fixture: ComponentFixture<TodoRxjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoRxjsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoRxjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
