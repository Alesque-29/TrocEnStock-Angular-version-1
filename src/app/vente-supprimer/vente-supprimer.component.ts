import { UtilisateursService } from './../services/utilisateurs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesvendusService } from './../services/articlesvendus.service';
import { Component, OnInit } from '@angular/core';
import { ArticleVendu } from '../modeles/articlevendu';
import { Utilisateur } from '../modeles/utilisateur';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'vente-supprimer',
  templateUrl: './vente-supprimer.component.html',
  styleUrls: ['./vente-supprimer.component.css'],
})
export class VenteSupprimerComponent implements OnInit {
  listeArticles: ArticleVendu[] = [];
  listeUserVentes: ArticleVendu[] = [];

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
  userVendeur: boolean;
  userEncherisseur: boolean;

  constructor(
    private articlesvendusServices: ArticlesvendusService,
    private utilisateursService: UtilisateursService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const authEmail = sessionStorage.getItem('authEmail');
    console.log(authEmail);
    this.utilisateursService.afficherProfil(authEmail).subscribe(
      (user) => {
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
        this.userVendeur = user.vendeur;
        this.userEncherisseur = user.encherisseur;
      },
      (error) => {
        console.log('Erreur rencontrée! : ' + error);
      },
      () => {
        console.log('Observable récupération profil réussi!');
      }
    );
  }

  onDeleteVente(): void {
    this.listeUserVentes = [];
    const idObject = this.route.snapshot.params['id'];
    console.log(idObject);
    this.articlesvendusServices.supprimerArticle(idObject).subscribe();
    const userPseudo = sessionStorage.getItem('userPseudo');
    this.articlesvendusServices.afficherListe().subscribe(
      (objectsList) => {
        this.listeArticles = objectsList;
        for (const article of this.listeArticles) {
          if (article.vendeur === userPseudo) {
            this.listeUserVentes.push(article);
            console.log(this.listeUserVentes);
          }
        }
      },
      (error) => {
        console.log('Erreur rencontrée! : ' + error);
      },
      () => {
        console.log('Observable liste des ventes de l utilisateur réussi!');
      }
    );
    if (this.listeUserVentes.length === 0) {
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
      const vendeur = false;
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
          sessionStorage.setItem('userVendeur', 'false');
          this.router.navigate(['vente/suppression-effectuee']);
        },
        (error) => {
          console.log('Erreur rencontrée! : ' + error);
        },
        () => {
          console.log('Utilisateur modifié!');
        }
      );
    } else {
      this.router.navigate(['vente/suppression-effectuee']);
    }
  }
}
