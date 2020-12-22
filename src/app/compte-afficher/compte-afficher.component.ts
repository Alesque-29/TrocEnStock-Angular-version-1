import { UtilisateursService } from './../services/utilisateurs.service';
import { Component, Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'app-compte-afficher',
  templateUrl: './compte-afficher.component.html',
  styleUrls: ['./compte-afficher.component.scss'],
})
@Injectable()
export class CompteAfficherComponent implements OnInit {
  userPseudo: string;
  userNom: string;
  userPrenom: string;
  userPoints: number;
  userEmail: string;
  userMotDePasse: string;
  userTelephone: string;
  userRue: string;
  userCodePostal: string;
  userVille: string;

  constructor(private utilisateursService: UtilisateursService) {}

  ngOnInit(): void {
    const authEmail = sessionStorage.getItem('authEmail');
    console.log(authEmail);
    this.utilisateursService.afficherProfil(authEmail).subscribe(
      (user) => {
        console.log(user);
        this.userPseudo = user.pseudo;
        this.userNom = user.nom;
        this.userPrenom = user.prenom;
        this.userPoints = user.credit;
        this.userEmail = user.email;
        this.userMotDePasse = user.motDePasse;
        this.userTelephone = user.telephone;
        this.userRue = user.rue;
        this.userCodePostal = user.codePostal;
        this.userVille = user.ville;
      },
      (error) => {
        console.log('Erreur rencontrée! : ' + error);
      },
      () => {
        console.log('Observable pageAfficherProfil réussi!');
      }
    );
  }
}
