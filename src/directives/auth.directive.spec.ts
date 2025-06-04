import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthDirective } from './auth.directive';
import { TaskService } from '../services/tasks.service';

class MockTaskService {
  private _permission: string = '';
  taskAuthentication(_flag: boolean) {}
  activePermission = '';
  setPermission(p: string) { this.activePermission = p; }
}

@Component({
  template: `<ng-template [appAuth]="permission">Autorizado</ng-template>`
})
class TestComponent {
  permission = 'admin';
}

describe('AuthDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let taskService: MockTaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, AuthDirective],
      providers: [
        { provide: TaskService, useClass: MockTaskService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    taskService = TestBed.inject(TaskService) as any;
  });

  it('should render the template if permission matches', () => {
    taskService.setPermission('admin');
    fixture.detectChanges();
    const content = fixture.debugElement.nativeElement.textContent;
    expect(content).toContain('Autorizado');
  });

  it('should NOT render the template if permission does not match', () => {
    taskService.setPermission('user');
    fixture.detectChanges();
    const content = fixture.debugElement.nativeElement.textContent;
    expect(content).not.toContain('Autorizado');
  });

  it('should call taskAuthentication on construction', () => {
    const spy = spyOn(taskService, 'taskAuthentication');
    fixture = TestBed.createComponent(TestComponent);
    expect(spy).toHaveBeenCalledWith(true);
  });
});
