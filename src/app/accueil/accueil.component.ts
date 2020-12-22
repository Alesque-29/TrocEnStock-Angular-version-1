import { UtilisateursService } from './../services/utilisateurs.service';
import { EncheresService } from './../services/encheres.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ArticleVendu } from './../modeles/articlevendu';
import { ArticlesvendusService } from './../services/articlesvendus.service';
import { Component, OnInit } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { Enchere } from '../modeles/enchere';
import { Utilisateur } from '../modeles/utilisateur';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent implements OnInit {
  categorieForm: FormGroup;
  listeArticles: ArticleVendu[] = [];
  listeFiltre: ArticleVendu[] = [];
  ListeArticlesEncheresTerminees: ArticleVendu[] = [];
  listeEncheres: Enchere[] = [];
  listeEncheresCurrentArticle: Enchere[] = [];
  listeUtilisateurs: Utilisateur[] = [];
  ListeIdArticlesEncheresTerminees: number[] = [];
  listePropositions: number[] = [];
  categorieElectromenager: ArticleVendu[] = [];
  categorieHabillement: ArticleVendu[] = [];
  categorieInformatique: ArticleVendu[] = [];
  categorieMobilier: ArticleVendu[] = [];
  categorieTelephonie: ArticleVendu[] = [];
  categories = [
    'Toutes les catégories',
    'Electroménager',
    'Habillement',
    'Informatique',
    'Mobilier',
    'Téléphonie',
  ];
  isAllCat: boolean;
  isElectromenager: boolean;
  isHabillement: boolean;
  isInformatique: boolean;
  isMobilier: boolean;
  isTelephonie: boolean;

  enchereMax: number;
  idEnchereGagnante: number;
  idEncherePerdante: number;
  idArticleVendu: number;
  dateEnchere: any;
  proposition: number;
  encherisseur: string;
  prixDeVente: number;
  etatEnchere: boolean;
  acquereurEncherisseur: string;

  idArticle: number;
  nomArticle: string;
  description: string;
  categorie: string;
  articleDateDebutEncheres: any;
  articleDateFinEncheres: any;
  miseAPrix: number;
  articleRue: string;
  articleCodePostal: string;
  articleVille: string;
  articleVendeur: string;
  etatVente: boolean;
  acquereurArticle: string;

  pseudo: string;
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  telephone: string;
  rue: string;
  codePostal: string;
  ville: string;
  credit: number;
  vendeur: boolean;
  utilisateurEncherisseur: boolean;

  constructor(
    private articlesvendusService: ArticlesvendusService,
    private encheresService: EncheresService,
    private utilisateursService: UtilisateursService,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listeFiltre = [];
    this.listeEncheres = [];
    this.listeEncheresCurrentArticle = [];
    this.listePropositions = [];
    this.ListeArticlesEncheresTerminees = [];
    const currentUser = sessionStorage.getItem('userPseudo');
    const currentDate = Date.now();
    console.log(currentDate);
    this.articlesvendusService.afficherListe().subscribe(
      (objectsList) => {
        this.listeArticles = objectsList;
        console.log(this.listeArticles);
        for (const article of this.listeArticles) {
          if (article.vendeur !== currentUser) {
            const DateDecoupeBarre = article.dateFinEncheres.split('/');
            const DateDecoupeSpace = DateDecoupeBarre[2].split(' ');
            const DateDecoupePoints = DateDecoupeSpace[2].split(':');
            const dateFinEncheres = new Date(
              DateDecoupeSpace[0],
              DateDecoupeBarre[1] - 1,
              DateDecoupeBarre[0],
              DateDecoupePoints[0],
              DateDecoupePoints[1],
              DateDecoupePoints[2]
            ).toISOString();
            const numberDateFinEncheres = Date.parse(dateFinEncheres);
            console.log(article.dateFinEncheres);
            console.log(DateDecoupeBarre);
            console.log(DateDecoupeSpace);
            console.log(DateDecoupePoints);
            console.log(dateFinEncheres);
            console.log(numberDateFinEncheres);
            if (numberDateFinEncheres > currentDate) {
              this.listeFiltre.push(article);
              console.log(this.listeFiltre);
              this.isAllCat = true;
            }
            /*if (numberDateFinEncheres <= currentDate) {
              this.ListeArticlesEncheresTerminees.push(article);
              console.log(this.ListeArticlesEncheresTerminees);
              this.encheresService.afficherListe().subscribe(
                (encheresList) => {
                  this.listeEncheres = encheresList;
                  for (const articleEncheresTerminees of this.ListeArticlesEncheresTerminees) {
                    for (const enchere of this.listeEncheres) {
                      if (enchere.idArticleVendu === articleEncheresTerminees.id) {
                        this.listeEncheresCurrentArticle.push(enchere);
                        console.log('this.listeEncheresCurrentArticle' + this.listeEncheresCurrentArticle);
                      }
                    }
                  }
                  for (const enchereArticle of this.listeEncheresCurrentArticle) {
                    this.listePropositions.push(enchereArticle.proposition);
                    console.log(this.listePropositions);
                  }
                  for (const proposition of this.listePropositions) {
                    if (proposition === Math.max(...this.listePropositions)) {
                      this.enchereMax = proposition;
                      console.log(this.enchereMax);
                    }
                  }
                  for (const enchereEnCours of this.listeEncheresCurrentArticle) {
                    if (enchereEnCours.etatEnchere === false || enchereEnCours.proposition === this.enchereMax) {
                      this.idEnchereGagnante = enchereEnCours.id;
                      this.idArticleVendu = enchereEnCours.idArticleVendu;
                      this.dateEnchere = enchereEnCours.dateEnchere;
                      this.proposition = enchereEnCours.proposition;
                      this.prixDeVente = enchereEnCours.proposition;
                      this.encherisseur = enchereEnCours.encherisseur;
                      this.etatEnchere = true;
                      this.acquereurEncherisseur = enchereEnCours.encherisseur;
                      const enchereGagnante = new Enchere(
                        this.idEnchereGagnante,
                        this.idArticleVendu,
                        this.dateEnchere,
                        this.proposition,
                        this.proposition,
                        this.encherisseur,
                        this.etatEnchere
                      );
                      console.log(enchereGagnante);
                      this.encheresService.modifierEnchere(enchereGagnante).subscribe(
                        (enchereEnCoursCurrentArticle) => {
                          console.log(enchereEnCoursCurrentArticle);
                        },
                        (error) => {
                          console.log('Erreur rencontrée! : ' + error);
                        },
                        () => {
                          console.log('Enchère gagnante modifiée!');
                        }
                      );
                    }
                    if (enchereEnCours.etatEnchere === false || enchereEnCours.proposition !== this.enchereMax) {
                      this.idEncherePerdante = enchereEnCours.id;
                      this.idArticleVendu = enchereEnCours.idArticleVendu;
                      this.dateEnchere = enchereEnCours.dateEnchere;
                      this.proposition = enchereEnCours.proposition;
                      this.prixDeVente = this.enchereMax;
                      this.encherisseur = enchereEnCours.encherisseur;
                      this.etatEnchere = true;
                      const updatedEnchere = new Enchere(
                        this.idEncherePerdante,
                        this.idArticleVendu,
                        this.dateEnchere,
                        this.proposition,
                        this.proposition,
                        this.encherisseur,
                        this.etatEnchere
                      );
                      console.log(updatedEnchere);
                      this.encheresService.modifierEnchere(updatedEnchere).subscribe(
                        (enchereEnCoursCurrentArticle) => {
                          console.log(enchereEnCoursCurrentArticle);
                        },
                        (error) => {
                          console.log('Erreur rencontrée! : ' + error);
                        },
                        () => {
                          console.log('Enchère perdu modifiée!');
                        }
                      );
                    }
                  }
                  for (const articleEncheresTerminees of this.ListeArticlesEncheresTerminees) {
                    if (articleEncheresTerminees.id === this.idArticleVendu) {
                      this.idArticle = articleEncheresTerminees.id;
                      this.nomArticle = articleEncheresTerminees.nomArticle;
                      this.description = articleEncheresTerminees.description;
                      this.categorie = articleEncheresTerminees.categorie;
                      this.articleDateDebutEncheres = articleEncheresTerminees.dateDebutEncheres;
                      this.articleDateFinEncheres = articleEncheresTerminees.dateFinEncheres;
                      this.miseAPrix = articleEncheresTerminees.miseAPrix;
                      this.articleRue = articleEncheresTerminees.rue;
                      this.articleCodePostal = articleEncheresTerminees.codePostal;
                      this.articleVille = articleEncheresTerminees.ville;
                      this.articleVendeur = articleEncheresTerminees.vendeur;
                      this.etatVente = articleEncheresTerminees.etatVente;
                      this.acquereurArticle = this.acquereurEncherisseur;
                      const updatedArticle = new ArticleVendu(
                        this.idArticle,
                        this.nomArticle,
                        this.description,
                        this.categorie,
                        this.articleDateDebutEncheres,
                        this.articleDateFinEncheres,
                        this.miseAPrix,
                        this.articleRue,
                        this.articleCodePostal,
                        this.articleVille,
                        this.articleVendeur,
                        this.etatVente,
                        this.acquereurArticle
                      );
                      console.log(updatedArticle);
                      this.articlesvendusService.modifierArticle(updatedArticle).subscribe(
                        (object) => {
                          console.log(object);
                        },
                        (error) => {
                          console.log('Erreur rencontrée! : ' + error);
                        },
                        () => {
                          console.log('Article modifié pour acquéreur!');
                        }
                      );
                    }
                  }
                  this.utilisateursService.afficherListe().subscribe(
                    (utilisateursList) => {
                    this.listeUtilisateurs = utilisateursList;
                    for (const utilisateur of this.listeUtilisateurs) {
                      if (utilisateur.pseudo === this.acquereurArticle) {
                        this.pseudo = utilisateur.pseudo;
                        this.nom = utilisateur.nom;
                        this.prenom = utilisateur.prenom;
                        this.email = utilisateur.email;
                        this.motDePasse = utilisateur.motDePasse;
                        this.telephone = utilisateur.telephone;
                        this.rue = utilisateur.rue;
                        this.codePostal = utilisateur.codePostal;
                        this.ville = utilisateur.ville;
                        this.credit = utilisateur.credit;
                        this.vendeur = utilisateur.vendeur;
                        this.utilisateurEncherisseur = utilisateur.encherisseur;
                        const updatedUser = new Utilisateur(
                          this.pseudo,
                          this.nom,
                          this.prenom,
                          this.email,
                          this.motDePasse,
                          this.telephone,
                          this.rue,
                          this.codePostal,
                          this.ville,
                          this.credit - this.enchereMax,
                          this.vendeur,
                          this.utilisateurEncherisseur
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
                            console.log('Utilisateur acquéreur modifié!');
                          }
                        );
                      }
                      if (utilisateur.pseudo === this.articleVendeur) {
                        this.pseudo = utilisateur.pseudo;
                        this.nom = utilisateur.nom;
                        this.prenom = utilisateur.prenom;
                        this.email = utilisateur.email;
                        this.motDePasse = utilisateur.motDePasse;
                        this.telephone = utilisateur.telephone;
                        this.rue = utilisateur.rue;
                        this.codePostal = utilisateur.codePostal;
                        this.ville = utilisateur.ville;
                        this.credit = utilisateur.credit;
                        this.vendeur = utilisateur.vendeur;
                        this.utilisateurEncherisseur = utilisateur.encherisseur;
                        const updatedUser = new Utilisateur(
                          this.pseudo,
                          this.nom,
                          this.prenom,
                          this.email,
                          this.motDePasse,
                          this.telephone,
                          this.rue,
                          this.codePostal,
                          this.ville,
                          this.credit + this.enchereMax,
                          this.vendeur,
                          this.utilisateurEncherisseur
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
                            console.log('Utilisateur vendeur modifié!');
                          }
                        );
                      }
                    }
                  });
                },
                (error) => {
                  console.log('Erreur rencontrée! : ' + error);
                },
                () => {
                  console.log('Observable récupération enchère max + modif° enchères pour currentArticle réussi!');
                }
              );
            }*/
          }
        }
      },
      (error) => {
        console.log('Erreur rencontrée! : ' + error);
      },
      () => {
        console.log('Observable liste complète des objects avec enchères ouvertes réussi!');
      }
    );
    this.categorieForm = this.formbuilder.group({
      categorieControl: ['Toutes les catégories'],
    });
  }

  selectCategorie(): void {
    this.isAllCat = false;
    this.isElectromenager = false;
    this.isHabillement = false;
    this.isInformatique = false;
    this.isMobilier = false;
    this.isTelephonie = false;
    this.listeFiltre = [];
    this.categorieElectromenager = [];
    this.categorieHabillement = [];
    this.categorieInformatique = [];
    this.categorieMobilier = [];
    this.categorieTelephonie = [];
    const formValue = this.categorieForm.value;
    const categorie = formValue['categorieControl'];
    const currentUser = sessionStorage.getItem('userPseudo');
    const currentDate = Date.now();
    switch (categorie) {
      case 'Toutes les catégories': {
        this.articlesvendusService.afficherListe().subscribe(
          (objectsList) => {
            this.listeArticles = objectsList;
            console.log(this.listeArticles);
            for (const article of this.listeArticles) {
              if (article.vendeur !== currentUser) {
                const DateDecoupeBarre = article.dateFinEncheres.split('/');
                const DateDecoupeSpace = DateDecoupeBarre[2].split(' ');
                const DateDecoupePoints = DateDecoupeSpace[2].split(':');
                const dateFinEncheres = new Date(
                  DateDecoupeSpace[0],
                  DateDecoupeBarre[1] - 1,
                  DateDecoupeBarre[0],
                  DateDecoupePoints[0],
                  DateDecoupePoints[1],
                  DateDecoupePoints[2]
                ).toISOString();
                const numberDateFinEncheres = Date.parse(dateFinEncheres);
                console.log(article.dateFinEncheres);
                console.log(DateDecoupeBarre);
                console.log(DateDecoupeSpace);
                console.log(DateDecoupePoints);
                console.log(dateFinEncheres);
                console.log(numberDateFinEncheres);
                if (numberDateFinEncheres > currentDate) {
                  this.listeFiltre.push(article);
                  this.isAllCat = true;
                }
              }
            }
          },
          (error) => {
            console.log('Erreur rencontrée! : ' + error);
          },
          () => {
            console.log('Observable liste "Toutes les catégories" réussi!');
          }
        );
        break;
      }
      case 'Electroménager': {
        this.articlesvendusService.afficherListe().subscribe(
          (objectsList) => {
            this.listeArticles = objectsList;
            for (const article of this.listeArticles) {
              if (article.categorie === 'Electroménager') {
                const DateDecoupeBarre = article.dateFinEncheres.split('/');
                const DateDecoupeSpace = DateDecoupeBarre[2].split(' ');
                const DateDecoupePoints = DateDecoupeSpace[2].split(':');
                const dateFinEncheres = new Date(
                  DateDecoupeSpace[0],
                  DateDecoupeBarre[1] - 1,
                  DateDecoupeBarre[0],
                  DateDecoupePoints[0],
                  DateDecoupePoints[1],
                  DateDecoupePoints[2]
                ).toISOString();
                const numberDateFinEncheres = Date.parse(dateFinEncheres);
                console.log(article.dateFinEncheres);
                console.log(DateDecoupeBarre);
                console.log(DateDecoupeSpace);
                console.log(DateDecoupePoints);
                console.log(dateFinEncheres);
                console.log(numberDateFinEncheres);
                if (numberDateFinEncheres > currentDate) {
                  this.categorieElectromenager.push(article);
                  console.log(this.categorieElectromenager);
                  this.isElectromenager = true;
                }
              }
            }
          },
          (error) => {
            console.log('Erreur rencontrée! : ' + error);
          },
          () => {
            console.log('Observable liste "Electroménager" réussi!');
          }
        );
        break;
      }
      case 'Habillement': {
        this.articlesvendusService.afficherListe().subscribe(
          (objectsList) => {
            this.listeArticles = objectsList;
            for (const article of this.listeArticles) {
              if (article.categorie === 'Habillement') {
                const DateDecoupeBarre = article.dateFinEncheres.split('/');
                const DateDecoupeSpace = DateDecoupeBarre[2].split(' ');
                const DateDecoupePoints = DateDecoupeSpace[2].split(':');
                const dateFinEncheres = new Date(
                  DateDecoupeSpace[0],
                  DateDecoupeBarre[1] - 1,
                  DateDecoupeBarre[0],
                  DateDecoupePoints[0],
                  DateDecoupePoints[1],
                  DateDecoupePoints[2]
                ).toISOString();
                const numberDateFinEncheres = Date.parse(dateFinEncheres);
                console.log(article.dateFinEncheres);
                console.log(DateDecoupeBarre);
                console.log(DateDecoupeSpace);
                console.log(DateDecoupePoints);
                console.log(dateFinEncheres);
                console.log(numberDateFinEncheres);
                if (numberDateFinEncheres > currentDate) {
                  this.categorieHabillement.push(article);
                  console.log(this.categorieHabillement);
                  this.isHabillement = true;
                }
              }
            }
          },
          (error) => {
            console.log('Erreur rencontrée! : ' + error);
          },
          () => {
            console.log('Observable liste "Habillement" réussi!');
          }
        );
        break;
      }
      case 'Informatique': {
        this.articlesvendusService.afficherListe().subscribe(
          (objectsList) => {
            this.listeArticles = objectsList;
            for (const article of this.listeArticles) {
              if (article.categorie === 'Informatique') {
                const DateDecoupeBarre = article.dateFinEncheres.split('/');
                const DateDecoupeSpace = DateDecoupeBarre[2].split(' ');
                const DateDecoupePoints = DateDecoupeSpace[2].split(':');
                const dateFinEncheres = new Date(
                  DateDecoupeSpace[0],
                  DateDecoupeBarre[1] - 1,
                  DateDecoupeBarre[0],
                  DateDecoupePoints[0],
                  DateDecoupePoints[1],
                  DateDecoupePoints[2]
                ).toISOString();
                const numberDateFinEncheres = Date.parse(dateFinEncheres);
                console.log(article.dateFinEncheres);
                console.log(DateDecoupeBarre);
                console.log(DateDecoupeSpace);
                console.log(DateDecoupePoints);
                console.log(dateFinEncheres);
                console.log(numberDateFinEncheres);
                if (numberDateFinEncheres > currentDate) {
                  this.categorieInformatique.push(article);
                  console.log(this.categorieInformatique);
                  this.isInformatique = true;
                }
              }
            }
          },
          (error) => {
            console.log('Erreur rencontrée! : ' + error);
          },
          () => {
            console.log('Observable liste "Informatique" réussi!');
          }
        );
        break;
      }
      case 'Mobilier': {
        this.articlesvendusService.afficherListe().subscribe(
          (objectsList) => {
            this.listeArticles = objectsList;
            for (const article of this.listeArticles) {
              if (article.categorie === 'Mobilier') {
                const DateDecoupeBarre = article.dateFinEncheres.split('/');
                const DateDecoupeSpace = DateDecoupeBarre[2].split(' ');
                const DateDecoupePoints = DateDecoupeSpace[2].split(':');
                const dateFinEncheres = new Date(
                  DateDecoupeSpace[0],
                  DateDecoupeBarre[1] - 1,
                  DateDecoupeBarre[0],
                  DateDecoupePoints[0],
                  DateDecoupePoints[1],
                  DateDecoupePoints[2]
                ).toISOString();
                const numberDateFinEncheres = Date.parse(dateFinEncheres);
                console.log(article.dateFinEncheres);
                console.log(DateDecoupeBarre);
                console.log(DateDecoupeSpace);
                console.log(DateDecoupePoints);
                console.log(dateFinEncheres);
                console.log(numberDateFinEncheres);
                if (numberDateFinEncheres > currentDate) {
                  this.categorieMobilier.push(article);
                  console.log(this.categorieMobilier);
                  this.isMobilier = true;
                }
              }
            }
          },
          (error) => {
            console.log('Erreur rencontrée! : ' + error);
          },
          () => {
            console.log('Observable liste "Mobilier" réussi!');
          }
        );
        break;
      }
      case 'Téléphonie': {
        this.articlesvendusService.afficherListe().subscribe(
          (objectsList) => {
            this.listeArticles = objectsList;
            for (const article of this.listeArticles) {
              if (article.categorie === 'Téléphonie') {
                const DateDecoupeBarre = article.dateFinEncheres.split('/');
                const DateDecoupeSpace = DateDecoupeBarre[2].split(' ');
                const DateDecoupePoints = DateDecoupeSpace[2].split(':');
                const dateFinEncheres = new Date(
                  DateDecoupeSpace[0],
                  DateDecoupeBarre[1] - 1,
                  DateDecoupeBarre[0],
                  DateDecoupePoints[0],
                  DateDecoupePoints[1],
                  DateDecoupePoints[2]
                ).toISOString();
                const numberDateFinEncheres = Date.parse(dateFinEncheres);
                console.log(article.dateFinEncheres);
                console.log(DateDecoupeBarre);
                console.log(DateDecoupeSpace);
                console.log(DateDecoupePoints);
                console.log(dateFinEncheres);
                console.log(numberDateFinEncheres);
                if (numberDateFinEncheres > currentDate) {
                  this.categorieTelephonie.push(article);
                  console.log(this.categorieTelephonie);
                  this.isTelephonie = true;
                }
              }
            }
          },
          (error) => {
            console.log('Erreur rencontrée! : ' + error);
          },
          () => {
            console.log('Observable liste "Téléphonie" réussi!');
          }
        );
        break;
      }
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
