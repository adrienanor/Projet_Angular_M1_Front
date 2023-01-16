import {catchError, map, Observable, of, tap} from "rxjs";
import {LoggingService} from "./logging.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Matiere} from "../matieres/matiere.model";
import {Injectable} from "@angular/core";
import {Assignment} from "../assignments/assignment.model";

@Injectable({
  providedIn: 'root'
})
export class MatieresService{
  private HttpOptions ={
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  };

  constructor(private logginService:LoggingService,
              private http:HttpClient) {}

  url = "https://front-projet-angular.onrender.com/api/matieres";

  getMatieres():Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.url)
  }


  getMatiere(id:number):Observable<Matiere> {
    console.log("get by nom = "+id)
    return this.http.get<Matiere>(this.url + "/" + id)
      .pipe(map(a => {
          return a;
        }),
        tap(_ => {
          console.log("tap: matieres avec nom = "+ id + " requête GET envoyée sur MongoDB cloud");
        }),
        catchError(this.handleError<Matiere>(`getMatiere(nom=${id})`))
      );
  }

  private handleError<T>(operation: string, result?: T) {
    return (error:any) : Observable<T> => {
      console.error(error);
      console.log(operation + 'a échoué ' + error.message);

      return of(result as T);
    }
  }

  addMatiere(matiere:Matiere):Observable<any> {
    return this.http.post<Matiere>(this.url, matiere, this.HttpOptions);
  }

}
