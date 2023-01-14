import { Injectable } from '@angular/core';
import { Utilisateur } from '../utilisateurs/utilisateur.model';
import {catchError, map, Observable, of, tap} from 'rxjs';
import { LoggingService } from './logging.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {
  private HttpOptions ={
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  };

  utilisateurs:Utilisateur[] = [];
  utilisateur!: string;

  constructor(private logginService:LoggingService,
              private http:HttpClient) { }

  url = "http://localhost:8010/api/utilisateurs";

  getUtilisateurs():Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.url)
  }


  // renvoie comme Observable l'utilisateur dont le nomUtil et le mdp sont passés
  // en paramètre, ou undefined s'il n'existe pas
  getUtilisateur(nomUtil:string, mdp:string):Observable<Utilisateur> {
    this.setNomUtilisateur(nomUtil);
    console.log("get by nomUtil = "+nomUtil)
    return this.http.get<Utilisateur>(this.url + "/" + nomUtil + "/" +mdp)
      .pipe(map(a => {
          return a;
        }),
        tap(_ => {
          console.log("tap: utilisateurs avec nomUtil = "+ nomUtil + " requête GET envoyée sur MongoDB cloud");
        }),
        catchError(this.handleError<Utilisateur>(`getUtilisateur(nomUtil=${nomUtil})`))
      );
  }

  private handleError<T>(operation: string, result?: T) {
    return (error:any) : Observable<T> => {
      console.error(error);
      console.log(operation + 'a échoué ' + error.message);

      return of(result as T);
    }
  }

  addUtilisateur(utilisateur:Utilisateur):Observable<any> {
    return this.http.post<Utilisateur>(this.url, utilisateur, this.HttpOptions);
  }

  setNomUtilisateur(value: string) {
    this.utilisateur = value;
  }

  get nomUtilisateur() {
    return this.utilisateur;
  }

}
