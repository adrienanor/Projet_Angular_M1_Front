import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from './shared/auth.service';
import {UtilisateursService} from "./shared/utilisateurs.service";
import {Utilisateur} from "./utilisateurs/utilisateur.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  opened = true;

  constructor(private authService: AuthService,
              private utilisteurService: UtilisateursService,
              private router: Router) {}


  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  logout() {
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
