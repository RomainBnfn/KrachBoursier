import { Injectable } from '@angular/core';
import { DataSnapshot } from '@firebase/database';
import { FireDatabaseService } from './fire-database.service';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  graphTimespan_default: number = 300000;
  graphTimespan: number = this.graphTimespan_default; // ms

  pointAmount_default: number = 150;
  pointAmount: number = this.pointAmount_default;

  noiceEuro_default: number = 0.03;
  noiceEuro: number = this.noiceEuro_default;

  constructor(private fireDatabaseService: FireDatabaseService) {
    this.fireDatabaseService.listen('options', this.updateGraphOption);
  }

  public updateGraphOption = (snapshot: DataSnapshot) => {
    const data = snapshot.val();
    this.graphTimespan = data['graphTimespan'] || this.graphTimespan_default;
    this.pointAmount = data['pointAmount'] || this.pointAmount_default;
    this.noiceEuro = data['noiceEuro'] || this.noiceEuro_default;
  };

  public get tickInterval(): number {
    return this.graphTimespan / this.pointAmount;
  }
}
