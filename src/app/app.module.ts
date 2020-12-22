import { AuthGuard } from './services/auth-guard.service';
import { AuthentificationService } from './services/authentification.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2ImgMaxModule } from 'ng2-img-max';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ConnexionRefuseeComponent } from './connexion-refusee/connexion-refusee.component';
import { ArticlesvendusService } from './services/articlesvendus.service';
import { EncheresService } from './services/encheres.service';
import { UtilisateursService } from './services/utilisateurs.service';
import { InscriptionComponent } from './inscription/inscription.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CompteAfficherComponent } from './compte-afficher/compte-afficher.component';
import { CompteModifierComponent } from './compte-modifier/compte-modifier.component';
import { CompteSupprimerComponent } from './compte-supprimer/compte-supprimer.component';
import { EncherirDetailsVenteComponent } from './encherir-details-vente/encherir-details-vente.component';
import { CompteSuppressionEffectueeComponent } from './compte-suppression-effectuee/compte-suppression-effectuee.component';
import { CompteModificationEffectueeComponent } from './compte-modification-effectuee/compte-modification-effectuee.component';
import { VenteCreerComponent } from './vente-creer/vente-creer.component';
import { VenteSupprimerComponent } from './vente-supprimer/vente-supprimer.component';
import { VenteSuppressionEffectueeComponent } from './vente-suppression-effectuee/vente-suppression-effectuee.component';
import { VenteAfficherComponent } from './vente-afficher/vente-afficher.component';
import { MesEncheresComponent } from './mes-encheres/mes-encheres.component';
import { MesVentesComponent } from './mes-ventes/mes-ventes.component';
import { EnchereAfficherComponent } from './enchere-afficher/enchere-afficher.component';
import { AcquisitionSuiteMaVenteComponent } from './acquisition-suite-ma-vente/acquisition-suite-ma-vente.component';
import { AcquisitionSuiteMonEnchereComponent } from './acquisition-suite-mon-enchere/acquisition-suite-mon-enchere.component';

const appRoutes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'connexionRefusee', component: ConnexionRefuseeComponent },
  { path: 'inscription', component: InscriptionComponent },
  {
    path: 'encherir/details/:id',
    component: EncherirDetailsVenteComponent,
  },
  {
    path: 'compte/afficher',
    canActivate: [AuthGuard],
    component: CompteAfficherComponent,
  },
  {
    path: 'compte/modifier',
    canActivate: [AuthGuard],
    component: CompteModifierComponent,
  },
  {
    path: 'compte/modification-effectuee',
    canActivate: [AuthGuard],
    component: CompteModificationEffectueeComponent,
  },
  {
    path: 'compte/supprimer',
    canActivate: [AuthGuard],
    component: CompteSupprimerComponent,
  },
  {
    path: 'compte/suppression-effectuee',
    canActivate: [AuthGuard],
    component: CompteSuppressionEffectueeComponent,
  },
  {
    path: 'vente/creer',
    canActivate: [AuthGuard],
    component: VenteCreerComponent,
  },
  {
    path: 'vente/supprimer/:id',
    canActivate: [AuthGuard],
    component: VenteSupprimerComponent,
  },
  {
    path: 'vente/suppression-effectuee',
    canActivate: [AuthGuard],
    component: VenteSuppressionEffectueeComponent,
  },
  {
    path: 'mes-ventes',
    // canActivate: [AuthGuard],
    component: MesVentesComponent,
  },
  {
    path: 'vente/afficher/:id',
    // canActivate: [AuthGuard],
    component: VenteAfficherComponent,
  },
  {
    path: 'vente/terminee/afficher/:id',
    // canActivate: [AuthGuard],
    component: AcquisitionSuiteMaVenteComponent,
  },
  {
    path: 'mes-encheres',
    // canActivate: [AuthGuard],
    component: MesEncheresComponent,
  },
  {
    path: 'enchere/afficher/:id',
    // canActivate: [AuthGuard],
    component: EnchereAfficherComponent,
  },
  {
    path: 'enchere/terminee/afficher/:id',
    // canActivate: [AuthGuard],
    component: AcquisitionSuiteMonEnchereComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AccueilComponent,
    ConnexionComponent,
    ConnexionRefuseeComponent,
    InscriptionComponent,
    NavbarComponent,
    CompteAfficherComponent,
    CompteModifierComponent,
    CompteSupprimerComponent,
    EncherirDetailsVenteComponent,
    CompteSuppressionEffectueeComponent,
    CompteModificationEffectueeComponent,
    VenteCreerComponent,
    VenteSupprimerComponent,
    VenteSuppressionEffectueeComponent,
    VenteAfficherComponent,
    MesEncheresComponent,
    MesVentesComponent,
    EnchereAfficherComponent,
    AcquisitionSuiteMaVenteComponent,
    AcquisitionSuiteMonEnchereComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ArticlesvendusService,
    AuthGuard,
    AuthentificationService,
    EncheresService,
    UtilisateursService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
