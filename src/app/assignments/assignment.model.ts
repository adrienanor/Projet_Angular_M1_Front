import {Matiere} from "../matieres/matiere.model";

export class Assignment
{
  _id!:string;
  id!: number;
  nom!:string;
  dateDeRendu!:Date;
  auteur!:string;
  matiere!:Matiere;
  rendu!:boolean;
  note!:number;
  remarque!:string;
}
