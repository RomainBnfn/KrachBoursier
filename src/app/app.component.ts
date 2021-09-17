import { Component } from '@angular/core';

import { Database } from '@angular/fire/database';
import { ref, onValue, set, push, child, update } from 'firebase/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'krash';

  constructor() {}
}
