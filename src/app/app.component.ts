import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from './shared/auth.service';
import {UtilisateursService} from "./shared/utilisateurs.service";
import {Utilisateur} from "./utilisateurs/utilisateur.model";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  opened = true;
  config = new MatSnackBarConfig();

  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar,
              private utilisteurService: UtilisateursService,
              private router: Router) {}

  ngOnInit(): void {
    this.config.duration = 5000;
    this.config.horizontalPosition = 'right';
    this.config.verticalPosition = 'bottom';
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  logout() {
    this._snackBar.open('Déconnexion', '', this.config);
    this.authService.logOut();
    this.authService.setLoggedIn(false);
    console.log(this.authService.loggedIn)
    this.utilisteurService.setNomUtilisateur("");
    this.router.navigate(['/home']);
  }

  connexion(){
    this.router.navigate(['/connexion']);
  }

  inscription(){
    this.router.navigate(['/inscription']);
  }

  get nomUtilisateur() {
    return this.utilisteurService.nomUtilisateur;
  }

}
