import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleVendu } from '../modeles/articlevendu';

@Injectable({
  providedIn: 'root',
})
export class ArticlesvendusService {
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  creerArticle(articlevendu: ArticleVendu): Observable<ArticleVendu> {
    return this.httpClient.post<ArticleVendu>(
      '/articlevendu/creerarticle',
      articlevendu
    );
  }

  modifierArticle(articlevendu: ArticleVendu): Observable<ArticleVendu> {
    return this.httpClient.put<ArticleVendu>(
      '/articlevendu/modifierarticle',
      articlevendu, this.httpOptions
    );
  }

  afficherArticle(idArticle: number): Observable<ArticleVendu> {
    return this.httpClient.get<ArticleVendu>(
      '/articlevendu/afficherarticle/' + idArticle
    );
  }

  afficherListe(): Observable<ArticleVendu[]> {
    return this.httpClient.get<ArticleVendu[]>('/articlevendu/listecomplete');
  }

  supprimerArticle(idArticle: number): Observable<ArticleVendu> {
    return this.httpClient.delete<ArticleVendu>(
      '/articlevendu/supprimerarticle/' + idArticle
    );
  }

}
