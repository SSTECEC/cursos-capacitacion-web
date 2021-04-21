import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/app/servicios/sesion/sesion.service';
import { Cursos } from 'src/app/clases/Cursos';
import { ApiService } from 'src/app/servicios/api/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-inicio-cliente',
  templateUrl: './inicio-cliente.component.html',
  styleUrls: ['./inicio-cliente.component.css']
})
export class InicioClienteComponent implements OnInit {

    /* cambiar pestañas */
  public view: any = {
    "panel01": true,
    "panel02": false,

  }

   
  /* listar Curso */
  curso: Cursos = new Cursos('', 0, '', '', '', '', 1, 0);
    /* listar lstcurso */
  lstCursos: Cursos[] = [];

  constructor(private conexion: ApiService, private spinner: NgxSpinnerService, private sesion: SesionService) { }

  ngOnInit(): void {

    this.sesion.verificarCredencialesRutas();
    this.listarCursos();
  }

  listarCursos() {
    this.spinner.show();
    this.conexion.get("listarCursos", "").subscribe(
      (res: any) => {
        this.lstCursos = res.resultado;
        this.spinner.hide();
        console.log(this.lstCursos);
      }, err => {
        this.spinner.hide();
        console.log(err) 
      }
    );
  }


    /* panel */
    public manageDashboards(panel: any) {
      if (panel == 1) {
        this.view = {
          "panel01": true,
          "panel02": false,
          "panel03": false,
          "panel04": false,
          "panel05": false,
  
        }
      }
      else if (panel == 2) {
        this.view = {
          "panel01": false,
          "panel02": true,
          "panel03": false,
          "panel04": false,
          "panel05": false,
        }
      }
    
      
    }


    /* cerrar sesion */
    public cerrarSesion(){
      this.sesion.cerrarSesion();
    }

}
