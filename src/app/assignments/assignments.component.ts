import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {formatDate} from "@angular/common";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit, AfterViewInit {
  assignments!: Assignment[];
  dataSource!: MatTableDataSource<Assignment>;
  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu', 'rendu', 'action'];
  dateDeRendu!: Date;
  page: number = 1;
  limit: number = 10;
  totalDocs!: number;
  totalPages!: number;
  hasPrevPage!: boolean;
  prevPage!: number;
  hasNextPage!: boolean;
  nextPage!: number;
  checked = "";

  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private assignmentsService: AssignmentsService, private router:Router) {
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
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    }
    // this.assignmentsService.getAssignmentsPagine(this.page, this.limit).subscribe(data => {
    //   this.dataSource = new MatTableDataSource(data);
    // })

  ngAfterViewInit(): void {
    // if(!this.dataSource) return;
    this.dataSource.paginator = this.paginator;
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
    // if(!this.dataSource) return;
    this.dataSource.filterPredicate = (data, filter: string) => {
      //return data.nom.toLowerCase().includes(filter);
      console.log(filter);
      if(filter != null && (filter == "true" || filter == "false")){
        return data.rendu.toString() == filter;
      } else if(filter != null && filter != "") {
        return data.nom.toLowerCase().includes(filter);
      } else {
        return true;
      }
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
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterCheckBox(event: string) {
    this.dataSource.filter = event.toString();
  }

  isNull(elem?: any): boolean{
    return undefined === elem || null === elem;
  }

  isNotNull(elem?: any): boolean{
    return !this.isNull(elem);
  }

  checkStateActive(event: any, el: any) {
    event.preventDefault();
    if (this.isNotNull(this.checked) && this.checked === el.value) {
      el.checked = false;
      this.checked = "";
    } else {
      el.checked = true;
      this.checked = el.value;
    }
    this.applyFilterCheckBox(this.checked);
  }

  onDelete(id: number) {
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      if (!assignment) return;

      this.assignmentsService
        .deleteAssignement(assignment)
        .subscribe((message) => {
          console.log(message);
          assignment = undefined;
          this.router.navigate(['/home']);
        });
    });
    //
    // if (!this.assignmentTransmis) return;
    //
    // this.assignmentService
    //   .deleteAssignement(this.assignmentTransmis)
    //   .subscribe((message) => {
    //     console.log(message);
    //     this.assignmentTransmis = undefined;
    //     this.router.navigate(['/home']);
    //   });
  }
}

export interface IIndexable {
  [key: string]: any;
}
