import { Component, Input } from '@angular/core';
import { type Task } from "./task.model";
import { TaskService } from '../../services/tasks.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input({required: true}) task!: Task;

  temperature: number = 39;

  constructor(private taskService: TaskService) {}

  onCompleteTask() {
    this.taskService.removeTask(this.task.id);
  }
}
