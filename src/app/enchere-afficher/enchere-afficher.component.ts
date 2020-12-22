import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Enchere } from '../modeles/enchere';
import { ArticlesvendusService } from '../services/articlesvendus.service';
import { EncheresService } from '../services/encheres.service';

@Component({
  selector: 'app-enchere-afficher',
  templateUrl: './enchere-afficher.component.html',
  styleUrls: ['./enchere-afficher.component.scss'],
})
export class EnchereAfficherComponent implements OnInit {
  listeEncheres: Enchere[] = [];
  listeEncheresCurrentArticle: Enchere[] = [];
  listePropositions: number[] = [];
  listePropositionsAutresUsers: number[] = [];

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

  enchereMax: number;
  enchereMaxAutresUser: number;
  meilleureOffre: number;
  proposition: number;

  constructor(
    private articlesvendusService: ArticlesvendusService,
    private encheresService: EncheresService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listeEncheres = [];
    this.listeEncheresCurrentArticle = [];
    this.listePropositions = [];
    this.listePropositionsAutresUsers = [];
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
        this.encheresService.afficherListe().subscribe(
          (encheresList) => {
            this.listeEncheres = encheresList;
            for (const enchere of this.listeEncheres) {
              if (enchere.idArticleVendu === this.idArticle) {
                this.listeEncheresCurrentArticle.push(enchere);
                console.log(this.listeEncheresCurrentArticle);
              }
            }
            for (const enchereArticle of this.listeEncheresCurrentArticle) {
              if (enchereArticle.encherisseur === userPseudo) {
                this.listePropositions.push(enchereArticle.proposition);
                console.log(this.listePropositions);
                for (const proposition of this.listePropositions) {
                  if (proposition === Math.max(...this.listePropositions)) {
                    this.enchereMax = proposition;
                    this.proposition = this.enchereMax;
                  }
                }
              }
            }
            for (const enchereArticle of this.listeEncheresCurrentArticle) {
              this.listePropositionsAutresUsers.push(enchereArticle.proposition);
              console.log(this.listePropositionsAutresUsers);
              for (const proposition of this.listePropositionsAutresUsers) {
                if (proposition === Math.max(...this.listePropositionsAutresUsers)) {
                  this.enchereMaxAutresUser = proposition;
                }
              }
              for (const enchereEnCours of this.listeEncheresCurrentArticle) {
                if (enchereEnCours.proposition === this.enchereMaxAutresUser) {
                  this.meilleureOffre = enchereEnCours.proposition;
                }
              }
            }
            /*for (const enchere of this.listeEncheres){
              if (enchere.idArticleVendu === this.idArticle){
                this.listeMeilleuresOffresPourObjetCourant.push(enchere.meilleureOffre);
                // this.listeUserPropositionPourObjetCourant.push(enchere.proposition);
                this.meilleureOffre = Math.max(...this.listeMeilleuresOffresPourObjetCourant);
                // this.proposition = Math.max(...this.listeUserPropositionPourObjetCourant);
                this.proposition = this.meilleureOffre + 1;
                console.log(this.meilleureOffre);
                console.log(this.proposition);
              }
            }*/
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
        /*this.encheresService.afficherListe().subscribe(
          (encheresList) => {
            this.listeEncheres = encheresList;
            for (const enchere of this.listeEncheres){
              if (enchere.encherisseur === userPseudo){
                this.listeUserEncherisseur.push(enchere);
              }
              for (const filtreEnchere of this.listeUserEncherisseur){
                if (filtreEnchere.idArticleVendu === this.idArticle){
                  this.listeMeilleuresOffresPourObjetCourant.push(filtreEnchere.meilleureOffre);
                  this.listeUserPropositionPourObjetCourant.push(filtreEnchere.proposition);
                  this.meilleureOffre = Math.max(...this.listeMeilleuresOffresPourObjetCourant);
                  this.proposition = Math.max(...this.listeUserPropositionPourObjetCourant);
                  console.log(this.meilleureOffre);
                  console.log(this.proposition);
                }
              }
            }
          },
          (error) => {
            console.log('Erreur rencontrée! : ' + error);
          },
          () => {
            console.log('Observable meilleure offre objet courant + dernière proposition utilisateur réussi!');
          }
        );*/
      },
      (error) => {
        console.log('Erreur rencontrée! : ' + error);
      },
      () => {
        console.log(
          'Observable récupération articleVendu page afficher enchère réussi!'
        );
      }
    );
  }
}
