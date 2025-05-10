import { Component, Input } from '@angular/core';
import { type Task } from "./task.model";
import { TaskService } from '../tasks/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent {
  @Input({required: true}) task!: Task;
  constructor(private taskService: TaskService) {}

  onCompleteTask() {
    this.taskService.removeTask(this.task.id);
  }
}
