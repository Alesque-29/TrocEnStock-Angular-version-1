import { EncheresService } from './../services/encheres.service';
import { Component, OnInit } from '@angular/core';
import { ArticleVendu } from '../modeles/articlevendu';
import { Enchere } from '../modeles/enchere';
import { ArticlesvendusService } from '../services/articlesvendus.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mes-encheres',
  templateUrl: './mes-encheres.component.html',
  styleUrls: ['./mes-encheres.component.scss']
})
export class MesEncheresComponent implements OnInit {
  encheresForm: FormGroup;
  encheres = [
    'toutes mes enchères',
    'en cours',
    'terminées',
  ];
  isEnCours: boolean;
  isTerminees: boolean;

  listeEncheres: Enchere[] = [];
  listeArticles: ArticleVendu[] = [];
  listeidArticlesUserEncheres: number[] = [];
  listeUserEncheres: ArticleVendu[] = [];
  listeUserEncheresEnCours: ArticleVendu[] = [];
  listeUserEncheresTerminees: ArticleVendu[] = [];

  constructor(private articlesvendusService: ArticlesvendusService,
              private encheresService: EncheresService,
              private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.isEnCours = false;
    this.isTerminees = false;
    this.listeUserEncheres = [];
    this.listeUserEncheresEnCours = [];
    this.listeUserEncheresTerminees = [];
    const currentUser = sessionStorage.getItem('userPseudo');
    const currentDate = Date.now();
    console.log(currentDate);
    this.encheresService.afficherListe().subscribe(
      (encheresList) => {
        this.listeEncheres = encheresList;
        for (const enchere of this.listeEncheres){
          if (enchere.encherisseur === currentUser){
            this.listeidArticlesUserEncheres.push(enchere.idArticleVendu);
            console.log(this.listeidArticlesUserEncheres);
            this.articlesvendusService.afficherListe().subscribe(
              (objectsList) => {
                this.listeArticles = objectsList;
                for (const article of this.listeArticles){
                    if (this.listeidArticlesUserEncheres.includes(article.id)){
                      this.listeUserEncheres.push(article);
                      for (const objet of this.listeUserEncheres){
                        const DateDecoupeBarre = objet.dateFinEncheres.split('/');
                        const DateDecoupeSpace = DateDecoupeBarre[2].split(' ');
                        const DateDecoupePoints = DateDecoupeSpace[2].split(':');
                        const dateFinEncheres = new Date(DateDecoupeSpace[0], DateDecoupeBarre[1] - 1,
                        DateDecoupeBarre[0], DateDecoupePoints[0], DateDecoupePoints[1], DateDecoupePoints[2]).toISOString();
                        const numberDateFinEncheres = Date.parse(dateFinEncheres);
                        console.log(article.dateFinEncheres);
                        console.log(DateDecoupeBarre);
                        console.log(DateDecoupeSpace);
                        console.log(DateDecoupePoints);
                        console.log(dateFinEncheres);
                        console.log(numberDateFinEncheres);
                        if (numberDateFinEncheres > currentDate) {
                        this.listeUserEncheresEnCours.push(objet);
                        const cache1 = {};
                        this.listeUserEncheresEnCours = this.listeUserEncheresEnCours.filter(
                          (elem) => cache1[elem.id] ? 0 : cache1[elem.id] = 1);
                        console.log(this.listeUserEncheresEnCours);
                        this.isEnCours = true;
                        }
                        if (numberDateFinEncheres <= currentDate) {
                        this.listeUserEncheresTerminees.push(objet);
                        const cache2 = {};
                        this.listeUserEncheresTerminees = this.listeUserEncheresTerminees.filter(
                          (elem) => cache2[elem.id] ? 0 : cache2[elem.id] = 1);
                        console.log(this.listeUserEncheresTerminees);
                        this.isTerminees = true;
                        }
                      }
                  }
                }
              },
              (error) => {
                console.log('Erreur rencontrée! : ' + error);
              },
              () => {
                console.log('Observable liste de mes enchères par article réussi!');
              }
            );
          }
        }
      },
      (error) => {
        console.log('Erreur rencontrée! : ' + error);
      },
      () => {
        console.log('Observable liste de toutes mes enchères confondues réussi!');
      }
    );
    this.encheresForm = this.formbuilder.group({
      encheresControl: ['toutes mes enchères'],
   });
  }

  selectTypeEncheres(): void {
    this.isEnCours = true;
    this.isTerminees = true;
    this.listeUserEncheres = [];
    this.listeidArticlesUserEncheres = [];
    this.listeUserEncheresEnCours = [];
    this.listeUserEncheresTerminees = [];
    const formValue = this.encheresForm.value;
    const encheres = formValue['encheresControl'];
    const currentUser = sessionStorage.getItem('userPseudo');
    const currentDate = Date.now();
    console.log(currentDate);
    if (encheres === 'toutes mes enchères') {
      this.encheresService.afficherListe().subscribe(
        (encheresList) => {
          this.listeEncheres = encheresList;
          for (const enchere of this.listeEncheres){
            if (enchere.encherisseur === currentUser){
            /* if (enchere.encherisseur === currentUser){
              this.listeMeilleuresOffresPourObjetCourant.push(enchere.meilleureOffre);
              if (enchere.meilleureOffre === Math.max(...this.listeMeilleuresOffresPourObjetCourant)){
              this.listeidArticlesUserEncheres.push(enchere.idArticleVendu);
              console.log(this.listeidArticlesUserEncheres);
              this.articlesvendusService.afficherListe().subscribe(
                (objectsList) => {
                  this.listeArticles = objectsList;*/
              this.listeidArticlesUserEncheres.push(enchere.idArticleVendu);
              console.log(this.listeidArticlesUserEncheres);
              this.articlesvendusService.afficherListe().subscribe(
                (objectsList) => {
                  this.listeArticles = objectsList;
                  for (const article of this.listeArticles){
                      if (this.listeidArticlesUserEncheres.includes(article.id)){
                        this.listeUserEncheres.push(article);
                        for (const objet of this.listeUserEncheres){
                          const DateDecoupeBarre = objet.dateFinEncheres.split('/');
                          const DateDecoupeSpace = DateDecoupeBarre[2].split(' ');
                          const DateDecoupePoints = DateDecoupeSpace[2].split(':');
                          const dateFinEncheres = new Date(DateDecoupeSpace[0], DateDecoupeBarre[1] - 1,
                          DateDecoupeBarre[0], DateDecoupePoints[0], DateDecoupePoints[1], DateDecoupePoints[2]).toISOString();
                          const numberDateFinEncheres = Date.parse(dateFinEncheres);
                          console.log(article.dateFinEncheres);
                          console.log(DateDecoupeBarre);
                          console.log(DateDecoupeSpace);
                          console.log(DateDecoupePoints);
                          console.log(dateFinEncheres);
                          console.log(numberDateFinEncheres);
                          if (numberDateFinEncheres > currentDate) {
                          this.listeUserEncheresEnCours.push(objet);
                          const cache1 = {};
                          this.listeUserEncheresEnCours = this.listeUserEncheresEnCours.filter(
                            (elem) => cache1[elem.id] ? 0 : cache1[elem.id] = 1);
                          console.log(this.listeUserEncheresEnCours);
                          }
                          if (numberDateFinEncheres <= currentDate) {
                          this.listeUserEncheresTerminees.push(objet);
                          const cache2 = {};
                          this.listeUserEncheresTerminees = this.listeUserEncheresTerminees.filter(
                            (elem) => cache2[elem.id] ? 0 : cache2[elem.id] = 1);
                          console.log(this.listeUserEncheresTerminees);
                          }
                        }
                    }
                  }
                },
                (error) => {
                  console.log('Erreur rencontrée! : ' + error);
                },
                () => {
                  console.log('Observable liste de mes enchères par article réussi!');
                }
              );
            }
          }
        },
        (error) => {
          console.log('Erreur rencontrée! : ' + error);
        },
        () => {
          console.log('Observable liste de toutes mes enchères confondues réussi!');
        }
      );
    }
    if (encheres === 'en cours') {
      this.encheresService.afficherListe().subscribe(
        (encheresList) => {
          this.listeEncheres = encheresList;
          for (const enchere of this.listeEncheres){
            if (enchere.encherisseur === currentUser){
              this.listeidArticlesUserEncheres.push(enchere.idArticleVendu);
              console.log(this.listeidArticlesUserEncheres);
              this.articlesvendusService.afficherListe().subscribe(
                (objectsList) => {
                  this.listeArticles = objectsList;
                  for (const article of this.listeArticles){
                      if (this.listeidArticlesUserEncheres.includes(article.id)){
                        this.listeUserEncheres.push(article);
                        for (const objet of this.listeUserEncheres){
                          const DateDecoupeBarre = objet.dateFinEncheres.split('/');
                          const DateDecoupeSpace = DateDecoupeBarre[2].split(' ');
                          const DateDecoupePoints = DateDecoupeSpace[2].split(':');
                          const dateFinEncheres = new Date(DateDecoupeSpace[0], DateDecoupeBarre[1] - 1,
                          DateDecoupeBarre[0], DateDecoupePoints[0], DateDecoupePoints[1], DateDecoupePoints[2]).toISOString();
                          const numberDateFinEncheres = Date.parse(dateFinEncheres);
                          console.log(article.dateFinEncheres);
                          console.log(DateDecoupeBarre);
                          console.log(DateDecoupeSpace);
                          console.log(DateDecoupePoints);
                          console.log(dateFinEncheres);
                          console.log(numberDateFinEncheres);
                          if (numberDateFinEncheres > currentDate) {
                          this.listeUserEncheresEnCours.push(objet);
                          const cache1 = {};
                          this.listeUserEncheresEnCours = this.listeUserEncheresEnCours.filter(
                            (elem) => cache1[elem.id] ? 0 : cache1[elem.id] = 1);
                          console.log(this.listeUserEncheresEnCours);
                          }
                        }
                    }
                  }
                },
                (error) => {
                  console.log('Erreur rencontrée! : ' + error);
                },
                () => {
                  console.log('Observable liste de mes enchères par article réussi!');
                }
              );
            }
          }
        },
        (error) => {
          console.log('Erreur rencontrée! : ' + error);
        },
        () => {
          console.log('Observable liste de mes enchères en cours réussi!');
        }
      );
    }
    if (encheres === 'terminées'){
      this.encheresService.afficherListe().subscribe(
        (encheresList) => {
          this.listeEncheres = encheresList;
          for (const enchere of this.listeEncheres){
            if (enchere.encherisseur === currentUser){
              this.listeidArticlesUserEncheres.push(enchere.idArticleVendu);
              console.log(this.listeidArticlesUserEncheres);
              this.articlesvendusService.afficherListe().subscribe(
                (objectsList) => {
                  this.listeArticles = objectsList;
                  for (const article of this.listeArticles){
                      if (this.listeidArticlesUserEncheres.includes(article.id)){
                        this.listeUserEncheres.push(article);
                        for (const objet of this.listeUserEncheres){
                          const DateDecoupeBarre = objet.dateFinEncheres.split('/');
                          const DateDecoupeSpace = DateDecoupeBarre[2].split(' ');
                          const DateDecoupePoints = DateDecoupeSpace[2].split(':');
                          const dateFinEncheres = new Date(DateDecoupeSpace[0], DateDecoupeBarre[1] - 1,
                          DateDecoupeBarre[0], DateDecoupePoints[0], DateDecoupePoints[1], DateDecoupePoints[2]).toISOString();
                          const numberDateFinEncheres = Date.parse(dateFinEncheres);
                          console.log(article.dateFinEncheres);
                          console.log(DateDecoupeBarre);
                          console.log(DateDecoupeSpace);
                          console.log(DateDecoupePoints);
                          console.log(dateFinEncheres);
                          console.log(numberDateFinEncheres);
                          if (numberDateFinEncheres <= currentDate) {
                          this.listeUserEncheresTerminees.push(objet);
                          const cache2 = {};
                          this.listeUserEncheresTerminees = this.listeUserEncheresTerminees.filter(
                            (elem) => cache2[elem.id] ? 0 : cache2[elem.id] = 1);
                          console.log(this.listeUserEncheresTerminees);
                          }
                        }
                    }
                  }
                },
                (error) => {
                  console.log('Erreur rencontrée! : ' + error);
                },
                () => {
                  console.log('Observable liste de mes enchères par article réussi!');
                }
              );
            }
          }
        },
        (error) => {
          console.log('Erreur rencontrée! : ' + error);
        },
        () => {
          console.log('Observable liste de mes enchères terminées réussi!');
        }
      );
    }
  }

  verifEncheres(): boolean {
    if (this.isEnCours === true && this.isTerminees === true){
      return true;
    } else {
      return false;
    }
  }

}
