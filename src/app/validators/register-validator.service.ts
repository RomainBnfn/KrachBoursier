import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RegisterValidatorService {
  constructor() {}

  public SamePasswordsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const passwordConfirmation = control.get('passwordConfirmation');

      return password &&
        passwordConfirmation &&
        password.value === passwordConfirmation.value
        ? null
        : { notSamePassword: true };
    };
  }

  public SameEmailsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.get('email');
      const emailConfirmation = control.get('emailConfirmation');

      return email &&
        emailConfirmation &&
        email.value === emailConfirmation.value
        ? null
        : { notSameEmail: true };
    };
  }
}
