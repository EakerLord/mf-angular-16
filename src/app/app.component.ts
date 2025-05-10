import { Component } from '@angular/core';
import { DUMMY_LESSONS } from "../assets/dummy-lessons"
@Component({
  selector: 'app-root-angular-16',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lessons = DUMMY_LESSONS;
  selectedLessonId?: string;

  get selectedLesson() {
    return this.lessons.find((lesson) => lesson.id === this.selectedLessonId)!;
  }

  onSelectLesson(id: string) {
    this.selectedLessonId = id;
  }
}
