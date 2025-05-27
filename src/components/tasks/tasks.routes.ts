import { CanDeactivateFn, Routes } from '@angular/router';
import { resolveLessonName, resolveTitle } from '../../components/tasks/tasks.component';
import { NewTaskComponent } from '../new-task/new-task.component';

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (component: NewTaskComponent) => {
  if (component.enteredTitle || component.enteredSummary || component.enteredDate) {
    return confirm('Are you sure?')
  };
  return true;
};

export const routes: Routes = [
  {
    path: 'tasks/:lessonId',
    loadComponent: () => import('../tasks/tasks-container/tasks-container.component').then(m => m.TasksContainerComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('../tasks/tasks.component').then(m => m.TasksComponent),
        title: resolveTitle,
        resolve: { lessonName: resolveLessonName },
        // canDeactivate: [canLeaveEditPage]
      },
      {
        path: 'new',
        loadComponent: () => import('../new-task/new-task.component').then(m => m.NewTaskComponent),
        title: 'New task',
        // canDeactivate: [canLeaveEditPage]
      }
    ],
  }
];
