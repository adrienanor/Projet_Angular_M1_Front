import {Component, Inject, OnInit} from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {map, Observable} from "rxjs";
import {Matiere} from "../../matieres/matiere.model";
import {MatieresService} from "../../shared/matieres.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  nomAssignment!: string;
  dateDeRendu!: Date;
  auteur!: string;
  matiere!: Matiere;
  rendu!: boolean;
  note!: number;
  remarque!: string;
  matieres!: Observable<Matiere[]>;
  config = new MatSnackBarConfig();

  constructor(
    private assignmentsService: AssignmentsService,
    public dialogRef: MatDialogRef<EditAssignmentComponent>,
    private _snackBar: MatSnackBar,
    private matieresService:MatieresService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.matieres = this.matieresService.getMatieres().pipe(map(matieres => Object.values(matieres)));
  }

  ngOnInit(): void {
    this.config.duration = 5000;
    this.config.horizontalPosition = 'right';
    this.config.verticalPosition = 'bottom';

    this.getAssignment();
  }

  getAssignment() {
    this.assignmentsService.getAssignment(this.data.id).subscribe((assignment) => {
      console.log(assignment);
      if (!assignment) return;
      this.assignment = assignment;
      this.nomAssignment = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      this.matiere = assignment.matiere;
      this.remarque = assignment.remarque;
      this.note = assignment.note;
    });
  }

  onSaveAssignment() {
    if (!this.assignment) return;

    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.matiere = this.matiere;
    this.assignment.remarque = this.remarque;
    this.assignment.note = this.note;

    this._snackBar.open('Modification du devoir : '+ this.assignment.nom +' ', '', this.config);

    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
        console.log(this.assignment);
        this.dialogRef.close();
      });
  }
}
