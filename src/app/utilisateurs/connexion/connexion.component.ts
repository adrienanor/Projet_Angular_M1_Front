import { Component } from '@angular/core';
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  hide = true;

  userFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(private authService: AuthService, private router: Router) { }

  async login(logs: any) {

    let nomUtil = logs.target.nomUtil.value;
    let mdp = logs.target.mdp.value
    console.log("je suis dans le login button")
    await this.authService.logIn(nomUtil, mdp);

    setTimeout(() => {
      this.isLogged();
    }, 300);
  }

  isLogged()
  {
    console.log("2 " +this.authService.loggedIn)
    if (this.authService.loggedIn){
      this.authService.setLoggedIn(true);
      this.router.navigate(['/home']);
    }
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

}
