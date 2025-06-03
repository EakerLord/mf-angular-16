import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Component } from '@angular/core';

@Component({
  template: `
    <app-card>
      <span class="test-content">Test Content</span>
    </app-card>
  `
})
class TestHostComponent {}

describe('CardComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent, TestHostComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create the card component', () => {
    const cardDebugElement = fixture.debugElement.nativeElement.querySelector('app-card');
    expect(cardDebugElement).toBeTruthy();
  });

  it('should render projected content inside the card', () => {
    const cardElement: HTMLElement = fixture.nativeElement.querySelector('.card');
    expect(cardElement.textContent).toContain('Test Content');
    const projected = cardElement.querySelector('.test-content');
    expect(projected).not.toBeNull();
  });
});
