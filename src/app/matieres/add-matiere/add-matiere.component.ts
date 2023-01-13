import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {Matiere} from "../matiere.model";
import {MatieresService} from "../../shared/matieres.service";
import {Router} from "@angular/router";

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

  constructor(private formBuilder: FormBuilder,
              private router:Router,
              private matiereService:MatieresService) { }

  ngOnInit(): void {
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

    this.matiereService.addMatiere(newMatiere)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(['/home']);
      });

  }

}
