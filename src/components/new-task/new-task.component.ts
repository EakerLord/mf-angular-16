import { Component, effect, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from '../../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  isTesting = false;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) {
    if (!this.isTesting) {
      effect(() => {
        const parentParams = this.route.parent?.snapshot.paramMap;
        const id = parentParams?.get('lessonId');
        if (id) this.lessonId = id;
      });
    }
  }

  onSubmit() {
    this.taskService.addTask({ title: this.enteredTitle, summary: this.enteredSummary, date: this.enteredDate, status: 'OPEN' }, this.lessonId );
    this.router.navigate(['../'], {relativeTo: this.route});
  };
}
