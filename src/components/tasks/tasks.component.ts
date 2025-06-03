import { Component, Input } from '@angular/core';
import { TaskService } from '../../services/tasks.service';
import { Task } from '../task/task.model';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { DUMMY_LESSONS } from "../../assets/dummy-data";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  @Input({required: true}) lessonId!: string;
  @Input({required: true}) lessonName!: string;

  isAddingTask = false;
  displayedTasks: Task[] = [];
  selectedFilter = 'all';
  selectedSort: 'asc' | 'desc' = 'asc';
  private queryParamsSub?: Subscription;

  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.lessonId = params.get('lessonId') || '';
    });
    this.route.data.subscribe(data => {
      this.lessonName = data['lessonName'];
    });

    this.queryParamsSub = this.route.params.subscribe(params => {
      this.lessonId = params['lessonId'];
      this.route.queryParams.subscribe(qParams => {
        this.selectedSort = qParams['sort'] === 'desc' ? 'desc' : 'asc';
        this.updateDisplayedTasks();
      });
    });
  }

  onChangeTasksFilter(filter: string) {
    this.selectedFilter = filter;
    this.updateDisplayedTasks();
  }
  onSortChange(sort: string): void {
    this.selectedSort = sort === 'desc' ? 'desc' : 'asc';
    history.replaceState({}, '', `?sort=${this.selectedSort}`);
    this.updateDisplayedTasks();
  }
  onTaskChanged() {
    this.updateDisplayedTasks();
  }
  updateDisplayedTasks(): void {
    const tasks = this.taskService.getLessonTasks(this.lessonId);

    let filtered = tasks;
    switch (this.selectedFilter) {
      case 'open':
        filtered = tasks.filter(t => t.status === 'OPEN');
        break;
      case 'in-progress':
        filtered = tasks.filter(t => t.status === 'IN_PROGRESS');
        break;
      case 'done':
        filtered = tasks.filter(t => t.status === 'DONE');
        break;
    }

    this.displayedTasks = filtered.sort((a, b) =>
      this.selectedSort === 'asc'
        ? a.id.localeCompare(b.id)
        : b.id.localeCompare(a.id)
    );
  }
  ngOnDestroy(): void {
    this.queryParamsSub?.unsubscribe();
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
