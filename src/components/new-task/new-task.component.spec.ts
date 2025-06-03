import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTaskComponent } from './new-task.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskService } from '../../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  it('should create the new task component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form title', () => {
    const title = fixture.nativeElement.querySelector('.add-task-form__title');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Add Task');
  });

  it('should render all input fields', () => {
    expect(fixture.nativeElement.querySelector('input#title')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('textarea#summary')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input#due-date')).toBeTruthy();
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

  // it('should update model values when input changes', async () => {
  //   fixture.detectChanges();

  //   const titleInput: HTMLInputElement = fixture.nativeElement.querySelector('input#title');
  //   const summaryInput: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea#summary');
  //   const dateInput: HTMLInputElement = fixture.nativeElement.querySelector('input#due-date');

  //   titleInput.value = 'Test Task';
  //   titleInput.dispatchEvent(new Event('input'));
  //   summaryInput.value = 'Summary here';
  //   summaryInput.dispatchEvent(new Event('input'));
  //   dateInput.value = '2025-06-03';
  //   dateInput.dispatchEvent(new Event('input'));

  //   await fixture.whenStable();
  //   fixture.detectChanges();

  //   expect(component.enteredTitle).toBe('Test Task');
  //   expect(component.enteredSummary).toBe('Summary here');
  //   expect(component.enteredDate).toBe('2025-06-03');
  // });

});
