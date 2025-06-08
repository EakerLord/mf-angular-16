import { CanDeactivateFn, Routes } from '@angular/router';
import { resolveLessonName, resolveTitle, TasksComponent } from '../../components/tasks/tasks.component';
import { NewTaskComponent } from '../new-task/new-task.component';
import { TasksContainerComponent } from './tasks-container/tasks-container.component';
import { canLeaveEditPage } from '../../guards/can-leave-edit-page/can-leave-edit-page.guard';

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
