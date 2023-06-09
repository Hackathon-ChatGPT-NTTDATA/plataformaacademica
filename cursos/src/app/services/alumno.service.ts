import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {



  private baseEndpoint = '/api/alumnowebflux/all';
  private baseEndpointcrear = '/api/alumnowebflux/create-student';
  private baseEndpointeditar = '/api/alumnowebflux/update-student';
  private baseEndpointeliminar = '/api/alumnowebflux/delete-personal-asset';

  private cabeceras: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  //public listar():Observable<Alumno[]>{
  //return this.http.get(this.baseEndpoint).pipe(map(alumnos => alumnos as Alumno[]));
  //}

    //listar(): Observable<any> {
    //return this.http.get<any>('/api/alumnowebflux/all');
   //}
   public  listar():Observable<Alumno[]> {
   return this.http.get<Alumno[]>(this.baseEndpoint);
     }

   public listarPaguinas(page: string, size: string):Observable<any>{
    const params = new HttpParams()
    .set('page', page)
    .set('size', size);

   return this.http.get<any>(`${this.baseEndpoint}/pagina`, {params: params});
  }

  public ver (id:number): Observable<Alumno>{
   return this.http.get<Alumno>(`${this.baseEndpoint}/${id}`);
  }
  public crear (alumno:Alumno): Observable<Alumno>{
   return this.http.post<Alumno>(this.baseEndpointcrear, alumno,
    { headers: this.cabeceras });
  }
  public editar (alumno:Alumno): Observable<Alumno>{
   return this.http.put<Alumno>(`${this.baseEndpointeditar}/${alumno.id}`, alumno,
   { headers:this.cabeceras });
  }
  public eliminar (id: number): Observable<void>{
   return this.http.delete<void>(`${this.baseEndpointeliminar}/${id}`);
 }
}
