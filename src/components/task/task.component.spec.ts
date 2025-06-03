import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { TaskService } from '../../services/tasks.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { Task } from './task.model';

// Mock para app-card
@Component({ selector: 'app-card', template: '<ng-content></ng-content>' })
class MockCardComponent {}

// Mock para app-new-request
@Component({ selector: 'app-new-request', template: '' })
class MockNewRequestComponent {
  @Output() close = new EventEmitter<void>();
}

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;

  const mockTask: Task = {
  id: '1',
  lessonId: '1',
  title: 'Test Task',
  summary: 'Task summary',
  dueDate: '2025-06-02',
  status: 'OPEN'
  };

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['updateTaskStatus', 'removeTask']);

    await TestBed.configureTestingModule({
      declarations: [TaskComponent, MockCardComponent, MockNewRequestComponent],
      providers: [
        { provide: TaskService, useValue: mockTaskService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.task = mockTask;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy(); // Cleans the timers of interval and customInterval$
  });

  it('should create the task component', () => {
    expect(component).toBeTruthy();
  });

  it('should render task title and summary', () => {
    const title = fixture.nativeElement.querySelector('.task-card__title');
    const summary = fixture.nativeElement.querySelector('.task-card__summary');
    expect(title.textContent).toContain('Test Task');
    expect(summary.textContent).toContain('Task summary');
  });

  it('should render task status', () => {
    const status = fixture.nativeElement.querySelector('.task-card__status');
    expect(status.textContent).toContain('Open');
  });

  it('should call updateTaskStatus and emit taskUpdated when changing status', () => {
    spyOn(component.taskUpdated, 'emit');
    const select: HTMLSelectElement = fixture.nativeElement.querySelector('.task-card__status-select');
    select.value = 'done';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.task-card__status-form .task-card__button');
    button.click();

    expect(mockTaskService.updateTaskStatus).toHaveBeenCalledWith('1', 'DONE');
    expect(component.taskUpdated.emit).toHaveBeenCalled();
  });

  it('should call removeTask and emit taskUpdated when completing task', () => {
    spyOn(component.taskUpdated, 'emit');
    const button = fixture.nativeElement.querySelector('.task-card__actions .task-card__button');
    button.click();
    expect(mockTaskService.removeTask).toHaveBeenCalledWith('1');
    expect(component.taskUpdated.emit).toHaveBeenCalled();
  });

  it('should set isAddingRequest to true/false when calling onStartAddRequest/onCloseAddRequest', () => {
    component.isAddingRequest = false;
    component.onStartAddRequest();
    expect(component.isAddingRequest).toBeTrue();
    component.onCloseAddRequest();
    expect(component.isAddingRequest).toBeFalse();
  });

  it('should unsubscribe from observables on destroy', () => {
    spyOn(component['regularSubscription'], 'unsubscribe');
    spyOn(component['customSubscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['regularSubscription'].unsubscribe).toHaveBeenCalled();
    expect(component['customSubscription'].unsubscribe).toHaveBeenCalled();
  });
});
