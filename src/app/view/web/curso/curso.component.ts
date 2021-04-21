import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cursos } from 'src/app/clases/Cursos';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  idCurso = 0;
  curso: Cursos = new Cursos('', 0, '', '', '', '', 0, 0);

  constructor(private router: ActivatedRoute, private conexion: ApiService, private ruta: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.idCurso = parseInt(this.router.snapshot.params.id);
    this.listarCurso();
  }

  listarCurso() {
    this.spinner.show();
    this.conexion.get("listarCurso?idCursos=" + this.idCurso, "").subscribe(
      (res: any) => {
        this.spinner.hide();
        this.curso = res.resultado;
        console.log('Cursos',this.curso);
      }, err => {
        this.spinner.hide();
        console.log(err)
      }
    );
  }


  prueba(idPrueba:any){
    this.ruta.navigate(['participante/'+idPrueba]);
  }

}
