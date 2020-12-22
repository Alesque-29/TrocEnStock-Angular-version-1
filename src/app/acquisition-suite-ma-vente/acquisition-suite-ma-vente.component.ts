import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesvendusService } from '../services/articlesvendus.service';
import { EncheresService } from '../services/encheres.service';

@Component({
  selector: 'app-acquisition-suite-ma-vente',
  templateUrl: './acquisition-suite-ma-vente.component.html',
  styleUrls: ['./acquisition-suite-ma-vente.component.scss']
})
export class AcquisitionSuiteMaVenteComponent implements OnInit {
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
  acquereur: string;

  prixDeVente: number;

  constructor(
    private articlesvendusService: ArticlesvendusService,
    private encheresService: EncheresService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
        this.acquereur = objet.acquereur;
      },
      (error) => {
        console.log('Erreur rencontrée! : ' + error);
      },
      () => {
        console.log('Observable pageAfficherVente réussi!');
      }
    );
    this.encheresService.selectionParIdArticleVendu(idObject).subscribe(
      (enchere) => {
        this.prixDeVente = enchere.prixVente;
      },
      (error) => {
        console.log('Erreur rencontrée! : ' + error);
      },
      () => {
        console.log('Observable afficher meilleureOffre réussi!');
      }
    );
  }

}
