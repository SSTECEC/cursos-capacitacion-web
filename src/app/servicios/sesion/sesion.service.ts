import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private keyCliente: string = "k:yavirac";

 constructor(private router: Router) { }

  cerrarSesion() {
    localStorage.removeItem(this.keyCliente);
    window.open(environment.conexionVista + "/", "_self");
  }

 /*  verificarCredencialesInicio() {
    var datos: any = localStorage.getItem(this.keyCliente);
    if (datos != null) {
      var bytes = CryptoJS.AES.decrypt(datos, this.keyEncriptacion);
      var datosPlanos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      if (datosPlanos.Rol == "ADMINISTRADOR") {
        this.router.navigate(['/administrador/sede']);
      } else if (datosPlanos.Rol == "RECTOR") {
        this.router.navigate(['/supervisor/inicio']);
      } else if (datosPlanos.Rol == "PROFESOR") {
        this.router.navigate(['/profesor/lista/reservas']);
      }
    }
  } */

  verificarCredencialesRutas() {
    var datos: any = localStorage.getItem(this.keyCliente);
    if (datos === null) {
      this.router.navigate(['/']);
    }
  }

  iniciarSesion(usuario: any) {
    var datosCifrados = btoa(JSON.stringify(usuario));
    localStorage.setItem(this.keyCliente, datosCifrados);
    if (usuario.idRol == 1) {
      this.router.navigate(['/administrador/inicio']);
    }else if (usuario.idRol == 2) {
      this.router.navigate(['/cliente/inicio']);
   }
}
  
  obtenerDatos() {
    var datos = localStorage.getItem(this.keyCliente);
    var datosPlanos: any;
    if (datos == null) {
      datosPlanos = { 'resultado': null, 'token': null };
    } else {
      var bytes = atob(datos);
      datosPlanos = JSON.parse(bytes);
    }
    return datosPlanos;
  }
}
