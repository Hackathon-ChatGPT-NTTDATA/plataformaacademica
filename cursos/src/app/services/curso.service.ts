import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso';


@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private baseEndpoint = 'localhost:8090/api/cursos';
  constructor( private http: HttpClient) {
  }

}
