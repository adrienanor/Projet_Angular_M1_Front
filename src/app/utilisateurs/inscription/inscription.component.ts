import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth.service";
import {Utilisateur} from "../utilisateur.model";
import {UtilisateursService} from "../../shared/utilisateurs.service";
import {Router} from "@angular/router";
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  hide = true;

  userFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  confirmPasswordFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  config = new MatSnackBarConfig();


  constructor(private authService: AuthService,
              private router:Router,
              private _snackBar: MatSnackBar,
              private utilisateursService:UtilisateursService) { }

  ngOnInit(): void {
    this.config.duration = 5000;
    this.config.horizontalPosition = 'right';
    this.config.verticalPosition = 'bottom';
  }

  SignIn(){
    if(this.passwordFormControl.value == this.confirmPasswordFormControl.value) {
      const newUtilisateur = new Utilisateur();
      newUtilisateur.nomUtil = this.userFormControl.value;
      newUtilisateur.mdp = this.passwordFormControl.value;
      newUtilisateur.email = this.emailFormControl.value;

      this._snackBar.open('Inscription de '+ newUtilisateur.nomUtil, '', this.config);

      this.utilisateursService.addUtilisateur(newUtilisateur)
        .subscribe(message => {
          console.log(message);
          console.log(newUtilisateur)
          this.router.navigate(['/home']);
        });
    } else {
      this._snackBar.open('Les mots de passe ne correspondent pas', '', this.config);
    }
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

}
