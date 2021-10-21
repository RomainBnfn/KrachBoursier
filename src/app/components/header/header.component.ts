import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  hidden: boolean;

  constructor(private router: Router, private authService: AuthService) {
    this.hidden = false;
  }

  ngOnInit(): void {}

  clickOnLogOut() {
    this.authService.signOut();
    this.router.navigate(['/']);
  }

  public get url(): string {
    return this.router.url;
  }

  public get pageName(): string {
    switch (this.url) {
      case '/':
        return 'Accueil';
      case '/admin':
        return 'Administration';
      case '/view':
        return 'Krach Boursier - ' + 'i2c'; // + Name
    }
    return '';
  }

  public get isAuth(): boolean {
    return this.authService.isAuth;
  }
}
