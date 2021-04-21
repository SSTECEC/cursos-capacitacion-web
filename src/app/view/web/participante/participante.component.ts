import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Archivo } from 'src/app/clases/Archivo';
import { Participante } from 'src/app/clases/Participante';
import { ApiService } from 'src/app/servicios/api/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-participante',
  templateUrl: './participante.component.html',
  styleUrls: ['./participante.component.css']
})
export class ParticipanteComponent implements OnInit {

  idParticipante = 0;
  participante: Participante = new Participante ('', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0 );

  idArchivo = 0;
  archivo: Archivo = new Archivo ('',0, '', 0 );


  /* cambiar formulario */
  public view: any = {
    "panel01": true,
    "panel02": false,
    "panel03": false,
    "panel04": false,
   }
   /* guardar datos en formulario */
   public fmrUsuarios : any = {
    nombre: "",
    email: "",
    direccion: "",
    pais: "",
    ciudad: "",
    provincia: "",
    estadoCivil: "",
    fechaNac: ""  
  }

  fmrParticipante: FormGroup = this.formBuilder.group({
    idParticipante: [0],
    nombreP: ['', [Validators.required]],
    identificacionP: ['', [Validators.required]],
    correoP: ['', [Validators.required]],
    direccionP: ['', [Validators.required]],
    paisP: ['', [Validators.required]],
    ciudadP: ['', [Validators.required]],
    provinciaP: ['', [Validators.required]],
    estadoCivilP: ['', [Validators.required]],
    fechaNac: ['', [Validators.required]],
    nombreRefeP: ['', [Validators.required]],
    correoRefeP: ['', [Validators.required]],
    contactoP: ['', [Validators.required]],
    parentescoP: ['', [Validators.required]],
    nombreRefeL: ['', [Validators.required]],
    correoRefeL: ['', [Validators.required]],
    contactoL: ['', [Validators.required]],
    parentescoL: ['', [Validators.required]],
    estadoP: [1],
  
    
  });

  tipoParticipante = 0;
  constructor(private router: ActivatedRoute, private conexion: ApiService, private spinner: NgxSpinnerService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.idParticipante = parseInt(this.router.snapshot.params.id);
 /*    this.listarParticipante(); */
  }

  listarParticipante() {
    this.spinner.show();
    this.conexion.get("listarParticipante?idParticipante=" + this.idParticipante, "").subscribe(
      (res: any) => {
        this.spinner.hide();
        this.participante = res.resultado;
        console.log('participante',this.participante)
      }, err => {
        this.spinner.hide();
        console.log(err)
      }
    );
  }

  listarArchivo() {
    this.spinner.show();
    this.conexion.get("listarArchivo?idArchivo=" + this.idArchivo, "").subscribe(
      (res: any) => {
        this.spinner.hide();
        this.participante = res.resultado;
        console.log('archivo',this.archivo)
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


  /* Guardar participante */
  public guardarParticipante(valor: any) {

    this.tipoParticipante = valor;

    var formulario = this.fmrParticipante.value;
    if (this.fmrParticipante.valid) {
      var datos = {
        identificador: this.tipoParticipante,
        idParticipante: formulario.idParticipante,
        nombreP: formulario.nombreP,
        identificacionP: formulario.identificacionP,
        correoP: formulario.correoP,
        direccionP: formulario.direccionP,
        paisP: formulario.paisP,
        ciudadP: formulario.ciudadP,
        provinciaP: formulario.provinciaP,
        estadoCivilP: formulario.estadoCivilP,
        fechaNac: formulario.fechaNac,
        nombreRefeP: formulario.nombreRefeP,
        correoRefeP: formulario.correoRefeP,
        contactoP: formulario.contactoP,
        parentescoP: formulario.parentescoP,
        nombreRefeL: formulario.nombreRefeL,
        correoRefeL: formulario.correoRefeL,
        contactoL: formulario.contactoL,
        parentescoL: formulario.parentescoL,
        estadoP: this.tipoParticipante == 1 ? 1 : this.tipoParticipante == 4 ? 2 : 0
      }
      this.spinner.show();
      this.conexion.post("gestionParticipante",'',datos).subscribe(
        (res: any) => {
          this.spinner.hide();
          console.log(res);
        }, err => {
          this.spinner.hide();
          console.log(err)
        }
      );

    } /* else {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Llene todos los campos',
        showConfirmButton: false,
        timer: 1500
      })
    } */

  }

  public validarInformacion(step:any){
    if(step == 2){
/* 
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Llene todos los campos',
        showConfirmButton: false,
        timer: 1500
      }) */
      console.log('Usuario', this.fmrParticipante);
      this.manageDashboards(step);
     
    }else if(step == 3){
      console.log('Usuario', this.fmrParticipante);
      this.manageDashboards(step);
    }
    
  }
}
