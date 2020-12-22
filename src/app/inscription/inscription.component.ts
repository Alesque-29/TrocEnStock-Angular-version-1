import { ArticlesvendusService } from './../services/articlesvendus.service';
import { AuthentificationService } from './../services/authentification.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../modeles/utilisateur';
import { UtilisateursService } from '../services/utilisateurs.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
})
export class InscriptionComponent implements OnInit {
  form: NgForm;
  utilisateurs: Utilisateur[] = [];
  authEmail: string;
  userPseudo: string;
  userPoints: string;

  constructor(
    private authentificationService: AuthentificationService,
    private utilisateursService: UtilisateursService,
    private articlesvendusService: ArticlesvendusService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSignUp(form: NgForm): void {
    const pseudo = form.value['pseudo'];
    const nom = form.value['nom'];
    const prenom = form.value['prenom'];
    const email = form.value['email'];
    const motDePasse = form.value['motDePasse'];
    const telephone = form.value['telephone'];
    const rue = form.value['rue'];
    const codePostal = form.value['codePostal'];
    const ville = form.value['ville'];
    const credit = 100;
    const vendeur = false;
    const encherisseur = false;
    const newUser = new Utilisateur(
      pseudo,
      nom,
      prenom,
      email,
      motDePasse,
      telephone,
      rue,
      codePostal,
      ville,
      credit,
      vendeur,
      encherisseur
    );
    console.log(newUser);
    this.utilisateursService.creerProfil(newUser).subscribe(
      (user) => {
        this.utilisateurs.push(user);
      },
      (error) => {
        console.log('Erreur rencontrée! : ' + error);
      },
      () => {
        console.log('Utilisateur enregistré!');
      }
    );
    this.authentificationService.signIn();
    this.authEmail = email;
    this.userPseudo = pseudo;
    this.userPoints = credit.toString();
    sessionStorage.setItem('authEmail', this.authEmail);
    sessionStorage.setItem('userPseudo', this.userPseudo);
    sessionStorage.setItem('userCredit', this.userPoints);
    sessionStorage.setItem('userVendeur', 'false');
    sessionStorage.setItem('userEncherisseur', 'false');
    this.router.navigate(['']);
  }

}
