import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cursos } from 'src/app/clases/Cursos';
import { ApiService } from 'src/app/servicios/api/api.service';
import { Instituto } from 'src/app/clases/Instituto';
import { Router } from '@angular/router';
import { Participante } from 'src/app/clases/Participante';
import { Postulacion } from 'src/app/clases/Postulacion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SesionService } from 'src/app/servicios/sesion/sesion.service';
declare var $: any;

@Component({
  selector: 'app-inicio-administrador',
  templateUrl: './inicio-administrador.component.html',
  styleUrls: ['./inicio-administrador.component.css']
})
export class InicioAdministradorComponent implements OnInit {


  /* cambiar pestañas */
  public view: any = {
    "panel01": true,
    "panel02": false,
    "panel03": false,
    "panel04": false,
    "panel05": false,
  }

  /* Declarar un Formulario Curso */
  formularioCurso: FormGroup = this.formBuilder.group({
    idCursos: [0],
    nombre: ['', [Validators.required]],
    descripcion_corta: ['', [Validators.required]],
    descripcion_larga: ['', [Validators.required]],
    icono: ['', [Validators.required]],
    imagen: ['', [Validators.required]],
    idInstituto: ['', [Validators.required]]
  });

  /* Declarar un Formulario Instituto */
  formularioInstituto: FormGroup = this.formBuilder.group({
    idInstituto: [0],
    nombre: ['', [Validators.required]],
    imagen: ['', [Validators.required]]

  });


  /* Declarar un Formulario Participante */
  fmrParticipante: FormGroup = this.formBuilder.group({
    idParticipante: [0],
    nombreP: ['', [Validators.required]],
    identificacionP: ['', [Validators.required]],
    correoP: ['', [Validators.required]],
    direccionP: [''],
    paisP: [''],
    ciudadP: [''],
    provinciaP: [''],
    estadoCivilP: [''],
    fechaNac: [''],
    nombreRefeP: [''],
    correoRefeP: [''],
    contactoP: [''],
    parentescoP: [''],
    nombreRefeL: [''],
    correoRefeL: [''],
    contactoL: [''],
    parentescoL: [''],
    estadoP: [1],


  });

  imagenCargada: any;

  /* listar insituto */
  idInstituto = 0;
  instituto: Instituto = new Instituto('', 0, '', 0);

  /* listar Curso */
  curso: Cursos = new Cursos('', 0, '', '', '', '', 1, 0);

  /* listar participantes */
  idParticipante = 0;
  participante: Participante = new Participante('', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0);

  /* listar Postulacion */
  idPostulacion = 0;
  postulacion: Postulacion = new Postulacion(0, 0, 0, 0, '', '');


  /* listar lstcurso */
  lstCursos: Cursos[] = [];
  /* listar lstInstituto */
  lstInstituto: Instituto[] = [];
  /* listar lstParticipante */
  lstParticipante: Participante[] = [];
  /* listar lstParticipante */
  lstPostulacion: Postulacion[] = [];
  /* listar lstParticipante */
  lstPostulacionAprobadas: Postulacion[] = [];

  lstArchivosParticipante = [];

  tipoCurso = 0;
  tipoInstituto = 0;
  tipoParticipante = 0;
  tipoPostulacion = 0;

  datosPostulacionParticipante: any;
  datosPostulacionArchivos: any;

  constructor(private conexion: ApiService, private spinner: NgxSpinnerService, private ruta: Router, private formBuilder: FormBuilder, private sesion: SesionService) {

  }

  ngOnInit(): void {
    this.sesion.verificarCredencialesRutas();
    this.listarCursos();
    this.listarInstitutos();
    this.listarParticipante();
    this.listarPostulacion();
    $(document).ready(function () {
      $('#summernote').summernote({
        height: 350,
      });
    });
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



  listarInstitutos() {
    this.spinner.show();
    this.conexion.get("listarInstitutos?idInstituto=" + this.idInstituto, "").subscribe(
      (res: any) => {
        this.lstInstituto = res.resultado;
        this.spinner.hide();
        console.log(this.lstInstituto);
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


  listarPostulacion() {
    this.spinner.show();
    this.conexion.get("listarPostulaciones?estado=1", "").subscribe(
      (res: any) => {

        this.lstPostulacion = res.resultado;
        this.spinner.hide();
        console.log(this.lstPostulacion);
      }, err => {
        this.spinner.hide();
        console.log(err)
      }
    );
  }

  listarPostulacionAprobadas() {
    this.spinner.show();
    this.conexion.get("listarPostulaciones?estado=2", "").subscribe(
      (res: any) => {

        this.lstPostulacionAprobadas = res.resultado;
        this.spinner.hide();
        console.log(this.lstPostulacionAprobadas);
      }, err => {
        this.spinner.hide();
        console.log(err)
      }
    );
  }

  abrirModalVerificarPostulanteArchivo(id: any) {
    console.log(id);
    $("#archivosSolicitud").modal("toggle");

    this.spinner.show();
    this.conexion.get("listarArchivosPostulaciones?idParticipante=" + id, "").subscribe(
      (res: any) => {
        this.spinner.hide();
        this.lstArchivosParticipante = res;
        console.log(res);
      }, err => {
        this.spinner.hide();
        console.log(err)
      }
    );
  }

  prue(param: any) {
    return JSON.stringify(param);
  }


  prueba(idPrueba: any) {
    this.ruta.navigate(['postular/' + idPrueba]);
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
    else if (panel == 3) {
      this.view = {
        "panel01": false,
        "panel02": false,
        "panel03": true,
        "panel04": false,
        "panel05": false,
      }
    }
    else if (panel == 4) {
      this.view = {
        "panel01": false,
        "panel02": false,
        "panel03": false,
        "panel04": true,
        "panel05": false,
      }
      this.listarPostulacionAprobadas();
    }
    else if (panel == 5) {
      this.view = {
        "panel01": false,
        "panel02": false,
        "panel03": false,
        "panel04": false,
        "panel05": true,
      }
    }
  }


  /*CRUD CURSOS*/

  public abrirModalCursos(tipo: number, datos: any) {
    this.tipoCurso = tipo;
    this.imagenCargada = "";

    this.formularioCurso.reset();
    $('#summernote').summernote('code', "");
    $('#exampleModal').modal('show');
    if (tipo == 2) {
      this.formularioCurso.controls['idCursos'].setValue(datos.idCursos);
      this.formularioCurso.controls['nombre'].setValue(datos.nombre);
      this.formularioCurso.controls['descripcion_corta'].setValue(datos.descripcion_corta);
      this.formularioCurso.controls['descripcion_larga'].setValue(datos.descripcion_larga);
      $('#summernote').summernote('code', datos.descripcion_larga);
      this.formularioCurso.controls['icono'].setValue(datos.icono);
      this.formularioCurso.controls['idInstituto'].setValue(datos.idInstituto);
      this.imagenCargada = datos.imagen;
    }
    console.log(datos);
  }

  public guardarCurso(event: any) {

    this.formularioCurso.controls['descripcion_larga'].setValue($('#summernote').summernote('code'));
    var formulario = this.formularioCurso.value;

    if (this.tipoCurso == 2) {
      if (formulario.nombre == "") {
        Swal.fire({ position: 'top', icon: 'error', title: 'Ingresar Nombre', showConfirmButton: false, timer: 1500 });
      } else if (formulario.descripcion_corta == "") {
        Swal.fire({ position: 'top', icon: 'error', title: 'Ingresar descripción', showConfirmButton: false, timer: 1500 });
      } else if (formulario.descripcion_larga == "") {
        Swal.fire({ position: 'top', icon: 'error', title: 'Ingresar descripción completa', showConfirmButton: false, timer: 1500 });
      } else if (formulario.icono == "") {
        Swal.fire({ position: 'top', icon: 'error', title: 'Seleccionar un icono', showConfirmButton: false, timer: 1500 });
      } else {
        var datos = {
          identificador: this.tipoCurso,
          idCursos: formulario.idCursos,
          nombre: formulario.nombre,
          descripcion_larga: formulario.descripcion_larga,
          descripcion_corta: formulario.descripcion_corta,
          icono: formulario.icono,
          imagen: this.imagenCargada,
          estado: 0,
          idInstituto: formulario.idInstituto
        }
        this.spinner.show();
        this.conexion.post("gestionCursos", "", datos).subscribe(
          (res: any) => {
            $('#exampleModal').modal('toggle');
            this.spinner.hide();
            this.listarCursos();
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Curso Guardado',
              showConfirmButton: false,
              timer: 3000
            })
          }, err => {
            this.spinner.hide();
            console.log(err)
          }
        );
      }
    } else {
      if (this.formularioCurso.valid) {
        var datos = {
          identificador: this.tipoCurso,
          idCursos: formulario.idCursos,
          nombre: formulario.nombre,
          descripcion_larga: formulario.descripcion_larga,
          descripcion_corta: formulario.descripcion_corta,
          icono: formulario.icono,
          imagen: this.imagenCargada,
          estado: this.tipoCurso == 1 ? 1 : this.tipoCurso == 4 ? 2 : 0,
          idInstituto: formulario.idInstituto
        }
        this.spinner.show();
        this.conexion.post("gestionCursos", "", datos).subscribe(
          (res: any) => {
            this.spinner.hide();
            $('#exampleModal').modal('toggle');
            this.listarCursos();
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Curso Guardado',
              showConfirmButton: false,
              timer: 3000
            })
          }, err => {
            this.spinner.hide();
            console.log(err)
          }
        );

      } else {
        Swal.fire({ position: 'top', icon: 'error', title: 'Llene todos los campos', showConfirmButton: false, timer: 1500 });
      }
    }



  }


  public eliminarCurso(cursoSelecionado: any) {
    console.log(cursoSelecionado);
    var datos = {
      identificador: 4,
      idCursos: cursoSelecionado.idCursos,
      nombre: "",
      descripcion_larga: "",
      descripcion_corta: "",
      icono: "",
      imagen: "",
      estado: 0,
      idInstituto: 0
    }


    Swal.fire({
      title: 'Quiere eliminar el Curso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.conexion.post("gestionCursos", "", datos).subscribe(
          (res: any) => {
            this.spinner.hide();
            this.listarCursos();
          }, err => {
            this.spinner.hide();
            console.log(err)
          }
        );
      }
    })
  }




  /* modal curso imagen */
  /* public abrirModalImagenCurso(tipo: number, datos: any) {
  this.tipoCurso = tipo;
  this.imagenCargada = "";
  $('#ejemlomodaImagenCurso').modal('show');
  if (tipo == 2) {
  this.formularioCurso.controls['idCursos'].setValue(datos.idCursos);
  }
  if (tipo == 4) {
  this.formularioCurso.controls['idCursos'].setValue(datos.idCUrsos);
  }
  console.log(datos);
  console.log(datos)
  } */


  /*CRUD INSTITUTO*/

  public abrirModalInstituto(tipo: number, datos: any) {
    this.tipoInstituto = tipo;

    $('#ejemlomodal').modal('show');
    if (tipo == 2) {
      this.formularioInstituto.controls['idInstituto'].setValue(datos.idInstituto);
      this.formularioInstituto.controls['nombre'].setValue(datos.nombre);
      this.formularioInstituto.controls['imagen'].setValue(datos.imagen);
      this.imagenCargada = datos.imagen;
    }
    console.log(datos);
  }

  public guardarInstituto(event: any) {
    console.log(this.formularioInstituto);

    var formulario = this.formularioInstituto.value;

    if (this.tipoInstituto == 2) {
      if (formulario.nombre == "") {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ingresar el nombre',
          showConfirmButton: false,
          timer: 4000
        })
      } else {
        var datos = {
          identificador: this.tipoInstituto,
          idInstituto: formulario.idInstituto,
          nombre: formulario.nombre,
          imagen: this.imagenCargada,
          estado: 0,

        }
        this.spinner.show();
        this.conexion.post("gestionInstituto", "", datos).subscribe(
          (res: any) => {
            this.spinner.hide();
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Instituto Guardado',
              showConfirmButton: false,
              timer: 3000
            })
            $('#ejemlomodal').modal('toggle');
            this.listarInstitutos();
          }, err => {
            this.spinner.hide();
            console.log(err)
          }
        );
      }
    } else {
      if (this.formularioInstituto.valid) {
        var datos = {
          identificador: this.tipoInstituto,
          idInstituto: formulario.idInstituto,
          nombre: formulario.nombre,
          imagen: this.imagenCargada,
          estado: this.tipoInstituto == 1 ? 1 : this.tipoInstituto == 4 ? 2 : 0,

        }
        this.spinner.show();
        this.conexion.post("gestionInstituto", "", datos).subscribe(
          (res: any) => {
            this.spinner.hide();
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Instituto Guardado',
              showConfirmButton: false,
              timer: 3000
            })
            $('#ejemlomodal').modal('toggle');
            this.listarInstitutos();
          }, err => {
            this.spinner.hide();
            console.log(err)
          }
        );

      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Llene todos los campos',
          showConfirmButton: false,
          timer: 4000
        })
      }
    }

  }

  public eliminarInstituto(institutoSelecionado: any) {
    console.log(institutoSelecionado);
    var datos = {
      identificador: 4,
      idInstituto: institutoSelecionado.idInstituto,
      nombre: "",
      imagen: "",
      estado: 0

    }

    Swal.fire({
      title: 'Quiere eliminar el Instituto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Instituto!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.conexion.post("gestionInstituto", "", datos).subscribe(
          (res: any) => {
            this.spinner.hide();
            this.listarInstitutos();
          }, err => {
            this.spinner.hide();
            console.log(err)
          }
        );
      }
    })
  }


  /* modal Instituto imagen */
  /*  public abrirModalImagenInstituto(tipo: number, datos: any) {
  this.tipoCurso = tipo;
  this.imagenCargada = "";
  $('#ejemlomodaImagenInstituto').modal('show');
  if (tipo == 2) {
  this.formularioInstituto.controls['idInstituto'].setValue(datos.idInstituto);
  }
  if (tipo == 4) {
  this.formularioInstituto.controls['idInstituto'].setValue(datos.idInstituto);
  }
  console.log(datos);
  console.log(datos)
  } */

  /* imagen base 64 */
  public getImage(name: any) {
    var files = $("#" + name).prop('files');
    var reader = new FileReader();
    if (files.length > 0) {
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        var base64Large: any = reader.result;
        console.log(base64Large);
        this.imagenCargada = base64Large;

      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }


  /*CRUD PARTICIPANTE*/

  public abrirModalParticipante(tipo: number, datos: any) {
    this.tipoParticipante = tipo;
    console.log(datos);
    $('#ejemploParticipante').modal('toggle');
    if (tipo == 2) {
      this.fmrParticipante.controls['idParticipante'].setValue(datos.idParticipante);
    }
  }


  public modificarParticipante(valor: any) {
    this.tipoParticipante = valor;
    var formulario = this.fmrParticipante.value;
    console.log('valor');
    console.log(this.fmrParticipante);
    if (this.fmrParticipante.valid) {
      var datos = {
        identificador: this.tipoParticipante,
        idParticipante: formulario.idParticipante,
        nombreP: formulario.nombreP,
        identificacionP: formulario.identificacionP,
        correoP: formulario.correoP,
        estadoP: this.tipoParticipante == 1 ? 1 : this.tipoParticipante == 4 ? 2 : 0
      }

      this.spinner.show();
      this.conexion.post("gestionParticipante", '', datos).subscribe(
        (res: any) => {
          this.spinner.hide();
          console.log(res);
          $('#ejemploParticipante').modal('toggle');
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Participante Actualizado',
            showConfirmButton: false,
            timer: 3000
          })
          this.listarParticipante();
        }, err => {
          this.spinner.hide();
          console.log(err)
        }
      );

    } else {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Llene todos los campos',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }


  public eliminarParticipante(participanteSelecionado: any) {
    console.log(participanteSelecionado);
    var datos = {
      identificador: 3,
      idParticipante: participanteSelecionado.idParticipante,
      nombreP: "",
      identificacionP: "",
      correoP: "",
      direccionP: "",
      paisP: "",
      ciudadP: "",
      provinciaP: "",
      estadoCivilP: "",
      fechaNac: "",
      nombreRefeP: "",
      correoRefeP: "",
      contactoP: "",
      parentescoP: "",
      nombreRefeL: "",
      correoRefeL: "",
      contactoL: "",
      parentescoL: "",
      estadoP: 0

    }

    Swal.fire({
      title: 'Quiere eliminar el Participante?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Participante!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.conexion.post("gestionParticipante", "", datos).subscribe(
          (res: any) => {
            this.spinner.hide();
            this.listarParticipante();
          }, err => {
            this.spinner.hide();
            console.log(err)
          }
        );
      }
    })
  }



  /* POSTULACION ELIMINAR */

  public eliminarPostulacion(postulacionSelecionado: any) {
    console.log(postulacionSelecionado);
    var datos = {
      identificador: 1,
      idPostulacion: postulacionSelecionado.idPostulacion,
      estadoP: 0
    }

    Swal.fire({
      title: 'Quiere eliminar la Postulacion?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Postulacion!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.conexion.post("gestionPostulacion", "", datos).subscribe(
          (res: any) => {
            this.spinner.hide();
            this.listarPostulacion();
          }, err => {
            this.spinner.hide();
            console.log(err)
          }
        );
      }
    })
  }


  /* ABRIR MODAL VERIFICAR POSTULANTES */
  public abrirModalVerificarPostulante(tipo: number, datos: any) {
    this.tipoParticipante = tipo;
    console.log(datos)

    this.cargarDatosPostulacionParticipante(datos.idPostulacion);

    $('#verificarParticipante').modal('show');

  }

  public cargarDatosPostulacionParticipante(id: any) {
    this.spinner.show();
    this.conexion.get("listarPostulacionDetalle?idPostulacion=" + id, "").subscribe(
      (res: any) => {

        this.spinner.hide();
        this.datosPostulacionParticipante = res.resultado;
        console.log(this.datosPostulacionParticipante);
      }, err => {
        this.spinner.hide();
        console.log(err)
      }
    );
  }


  public aceptarPostulacion(postulacionSeleccionada: any) {
    var datos = {
      identificador: 1,
      idPostulacion: postulacionSeleccionada.idPostulacion,
      estado: 2,
    }

    this.spinner.show();
    this.conexion.post("gestionPostulacion", "", datos).subscribe(
      (res: any) => {
        this.spinner.hide();
        console.log(res);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Postulación Aprobada',
          showConfirmButton: false,
          timer: 3000
        })
        this.listarPostulacionAprobadas();
      }, err => {
        this.spinner.hide();
        console.log(err)
      }
    );
  }

  /* cerrar sesion */
  public cerrarSesion() {
    this.sesion.cerrarSesion();
  }


}