import { AuthentificationService } from './../services/authentification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private authentificationService: AuthentificationService) { }

  ngOnInit(): void {
  }

  verifAuth(): boolean {
    if (this.authentificationService.isAuth) {
      return true;
    } else {
      return false;
    }
  }

}
