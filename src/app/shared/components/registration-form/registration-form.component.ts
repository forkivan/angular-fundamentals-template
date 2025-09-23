import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { emailValidatorFn } from '@shared/directives/email.directive';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, emailValidatorFn()]],
      password: ['', [Validators.required]]
    });
  }

  get nameControl(): AbstractControl {
    return this.registrationForm.get('name') as AbstractControl;
  }

  get emailControl(): AbstractControl {
    return this.registrationForm.get('email') as AbstractControl;
  }

  get passwordControl(): AbstractControl {
    return this.registrationForm.get('password') as AbstractControl;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }

    console.log('register', this.registrationForm.value);

    this.registrationForm.reset();
    this.submitted = false;
  }
}
