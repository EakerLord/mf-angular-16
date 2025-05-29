import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TaskStatus, type Task } from "./task.model";
import { TaskService } from '../../services/tasks.service';
import { interval, map, Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy{
  @Input({required: true}) task!: Task;
  @Output() taskUpdated = new EventEmitter<void>();

  isAddingRequest = false // Variable needed for the HTTP request component.
  temperature: number = 39; // Variable needed for the temperature Pipe.

  // Regular Observable
  regularInterval = 0;
  private regularSubscription!: Subscription;
  // Custom Observable
  slowCurstomInterval = 0;
  private customSubscription!: Subscription;
  customInterval$ = new Observable((subscriber) => {
    setInterval(() => {
      subscriber.next({message: 'New Value', value: 1})
    }, 2000);
  });

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.regularSubscription = interval(1000).pipe( // Normal interval observable
      map((val) => val * 2)
    ).subscribe({
      next: (val) => this.regularInterval = val
    });

    this.customSubscription = this.customInterval$.subscribe({
      next: (val) => this.slowCurstomInterval = this.slowCurstomInterval + 1
    });
  }

  ngOnDestroy(): void {
    this.regularSubscription.unsubscribe();
    this.customSubscription.unsubscribe();
  }

  get taskStatus(): string {
    switch (this.task.status) {
      case 'OPEN':
        return 'Open';
      case 'IN_PROGRESS':
        return 'Working on it';
      case 'DONE':
        return 'Completed';
      default:
        return 'Open';
    }
  }
  onChangeTaskStatus(taskId: string, status: string) {
    let newStatus: TaskStatus = 'OPEN';

    switch (status) {
      case 'open':
        newStatus = 'OPEN';
        break;
      case 'in-progress':
        newStatus = 'IN_PROGRESS';
        break;
      case 'done':
        newStatus = 'DONE';
        break;
      default:
        break;
    }

    this.taskService.updateTaskStatus(taskId, newStatus);
    this.taskUpdated.emit();
  }
  onCompleteTask() {
    this.taskService.removeTask(this.task.id);
    this.taskUpdated.emit();
  }

  onStartAddRequest() { this.isAddingRequest = true };
  onCloseAddRequest() { this.isAddingRequest = false };
}
