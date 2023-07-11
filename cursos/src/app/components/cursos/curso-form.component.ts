
import { Curso } from 'src/app/models/curso';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.css']
})
export class CursoFormComponent implements OnInit{
titulo = "Crear Curso";
curso: Curso = new Curso();


error: any;


  constructor(private service: CursoService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if(id){
        this.service.ver(id).subscribe(curso => this.curso = curso)
      }
    });
  }
    public crear(): void {
      this.service.crear(this.curso).subscribe({
        next: (response: any) => {
          console.log(response);
          Swal.fire('Nuevo:', `curso ${response.curso} creado con éxitos`, 'success');
          this.router.navigate(['/cursos']);
        },

       complete: () => {
        console.log('curso creado');
        }
      });
    }
    public editar(): void{
      this.service.editar(this.curso).subscribe({
        next: (response: any) => {
          console.log(response);
          Swal.fire('Modificado:', `Curso ${response.curso} actualizado con éxitos`, 'success');
          this.router.navigate(['/cursos']);
        },

        complete: () => {
          console.log('curso creado');
        }
      });}

}
