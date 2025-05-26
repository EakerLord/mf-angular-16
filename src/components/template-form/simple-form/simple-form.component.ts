import { afterNextRender, Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss']
})
export class SimpleFormComponent implements OnDestroy {
  @ViewChild('form') form!: NgForm;
  private subscription?: Subscription;

  constructor() {
    const savedEmail = JSON.parse(localStorage.getItem('saved-login-form') || 'null');
    if (savedEmail) {
      setTimeout(() => this.form?.setValue({ email: savedEmail, password: '' }), 1);
    };

    afterNextRender(() => {
      this.subscription = this.form?.valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value) => localStorage.setItem('saved-login-form', JSON.stringify(value.email))
      });
    });
  }

  onSubmit(formData: NgForm) {
    if (formData.invalid) { return };

    const email = formData.value.email;
    const password = formData.value.password;

    console.log(email, password);

    formData.reset();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
