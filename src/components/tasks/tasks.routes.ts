import { CanDeactivateFn, Routes } from '@angular/router';
import { resolveLessonName, resolveTitle } from '../../components/tasks/tasks.component';
import { NewTaskComponent } from '../new-task/new-task.component';

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (component: NewTaskComponent) => {
  console.log(component)
  if (component.enteredTitle.length > 0 || component.enteredSummary.length > 0 || component.enteredDate.length > 0) {
    return confirm('Are you sure to leave with unsaved changes?')
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
        canDeactivate: [canLeaveEditPage]
      }
    ],
  }
];
