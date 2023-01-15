import { Component } from '@angular/core';
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  hide = true;
  config = new MatSnackBarConfig();

  userFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.config.duration = 5000;
    this.config.horizontalPosition = 'right';
    this.config.verticalPosition = 'bottom';
  }

  async login(logs: any) {

    let nomUtil = logs.target.nomUtil.value;
    let mdp = logs.target.mdp.value
    console.log("je suis dans le login button")
    this._snackBar.open('Connexion de '+nomUtil, '', this.config);
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
