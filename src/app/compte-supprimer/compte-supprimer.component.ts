import { AuthentificationService } from './../services/authentification.service';
import { Router } from '@angular/router';
import { UtilisateursService } from './../services/utilisateurs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compte-supprimer',
  templateUrl: './compte-supprimer.component.html',
  styleUrls: ['./compte-supprimer.component.scss']
})
export class CompteSupprimerComponent implements OnInit {

  constructor(private utilisateursService: UtilisateursService,
              private authentificationService: AuthentificationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onDeleteUser(): void {
    const authEmail = sessionStorage.getItem('authEmail');
    this.utilisateursService.supprimerProfil(authEmail).subscribe();
    this.authentificationService.signOut();
    sessionStorage.clear();
    this.router.navigate(['compte/suppression-effectuee']);
  }

}
