import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SimpleFormComponent } from './simple-form.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SimpleFormComponent', () => {
  let component: SimpleFormComponent;
  let fixture: ComponentFixture<SimpleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimpleFormComponent],
      imports: [FormsModule]
    }).compileComponents();
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(SimpleFormComponent);
    component = fixture.componentInstance;
    component.isTesting = true; // Avoid setValue in ngAfterViewInit.
    fixture.detectChanges();
    tick(500); // Ensures that ViewChild and ngAfterViewInit are ready.
    fixture.detectChanges();
  }));

  it('should create the simple form component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the login button disabled when the form is invalid', fakeAsync(() => {
    const emailInput = fixture.debugElement.query(By.css('input[type="email"]')).nativeElement;
    const passwordInput = fixture.debugElement.query(By.css('input[type="password"]')).nativeElement;
    emailInput.value = '';
    passwordInput.value = '';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(500);

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.login-form__button');
    expect(button.disabled).toBeTrue();
  }));

  it('should enable the login button when the form is valid', fakeAsync(() => {
    const emailInput = fixture.debugElement.query(By.css('input[type="email"]')).nativeElement;
    const passwordInput = fixture.debugElement.query(By.css('input[type="password"]')).nativeElement;
    emailInput.value = 'user@example.com';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = '123456';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(500);

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.login-form__button');
    expect(button.disabled).toBeFalse();
  }));

  it('should display email error when email is invalid and touched/dirty', fakeAsync(() => {
    const emailInput = fixture.debugElement.query(By.css('input[type="email"]')).nativeElement;
    emailInput.value = 'invalid-email';
    emailInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    tick(500);

    const errorMsg = fixture.nativeElement.querySelector('.login-form__error p');
    expect(errorMsg).not.toBeNull();
    expect(errorMsg.textContent).toContain('Invalid email');
  }));

  it('should display password error when password is too short and touched/dirty', fakeAsync(() => {
    const emailInput = fixture.debugElement.query(By.css('input[type="email"]')).nativeElement;
    emailInput.value = 'user@example.com';
    emailInput.dispatchEvent(new Event('input'));

    const passwordInput = fixture.debugElement.query(By.css('input[type="password"]')).nativeElement;
    passwordInput.value = '123';
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    tick(500);

    const errorMsgs = fixture.nativeElement.querySelectorAll('.login-form__error p');
    expect(Array.from(errorMsgs).some(e => (e as HTMLElement).textContent?.includes('at least 6 characters'))).toBeTrue();
  }));

  it('should call onSubmit and reset the form when valid', fakeAsync(() => {
    spyOn(component, 'onSubmit').and.callThrough();

    const emailInput = fixture.debugElement.query(By.css('input[type="email"]')).nativeElement;
    const passwordInput = fixture.debugElement.query(By.css('input[type="password"]')).nativeElement;
    emailInput.value = 'user@example.com';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = '123456';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(500);

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', component.form);
    fixture.detectChanges();
    tick(500);

    expect(component.onSubmit).toHaveBeenCalled();
  }));

  it('should save email to localStorage after value changes', fakeAsync(() => {
    localStorage.removeItem('saved-login-form');

    const emailInput = fixture.debugElement.query(By.css('input[type="email"]')).nativeElement;
    const passwordInput = fixture.debugElement.query(By.css('input[type="password"]')).nativeElement;
    emailInput.value = 'user@example.com';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = '123456';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(500);

    expect(localStorage.getItem('saved-login-form')).toBe(JSON.stringify('user@example.com'));
    localStorage.removeItem('saved-login-form');
  }));
});
