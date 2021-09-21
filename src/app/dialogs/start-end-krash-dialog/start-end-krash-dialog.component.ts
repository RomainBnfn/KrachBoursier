import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import DrinkData from 'src/app/models/drink-data';
import { DrinkService } from 'src/app/services/drink.service';

@Component({
  selector: 'app-start-end-krash-dialog',
  templateUrl: './start-end-krash-dialog.component.html',
  styleUrls: ['./start-end-krash-dialog.component.scss'],
})
export class StartEndKrashDialogComponent implements OnInit {
  typeForm: 'start' | 'end';
  krashForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<{}>,
    private formBuilder: FormBuilder,
    private drinkService: DrinkService
  ) {
    this.typeForm = this.drinkService.isInKrash ? 'end' : 'start';
    let formData: {
      [key: string]: any;
    } = {};

    this.drinkService.drinks.forEach((drink: DrinkData) => {
      formData[drink.name] = [
        drink.price,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern('^(0|([1-9][0-9]*))(\\.[0-9]+)?$'), // Only numbers
        ],
      ];
    });
    this.krashForm = this.formBuilder.group(formData);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    let drinks: DrinkData[] = [];
    this.drinks.forEach((drink: DrinkData) => {
      let newPrice = this.getField(drink.name)?.value;
      drink.price = newPrice;
      drinks = [...drinks, drink];
    });
    this.dialogRef.close({ drinks: drinks });
  }

  ngOnInit(): void {}

  getField(name: string): AbstractControl | null {
    return this.krashForm.get(name);
  }

  getMessageError(): string {
    return 'Le prix doit être un nombre positif.';
  }
  public get title(): string {
    return this.typeForm == 'start'
      ? 'Démarer un Krash ! '
      : 'Arrêter le Krash !';
  }

  public get drinks(): DrinkData[] {
    return this.drinkService.drinks;
  }
}
