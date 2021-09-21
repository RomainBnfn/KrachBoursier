import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterValidatorService } from 'src/app/validators/register-validator.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  @Output() onRegister = new EventEmitter<{
    email: string;
    password: string;
  }>();

  registerForm: FormGroup;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private registerValidator: RegisterValidatorService,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        emailConfirmation: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/.{6,}/)]],
        passwordConfirmation: [
          '',
          [Validators.required, Validators.pattern(/.{6,}/)],
        ],
      },
      {
        validators: [
          this.registerValidator.SameEmailsValidator(),
          this.registerValidator.SamePasswordsValidator(),
        ],
      }
    );
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const email = this.email?.value;
    const password = this.password?.value;
    this.authService.createAccount(email, password);
  }

  public getMessageError(control: AbstractControl): string {
    if (!control.invalid) return '';
    if (control.hasError('email')) return 'Un email est attendu.';
    if (control.hasError('required')) return 'Ce champ est obligatoire.';
    if (control.hasError('pattern')) return 'Mot de passe trop court.';
    if (control.hasError('notSameEmail'))
      return 'Les emails ne sont pas iddentiques.';
    if (control.hasError('notSamePassword'))
      return 'Les mots ne sont pas iddentiques.';
    return '';
  }

  public get email() {
    return this.registerForm.get('email');
  }
  public get emailConfirmation() {
    return this.registerForm.get('emailConfirmation');
  }

  public get password() {
    return this.registerForm.get('password');
  }

  public get passwordConfirmation() {
    return this.registerForm.get('passwordConfirmation');
  }
}
