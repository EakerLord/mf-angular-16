import { Component, EventEmitter, Input, Output } from '@angular/core';
import { type Lesson } from "./lesson.model";

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})

export class LessonComponent {
  @Input({required: true}) lesson!: Lesson;
  @Input({required: true}) selected!: boolean;
  @Output() select = new EventEmitter<string>();

  get imagePath() {
    return 'assets/mf-angular-16/' + this.lesson.avatar;
  }

  onSelectLesson() {
    this.select.emit(this.lesson.id);
  }
}
