import {catchError, map, Observable, of, tap} from "rxjs";
import {LoggingService} from "./logging.service";
import {HttpClient} from "@angular/common/http";
import {Matiere} from "../assignments/matiere.model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MatieresService{

  constructor(private logginService:LoggingService,
              private http:HttpClient) {}

  url = "http://localhost:8010/api/matieres";

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

}
