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

/*
  selectedLesson = DUMMY_LESSONS[randomIndex];

  Getter para usar el property biding: [src]="imagePath"
  get imagePath() {
    return 'assets/' + this.lessonAvatar;
  }

  Metodo para usar el event biding: (click)="onSelectLesson()"
  onSelectLesson() {
    console.log('Clicked!');
  }
*/
