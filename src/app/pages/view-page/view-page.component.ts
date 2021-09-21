import { Component, OnInit } from '@angular/core';
import { DrinkService } from 'src/app/services/drink.service';
@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss'],
})
export class ViewPageComponent implements OnInit {
  constructor(private drinkService: DrinkService) {}

  ngOnInit(): void {}

  public get isInKrash(): boolean {
    return this.drinkService.isInKrash;
  }
}
