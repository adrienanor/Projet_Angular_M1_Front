import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  opened = true;

  constructor(private authService: AuthService, private router: Router) {}

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  logout() {
    this.authService.logOut();
    this.authService.setLoggedIn(false);
    console.log(this.authService.loggedIn)
    this.router.navigate(['/home']);
  }

  connexion(){
    this.router.navigate(['/register']);
  }

}
