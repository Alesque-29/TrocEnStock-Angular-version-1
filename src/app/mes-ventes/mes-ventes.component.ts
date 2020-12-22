import { ArticlesvendusService } from './../services/articlesvendus.service';
import { Component, OnInit } from '@angular/core';
import { ArticleVendu } from '../modeles/articlevendu';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mes-ventes',
  templateUrl: './mes-ventes.component.html',
  styleUrls: ['./mes-ventes.component.scss']
})
export class MesVentesComponent implements OnInit {
  ventesForm: FormGroup;
  ventes = [
    'toutes mes ventes',
    'en cours',
    'terminées',
  ];
  isEnCours: boolean;
  isTerminees: boolean;

  listeArticles: ArticleVendu[] = [];
  listeUserVentesEnCours: ArticleVendu[] = [];
  listeUserVentesTerminees: ArticleVendu[] = [];

  constructor(private articlesvendusService: ArticlesvendusService,
              private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.isEnCours = false;
    this.isTerminees = false;
    this.listeUserVentesEnCours = [];
    this.listeUserVentesTerminees = [];
    const currentUser = sessionStorage.getItem('userPseudo');
    const currentDate = Date.now();
    console.log(currentDate);
    this.articlesvendusService.afficherListe().subscribe(
      (objectsList) => {
        this.listeArticles = objectsList;
        for (const article of this.listeArticles){
          if (article.vendeur === currentUser){
            const DateDecoupeBarre = article.dateFinEncheres.split('/');
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
            this.listeUserVentesEnCours.push(article);
            this.isEnCours = true;
            }
            if (numberDateFinEncheres <= currentDate) {
            this.listeUserVentesTerminees.push(article);
            this.isTerminees = true;
            }
          }
        }
      },
      (error) => {
        console.log('Erreur rencontrée! : ' + error);
      },
      () => {
        console.log('Observable liste de toutes mes ventes confondues réussi!');
      }
    );
    this.ventesForm = this.formbuilder.group({
       ventesControl: ['toutes mes ventes'],
    });
  }

  selectTypeVentes(): void {
    this.isEnCours = true;
    this.isTerminees = true;
    this.listeUserVentesEnCours = [];
    this.listeUserVentesTerminees = [];
    const formValue = this.ventesForm.value;
    const ventes = formValue['ventesControl'];
    const currentUser = sessionStorage.getItem('userPseudo');
    const currentDate = Date.now();
    console.log(currentDate);
    if (ventes === 'toutes mes ventes') {
      this.articlesvendusService.afficherListe().subscribe(
        (objectsList) => {
          this.listeArticles = objectsList;
          for (const article of this.listeArticles){
            if (article.vendeur === currentUser){
              const DateDecoupeBarre = article.dateFinEncheres.split('/');
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
              this.listeUserVentesEnCours.push(article);
              }
              if (numberDateFinEncheres <= currentDate) {
              this.listeUserVentesTerminees.push(article);
              }
            }
          }
        },
        (error) => {
          console.log('Erreur rencontrée! : ' + error);
        },
        () => {
          console.log('Observable liste de toutes mes ventes confondues réussi!');
        }
      );
    }
    if (ventes === 'en cours') {
      this.articlesvendusService.afficherListe().subscribe(
        (objectsList) => {
          this.listeArticles = objectsList;
          for (const article of this.listeArticles){
            if (article.vendeur === currentUser){
              const DateDecoupeBarre = article.dateFinEncheres.split('/');
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
              this.listeUserVentesEnCours.push(article);
              }
            }
          }
        },
        (error) => {
          console.log('Erreur rencontrée! : ' + error);
        },
        () => {
          console.log('Observable liste de mes ventes en cours réussi!');
        }
      );
    }
    if (ventes === 'terminées'){
      this.articlesvendusService.afficherListe().subscribe(
        (objectsList) => {
          this.listeArticles = objectsList;
          for (const article of this.listeArticles){
            if (article.vendeur === currentUser){
              const DateDecoupeBarre = article.dateFinEncheres.split('/');
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
              this.listeUserVentesTerminees.push(article);
              }
            }
          }
        },
        (error) => {
          console.log('Erreur rencontrée! : ' + error);
        },
        () => {
          console.log('Observable liste de mes ventes terminées réussi!');
        }
      );
    }
  }

  verifVentes(): boolean {
    if (this.isEnCours === true && this.isTerminees === true){
      return true;
    } else {
      return false;
    }
  }

  /*uploadedImage: Blob;

  constructor(private ng2ImgMax: Ng2ImgMaxService) {}

  onImageChange(event) {
    let image = event.target.files[0];

    this.ng2ImgMax.resizeImage(image, 400, 300).subscribe(
      result => {
        this.uploadedImage = result;
      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );
  }*/

}
