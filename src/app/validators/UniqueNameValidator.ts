import {
  FormGroup,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { DrinkService } from '../services/drink.service';

export const UniqueNameValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  let injector = Injector.create([
    { provide: gteService, useClass: gteService, deps: [] },
  ]);
  let service = injector.get(gteService);
  const name = control.get('name');

  return email && emailConfirmation && email.value === emailConfirmation.value
    ? null
    : { NotSameEmail: true };
};
