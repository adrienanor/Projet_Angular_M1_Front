import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit, AfterViewInit {
  // titre = 'Mon application sur les assignments';
  assignments!: Assignment[];

  // assignmentSelectionne!: Assignment;

  dataSource = new MatTableDataSource(this.assignments);

  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu', 'rendu'];

  dateDeRendu!: Date;
  page: number = 1;
  limit: number = 10;
  totalDocs!: number;
  totalPages!: number;
  hasPrevPage!: boolean;
  prevPage!: number;
  hasNextPage!: boolean;
  nextPage!: number;


  constructor(private assignmentsService: AssignmentsService) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: IIndexable, property) => {
      switch (property) {
        case 'id': {
          if (item['id']) { return item['id']; }
          break;
        }
        default:
          return item[property];
      }
    };
  }

  ngOnInit(): void {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.nom.toLowerCase().includes(filter);
    };

    this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
      .subscribe(data => {
        this.assignments = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        console.log("données reçues");
        this.dataSource.data = this.assignments;
      });

  }

  // onAssignmentClicke(assignment: Assignment) {
  //   this.assignmentSelectionne = assignment;
  // }

  getDataByPage(page: number, limit: number) {
    this.assignmentsService.getAssignmentsPagine(page, limit)
      .subscribe(data => {
        this.assignments = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        this.dataSource.data = this.assignments;
      });
  }

  updatePage(event: any) {
    this.getDataByPage(event.pageIndex + 1, event.pageSize);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface IIndexable {
  [key: string]: any;
}
