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
    return '../../../assets/images/icons/icon-' + this.drink.icon + '.svg';
  }

  public get colorStyle(): string {
    return 'background-color: ' + this.drink.color;
  }
}
