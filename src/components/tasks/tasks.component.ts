import { Component, Input } from '@angular/core';
import { TaskService } from '../../services/tasks.service';
import { Task } from '../task/task.model';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  @Input({required: true}) lessonId!: string;
  @Input({required: true}) name!: string;

  isAddingTask = false;
  selectedFilter = 'all';

  constructor(private taskService: TaskService) {}

  get selectedLessonTasks(): Task[] {
    const lessonTasks = this.taskService.getLessonTasks(this.lessonId);

    switch (this.selectedFilter) {
      case 'open':
        return lessonTasks.filter(task => task.status === 'OPEN');
      case 'in-progress':
        return lessonTasks.filter(task => task.status === 'IN_PROGRESS');
      case 'done':
        return lessonTasks.filter(task => task.status === 'DONE');
      default:
        return lessonTasks;
    }
  }

  onChangeTasksFilter(filter: string) {
    this.selectedFilter = filter;
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }
}
