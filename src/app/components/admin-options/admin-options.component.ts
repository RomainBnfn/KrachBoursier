import { Component, OnInit } from '@angular/core';
import { DrinkService } from 'src/app/services/drink.service';

@Component({
  selector: 'app-admin-options',
  templateUrl: './admin-options.component.html',
  styleUrls: ['./admin-options.component.scss'],
})
export class AdminOptionsComponent implements OnInit {
  constructor(private drinkService: DrinkService) {}

  ngOnInit(): void {}

  public changeSoundOption() {
    this.drinkService.toogleSoundOption();
  }

  public clickOnCleanHistory() {
    this.drinkService.cleanHistory();
  }

  public get playSound(): boolean {
    return this.drinkService.playSound;
  }
}
