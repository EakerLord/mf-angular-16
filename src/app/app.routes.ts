import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { routes as tasksRoutes } from "../components/tasks/tasks.routes";

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: tasksRoutes,
    title: 'Angular 16 Task Manager'
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Page not found'
  }
];
