import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewRequestComponent } from './new-request.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

// Mocks para los componentes hijos
@Component({ selector: 'app-favorite-places', template: '' })
class MockFavoritePlacesComponent {}

@Component({ selector: 'app-available-places', template: '' })
class MockAvailablePlacesComponent {}

describe('NewRequestComponent', () => {
  let component: NewRequestComponent;
  let fixture: ComponentFixture<NewRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NewRequestComponent,
        MockFavoritePlacesComponent,
        MockAvailablePlacesComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the new request component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title and description', () => {
    const title = fixture.nativeElement.querySelector('.place-picker__title');
    const description = fixture.nativeElement.querySelector('.place-picker__description');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('PlacePicker');
    expect(description).toBeTruthy();
    expect(description.textContent).toContain('Create your personal collection of places');
  });

  it('should render favorite and available places components', () => {
    const favorite = fixture.nativeElement.querySelector('app-favorite-places');
    const available = fixture.nativeElement.querySelector('app-available-places');
    expect(favorite).toBeTruthy();
    expect(available).toBeTruthy();
  });

  it('should emit close event when Close HTTP request button is clicked', () => {
    spyOn(component.close, 'emit');
    const button = fixture.debugElement.query(By.css('.place-picker__button')).nativeElement;
    button.click();
    expect(component.close.emit).toHaveBeenCalled();
  });
});
