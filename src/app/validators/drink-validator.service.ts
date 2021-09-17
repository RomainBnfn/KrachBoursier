import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import DrinkData from '../models/drink-data';
import { DrinkService } from '../services/drink.service';

@Injectable({
  providedIn: 'root',
})
export class DrinkValidatorService {
  constructor(private drinkService: DrinkService) {}

  public UniqueNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const name = control.value;
      const amount = this.drinkService.drinks.filter((drink: DrinkData) => {
        return drink.name == name;
      }).length;
      return amount > 0 ? { notUniqueName: true } : null;
    };
  }

  public CorrectIconName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const icon = control.value;
      return this.drinkService.isCorrectIconName(icon)
        ? null
        : { incorrectIconName: true };
    };
  }
}
