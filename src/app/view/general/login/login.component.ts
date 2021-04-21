import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cursos } from 'src/app/clases/Cursos';
import { ApiService } from 'src/app/servicios/api/api.service';
import { SesionService } from 'src/app/servicios/sesion/sesion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  formulario: FormGroup = this.formBuilder.group({

    email: ['', [Validators.required, Validators.email ]],
    password: ['', [Validators.required, Validators.minLength(8)]]
     
  });


  constructor(private spinner: NgxSpinnerService, private router: ActivatedRoute, private conexion: ApiService, private ruta: Router, private formBuilder: FormBuilder, private sesion: SesionService) { }

  ngOnInit(): void {  }

    public iniciarSesion (){
      console.log(this.formulario);
      if (this.formulario.valid) {
        this.spinner.show();
        var datos: any= {
          'email': this.formulario.value.email,
          'password': this.formulario.value.password,
        };
        this.conexion.post("verificarUsuario", "", datos).subscribe(
          (res: any) => {
            this.spinner.hide();    
            if (res.estado == 1){
              
            var datos = res.resultado[0];
            console.log(datos);
            this.sesion.iniciarSesion(datos);
            }       
            else {
              alert('credenciales invalidas')
            }
           

          }, err => {
            this.spinner.hide();
            console.log(err)
          }
        );
    }else {
      if (this.formulario.controls.email.status == "INVALID") {
        alert('correo no valido')
      }
      else if (this.formulario.controls.password.status == "INVALID"){
        alert ('contraseña invalida')
      }
    
    }
  } 


}
