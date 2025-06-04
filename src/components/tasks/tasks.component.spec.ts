import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { TaskService } from '../../services/tasks/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task/task.model';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'app-task',
  template: ''
})
class MockTaskComponent {
  @Input() task: any;
  @Output() taskUpdated = new EventEmitter<void>();
}

const mockTasks: Task[] = [
  {
    id: '1',
    lessonId: '123',
    title: 'Task 1',
    summary: 'Summary 1',
    dueDate: '2025-06-10',
    status: 'OPEN'
  },
  {
    id: '2',
    lessonId: '123',
    title: 'Task 2',
    summary: 'Summary 2',
    dueDate: '2025-06-11',
    status: 'IN_PROGRESS'
  },
  {
    id: '3',
    lessonId: '123',
    title: 'Task 3',
    summary: 'Summary 3',
    dueDate: '2025-06-12',
    status: 'DONE'
  }
];

class MockTaskService {
  getLessonTasks(lessonId: string) {
    return mockTasks;
  }
}

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let routeParamMap = new Subject<any>();
  let routeData = new Subject<any>();
  let routeParams = new Subject<any>();
  let routeQueryParams = new Subject<any>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TasksComponent, MockTaskComponent],
      providers: [
        { provide: TaskService, useClass: MockTaskService },
        {
          provide: ActivatedRoute,
          useValue: {paramMap: routeParamMap.asObservable(),data: routeData.asObservable(),params: routeParams.asObservable(),
            queryParams: routeQueryParams.asObservable()
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    component.lessonId = 'lesson1';
    component.lessonName = 'Lesson 1';
    fixture.detectChanges();
  });

  it('should create the tasks component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the lesson name in the title', () => {
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.tasks-section__title');
    expect(title.textContent).toContain("Lesson 1's Tasks");
  });

  it('should display all tasks by default', () => {
    component.displayedTasks = mockTasks;
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('app-task');
    expect(items.length).toBe(3);
  });

  it('should filter tasks by status', () => {
    component.displayedTasks = [];
    component.selectedFilter = 'open';
    component.updateDisplayedTasks();
    fixture.detectChanges();
    expect(component.displayedTasks.length).toBe(1);
    expect(component.displayedTasks[0].status).toBe('OPEN');

    component.selectedFilter = 'in-progress';
    component.updateDisplayedTasks();
    fixture.detectChanges();
    expect(component.displayedTasks.length).toBe(1);
    expect(component.displayedTasks[0].status).toBe('IN_PROGRESS');

    component.selectedFilter = 'done';
    component.updateDisplayedTasks();
    fixture.detectChanges();
    expect(component.displayedTasks.length).toBe(1);
    expect(component.displayedTasks[0].status).toBe('DONE');
  });

  it('should sort tasks ascending and descending', () => {
    component.selectedSort = 'asc';
    component.selectedFilter = 'all';
    component.updateDisplayedTasks();
    fixture.detectChanges();
    expect(component.displayedTasks[0].id).toBe('1');

    component.selectedSort = 'desc';
    component.updateDisplayedTasks();
    fixture.detectChanges();
    expect(component.displayedTasks[0].id).toBe('3');
  });

  it('should update displayedTasks when onTaskChanged is called', () => {
    spyOn(component, 'updateDisplayedTasks');
    component.onTaskChanged();
    expect(component.updateDisplayedTasks).toHaveBeenCalled();
  });

  it('should update filter when onChangeTasksFilter is called', () => {
    spyOn(component, 'updateDisplayedTasks');
    component.onChangeTasksFilter('done');
    expect(component.selectedFilter).toBe('done');
    expect(component.updateDisplayedTasks).toHaveBeenCalled();
  });

  it('should update sort and call updateDisplayedTasks when onSortChange is called', () => {
    spyOn(component, 'updateDisplayedTasks');
    component.onSortChange('desc');
    expect(component.selectedSort).toBe('desc');
    expect(component.updateDisplayedTasks).toHaveBeenCalled();
  });

  it('should toggle isAddingTask when onStartAddTask and onCloseAddTask are called', () => {
    component.onStartAddTask();
    expect(component.isAddingTask).toBeTrue();
    component.onCloseAddTask();
    expect(component.isAddingTask).toBeFalse();
  });
});
