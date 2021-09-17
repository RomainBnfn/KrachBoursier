import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDrinkDialogComponent } from 'src/app/dialogs/delete-drink-dialog/delete-drink-dialog.component';
import { EditAddDrinkDialogComponent } from 'src/app/dialogs/edit-add-drink-dialog/edit-add-drink-dialog.component';
import DrinkData from 'src/app/models/drink-data';
import { DrinkService } from 'src/app/services/drink.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  constructor(
    private drinkService: DrinkService,
    public MatDialog: MatDialog
  ) {}

  ngOnInit(): void {}

  clickAddDrinkBtn() {
    const dialogRef = this.MatDialog.open(EditAddDrinkDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.drinkService.saveDrink(result);
      }
    });
  }

  clickEditDrinkBtn(drink: DrinkData) {
    const dialogRef = this.MatDialog.open(EditAddDrinkDialogComponent, {
      data: drink,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.drinkService.saveDrink(result);
      }
    });
  }

  clickDeleteDrinkBtn(drink: DrinkData) {
    const dialogRef = this.MatDialog.open(DeleteDrinkDialogComponent, {
      data: drink,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.confirm) {
        this.drinkService.deleteDrink(drink);
      }
    });
  }

  public get isInKrash(): boolean {
    return this.drinkService.isInKrash;
  }
}
