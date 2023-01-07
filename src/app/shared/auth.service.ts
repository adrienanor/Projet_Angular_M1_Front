import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn=false;
  admin = false;

  map = new Map([
    [true, ["G", "g"]],
    [false, ["T", "t"]]
  ]);



  constructor() { }

  logIn(nomUtil:string, mdp: string) {
    this.map.forEach((value: string[], key: boolean) =>
    {
      if(value[0] == nomUtil && value[1] == mdp)
      {
        this.loggedIn = true;
        this.admin = key;
        console.log("logged")
      }   
    }
    )
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
}
