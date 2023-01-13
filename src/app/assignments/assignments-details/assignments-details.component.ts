import {Component, Inject, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-assignments-details',
  templateUrl: './assignments-details.component.html',
  styleUrls: ['./assignments-details.component.css'],
})
export class AssignmentsDetailsComponent implements OnInit {
  assignmentTransmis!: Assignment | undefined;

  constructor(
    private assignmentService: AssignmentsService,
    private authService:AuthService,
    private route: ActivatedRoute,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    this.assignmentService.getAssignment(this.data.id).subscribe((assignment) => {
      this.assignmentTransmis = assignment;
    });
  }

  onAssignmentRendu() {
    if (!this.assignmentTransmis) return;

    this.assignmentTransmis.rendu = true;

    this.assignmentService
      .updateAssignment(this.assignmentTransmis)
      .subscribe((message) => {
        console.log(message);
        this.router.navigate(['/home']);
      });
  }

  onDelete() {
    if (!this.assignmentTransmis) return;

    this.assignmentService
      .deleteAssignement(this.assignmentTransmis)
      .subscribe((message) => {
        console.log(message);
        this.assignmentTransmis = undefined;
        this.router.navigate(['/home']);
      });
  }

  isAdmin():boolean {
    return this.authService.loggedIn;
  }
}
