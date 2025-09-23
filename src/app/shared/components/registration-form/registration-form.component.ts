import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
// emailValidatorFn should be exported from your email.directive (a helper validator for reactive forms)
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
      // use both required and the custom email validator function for reactive form
      email: ['', [Validators.required, emailValidatorFn()]],
      password: ['', [Validators.required]]
    });
  }

  // convenience getters for template
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

    // valid
    console.log('register', this.registrationForm.value);

    // reset form after successful register (optional)
    this.registrationForm.reset();
    this.submitted = false;
  }
}
