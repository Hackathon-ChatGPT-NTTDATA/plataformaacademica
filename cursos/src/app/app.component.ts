import { Component } from '@angular/core';
import { AlumnoService } from './services/alumno.service';
import { Alumno } from './models/alumno';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AlumnoService],
})
export class AppComponent {
  title = '51NGµL@R1Ð@Ð';
  constructor(private alumnoSvc: AlumnoService){}
  ngOnInit(){
    this.alumnoSvc.listar().subscribe(res => {
        console.log('Res ', res);
      });
  }
}
