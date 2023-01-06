import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

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
  matiere!: string;
  rendu!: boolean;
  note!: number;
  remarque!: string;

  constructor(
    private assignmentsService: AssignmentsService,
    public dialogRef: MatDialogRef<EditAssignmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getAssignment();
  }
  getAssignment() {
    this.assignmentsService.getAssignment(this.data.id).subscribe((assignment) => {
      if (!assignment) return;
      this.assignment = assignment;
      this.nomAssignment = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      this.matiere = assignment.matiere;
      this.remarque = assignment.remarque;
    });
  }
  onSaveAssignment() {
    if (!this.assignment) return;

    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.matiere = this.matiere;
    this.assignment.remarque = this.remarque;
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
        console.log(this.assignment);
        this.dialogRef.close();
      });
  }
}
