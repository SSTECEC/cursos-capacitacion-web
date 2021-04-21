import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cursos } from 'src/app/clases/Cursos';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-postulacion',
  templateUrl: './postulacion.component.html',
  styleUrls: ['./postulacion.component.css']
})
export class PostulacionComponent implements OnInit {

  idCurso = 0;
  curso: Cursos = new Cursos('', 0, '', '', '', '', 0, 0);


  /* cambiar formulario */
  public view: any = {
    "panel01": true,
    "panel02": false,
    "panel03": false,
    "panel04": false,
   }

   /* guardar datos en formulario */
   public fmrUsuario : any = {
    nombre: "",
    email: "",
    direccion: "",
    pais: "",
    ciudad: "",
    provincia: "",
    estadoCivil: "",
    fechaNac: ""
    
  }


  constructor(private router: ActivatedRoute, private conexion: ApiService, private spinner: NgxSpinnerService) { }

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
        console.log('curso',this.curso)
      }, err => {
        this.spinner.hide();
        console.log(err)
      }
    );
  }

  public manageDashboards(panel: any) {
    if (panel == 1) {
      this.view = {
        "panel01": true,
        "panel02": false,
        "panel03": false,
        "panel04": false,
       
      }
    }
    else if (panel == 2) {
      this.view = {
        "panel01": false,
        "panel02": true,
        "panel03": false,
        "panel04": false,
      }
    }
    else if (panel == 3) {
      this.view = {
        "panel01": false,
        "panel02": false,
        "panel03": true,
        "panel04": false,
      }
    }
    else if (panel == 4) {
      this.view = {
        "panel01": false,
        "panel02": false,
        "panel03": false,
        "panel04": true,
      }
    }
  }

  public validarInformacion(){


    console.log('Usuario', this.fmrUsuario);

  }

}
