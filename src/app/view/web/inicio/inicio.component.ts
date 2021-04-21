import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/servicios/api/api.service';
import { Cursos } from '../../../clases/Cursos';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  lstCursos: Cursos[] = [];
  constructor(private conexion: ApiService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.listarCursos()
  }

  listarCursos() {
    this.spinner.show();
    this.conexion.get("listarCursos", "").subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstCursos = res.resultado;
        console.log(this.lstCursos)
      }, err => {
         this.spinner.hide();
        console.log(err)
      }
    );
  }

}
