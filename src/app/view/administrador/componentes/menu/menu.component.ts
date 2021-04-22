import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/app/servicios/sesion/sesion.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private sesion: SesionService) { }

  ngOnInit(): void {
  }
    /* cerrar sesion */
    public cerrarSesion(){
      this.sesion.cerrarSesion();
    }
  

}
