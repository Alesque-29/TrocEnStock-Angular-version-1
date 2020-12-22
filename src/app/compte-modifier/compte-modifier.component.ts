import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Utilisateur } from '../modeles/utilisateur';
import { UtilisateursService } from '../services/utilisateurs.service';

@Component({
  selector: 'app-compte-modifier',
  templateUrl: './compte-modifier.component.html',
  styleUrls: ['./compte-modifier.component.scss'],
})
export class CompteModifierComponent implements OnInit {
  form: NgForm;
  authEmail: string;

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
  userVendeur: boolean;
  userEncherisseur: boolean;

  constructor(private utilisateursService: UtilisateursService,
              private router: Router) {}

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
        this.userVendeur = user.vendeur;
        this.userEncherisseur = user.encherisseur;
      },
      (error) => {
        console.log('Erreur rencontrée! : ' + error);
      },
      () => {
        console.log('Observable pageModifierProfil réussi!');
      }
    );
  }

  onSubmit(form: NgForm): void {
    const pseudo = form.value['pseudo'];
    const nom = form.value['nom'];
    const prenom = form.value['prenom'];
    const email = form.value['email'];
    const motDePasse = form.value['motDePasse'];
    const telephone = form.value['telephone'];
    const rue = form.value['rue'];
    const codePostal = form.value['codePostal'];
    const ville = form.value['ville'];
    const points = form.value['points'];
    const vendeur = this.userVendeur;
    const encherisseur = this.userEncherisseur;
    const updatedUser = new Utilisateur(
      pseudo,
      nom,
      prenom,
      email,
      motDePasse,
      telephone,
      rue,
      codePostal,
      ville,
      points,
      vendeur,
      encherisseur
    );
    console.log(updatedUser);
    this.utilisateursService.modifierProfil(updatedUser).subscribe(
      (user) => {
        console.log(user);
      },
      (error) => {
        console.log('Erreur rencontrée! : ' + error);
      },
      () => {
        console.log('Utilisateur modifié!');
      }
    );
    this.authEmail = email;
    sessionStorage.setItem('authEmail', this.authEmail);
    this.router.navigate(['compte/modification-effectuee']);
  }
}
