import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonComponent } from './lesson.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

describe('LessonComponent', () => {
  let component: LessonComponent;
  let fixture: ComponentFixture<LessonComponent>;

  @Component({ selector: 'app-card', template: '<ng-content></ng-content>' })
  class MockCardComponent {}

  const mockLesson = {
    id: 'lesson-1',
    name: 'Angular Basics',
    avatar: 'avatar.png'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LessonComponent, MockCardComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonComponent);
    component = fixture.componentInstance;
    component.lesson = mockLesson as any;
    component.selected = false;
    fixture.detectChanges();
  });

  it('should create the lesson component', () => {
    expect(component).toBeTruthy();
  });

  it('should render lesson name', () => {
    const nameSpan = fixture.nativeElement.querySelector('.lesson-card__name');
    expect(nameSpan).toBeTruthy();
    expect(nameSpan.textContent).toContain('Angular Basics');
  });

  it('should render lesson image with correct src and alt', () => {
    const img: HTMLImageElement = fixture.nativeElement.querySelector('.lesson-card__image');
    expect(img).toBeTruthy();
    expect(img.src).toContain('assets/mf-angular-16/avatar.png');
    expect(img.alt).toBe('Angular Basics');
  });

  it('should have a routerLink to the lesson tasks', () => {
    const button = fixture.debugElement.query(By.css('.lesson-card__button'));
    expect(button.attributes['ng-reflect-router-link']).toContain('./tasks/,lesson-1');
  });

  it('should emit select event when button is clicked', () => {
    spyOn(component.select, 'emit');
    const button = fixture.nativeElement.querySelector('.lesson-card__button');
    button.click();
    expect(component.select.emit).toHaveBeenCalledWith('lesson-1');
  });
});
