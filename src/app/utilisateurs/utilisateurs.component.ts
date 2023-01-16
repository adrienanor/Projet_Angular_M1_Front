import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {Utilisateur} from "./utilisateur.model";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {UtilisateursService} from "../shared/utilisateurs.service";
import {IIndexable} from "../assignments/assignments.component";

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css'],
})
export class UtilisateursComponent implements AfterViewInit{

  utilisateurs!: Utilisateur[];
  dataSource!: MatTableDataSource<Utilisateur>;
  displayedColumns: any[] = ['nom', 'email'];
  page: number = 1;
  limit: number = 10;
  totalDocs!: number;
  totalPages!: number;
  hasPrevPage!: boolean;
  prevPage!: number;
  hasNextPage!: boolean;
  nextPage!: number;

  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private utilisateursService: UtilisateursService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,) {
    this.refreshTable();
  }

  refreshTable() {
    this.utilisateursService.getUtilisateursPagine(this.page, this.limit)
      .subscribe(data => {
        this.utilisateurs = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }


  ngAfterViewInit(): void {
    if(!this.dataSource) return;
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


}
