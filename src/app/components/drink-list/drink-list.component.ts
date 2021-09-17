import { Component, OnInit } from '@angular/core';
import DrinkData from 'src/app/models/drink-data';
import { DrinkService } from 'src/app/services/drink.service';

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.scss'],
})
export class DrinkListComponent implements OnInit {
  constructor(private drinkService: DrinkService) {}

  public get drinks(): DrinkData[] {
    return this.drinkService.drinks;
  }

  ngOnInit(): void {}

  public get hasData(): boolean {
    return this.drinkService.hasData;
  }
}
