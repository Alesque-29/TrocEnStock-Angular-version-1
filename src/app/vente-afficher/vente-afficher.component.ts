import { EncheresService } from './../services/encheres.service';
import { ActivatedRoute } from '@angular/router';
import { ArticlesvendusService } from './../services/articlesvendus.service';
import { Component, OnInit } from '@angular/core';
import { Enchere } from '../modeles/enchere';

@Component({
  selector: 'app-vente-afficher',
  templateUrl: './vente-afficher.component.html',
  styleUrls: ['./vente-afficher.component.scss'],
})
export class VenteAfficherComponent implements OnInit {
  idArticle: number;
  nomArticle: string;
  description: string;
  categorie: string;
  // photoArticle: string;
  dateDebutEncheres: string;
  dateFinEncheres: string;
  miseAPrix: number;
  rue: string;
  codePostal: string;
  ville: string;
  etatVente: boolean;

  listeEncheres: Enchere[] = [];
  listeEncheresCurrentArticle: Enchere[] = [];
  listePropositions: number[] = [];
  enchereMax: number;
  meilleureOffre: number;

  constructor(
    private articlesvendusService: ArticlesvendusService,
    private encheresService: EncheresService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listeEncheres = [];
    this.listeEncheresCurrentArticle = [];
    this.listePropositions = [];
    const idObject = this.route.snapshot.params['id'];
    console.log(idObject);
    this.articlesvendusService.afficherArticle(idObject).subscribe(
      (objet) => {
        this.idArticle = objet.id;
        this.nomArticle = objet.nomArticle;
        this.description = objet.description;
        this.categorie = objet.categorie;
        // this.photoArticle = objet.photoArticle;
        this.dateDebutEncheres = objet.dateDebutEncheres;
        this.dateFinEncheres = objet.dateFinEncheres;
        this.miseAPrix = objet.miseAPrix;
        this.rue = objet.rue;
        this.codePostal = objet.codePostal;
        this.ville = objet.ville;
        this.etatVente = objet.etatVente;
      },
      (error) => {
        console.log('Erreur rencontrée! : ' + error);
      },
      () => {
        console.log('Observable pageAfficherVente réussi!');
      }
    );
    this.encheresService.afficherListe().subscribe(
      (encheresList) => {
        this.listeEncheres = encheresList;
        for (const enchere of this.listeEncheres) {
          if (enchere.idArticleVendu === this.idArticle) {
            this.listeEncheresCurrentArticle.push(enchere);
            console.log(this.listeEncheresCurrentArticle);
          }
        }
        for (const enchereArticle of this.listeEncheresCurrentArticle){
          this.listePropositions.push(enchereArticle.proposition);
          console.log(this.listePropositions);
        }
        for (const proposition of this.listePropositions){
          if (proposition === Math.max(...this.listePropositions)){
            this.enchereMax = proposition;
            console.log(this.enchereMax);
          }
        }
        for (const enchereEnCours of this.listeEncheresCurrentArticle){
          if (enchereEnCours.proposition === this.enchereMax){
            this.meilleureOffre = enchereEnCours.proposition;
          }
        }
        },
      (error) => {
        console.log('Erreur rencontrée! : ' + error);
      },
      () => {
        console.log(
          'Observable afficher récupération enchère max pour l article courant réussi!'
        );
      }
    );
  }

  verifEtatVente(): boolean {
    if (this.etatVente === true) {
      return true;
    } else {
      return false;
    }
  }

}
