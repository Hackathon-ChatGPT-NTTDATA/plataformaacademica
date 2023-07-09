import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent extends CursoService implements OnInit {
  titulo = 'Listado de Alumnos';
  cursos: Curso[];
  service: any;



  ngOnInit(){
    this.service.listar().subscribe(cursos => this.cursos = cursos);
  }



}
