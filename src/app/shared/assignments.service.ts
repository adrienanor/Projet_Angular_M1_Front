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

  url = "https://back-projet-angular.onrender.com/api/assignments";

  getAssignments():Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.url)
  }

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
    console.log("get by id id = "+id)
    return this.http.get<Assignment>(this.url + "/" + id)
      .pipe(map(a => {
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
    return this.http.post<Assignment>(this.url, assignment, this.HttpOptions);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    return this.http.put<Assignment>(this.url, assignment, this.HttpOptions);
  }

  deleteAssignement(assignment:Assignment) :Observable<any> {
    this.logginService.log(assignment.nom, "supprimé !");

    let deleteURI = this.url + '/' + assignment._id;
    return this.http.delete(deleteURI, this.HttpOptions);
  }

}
