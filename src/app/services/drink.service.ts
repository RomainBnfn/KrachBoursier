import { Injectable } from '@angular/core';
import {
  child,
  Database,
  DataSnapshot,
  onValue,
  push,
  ref,
  update,
} from '@angular/fire/database';
import DrinkData from '../models/drink-data';
import DrinkSerieData from '../models/drink-serie-data';
import Period from '../models/period';
import { GraphService } from './graph.service';

@Injectable({
  providedIn: 'root',
})
export class DrinkService {
  public correctIconName = [
    'beer',
    'blue-cocktail',
    'green-cocktail',
    'orange-cocktail',
    'red-cocktail',
    'red-wine',
    'white-wine',
    'yellow-cocktail',
  ];

  drinkSerieData: DrinkSerieData[] = [];
  //periods
  periods: Period[] = [];
  actualPeriod: Period = { drinks: [], date: new Date(), isKrash: false };
  //
  customColors: any = [];
  timer;

  constructor(private graphService: GraphService, private database: Database) {
    //
    const refPeriods = ref(this.database, 'periods');
    onValue(refPeriods, this.updatePeriods);

    this.timer = setInterval(this.addData, this.graphService.tickInterval);
  }

  generateData() {
    let date = Date.now(); //ms
    let timespanTick = this.graphService.tickInterval;
    let pointAmount = this.graphService.pointAmount;
    //
    for (let i = 0; i < pointAmount; i++) {
      //
      this.addData(date - timespanTick * (pointAmount - i));
    }
  }

  fromSnapshotToPeriod(snapshotPeriod: any) {
    let drinks: any[] = [];
    for (let drink in snapshotPeriod.drinks) {
      drinks = [...drinks, snapshotPeriod.drinks[drink]];
    }
    let isKrash = snapshotPeriod.isKrash;
    let date = new Date(snapshotPeriod.date);

    return { drinks: drinks, isKrash: isKrash, date: date };
  }

  updatePeriods = (snapshot: DataSnapshot) => {
    const data = snapshot.val();
    let actual: Period | undefined = undefined;
    for (let index in data) {
      let snapshotPeriod = data[index];
      let period = this.fromSnapshotToPeriod(snapshotPeriod);
      //
      this.periods = [...this.periods, period];

      if (!actual) actual = period;
      else if (actual.date.getTime() < period.date.getTime()) actual = period;
    }
    if (actual) this.actualPeriod = actual;

    this.updateColors();
    // Sort Periods by date
    this.periods = this.periods.sort((a: Period, b: Period) => {
      return a.date.getTime() - b.date.getTime();
    });

    // The app just has started
    if (this.drinkSerieData.length == 0) {
      this.generateData();
    }
  };

  updateColors() {
    this.actualPeriod.drinks.forEach((drink: DrinkData) => {
      this.customColors = [
        { name: drink.name, value: drink.color },
        ...this.customColors,
      ];
    });
  }

  getPeriod(dateMs: number): Period {
    //
    let amountOfPeriods = this.periods.length;
    for (let i = 0; i < amountOfPeriods; i++) {
      let period = this.periods[amountOfPeriods - i - 1];
      //
      if (dateMs > period.date.getTime()) {
        return period;
      }
    }
    return this.actualPeriod;
  }

  saveDrink(drink: DrinkData) {
    // Get a new ID for the new period that will be created
    const newID = push(child(ref(this.database), 'periods')).key;

    // Check if drink doesn't not exist
    let drinks = this.drinks.filter((drinkF) => drinkF.name != drink.name);
    drinks = [...drinks, drink];

    let period = {
      date: Date.now(),
      isKrash: this.isInKrash,
      drinks: drinks,
    };

    let updates: any = {};
    updates['/periods/' + newID] = period;

    return update(ref(this.database), updates);
  }

  deleteDrink(drink: DrinkData) {
    // Get a new ID for the new period that will be created
    const newID = push(child(ref(this.database), 'periods')).key;

    // Check if drink doesn't not exist
    let drinks = this.drinks.filter((drinkF) => drinkF.name != drink.name);

    let period = {
      date: Date.now(),
      isKrash: this.isInKrash,
      drinks: drinks,
    };

    let updates: any = {};
    updates['/periods/' + newID] = period;

    return update(ref(this.database), updates);
  }

  startEndKrash(drinks: DrinkData[]) {
    // Get a new ID for the new period that will be created
    const newID = push(child(ref(this.database), 'periods')).key;

    let period = {
      date: Date.now(),
      isKrash: !this.isInKrash,
      drinks: drinks,
    };

    let updates: any = {};
    updates['/periods/' + newID] = period;

    return update(ref(this.database), updates);
  }

  addData = (dateMs: number | undefined) => {
    let date: Date;
    let period: Period;
    //
    if (dateMs) {
      date = new Date(dateMs);
      period = this.getPeriod(dateMs);
    } else {
      date = new Date();
      period = this.actualPeriod;
    }

    for (let index in period.drinks) {
      let drink = period.drinks[index];
      // Can be a new one

      // Price
      let price = drink.price;
      let noice = this.graphService.noiceEuro;
      if (price > 5 * noice) {
        price = price + noice * (1 - 2 * Math.random());
      }
      //
      let result = this.drinkSerieData.filter(
        (data: DrinkSerieData) => data.name == drink.name
      );
      let drinkSerieData: DrinkSerieData;
      if (result && result.length == 1) {
        // Old
        drinkSerieData = result[0];
      } else {
        // New one
        drinkSerieData = {
          name: drink.name,
          series: [],
        };
        this.drinkSerieData = [...this.drinkSerieData, drinkSerieData];
      }
      //
      drinkSerieData.series = [
        ...drinkSerieData.series,
        { name: date, value: price },
      ];
    }
    //
    let i = 0;
    for (let index in this.drinkSerieData) {
      let drinkSerieData: DrinkSerieData = this.drinkSerieData[index];

      if (drinkSerieData.series.length == 0) {
        this.drinkSerieData.splice(i, 1);
        continue;
      }
      let timespanBetweenPointAndNow =
        Date.now() - drinkSerieData.series[0].name.getTime();
      if (timespanBetweenPointAndNow > this.graphService.graphTimespan) {
        //
        this.drinkSerieData[index].series.shift();
      }
      i++;
    }
    this.drinkSerieData = [...this.drinkSerieData]; // Needed to make the graph refresh
  };

  public isCorrectIconName(name: string): boolean {
    return this.correctIconName.filter((icon) => icon == name).length > 0;
  }

  public get hasData(): boolean {
    return this.actualPeriod.drinks.length > 0;
  }

  public get isInKrash(): boolean {
    return this.actualPeriod.isKrash;
  }

  public get drinks(): DrinkData[] {
    return this.actualPeriod.drinks;
  }
}
