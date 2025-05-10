import { Component, Input } from '@angular/core';
import { TaskService } from "./tasks.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

export class TasksComponent {
  @Input({required: true}) lessonId!: string;
  @Input({required: true}) name!: string;

  isAddingTask = false;

  constructor(private taskService: TaskService) {}

  get selectedLessonTasks() {
    return this.taskService.getLessonTasks(this.lessonId);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }
}
