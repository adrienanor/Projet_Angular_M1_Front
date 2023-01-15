import {AfterViewInit, Component, OnInit} from "@angular/core";
import {map, Observable} from "rxjs";
import {Matiere} from "./matiere.model";
import {MatieresService} from "../shared/matieres.service";

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css'],
})
export class MatieresComponent implements OnInit{

  matieres!: Observable<Matiere[]>;

  constructor(private matieresService:MatieresService) {}

  ngOnInit(): void {
    this.matieres = this.matieresService.getMatieres().pipe(map(matieres => Object.values(matieres)));
  }



}
