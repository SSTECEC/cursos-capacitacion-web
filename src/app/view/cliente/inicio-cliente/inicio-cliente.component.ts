import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/app/servicios/sesion/sesion.service';
import { Cursos } from 'src/app/clases/Cursos';
import { ApiService } from 'src/app/servicios/api/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Participante } from 'src/app/clases/Participante';

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

  
    /* Declarar un Formulario Participante */
    fmrParticipante: FormGroup = this.formBuilder.group({
      idParticipante: [0],
      nombreP: ['', [Validators.required]],
      identificacionP: ['', [Validators.required]],
      correoP: ['', [Validators.required]],
      direccionP: [''],
      paisP: [''],
      ciudadP:[''],
      provinciaP: [''],
      estadoCivilP: [''],
      fechaNac: [''],
      nombreRefeP:[''],
      correoRefeP: [''],
      contactoP:[''],
      parentescoP: [''],
      nombreRefeL:[''],
      correoRefeL: [''],
      contactoL:[''],
      parentescoL:[''],
      estadoP: [1],
    
      
    });


   
  /* listar Curso */
  curso: Cursos = new Cursos('', 0, '', '', '', '', 1, 0);
    /* listar lstcurso */
  lstCursos: Cursos[] = [];



    /* listar participantes */
    idParticipante = 0;
    participante: Participante = new Participante('', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0);
  

    /* listar lstParticipante */
    lstParticipante: Participante[] = [];
    tipoParticipante = 0;


  constructor(private conexion: ApiService, private spinner: NgxSpinnerService, private sesion: SesionService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.sesion.verificarCredencialesRutas();
    this.listarCursos();
    this.listarParticipante();
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


  listarParticipante() {
    this.spinner.show();
    this.conexion.get("listarParticipante", "").subscribe(
      (res: any) => {
        this.lstParticipante = res.resultado;
        this.spinner.hide();
        console.log(this.lstParticipante);
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
