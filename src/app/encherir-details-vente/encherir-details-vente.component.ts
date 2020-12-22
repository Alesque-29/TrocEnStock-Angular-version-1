import { AuthentificationService } from './../services/authentification.service';
import { UtilisateursService } from './../services/utilisateurs.service';
import { EncheresService } from './../services/encheres.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesvendusService } from '../services/articlesvendus.service';
import { Enchere } from '../modeles/enchere';
import { Utilisateur } from '../modeles/utilisateur';
import { ArticleVendu } from '../modeles/articlevendu';

@Component({
  selector: 'app-encherir-details-vente',
  templateUrl: './encherir-details-vente.component.html',
  styleUrls: ['./encherir-details-vente.component.scss'],
})
export class EncherirDetailsVenteComponent implements OnInit {
  form: NgForm;

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

  idArticle: number;
  nomArticle: string;
  description: string;
  categorie: string;
  dateDebutEncheres: Date;
  dateFinEncheres: Date;
  miseAPrix: number;
  rue: string;
  codePostal: string;
  ville: string;
  vendeur: string;
  etatVente: boolean;

  id: number;
  idArticleVendu: number;
  dateEnchere: Date;
  proposition: number;
  meilleureOffre: number;
  prixVente: number;
  encherisseur: string;
  enchereMax: number;
  encheres: Enchere[] = [];
  listeEncheres: Enchere[] = [];
  listeEncheresCurrentArticle: Enchere[] = [];
  listePropositions: number[] = [];

  constructor(
    private authentificationService: AuthentificationService,
    private articlesvendusService: ArticlesvendusService,
    private utilisateursService: UtilisateursService,
    private encheresService: EncheresService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listeEncheres = [];
    this.listeEncheresCurrentArticle = [];
    this.listePropositions = [];
    const idObject = this.route.snapshot.params['id'];
    this.idArticle = idObject;
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
        this.vendeur = objet.vendeur;
        this.etatVente = objet.etatVente;
        if (this.etatVente === true) {
          /*this.encheresService.selectionParIdArticleVendu(idObject).subscribe(
            (enchere) => {
              console.log('Enchères en cours');
              this.id = enchere.id;
              this.idArticleVendu = enchere.idArticleVendu;
              this.dateEnchere = enchere.dateEnchere;
              this.proposition = enchere.proposition;
              this.meilleureOffre = enchere.meilleureOffre;
              this.prixVente = enchere.prixVente;
              this.encherisseur = enchere.encherisseur;
              this.proposition = this.meilleureOffre + 1;*/
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
                      this.proposition = this.meilleureOffre + 1;
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
                console.log('Observable récupération enchère max pour l article courant réussi!');
              }
            );
        } else if (this.etatVente === false) {
          console.log('Enchères pas commencées');
          this.proposition = this.miseAPrix + 1;
        }
      },
      (error) => {
        console.log('Erreur rencontrée! : ' + error);
      },
      () => {
        console.log(
          'Observable récupération articleVendu pageEnchèrir réussi!'
        );
      }
    );
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

  verifEtatVente(): boolean {
    if (this.etatVente === true) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit(form: NgForm): void {
    const userCredit = sessionStorage.getItem('userCredit');
    const idEnchere = undefined;
    const idArticleVendu = this.idArticle;
    const dateEnchere = new Date(Date.now()).toLocaleString();
    const proposition = form.value['proposition'];
    const prixVente = 0;
    const encherisseur = sessionStorage.getItem('userPseudo');
    const etatEnchere = false;
    const newEnchere = new Enchere(
      idEnchere,
      idArticleVendu,
      dateEnchere,
      proposition,
      prixVente,
      encherisseur,
      etatEnchere
    );
    console.log(newEnchere);
    console.log(userCredit);
    console.log(this.proposition);
    console.log(Number(userCredit));
    if (this.authentificationService.isAuth === true){
      if (this.proposition <= Number(userCredit)) {
        this.encheresService.creerEnchere(newEnchere).subscribe(
          (enchere) => {
            this.encheres.push(enchere);

          },
          (error) => {
            console.log('Erreur rencontrée! : ' + error);
          },
          () => {
            console.log('Enchère enregistrée!');
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
        const vendeur = this.userVendeur;
        const userEncherisseur = true;
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
          userEncherisseur
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
        sessionStorage.setItem('userEncherisseur', 'true');
        const idArticle = this.idArticle;
        const nomArticle = this.nomArticle;
        const description = this.description;
        const categorie = this.categorie;
        const dateDebutEncheres = this.dateDebutEncheres;
        const dateFinEncheres = this.dateFinEncheres;
        const miseAPrix = this.miseAPrix;
        const retraitRue = this.rue;
        const retraitCodePostal = this.codePostal;
        const retraitVille = this.ville;
        const vendeurArticle = this.vendeur;
        // enchères en cours = true; enchères pas commencées = false
        const etatVente = true;
        const acquereur = '';
        const newProduct = new ArticleVendu(
          idArticle,
          nomArticle,
          description,
          categorie,
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
        console.log(newProduct);
        this.articlesvendusService.modifierArticle(newProduct).subscribe(
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
        this.router.navigate(['mes-enchères']);
      } else {
        alert('Vous n\'avez pas suffisament de points pour enchérir sur cet objet');
      }
    } else {
      alert('Vous devez vous inscrire ou vous connecter pour enchérir sur cet objet');
    }
  }
}
