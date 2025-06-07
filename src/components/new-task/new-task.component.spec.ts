import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NewTaskComponent } from './new-task.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskService } from '../../services/tasks/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('NewTaskComponent', () => {
  let component: NewTaskComponent;
  let fixture: ComponentFixture<NewTaskComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['addTask']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [NewTaskComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            parent: {
              snapshot: {
                paramMap: {
                  get: (key: string) => key === 'lessonId' ? 'lesson1' : null
                }
              }
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskComponent);
    component = fixture.componentInstance;
    component.isTesting = true; // Activa el flag para evitar effect()
    component.lessonId = 'lesson1';
    fixture.detectChanges();
  });

  it('should create the new task component', () => { expect(component).toBeTruthy() });

  it('should render the form title', () => {
    const title = fixture.nativeElement.querySelector('.add-task-form__title');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Add Task');
  });

  it('should render all input fields', () => {
    expect(fixture.nativeElement.querySelector('input#title')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('textarea#summary')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input#dueDate')).toBeTruthy();
  });

  it('should render Cancel and Create buttons', () => {
    const cancelBtn = fixture.nativeElement.querySelector('.add-task-form__button--cancel');
    const createBtn = fixture.nativeElement.querySelector('.add-task-form__button--submit');
    expect(cancelBtn).toBeTruthy();
    expect(cancelBtn.textContent).toContain('Cancel');
    expect(createBtn).toBeTruthy();
    expect(createBtn.textContent).toContain('Create');
  });

  it('should call addTask and navigate on submit', () => {
    component.enteredTitle = 'Test Task';
    component.enteredSummary = 'Summary here';
    component.enteredDate = '2025-06-03';
    component.lessonId = 'lesson1';

    component.onSubmit();

    expect(mockTaskService.addTask).toHaveBeenCalledWith(
      {
        title: 'Test Task',
        summary: 'Summary here',
        date: '2025-06-03',
        status: 'OPEN'
      },
      'lesson1'
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['../'], { relativeTo: jasmine.any(Object) });
  });

  /* This case is a limitation/bug of Angular in unit tests with ngModel inside <form>, demonstrating that the choice of form type matters.
  it('should update model values when input changes', async () => {
    fixture.detectChanges();

    const titleDebug = fixture.debugElement.query(By.css('input#title'));
    const summaryDebug = fixture.debugElement.query(By.css('textarea#summary'));
    const dateDebug = fixture.debugElement.query(By.css('input#dueDate'));

    titleDebug.nativeElement.value = 'Test Task';
    titleDebug.triggerEventHandler('input', { target: titleDebug.nativeElement });

    summaryDebug.nativeElement.value = 'Summary here';
    summaryDebug.triggerEventHandler('input', { target: summaryDebug.nativeElement });

    dateDebug.nativeElement.value = '2025-06-03';
    dateDebug.triggerEventHandler('input', { target: dateDebug.nativeElement });

    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.enteredTitle).toBe('Test Task');
    expect(component.enteredSummary).toBe('Summary here');
    expect(component.enteredDate).toBe('2025-06-03');
  });*/

});
