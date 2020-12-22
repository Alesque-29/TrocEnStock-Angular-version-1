import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../modeles/utilisateur';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  isAuth = false;

  constructor(private httpClient: HttpClient) {}

  authentification(email: string): Observable<Utilisateur> {
    return this.httpClient.get<Utilisateur>(
      '/utilisateur/authentification/' + email
    );
  }

  signIn(): void {
    this.isAuth = true;
  }

  signOut(): void {
    this.isAuth = false;
  }
}
