import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorModalComponent } from './error-modal.component';
import { ErrorService } from '../error.service';
import { Component, Input } from '@angular/core';

// Mock for app-modal to allow content projection
@Component({
  selector: 'app-modal',
  template: '<ng-content></ng-content>'
})
class MockModalComponent {}

describe('ErrorModalComponent', () => {
  let component: ErrorModalComponent;
  let fixture: ComponentFixture<ErrorModalComponent>;
  let errorServiceSpy: jasmine.SpyObj<ErrorService>;

  beforeEach(async () => {
    errorServiceSpy = jasmine.createSpyObj('ErrorService', ['clearError']);

    await TestBed.configureTestingModule({
      declarations: [ErrorModalComponent, MockModalComponent],
      providers: [
        { provide: ErrorService, useValue: errorServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the error modal component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title and message', () => {
    component.title = 'Test Title';
    component.message = 'Test Message';
    fixture.detectChanges();

    const titleElement: HTMLElement = fixture.nativeElement.querySelector('.modal-error__title');
    const messageElement: HTMLElement = fixture.nativeElement.querySelector('.modal-error__message');
    expect(titleElement.textContent).toContain('Test Title');
    expect(messageElement.textContent).toContain('Test Message');
  });

  it('should call errorService.clearError when Okay button is clicked', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.modal-error__button');
    button.click();
    expect(errorServiceSpy.clearError).toHaveBeenCalled();
  });

  it('should project content into app-modal', () => {
    const modalElement = fixture.nativeElement.querySelector('app-modal');
    expect(modalElement).not.toBeNull();
    const errorDiv = modalElement.querySelector('.modal-error');
    expect(errorDiv).not.toBeNull();
  });
});
