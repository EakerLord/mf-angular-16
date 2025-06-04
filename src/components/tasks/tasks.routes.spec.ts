import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { provideRouter } from '@angular/router';
import { routes } from './tasks.routes';

import { Component } from '@angular/core';

// Mocks para los componentes usados en las rutas
@Component({ template: '' })
class MockTasksContainerComponent {}

@Component({ template: '' })
class MockTasksComponent {}

@Component({ template: '' })
class MockNewTaskComponent {}

const mockResolveLessonName = () => 'Mock Lesson';
const mockResolveTitle = () => 'Mock Title';
const mockCanLeaveEditPage = () => true;

const testRoutes = [
  {
    path: 'tasks/:lessonId',
    component: MockTasksContainerComponent,
    children: [
      {
        path: '',
        component: MockTasksComponent,
        title: mockResolveTitle,
        resolve: { lessonName: mockResolveLessonName }
      },
      {
        path: 'new',
        component: MockNewTaskComponent,
        title: 'New task',
        canDeactivate: [mockCanLeaveEditPage]
      }
    ]
  }
];

describe('Tasks Routing', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(testRoutes)],
      declarations: [
        MockTasksContainerComponent,
        MockTasksComponent,
        MockNewTaskComponent
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('should navigate to /tasks/123 and load TasksComponent', fakeAsync(() => {
    router.navigate(['/tasks/123']);
    tick();
    expect(location.path()).toBe('/tasks/123');
  }));

  it('should navigate to /tasks/123/new and load NewTaskComponent', fakeAsync(() => {
    router.navigate(['/tasks/123/new']);
    tick();
    expect(location.path()).toBe('/tasks/123/new');
  }));
});
