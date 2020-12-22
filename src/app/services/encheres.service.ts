import { Injectable } from '@angular/core';
import { Enchere } from '../modeles/enchere';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EncheresService {
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  encheresEnCours = true;

  constructor(private httpClient: HttpClient) {}

  creerEnchere(enchere: Enchere): Observable<Enchere> {
    return this.httpClient.post<Enchere>(
      '/enchere/creerenchere',
      enchere
    );
  }

  modifierEnchere(enchere: Enchere): Observable<Enchere> {
    return this.httpClient.put<Enchere>(
      '/enchere/modifierenchere',
      enchere, this.httpOptions
    );
  }

  selectionParIdArticleVendu(idArticleVendu: number): Observable<Enchere> {
    return this.httpClient.get<Enchere>(
      '/enchere/selectionparidarticlevendu/' + idArticleVendu
    );
  }

  afficherEnchere(idEnchere: number): Observable<Enchere> {
    return this.httpClient.get<Enchere>(
      '/enchere/afficherenchere/' + idEnchere
    );
  }

  afficherListe(): Observable<Enchere[]> {
    return this.httpClient.get<Enchere[]>('/enchere/listecomplete');
  }

  supprimerEnchere(idEnchere: number): Observable<Enchere> {
    return this.httpClient.delete<Enchere>(
      '/enchere/supprimerenchere/' + idEnchere
    );
  }

  verifListeUserEncheres(): void {
    this.encheresEnCours = true;
  }

  listeUserEncheresVide(): void {
    this.encheresEnCours = false;
  }

}
