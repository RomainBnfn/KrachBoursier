import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import DrinkData from 'src/app/models/drink-data';

@Component({
  selector: 'app-delete-drink-dialog',
  templateUrl: './delete-drink-dialog.component.html',
  styleUrls: ['./delete-drink-dialog.component.scss'],
})
export class DeleteDrinkDialogComponent implements OnInit {
  deleteDrinkForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DrinkData>,
    @Inject(MAT_DIALOG_DATA) public data: DrinkData,
    private formBuilder: FormBuilder
  ) {
    this.deleteDrinkForm = this.formBuilder.group({});
  }

  onNoClick(): void {
    this.dialogRef.close({ confirm: false });
  }

  onSubmit(): void {
    this.dialogRef.close({ confirm: true });
  }

  ngOnInit(): void {}

  public get drinkName(): string {
    return this.data.name;
  }

  public get drinkPrice(): number {
    return this.data.price;
  }
}
