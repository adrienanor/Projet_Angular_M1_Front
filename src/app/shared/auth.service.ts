import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UtilisateursService } from './utilisateurs.service';
import { Utilisateur } from '../assignments/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  admin: any;

  constructor( private utilisateurService: UtilisateursService) { }

   async logIn(nomUtil: string, mdp: string) {

      let util = this.utilisateurService.getUtilisateur(nomUtil, mdp)
      .subscribe(data => {
        console.log(data);
      if (data.nomUtil == nomUtil) {
        this.admin = data.isAdmin;
        this.loggedIn = true;
        console.log("0 "+this.loggedIn);
      }
      console.log("1 " + this.loggedIn);
      return true;
    });

  }

  logOut() {
    this.loggedIn = false;
    this.admin = false;
  }

  // renvoie une promesse qui est résolue si l'utilisateur est loggué
  isAdmin() {
    const isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
    return isUserAdmin;
  }

  setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }

  get isLoggedIn() {
    return this.loggedIn;
  }
}
