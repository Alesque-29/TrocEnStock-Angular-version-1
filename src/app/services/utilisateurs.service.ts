import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utilisateur } from '../modeles/utilisateur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilisateursService {
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  creerProfil(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.httpClient.post<Utilisateur>(
      '/utilisateur/creerprofil',
      utilisateur
    );
  }

  afficherProfil(email: string): Observable<Utilisateur> {
    return this.httpClient.get<Utilisateur>(
      '/utilisateur/afficherprofil/' + email
    );
  }

  afficherListe(): Observable<Utilisateur[]> {
    return this.httpClient.get<Utilisateur[]>('/utilisateur/listecomplete');
  }

  modifierProfil(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.httpClient.put<Utilisateur>(
      '/utilisateur/modifierprofil',
      utilisateur, this.httpOptions
    );
  }

  supprimerProfil(email: string): Observable<Utilisateur> {
    return this.httpClient.delete<Utilisateur>(
      '/utilisateur/supprimerprofil/' + email
    );
  }
}
