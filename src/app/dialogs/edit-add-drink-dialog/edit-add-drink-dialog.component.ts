import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import DrinkData from 'src/app/models/drink-data';
import { DrinkService } from 'src/app/services/drink.service';
import { DrinkValidatorService } from 'src/app/validators/drink-validator.service';

@Component({
  selector: 'app-edit-add-drink-dialog',
  templateUrl: './edit-add-drink-dialog.component.html',
  styleUrls: ['./edit-add-drink-dialog.component.scss'],
})
export class EditAddDrinkDialogComponent implements OnInit {
  typeForm: 'add' | 'edit';
  drinkForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DrinkData>,
    @Inject(MAT_DIALOG_DATA) public data: DrinkData,
    private formBuilder: FormBuilder,
    private drinkValidatorService: DrinkValidatorService,
    private drinkService: DrinkService
  ) {
    this.typeForm = typeof data.name == 'undefined' ? 'add' : 'edit';

    let name;
    if (this.typeForm == 'add') {
      name = [
        this.data.name,
        [Validators.required, this.drinkValidatorService.UniqueNameValidator()],
      ];
    } else {
      name = [this.data.name, [Validators.required]];
    }

    let formData = {
      name: name,
      price: [
        this.data.price,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern('^(0|([1-9][0-9]*))(\\.[0-9]+)?$'),
        ],
      ],
      color: [this.data.color, [Validators.required]],
      icon: [
        this.data.icon,
        [Validators.required, this.drinkValidatorService.CorrectIconName()],
      ],
      comment: [this.data.comment, []],
    };
    this.drinkForm = this.formBuilder.group(formData);

    if (this.typeForm == 'edit') this.name?.disable();
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    let drink = {
      name: this.name?.value,
      price: this.price?.value,
      icon: this.icon?.value,
      color: this.color?.value,
      comment: this.comment?.value,
    };
    this.dialogRef.close(drink);
  }

  public get name() {
    return this.drinkForm.get('name');
  }

  public getMessageError(control: AbstractControl): string {
    if (!control || !control.invalid) return '';
    if (control.hasError('required')) return 'Ce champ est obligatoire.';
    if (control.hasError('notUniqueName')) return 'Ce nom est déjà prit.';
    if (control.hasError('incorrectIconName'))
      return "Ce nom d'icone est incorrect.";
    if (control.hasError('min')) return 'Merci de mettre un prix positif.';
    if (control.hasError('pattern')) return 'Merci de saisir un chiffre.';
    return '';
  }

  public get price() {
    return this.drinkForm.get('price');
  }

  public get color() {
    return this.drinkForm.get('color');
  }

  public get icon() {
    return this.drinkForm.get('icon');
  }

  public get comment() {
    return this.drinkForm.get('comment');
  }

  public get title(): string {
    return this.typeForm == 'add'
      ? 'Ajouter une boisson'
      : 'Éditer une boisson';
  }

  public get iconList(): string[] {
    return this.drinkService.correctIconName;
  }

  public get submitBtnText(): string {
    return this.typeForm == 'add' ? 'Créer la boisson' : 'Éditer la boisson';
  }
}
