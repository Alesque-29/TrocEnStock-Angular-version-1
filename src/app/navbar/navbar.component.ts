import { ArticlesvendusService } from './../services/articlesvendus.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { AuthentificationService } from './../services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
@Injectable()
export class NavbarComponent implements OnInit {
  userPseudo: string;

  constructor(private authentificationService: AuthentificationService,
              private articlesvendusService: ArticlesvendusService,
              private router: Router) {}

  ngOnInit(): void {
  }

  verifAuth(): boolean {
    if (this.authentificationService.isAuth) {
      this.userPseudo = sessionStorage.getItem('userPseudo');
      return true;
    } else {
      return false;
    }
  }

  verifVendeur(): boolean {
    const userVendeur = sessionStorage.getItem('userVendeur');
    if (userVendeur === 'true') {
      return true;
    } else {
      return false;
    }
  }

  verifEncherisseur(): boolean {
    const userEncherisseur = sessionStorage.getItem('userEncherisseur');
    if (userEncherisseur === 'true') {
      return true;
    } else {
      return false;
    }
  }

  deconnexion(): void {
    this.router.navigate(['']);
    this.authentificationService.signOut();
    sessionStorage.clear();
  }
}
