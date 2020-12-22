import { Component, OnInit } from '@angular/core';
import { ArticlesvendusService } from './services/articlesvendus.service';
import { EncheresService } from './services/encheres.service';
import { UtilisateursService } from './services/utilisateurs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private articlesvendusService: ArticlesvendusService,
              private encheresService: EncheresService,
              private utilisateursService: UtilisateursService) { }

  ngOnInit(): void {
  }

}
