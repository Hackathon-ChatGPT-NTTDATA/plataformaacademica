import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';



@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent extends CursoService  {
  titulo = 'Listado de Cursos';
  cursos: Curso[];
  service: any;


  ngOnInit(){
    this.service.listar().subscribe(curso => this.cursos = curso);
  }

}
