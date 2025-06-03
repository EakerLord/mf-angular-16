import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlacesContainerComponent } from './places-container.component';
import { Component } from '@angular/core';

@Component({
  template: `
    <app-places-container [title]="'Test Title'">
      <span class="projected-content">Projected Content</span>
    </app-places-container>
  `
})
class TestHostComponent {}

describe('PlacesContainerComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlacesContainerComponent, TestHostComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create the places container component', () => {
    const container = fixture.debugElement.nativeElement.querySelector('app-places-container');
    expect(container).toBeTruthy();
  });

  it('should render the title', () => {
    const title = fixture.nativeElement.querySelector('.content-section__title');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Test Title');
  });

  it('should render projected content', () => {
    const projected = fixture.nativeElement.querySelector('.projected-content');
    expect(projected).toBeTruthy();
    expect(projected.textContent).toContain('Projected Content');
  });
});
