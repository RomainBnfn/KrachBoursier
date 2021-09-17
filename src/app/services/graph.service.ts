import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  graphTimespan: number = 300000; // ms
  pointAmount: number = 150;

  noiceEuro: number = 0.03;

  constructor() {}

  public get tickInterval(): number {
    return this.graphTimespan / this.pointAmount;
  }
}
