import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthentificationService } from './authentification.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authentificationService: AuthentificationService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authentificationService.isAuth) {
      return true;
    } else {
      alert('Vous devez vous inscrire ou vous connecter pour accéder à cette page');
    }
  }

}
