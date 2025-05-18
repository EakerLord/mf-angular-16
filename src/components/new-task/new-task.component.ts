import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from '../../services/tasks.service';
@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent {
  @Input({required: true}) lessonId!: string;
  @Output() close = new EventEmitter<void>();
  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';

  constructor(private taskService: TaskService) {}

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    this.taskService.addTask({ title: this.enteredTitle, summary: this.enteredSummary, date: this.enteredDate, status: 'OPEN' }, this.lessonId );
    this.close.emit();
  };
}
