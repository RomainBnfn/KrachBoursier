import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KrashService {
  constructor() {}

  public get userHasService(): boolean {
    return false;
  }
}
