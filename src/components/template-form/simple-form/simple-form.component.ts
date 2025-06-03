import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss']
})
export class SimpleFormComponent implements AfterViewInit, OnDestroy {
  @ViewChild('form') form!: NgForm;
  private subscription?: Subscription;
  isTesting = false; // Flag to avoid setValue in Testing

  ngAfterViewInit(): void {
    const savedEmail = JSON.parse(localStorage.getItem('saved-login-form') || 'null');
    if (savedEmail && this.form && !this.isTesting) {
      this.form.setValue({ email: savedEmail, password: '' });
    }
    this.subscription = this.form.valueChanges?.pipe(debounceTime(500)).subscribe({
      next: (value) =>
        localStorage.setItem('saved-login-form', JSON.stringify(value.email))
    });
  }

  onSubmit(formData: NgForm) {
    if (formData.invalid) { return; }
    const { email, password } = formData.value;
    console.log(email, password);
    formData.reset();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
