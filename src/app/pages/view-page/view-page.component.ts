import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DrinkService } from 'src/app/services/drink.service';
import { KrashService } from 'src/app/services/krash.service';
@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss'],
})
export class ViewPageComponent implements OnInit, OnChanges {
  constructor(
    private drinkService: DrinkService,
    private krashService: KrashService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {}

  public get isInKrash(): boolean {
    return this.drinkService.isInKrash;
  }

  public get userHasService(): boolean {
    return this.krashService.userHasService;
  }
}
