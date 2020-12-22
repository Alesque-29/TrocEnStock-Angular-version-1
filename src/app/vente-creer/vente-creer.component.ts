import { UtilisateursService } from './../services/utilisateurs.service';
import { ArticlesvendusService } from './../services/articlesvendus.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilisateur } from '../modeles/utilisateur';
import { ArticleVendu } from '../modeles/articlevendu';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'vente-creer',
  templateUrl: './vente-creer.component.html',
  styleUrls: ['./vente-creer.component.css'],
})
export class VenteCreerComponent implements OnInit {
  form: NgForm;

  articles: ArticleVendu[] = [];

  file: File;
  // {{dateToday | date:'d/M/yy hh:mm'}}

  retraitRue: string;
  retraitCodePostal: string;
  retraitVille: string;

  userPseudo: string;
  userNom: string;
  userPrenom: string;
  userEmail: string;
  userMotDePasse: string;
  userTelephone: string;
  userRue: string;
  userCodePostal: string;
  userVille: string;
  userPoints: number;
  userEncherisseur: boolean;

  constructor(
    private articlesvendusService: ArticlesvendusService,
    private utilisateursService: UtilisateursService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const authEmail = sessionStorage.getItem('authEmail');
    console.log(authEmail);
    this.utilisateursService.afficherProfil(authEmail).subscribe(
      (user) => {
        this.retraitRue = user.rue;
        this.retraitCodePostal = user.codePostal;
        this.retraitVille = user.ville;
        this.userPseudo = user.pseudo;
        this.userNom = user.nom;
        this.userPrenom = user.prenom;
        this.userEmail = user.email;
        this.userMotDePasse = user.motDePasse;
        this.userTelephone = user.telephone;
        this.userRue = user.rue;
        this.userCodePostal = user.codePostal;
        this.userVille = user.ville;
        this.userPoints = user.credit;
        this.userEncherisseur = user.encherisseur;
      },
      (error) => {
        console.log('Erreur rencontrée! : ' + error);
      },
      () => {
        console.log('Observable lieu du retrait réussi!');
      }
    );
  }

  onSubmit(form: NgForm): void {
    const id = undefined;
    const nomArticle = form.value['nomArticle'];
    const description = form.value['description'];
    const categorie = form.value['categorie'];
    // const photoArticle = form.value['photoArticle'];
    /*const dateDebutEncheres = new Date(JSON.stringify(form.value['debutEnchere']));
    const debutEnchere = new Date(dateDebutEncheres).getTime();
    const finEnchere = debutEnchere + (60 * 60 * 120 * 1000);
    // const stringDebutEnchere = new Date(JSON.stringify(dateDebutEncheres));
    const dateFinEncheres = new Date(finEnchere).toJSON();*/
    const numberDebutEncheres = Date.parse(form.value['debutEnchere']);
    const dateDebutEncheres = new Date(numberDebutEncheres).toLocaleString();
    const numberFinEncheres = numberDebutEncheres + (60 * 60 * 120 * 1000);
    const dateFinEncheres = new Date(numberFinEncheres).toLocaleString();
    const miseAPrix = form.value['miseAPrix'];
    const retraitRue = form.value['rue'];
    const retraitCodePostal = form.value['codePostal'];
    const retraitVille = form.value['ville'];
    const vendeurArticle = sessionStorage.getItem('userPseudo');
    // enchères en cours = true; enchères pas commencées ou vente terminée = false
    const etatVente = false;
    const acquereur = '';
    const newProduct = new ArticleVendu(
      id,
      nomArticle,
      description,
      categorie,
      // photoArticle,
      dateDebutEncheres,
      dateFinEncheres,
      miseAPrix,
      retraitRue,
      retraitCodePostal,
      retraitVille,
      vendeurArticle,
      etatVente,
      acquereur
    );
    console.log(numberDebutEncheres);
    console.log(dateDebutEncheres);
    console.log(numberFinEncheres);
    // console.log(stringDebutEnchere);
    console.log(dateFinEncheres);
    console.log(newProduct);
    this.articlesvendusService.creerArticle(newProduct).subscribe(
      (article) => {
        this.articles.push(article);
      },
      (error) => {
        console.log('Erreur rencontrée! : ' + error);
      },
      () => {
        console.log('Article enregistré!');
      }
    );
    const pseudo = this.userPseudo;
    const nom = this.userNom;
    const prenom = this.userPrenom;
    const email = this.userEmail;
    const motDePasse = this.userMotDePasse;
    const telephone = this.userTelephone;
    const rue = this.userRue;
    const codePostal = this.userCodePostal;
    const ville = this.userVille;
    const points = this.userPoints;
    const vendeur = true;
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
    sessionStorage.setItem('userVendeur', 'true');
    this.router.navigate(['mes-ventes']);
  }
}
