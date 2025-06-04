import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ErrorService } from '../shared/modal-error/service/error.service';
import { Subject } from 'rxjs';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

@Component({selector: 'app-error-modal', template: ''})
class MockErrorModalComponent {
  @Input() title: string = '';
  @Input() message: string = '';
}

@Component({selector: 'app-header', template: ''})
class MockHeaderComponent {}

@Component({selector: 'app-lesson', template: ''})
class MockLessonComponent {
  @Input() lesson: any;
  @Input() selected: boolean = false;
  @Output() select = new EventEmitter<string>();
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let errorService: jasmine.SpyObj<ErrorService>;
  let errorSubject: Subject<string>;

  beforeEach(async () => {
    errorSubject = new Subject<string>();
    errorService = jasmine.createSpyObj('ErrorService', [], { error$: errorSubject.asObservable() });

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, MockErrorModalComponent, MockHeaderComponent, MockLessonComponent],
      providers: [
        { provide: ErrorService, useValue: errorService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the error modal when there is an error', () => {
    component.error = 'Test error';
    fixture.detectChanges();
    const errorModal = fixture.nativeElement.querySelector('app-error-modal');
    expect(errorModal).not.toBeNull();
  });

  it('should not display the error modal when there is no error', () => {
    component.error = '';
    fixture.detectChanges();
    const errorModal = fixture.nativeElement.querySelector('app-error-modal');
    expect(errorModal).toBeNull();
  });

  it('should display the list of lessons', () => {
    fixture.detectChanges();
    const lessonItems = fixture.nativeElement.querySelectorAll('app-lesson');
    expect(lessonItems.length).toBe(component.lessons.length);
  });

  it('should update selectedLessonId when a lesson is selected', () => {
    const testId = component.lessons[0].id;
    component.onSelectLesson(testId);
    expect(component.selectedLessonId).toBe(testId);
  });

  it('should update error when ErrorService emits a new error', () => {
    errorSubject.next('New error');
    fixture.detectChanges();
    expect(component.error).toBe('New error');
  });
});
