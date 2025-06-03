import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksContainerComponent } from './tasks-container.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TasksContainerComponent', () => {
  let component: TasksContainerComponent;
  let fixture: ComponentFixture<TasksContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksContainerComponent],
      imports: [RouterTestingModule] // Necesario para router-outlet
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the tasks container component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a router-outlet', () => {
    const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
    expect(routerOutlet).not.toBeNull();
  });
});
