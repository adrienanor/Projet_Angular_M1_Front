import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth.service";
import {Utilisateur} from "../utilisateur.model";
import {UtilisateursService} from "../../shared/utilisateurs.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  hide = true;

  userFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(private authService: AuthService,
              private router:Router,
              private utilisateursService:UtilisateursService) { }

  ngOnInit(): void {
  }

  SignIn(){
    const newUtilisateur = new Utilisateur();
    newUtilisateur.nomUtil = this.userFormControl.value;
    newUtilisateur.mdp = this.passwordFormControl.value;

    this.utilisateursService.addUtilisateur(newUtilisateur)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(['/home']);
      });

  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

}
