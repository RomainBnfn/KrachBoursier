import { Component, Input, OnInit } from '@angular/core';
import { DrinkService } from 'src/app/services/drink.service';

@Component({
  selector: 'app-krash-icon',
  templateUrl: './krash-icon.component.html',
  styleUrls: ['./krash-icon.component.scss'],
})
export class KrashIconComponent implements OnInit {
  @Input() isRight: boolean = false;

  private fontSize: number;
  private minSize = 60;
  private maxSize = 180;
  private step = 2;
  private upDown = 1;

  private timer;

  constructor(private drinkService: DrinkService) {
    this.fontSize = 60;
    this.timer = setInterval(this.changeFontSize, 10);
  }

  ngOnInit(): void {}

  public changeFontSize = () => {
    if (this.fontSize >= this.maxSize) this.upDown = -1;
    if (this.fontSize <= this.minSize) this.upDown = 1;
    this.fontSize += this.step * this.upDown;
  };

  public get dropIconStyle(): string {
    let style = 'font-size: ' + this.fontSize + 'px;';
    if (this.isRight) {
      style += ' -webkit-transform: scaleX(-1); transform: scaleX(-1);';
    }
    return style;
  }

  public get isInKrash(): boolean {
    return this.drinkService.isInKrash;
  }
}
