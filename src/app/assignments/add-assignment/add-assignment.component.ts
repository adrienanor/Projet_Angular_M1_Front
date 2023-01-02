import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";

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
  matiere: string = '';
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  constructor(private assignmentsService:AssignmentsService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
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
      });
  }
}
