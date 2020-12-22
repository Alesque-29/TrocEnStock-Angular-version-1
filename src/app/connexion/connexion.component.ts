import { ArticleVendu } from './../modeles/articlevendu';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from './../services/authentification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})
export class ConnexionComponent implements OnInit {
  userForm: FormGroup;
  authEmail: string;
  userPseudo: string;
  userPoints: string;
  userVendeur: string;
  userEncherisseur: string;
  listeArticles: ArticleVendu[] = [];

  constructor(
    private formbuilder: FormBuilder,
    private authentificationService: AuthentificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.formbuilder.group({
      email: ['', Validators.required, Validators.email],
      motDePasse: ['', Validators.required],
    });
  }

  onSignIn(): void {
    const formValue = this.userForm.value;
    const email = formValue['email'];
    const motDePasse = formValue['motDePasse'];
    console.log(email);
    console.log(motDePasse);
    this.authentificationService.authentification(email).subscribe(
      (user) => {
        console.log(user);
        if (user === null) {
          console.log('Identifiants incorrects!');
          this.router.navigate(['connexionRefusee']);
        } else if (user.email === email && user.motDePasse === motDePasse) {
          console.log('Authentification réussie!');
          this.authentificationService.signIn();
          this.authEmail = user.email;
          this.userPseudo = user.pseudo;
          this.userPoints = user.credit.toString();
          if (user.vendeur === true) {
            this.userVendeur = 'true';
          } else {
            this.userVendeur = 'false';
          }
          if (user.encherisseur === true) {
            this.userEncherisseur = 'true';
          } else {
            this.userEncherisseur = 'false';
          }
          sessionStorage.setItem('authEmail', this.authEmail);
          sessionStorage.setItem('userPseudo', this.userPseudo);
          sessionStorage.setItem('userCredit', this.userPoints);
          sessionStorage.setItem('userVendeur', this.userVendeur);
          sessionStorage.setItem('userEncherisseur', this.userEncherisseur);
          this.router.navigate(['']);
        } else {
          console.log('Identifiants incorrects!');
          this.router.navigate(['connexionRefusee']);
        }
      },
      (error) => {
        console.log('Identifiants incorrects!' + error);
        this.router.navigate(['connexionRefusee']);
      },
      () => {
        console.log('Observable et accès à la base données réussis!');
      }
    );
  }
}
