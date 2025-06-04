import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { routes as tasksRoutes } from '../components/tasks/tasks.routes';

import { Component } from '@angular/core';
@Component({ template: '' })
class DummyComponent {}

@Component({ template: '' })
class MockNotFoundComponent {}

const testRoutes = [
  {
    path: '',
    component: AppComponent,
    children: tasksRoutes.map(route => ({
      ...route,
      component: DummyComponent, // Usar component
      loadComponent: undefined // Eliminar loadComponent
    })),
    title: 'Angular 16 Task Manager'
  },
  {
    path: '**',
    component: MockNotFoundComponent,
    title: 'Page not found'
  }
];

describe('App Routing', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(testRoutes)],
      declarations: [AppComponent, DummyComponent, MockNotFoundComponent]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('should navigate to root and load AppComponent', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('');
  }));

  tasksRoutes.forEach(route => {
    it(`should navigate to child route: ${route.path}`, fakeAsync(() => {
      router.navigate([route.path]);
      tick();
      expect(location.path()).toBe('/' + route.path);
    }));
  });

  it('should navigate to not found for unknown path', fakeAsync(() => {
    router.navigate(['/unknownpath']);
    tick();
    expect(location.path()).toBe('/unknownpath');
  }));
});
