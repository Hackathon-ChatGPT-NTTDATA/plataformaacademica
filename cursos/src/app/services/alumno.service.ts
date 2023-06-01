import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';
import { AlumnosComponent } from '../components/alumnos/alumnos.component';



@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private baseEndpoint = 'http://localhost:8090/api/alumnowebflux/all';

  private cabeceras: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  //*public listar(): Observable<Alumno[]>{
  //*return this.http.get(this.baseEndpoint).pipe(map(alumnos => alumnos as Alumno[]));



  public  listar(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.baseEndpoint);
  }

  public listarPaguinas(page: string, size: string): Observable<any>{
    const params =new HttpParams()
    .set('page', page)
    .set('size', size);

   return this.http.get<any>(`${this.baseEndpoint}/pagina`, {params: params});
  }

  public ver (id: number): Observable<Alumno>{
   return this.http.get<Alumno>(`${this.baseEndpoint}/${id}`);
  }
  public  crear (alumno: Alumno): Observable<Alumno>{
   return this.http.post<Alumno>(this.baseEndpoint, alumno,
    { headers: this.cabeceras });
  }
  public editar (alumno:Alumno): Observable<Alumno>{
   return this.http.put<Alumno>(`${this.baseEndpoint}/${alumno.id}`,alumno,{headers: this.cabeceras});
  }
  public eliminar (id: number): Observable<void>{
   return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
}
}
