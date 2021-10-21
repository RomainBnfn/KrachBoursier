import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  displayedForm: 'login' | 'register' = 'login';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  switchForm() {
    this.displayedForm = this.displayedForm == 'login' ? 'register' : 'login';
  }

  public get switchBtnText(): string {
    return this.displayedForm == 'login'
      ? 'Pas encore inscrit ?'
      : 'Déjà inscrit ?';
  }

  public get isAuth(): boolean {
    return this.authService.isAuth;
  }
}
