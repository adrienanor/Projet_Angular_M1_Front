import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion des assignments !!!';
  opened = true;
  hide = true;
  logged = false;

  constructor(private authService: AuthService, private router: Router) { }

  async login(logs: any) {

    let nomUtil = logs.target.nomUtil.value;
    let mdp = logs.target.mdp.value
    console.log("je suis dans le login button")
    await this.authService.logIn(nomUtil, mdp);
    
    setTimeout(() => {
      this.isLogged();
    }, 150);


  }

  logout() {
    this.authService.logOut();
    this.logged = false;
    console.log(this.authService.loggedIn)
    this.router.navigate(['/home']);
  }

  isLogged()
  {
    console.log("2 " +this.authService.loggedIn)
    if (this.authService.loggedIn)
      this.logged = true;
  }

}
