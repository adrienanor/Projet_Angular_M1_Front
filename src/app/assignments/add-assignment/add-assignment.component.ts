import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {Router} from "@angular/router";
import {Matiere} from "../../matieres/matiere.model";
import {MatieresService} from "../../shared/matieres.service";
import {map, Observable} from "rxjs";
import {UtilisateursService} from "../../shared/utilisateurs.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class AddAssignmentComponent implements OnInit {
  nomDevoir: string = '';
  dateDeRendu!: Date;
  matiere!: Matiere;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  matieres!: Observable<Matiere[]>;
  config = new MatSnackBarConfig();
  assignments: Assignment[] = [];

  constructor(private assignmentsService:AssignmentsService, private formBuilder: FormBuilder,
              private utilisteurService: UtilisateursService, private _snackBar: MatSnackBar,
              private router:Router, private matieresService:MatieresService) {}

  ngOnInit() {
    this.config.duration = 5000;
    this.config.horizontalPosition = 'right';
    this.config.verticalPosition = 'bottom';

    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.matieres = this.matieresService.getMatieres().pipe(map(matieres => Object.values(matieres)));
    this.assignmentsService.getAssignments().subscribe(assignments => this.assignments = assignments);
  }

  onSubmit() {
    console.log(this.nomDevoir + ' a rendre le ' + this.dateDeRendu);
    const newAssignment = new Assignment();
    newAssignment.id = this.assignments.lastIndexOf(this.assignments[this.assignments.length - 1]) + 2;
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.auteur = this.utilisteurService.utilisateur;
    newAssignment.matiere = this.matiere;
    newAssignment.rendu = false;

    this._snackBar.open('Ajout du devoir : '+ newAssignment.nom +' ', '', this.config);


    this.assignmentsService.addAssignment(newAssignment)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(['/home']);
      });
  }
}
