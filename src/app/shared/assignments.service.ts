import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import {catchError, map, Observable, of, tap} from 'rxjs';
import { LoggingService } from './logging.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private HttpOptions ={
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  };

  assignments:Assignment[] = [];

  constructor(private logginService:LoggingService,
              private http:HttpClient) { }

  url = "http://localhost:8010/api/assignments";

  getAssignments():Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.url)
    //return of(this.assignments);
  }

  // getAssignmentsPagine(page:number, limit:number):Observable<any[]> {
  //   return this.http.get<any[]>(this.url + "?pages" + page + "&limit" + limit );
  //
  //   //return of(this.assignments);
  // }

  getAssignmentsPagine(page: number, limit: number): Observable<any> {
    const queryParams = {
      page: page,
      limit: limit
    }
    return this.http.get<any>(this.url, { params: queryParams });
  }

  // renvoie comme Observable l'assignment dont l'id est passé
  // en paramètre, ou undefined s'il n'existe pas
  getAssignment(id:number):Observable<Assignment|undefined> {
    // const a:Assignment|undefined = this.assignments.find(a => a.id === id);
    // if(a)
    //   console.log("getAssignment id= " + id + " nom = " + a.nom)
    // return of(a);
    console.log("get by id id = "+id)
    return this.http.get<Assignment>(this.url + "/" + id)
      .pipe(map(a => {
          a.nom += " transformé avec un pipe...";
          return a;
        }),
        tap(_ => {
          console.log("tap: assignment avec id = "+ id + " requête GET envoyée sur MongoDB cloud");
        }),
        catchError(this.handleError<Assignment>(`getAssignment(id=${id})`))
      );
  }

  private handleError<T>(operation: string, result?: T) {
    return (error:any) : Observable<T> => {
      console.error(error);
      console.log(operation + 'a échoué ' + error.message);

      return of(result as T);
    }
  }

  addAssignment(assignment:Assignment):Observable<any> {
    // this.assignments.push(assignment);
    //
    // this.logginService.log(assignment.nom, "ajouté !");
    //
    // return of("Assignment ajouté");
    return this.http.post<Assignment>(this.url, assignment, this.HttpOptions);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // On n'a besoin de rien faire pour le moment, puisque l'assignment est passé par référence
    // et que l'objet est modifié dans le tableau
    // Plus tard on utilisera un Web Service distant...
    // this.logginService.log(assignment.nom, "modifié !");
    //
    // return of("Assignment modifié");
    return this.http.put<Assignment>(this.url, assignment, this.HttpOptions);
  }

  deleteAssignement(assignment:Assignment) :Observable<any> {
    this.logginService.log(assignment.nom, "supprimé !");

    let deleteURI = this.url + '/' + assignment._id;
    return this.http.delete(deleteURI, this.HttpOptions);
  }

}
