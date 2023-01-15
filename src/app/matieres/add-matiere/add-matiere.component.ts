import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {Matiere} from "../matiere.model";
import {MatieresService} from "../../shared/matieres.service";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-matiere',
  templateUrl: './add-matiere.component.html',
  styleUrls: ['./add-matiere.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class AddMatiereComponent implements OnInit {
  nomMatiere: string = '';
  nomProfesseur: string = '';
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  config = new MatSnackBarConfig();

  constructor(private formBuilder: FormBuilder,
              private router:Router,
              private _snackBar: MatSnackBar,
              private matiereService:MatieresService) { }

  ngOnInit(): void {
    this.config.duration = 5000;
    this.config.horizontalPosition = 'right';
    this.config.verticalPosition = 'bottom';

    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  onSubmit() {
    const newMatiere = new Matiere();
    newMatiere.nom = this.nomMatiere;
    newMatiere.professeur = this.nomProfesseur;

    this._snackBar.open('Ajout de la matière : '+ newMatiere.nom +' ', '', this.config);

    this.matiereService.addMatiere(newMatiere)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(['/home']);
      });

  }

}
