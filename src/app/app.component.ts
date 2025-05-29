import { Component } from '@angular/core';
import { DUMMY_LESSONS } from "../assets/dummy-data"
import { ErrorService } from '../shared/modal-error/error.service';
@Component({
  selector: 'app-root-angular-16',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lessons = DUMMY_LESSONS;
  selectedLessonId?: string;
  error = '';

  constructor(private errorService: ErrorService) {
    this.errorService.error$.subscribe(error => this.error = error);
  }

  get selectedLesson() {return this.lessons.find((lesson) => lesson.id === this.selectedLessonId)!};

  onSelectLesson(id: string) {this.selectedLessonId = id};
}
