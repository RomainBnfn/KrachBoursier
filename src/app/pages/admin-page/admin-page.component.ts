import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDrinkDialogComponent } from 'src/app/dialogs/delete-drink-dialog/delete-drink-dialog.component';
import { EditAddDrinkDialogComponent } from 'src/app/dialogs/edit-add-drink-dialog/edit-add-drink-dialog.component';
import { StartEndKrashDialogComponent } from 'src/app/dialogs/start-end-krash-dialog/start-end-krash-dialog.component';
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

  clickStartEndKrashBtn() {
    const dialogRef = this.MatDialog.open(StartEndKrashDialogComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result.drinks) {
        this.drinkService.startEndKrash(result.drinks);
      }
    });
  }

  public get isInKrash(): boolean {
    return this.drinkService.isInKrash;
  }

  public get krashBtnText(): string {
    return this.isInKrash ? 'Arrêter le Krash' : 'Déclencher un Krash !';
  }

  public get krashState(): string {
    return this.isInKrash
      ? 'Un Krash est en cours !'
      : 'Pas de Krash actuelement.';
  }

  public get krashColor(): string {
    return this.isInKrash ? 'green' : 'red';
  }
}
