import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cursos } from 'src/app/clases/Cursos';
import { Instituto } from 'src/app/clases/Instituto';
import { ApiService } from 'src/app/servicios/api/api.service';
import { SesionService } from 'src/app/servicios/sesion/sesion.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  formularioCurso: FormGroup = this.formBuilder.group({
    idCursos: [0],
    nombre: ['', [Validators.required]],
    descripcion_corta: ['', [Validators.required]],
    descripcion_larga: ['', [Validators.required]],
    icono: ['', [Validators.required]],
    imagen: ['', [Validators.required]],
    idInstituto: ['', [Validators.required]]
  });

  lstCursos: Cursos[] = [];
  lstInstituto: Instituto[] = [];

  tipoCurso = 0;
  imagenCargada: any;

  constructor(private conexion: ApiService,
    private spinner: NgxSpinnerService,
    private ruta: Router,
    private formBuilder: FormBuilder,
    private sesion: SesionService) {

  }

  ngOnInit(): void {
    this.listarCursos();
    this.listarInstitutos();
  }

  listarCursos() {
    this.spinner.show();
    this.conexion.get("listarCursos", "").subscribe(
      (res: any) => {
        this.lstCursos = res.resultado;
        console.log(this.lstCursos);
      }, err => {
        this.spinner.hide();
        console.log(err)
      }
    );
  }

  listarInstitutos() {
    this.spinner.show();
    this.conexion.get("listarInstitutos", "").subscribe(
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


  public abrirModalCursos(tipo: number, datos: any) {
    this.tipoCurso = tipo;
    this.imagenCargada = "";
    $('#exampleModal').modal('show');
    if (tipo == 2) {
      this.formularioCurso.controls['idCursos'].setValue(datos.idCursos);
    }
    console.log(datos);
  }

  public guardarCurso(event: any) {

    this.formularioCurso.controls['descripcion_larga'].setValue($('#summernote').summernote('code'));
    var formulario = this.formularioCurso.value;
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
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Llene todos los campos',
        showConfirmButton: false,
        timer: 1500
      })
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
  public abrirModalImagenCurso(tipo: number, datos: any) {
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
  }

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



}
