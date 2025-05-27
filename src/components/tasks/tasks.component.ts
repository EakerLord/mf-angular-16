import { Component, Input } from '@angular/core';
import { TaskService } from '../../services/tasks.service';
import { Task } from '../task/task.model';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { DUMMY_LESSONS } from "../../assets/dummy-data";
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  @Input({required: true}) lessonId!: string;
  @Input({required: true}) lessonName!: string;

  isAddingTask = false;
  selectedFilter = 'all';

  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.lessonId = params.get('lessonId') || '';
    });

    this.route.data.subscribe(data => {
      this.lessonName = data['lessonName'];
    });
  }

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

// No subscription needed on ActivatedRouteSnapshot because of route it self.
export const resolveLessonName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const lessonId = activatedRoute.paramMap.get('lessonId');
  return DUMMY_LESSONS.find(lesson => lesson.id === lessonId)?.name || '';
};

export const resolveTitle: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  return resolveLessonName(activatedRoute, routerState) + ' tasks';
};
