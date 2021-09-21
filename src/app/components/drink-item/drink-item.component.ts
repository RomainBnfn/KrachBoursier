import { Component, Input, OnInit } from '@angular/core';
import DrinkData from 'src/app/models/drink-data';

@Component({
  selector: 'app-drink-item',
  templateUrl: './drink-item.component.html',
  styleUrls: ['./drink-item.component.scss'],
})
export class DrinkItemComponent implements OnInit {
  @Input() drink: DrinkData = {
    id: '',
    name: '',
    price: 0,
    icon: '',
    color: '',
    comment: '',
  };

  constructor() {}

  ngOnInit(): void {}

  public get iconSrc(): string {
    if (this.drink.icon)
      return '../../../assets/images/icons/icon-' + this.drink.icon + '.svg';
    return '';
  }
}
