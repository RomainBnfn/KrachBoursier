import { Injectable } from '@angular/core';
import {
  child,
  Database,
  DataSnapshot,
  onValue,
  push,
  Query,
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
export class FireDatabaseService {
  constructor(private database: Database) {}

  public listen(
    reference: string,
    callback: (snapshot: DataSnapshot) => unknown
  ) {
    let fireRef = ref(this.database, reference);
    onValue(fireRef, callback);
  }
}
