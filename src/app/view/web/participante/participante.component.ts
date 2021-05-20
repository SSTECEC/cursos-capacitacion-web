import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Archivo } from 'src/app/clases/Archivo';
import { Participante } from 'src/app/clases/Participante';
import { ApiService } from 'src/app/servicios/api/api.service';
import Swal from 'sweetalert2';
import { GenericoService } from 'src/app/servicios/metodo/generico.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-participante',
  templateUrl: './participante.component.html',
  styleUrls: ['./participante.component.css']
})
export class ParticipanteComponent implements OnInit {

  idParticipante = 0;
  participante: Participante = new Participante('', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0);

  idArchivo = 0;
  archivo: Archivo = new Archivo('', 0, '', 0);

  lstCapacitaciones: any = [];
  lstTitulos: any = [];
  lstArchivos: any = [];

  /* cambiar formulario */
  public view: any = {
    "panel01": true,
    "panel02": false,
    "panel03": false,
    "panel04": false,
  }
  /* guardar datos en formulario */
  public fmrUsuarios: any = {
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
    correoP: ['', [Validators.required, Validators.email]],
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
  lstInputsCapacitaciones: any = [];

  constructor(private activatedRoute: ActivatedRoute, private conexion: ApiService, private spinner: NgxSpinnerService, private formBuilder: FormBuilder, public generico: GenericoService, public router: Router) { }

  ngOnInit(): void {
    this.idParticipante = parseInt(this.activatedRoute.snapshot.params.id);
    /*    this.listarParticipante(); */
  }

  listarParticipante() {
    this.spinner.show();
    this.conexion.get("listarParticipante?idParticipante=" + this.idParticipante, "").subscribe(
      (res: any) => {
        this.spinner.hide();
        this.participante = res.resultado;
        console.log('participante', this.participante)
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
        console.log('archivo', this.archivo)
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

  public agregarInputCapacitacion() {

    this.lstInputsCapacitaciones.push({ id: this.lstInputsCapacitaciones.length++ });
  }


  /* Guardar participante */
  public guardarParticipante(valor: any) {

    this.tipoParticipante = valor;

    var formulario = this.fmrParticipante.value;

    console.log("FORMULARIO", this.fmrParticipante);

    if (formulario.nombreP == "") {
      this.alerta('Ingresar un Nombre');
    } else if (formulario.identificacionP == "") {
      this.alerta('Ingresar una Identificación');
    } else if (!this.validateEmail(formulario.correoP)) {
      this.alerta('Ingresar una email válido');
    } else if (formulario.direccionP == "") {
      this.alerta('Ingresar una Direción');
    } else if (formulario.paisP == "") {
      this.alerta('Ingresar un País');
    } else if (formulario.ciudadP == "") {
      this.alerta('Ingresar una Ciudad');
    } else if (formulario.provinciaP == "") {
      this.alerta('Ingresar una Provincia');
    } else if (formulario.estadoCivilP == "") {
      this.alerta('Seleccione su Estado Civil');
    } else if (formulario.fechaNac == "") {
      this.alerta('Ingresar su fecha de Nacimiento');
    } else if (formulario.nombreRefeP == "") {
      this.alerta('Ingresar nombre de Referencia Personal');
    } else if (!this.validateEmail(formulario.correoRefeP)) {
      this.alerta('Ingresar una email válido');
    } else if (formulario.contactoP == "") {
      this.alerta('Ingresar el número de contacto de su Referencia Personal');
    } else if (formulario.parentescoP == "") {
      this.alerta('Ingresar el tipo de Referencia Parentesco');
    } else if (formulario.nombreRefeL == "") {
      this.alerta('Ingresar nombre de Referencia Laboral');
    } else if (!this.validateEmail(formulario.correoRefeL)) {
      this.alerta('Ingresar una email válido');
    } else if (formulario.contactoL == "") {
      this.alerta('Ingresar el número de contacto de su Referencia Laboral');
    } else if (formulario.parentescoL == "") {
      this.alerta('Ingresar el tipo de Referencia Parentesco');
    } else if (this.lstTitulos.length == 0) {
      this.alerta('Adjuntar almenos un titulo');
    } else if (this.lstCapacitaciones.length == 0) {
      this.alerta('Adjuntar almenos una capacitación');
    } else {
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
          estadoP: this.tipoParticipante == 1 ? 1 : this.tipoParticipante == 4 ? 2 : 0,
          idCurso: this.idParticipante
        }
        this.spinner.show();
        this.conexion.post("gestionParticipante", '', datos).subscribe(
          (res: any) => {
            this.spinner.hide();
            console.log(res);
            this.guardarArchivos(res.resultado);
          }, err => {
            this.spinner.hide();
            console.log(err)
          }
        );

      } else {
        this.alerta('Todos los campos son requeridos');
      }
    }
  }

  public guardarArchivos(idParticipante: any) {

    for (let tit of this.lstTitulos) {
      this.lstArchivos.push({ nombre: tit.nombre, imagen: tit.imagen, tipo: 'Titulo' });
    }
    for (let tit of this.lstCapacitaciones) {
      this.lstArchivos.push({ nombre: tit.nombre, imagen: tit.imagen, tipo: 'Capacitacion' });
    }

    for (let archivo of this.lstArchivos) {
      this.spinner.show();
      this.conexion.post("gestionArchivo", '', {
        identificador: 1,
        idArchivo: 0,
        nombre: archivo.nombre,
        documento: archivo.imagen,
        tipo: archivo.tipo,
        idParticipante: idParticipante
      }).subscribe(
        (res: any) => {
          this.spinner.hide();
          console.log(res);
          this.router.navigate(['/']);
        }, err => {
          this.spinner.hide();
          console.log(err)
        }
      );
    }

  }

  public archivosTitulos(name: any) {
    this.lstArchivos = [];
    this.lstTitulos = [];
    var _this = this;
    var files = $("#" + name).prop("files");
    for (var i = 0; i < files.length; i++) {
      (function (file) {

        var fileReader = new FileReader();
        fileReader.onload = function (f: any) {
          _this.lstTitulos.push({ nombre: file.name, imagen: f.target.result, tipo: 'Titulo' });
        };

        fileReader.readAsDataURL(file);

      })(files[i]);
    }
  }

  public archivosCapacitaciones(name: any) {
    this.lstArchivos = [];
    this.lstCapacitaciones = [];
    var _this = this;
    var files = $("#" + name).prop("files");
    for (var i = 0; i < files.length; i++) {
      (function (file) {

        var fileReader = new FileReader();
        fileReader.onload = function (f: any) {
          _this.lstCapacitaciones.push({ nombre: file.name, imagen: f.target.result, tipo: 'Capacitacion' });
        };

        fileReader.readAsDataURL(file);

      })(files[i]);
    }
  }

  test() {
    console.log(this.lstTitulos);
    console.log(this.lstCapacitaciones);
    for (let tit of this.lstTitulos) {
      this.lstArchivos.push({ nombre: tit.nombre, imagen: tit.imagen, tipo: 'Titulo' });
    }
    for (let tit of this.lstCapacitaciones) {
      this.lstArchivos.push({ nombre: tit.nombre, imagen: tit.imagen, tipo: 'Capacitacion' });
    }
    console.log(this.lstArchivos);
  }

  public alerta(mensaje: any) {
    Swal.fire({
      position: 'top',
      icon: 'warning',
      title: mensaje,
      showConfirmButton: false,
      timer: 1500
    })
  }

  public validateEmail(email: any) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  public validarInformacion(step: any) {
    if (step == 2) {
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

    } else if (step == 3) {
      console.log('Usuario', this.fmrParticipante);
      this.manageDashboards(step);
    }

  }
}
