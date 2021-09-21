import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Database } from '@angular/fire/database';
import DrinkSerieData from 'src/app/models/drink-serie-data';
import { DrinkService } from 'src/app/services/drink.service';

@Component({
  selector: 'app-krash-graph',
  templateUrl: './krash-graph.component.html',
  styleUrls: ['./krash-graph.component.scss'],
})
export class KrashGraphComponent implements OnInit {
  constructor(private drinkService: DrinkService) {}

  ngOnInit(): void {}

  dateTickFormatting(val: any): string {
    if (val instanceof Date) {
      let hours = val.getHours();
      let minutes = val.getMinutes();
      let min = minutes < 10 ? '0' + minutes : minutes;
      return hours + ':' + min;
    }
    return '';
  }
  public get data(): DrinkSerieData[] {
    return this.drinkService.drinkSerieData;
  }

  public get customColors(): any {
    return this.drinkService.customColors;
  }
}
