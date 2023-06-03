import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Alumno } from 'src/app/models/alumno';
import { Subscriber, filter } from 'rxjs';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  titulo = 'Listado de Alumnos';
  alumnos: Alumno[];
  constructor(private service: AlumnoService){ }

  ngOnInit(){
    this.service.listar().subscribe(alumnos => this.alumnos = alumnos);
  }


  public eliminar(alumno: Alumno): void {

    if(confirm(`¿seguro que desea eliminar a ${alumno.nombre} ?`)){
      this.service.eliminar(alumno.id).subscribe(() => {this.alumnos = this.alumnos.filter(a => a !== alumno);
      alert(`Alumno ${alumno.nombre} eliminado con exito`)
    });
  }
  }
}
