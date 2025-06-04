import { CanDeactivateFn, Routes } from '@angular/router';
import { resolveLessonName, resolveTitle, TasksComponent } from '../../components/tasks/tasks.component';
import { NewTaskComponent } from '../new-task/new-task.component';
import { TasksContainerComponent } from './tasks-container/tasks-container.component';

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
    component: TasksContainerComponent,
    children: [
      {
        path: '',
        component: TasksComponent,
        title: resolveTitle,
        resolve: { lessonName: resolveLessonName },
        // canDeactivate: [canLeaveEditPage]
      },
      {
        path: 'new',
        component: NewTaskComponent,
        title: 'New task',
        canDeactivate: [canLeaveEditPage]
      }
    ],
  }
];
