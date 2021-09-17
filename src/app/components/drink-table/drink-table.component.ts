import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import DrinkData from 'src/app/models/drink-data';
import { DrinkService } from 'src/app/services/drink.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-drink-table',
  templateUrl: './drink-table.component.html',
  styleUrls: ['./drink-table.component.scss'],
})
export class DrinkTableComponent implements OnInit {
  @Output() onClickOnEditBtn = new EventEmitter<DrinkData>();
  @Output() onClickOnDeleteBtn = new EventEmitter<DrinkData>();

  displayedColumns: string[] = [
    'action',
    'name',
    'price',
    'color',
    'icon',
    'comment',
  ];

  constructor(private drinkService: DrinkService) {}

  ngOnInit(): void {}

  clickOnEditBtn(drink: DrinkData) {
    this.onClickOnEditBtn.emit(drink);
  }

  clickOnDeleteBtn(drink: DrinkData) {
    this.onClickOnDeleteBtn.emit(drink);
  }

  public get drinks(): DrinkData[] {
    return this.drinkService.drinks;
  }
}
