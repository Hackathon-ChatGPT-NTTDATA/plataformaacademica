import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso';


@Injectable({
  providedIn: 'root'
})
export class CursoService  {

  private baseEndpoint = 'localhost:8090/api/cursos/webclient';
  private baseEndpointcrear = 'localhost:8090/api/cursos/webclient/create-cursos';
  private baseEndpointeditar = 'localhost:8090/api/cursos/webclient/update-cursos';
  private baseEndpointeliminar = 'localhost:8090/api/cursos/webclient/delete-cursos';

  private cabeceras: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {
  }

  public listar(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.baseEndpoint);
  }

  public ver(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.baseEndpoint}/${id}`);
  }
  public crear (curso:Curso): Observable<Curso>{
    return this.http.post<Curso>(this.baseEndpointcrear, curso,
     { headers: this.cabeceras });
   }
   public editar (curso:Curso): Observable<Curso>{
    return this.http.put<Curso>(`${this.baseEndpointeditar}/${curso.id}`, curso,
    { headers:this.cabeceras });
   }
   public eliminar (id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseEndpointeliminar}/${id}`);
  }

}
