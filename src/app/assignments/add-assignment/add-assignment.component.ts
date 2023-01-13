import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {Router} from "@angular/router";
import {Matiere} from "../../matieres/matiere.model";
import {MatieresService} from "../../shared/matieres.service";
import {map, Observable} from "rxjs";

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
  auteur: string = '';
  matiere!: Matiere;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  matieres!: Observable<Matiere[]>;

  constructor(private assignmentsService:AssignmentsService, private formBuilder: FormBuilder,
              private router:Router, private matieresService:MatieresService) {}

  ngOnInit() {
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
  }

  onSubmit() {
    console.log(this.nomDevoir + ' a rendre le ' + this.dateDeRendu);
    const newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random() * 1000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.auteur = this.auteur;
    newAssignment.matiere = this.matiere;
    newAssignment.rendu = false;

    this.assignmentsService.addAssignment(newAssignment)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(['/home']);
      });
  }
}
