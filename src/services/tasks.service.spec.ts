import { TestBed } from '@angular/core/testing';
import { TaskService } from './tasks.service';
import { DUMMY_TASKS } from '../assets/dummy-data';
import { TaskStatus } from '../components/task/task.model';

describe('TaskService', () => {
  let service: TaskService;
  const mockLocalStorage = {
    getItem: jasmine.createSpy('getItem'),
    setItem: jasmine.createSpy('setItem'),
    clear: jasmine.createSpy('clear')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);

    service = TestBed.inject(TaskService);
    mockLocalStorage.getItem.calls.reset();
    mockLocalStorage.setItem.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should load tasks from localStorage if available', () => {
      const storedTasks = [...DUMMY_TASKS, {
        id: '999',
        lessonId: 'math-1',
        title: 'Test Task',
        summary: 'Test Summary',
        dueDate: '2023-01-01',
        status: 'pending'
      }];

      mockLocalStorage.getItem.and.returnValue(JSON.stringify(storedTasks));
      const freshService = new TaskService();

      expect(freshService.getLessonTasks('math-1').length).toBe(storedTasks.filter(t => t.lessonId === 'math-1').length);
    });

    it('should use dummy tasks if localStorage is empty', () => {
      mockLocalStorage.getItem.and.returnValue(null);
      const freshService = new TaskService();

      expect(freshService.getLessonTasks('math-1').length).toBe(
        DUMMY_TASKS.filter(t => t.lessonId === 'math-1').length
      );
    });
  });

  describe('Task Management', () => {
    it('should add new task and save to localStorage', () => {
      const initialCount = service.getLessonTasks('science-1').length;

      service.addTask({
        title: 'New Task',
        summary: 'New Summary',
        date: '2023-12-31',
        status: 'completed'
      }, 'science-1');

      expect(service.getLessonTasks('science-1').length).toBe(initialCount + 1);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('tasks', jasmine.any(String));
    });

    it('should remove task and update localStorage', () => {
      service.addTask({title: 'Test', summary: 'Test summary', date: '2025-01-01', status: 'pending'}, 'math-1');

      const taskToRemove = service.getLessonTasks('math-1')[0];
      const initialCount = service.getLessonTasks('math-1').length;

      service.removeTask(taskToRemove.id);

      expect(service.getLessonTasks('math-1').length).toBe(initialCount - 1);
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });

    it('should update task status and persist changes', () => {
      service.addTask({title: 'Test', summary: 'Test summary', date: '2025-01-01', status: 'pending'}, 'math-1');

      const task = service.getLessonTasks('math-1')[0];
      service.updateTaskStatus(task.id, 'DONE');

      const updatedTask = service.getLessonTasks('math-1').find(t => t.id === task.id);
      expect(updatedTask?.status).toBe('DONE');
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('Permissions', () => {
    it('should set permission to "fede" when authenticating with true', () => {
      service.taskAuthentication(true);
      expect(service.activePermission).toBe('fede');
    });

    it('should set permission to "guest" when authenticating with false', () => {
      service.taskAuthentication(false);
      expect(service.activePermission).toBe('guest');
    });
  });
});
