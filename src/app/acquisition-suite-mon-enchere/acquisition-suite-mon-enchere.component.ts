import { ArticleVendu } from './../modeles/articlevendu';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Enchere } from '../modeles/enchere';
import { ArticlesvendusService } from '../services/articlesvendus.service';
import { EncheresService } from '../services/encheres.service';

@Component({
  selector: 'app-acquisition-suite-mon-enchere',
  templateUrl: './acquisition-suite-mon-enchere.component.html',
  styleUrls: ['./acquisition-suite-mon-enchere.component.scss'],
})
export class AcquisitionSuiteMonEnchereComponent implements OnInit {
  listeEncheres: Enchere[] = [];
  listeEncheresCurrentArticle: Enchere[] = [];
  listePropositions: number[] = [];
  // listeUserEncherisseur: Enchere[] = [];
  // listeMeilleuresOffresPourObjetCourant: number[] = [];
  // listeUserPropositionPourObjetCourant: number[] = [];

  idArticle: number;
  nomArticle: string;
  description: string;
  categorie: string;
  dateDebutEncheres: string;
  dateFinEncheres: string;
  miseAPrix: number;
  rue: string;
  codePostal: string;
  ville: string;
  vendeur: string;
  etatVente: boolean;

  idEnchere: number;
  idArticleVendu: number;
  /*dateEnchere: any;
  proposition: number;
  meilleureOffre: number;*/
  // encherisseurVainqueur: string;

  enchereMax: number;
  idEnchereGagnante: number;
  prixDeVente: number;
  acquereur: string;

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
    this.idArticle = idObject;
    const userPseudo = sessionStorage.getItem('userPseudo');
    console.log(idObject);
    this.articlesvendusService.afficherArticle(idObject).subscribe(
      (objet) => {
        this.idArticle = objet.id;
        this.nomArticle = objet.nomArticle;
        this.description = objet.description;
        this.categorie = objet.categorie;
        this.dateDebutEncheres = objet.dateDebutEncheres;
        this.dateFinEncheres = objet.dateFinEncheres;
        this.miseAPrix = objet.miseAPrix;
        this.rue = objet.rue;
        this.codePostal = objet.codePostal;
        this.ville = objet.ville;
        this.vendeur = objet.vendeur;
        this.etatVente = objet.etatVente;
        // this.acquereur = objet.acquereur;
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
                this.idEnchereGagnante = enchereEnCours.id;
                this.prixDeVente = enchereEnCours.proposition;
                this.acquereur = enchereEnCours.encherisseur;
              }
            }
            },
          (error) => {
            console.log('Erreur rencontrée! : ' + error);
          },
          () => {
            console.log(
              'Observable récupération enchère max pour l article courant réussi!'
            );
          }
        );
      },
      (error) => {
        console.log('Erreur rencontrée! : ' + error);
      },
      () => {
        console.log('Observable récupération articleVendu page enchère terminée réussi!');
      }
    );
  }
    /*const idArticle = this.idArticle ;
    const nomArticle = this.nomArticle;
    const description = this.description;
    const categorie = this.categorie;
    const dateDebutEncheres = this.dateDebutEncheres;
    const dateFinEncheres = this.dateFinEncheres;
    const miseAPrix = this.miseAPrix;
    const rue = this.rue;
    const codePostal = this.codePostal;
    const ville = this.ville;
    const vendeur = this.vendeur;
    const etatVente = this.etatVente;
    const acquereur = this.encherisseurVainqueur;
    const updatedArticle = new ArticleVendu(
      idArticle,
      nomArticle,
      description,
      categorie,
      dateDebutEncheres,
      dateFinEncheres,
      miseAPrix,
      rue,
      codePostal,
      ville,
      vendeur,
      etatVente,
      acquereur
    );
    console.log(updatedArticle);
    this.articlesvendusService.modifierArticle(updatedArticle).subscribe(
      (article) => {
        console.log(article);
      },
      (error) => {
        console.log('Erreur rencontrée! : ' + error);
      },
      () => {
        console.log('Article modifié!');
      }
    );
  }*/

  verifVictoire(): boolean {
    const currentUser = sessionStorage.getItem('userPseudo');
    if (this.acquereur === currentUser) {
      return true;
    } else {
      return false;
    }
  }
}
