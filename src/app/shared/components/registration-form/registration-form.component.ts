import { Component, Renderer2 } from '@angular/core';
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

  // local flag used by template to switch icon state
  passwordVisible = false;

  constructor(private fb: FormBuilder, private renderer: Renderer2) {
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
    // reset passwordVisible and input type back to password
    this.passwordVisible = false;
    this.setPasswordInputType('password');
  }

  // Toggle visibility of password input
  togglePassword(): void {
    const current = this.passwordVisible;
    this.passwordVisible = !current;
    this.setPasswordInputType(this.passwordVisible ? 'text' : 'password');
  }

  private setPasswordInputType(type: 'text' | 'password'): void {
    // find input by id; safe fallback if not found
    const el = document.getElementById('password') as HTMLInputElement | null;
    if (el) {
      // use renderer for better compatibility
      this.renderer.setAttribute(el, 'type', type);
    }
  }
}
