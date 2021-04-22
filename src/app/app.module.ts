import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './view/web/inicio/inicio.component';
import { LoginComponent } from './view/general/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { ApiService } from './servicios/api/api.service';
import { SesionService } from './servicios/sesion/sesion.service';
import { GenericoService } from './servicios/metodo/generico.service';
import { InicioAdministradorComponent } from './view/administrador/inicio-administrador/inicio-administrador.component';
import { InicioClienteComponent } from './view/cliente/inicio-cliente/inicio-cliente.component';
import { CursoComponent } from './view/web/curso/curso.component';
import { PostulacionComponent } from './view/web/postulacion/postulacion.component';
import { ModalComponent } from './modal/modal.component';
import { ParticipanteComponent } from './view/web/participante/participante.component';
import { CursosComponent } from './view/administrador/cursos/cursos.component';
import { InstitutosComponent } from './view/administrador/institutos/institutos.component';
import { UsuariosComponent } from './view/administrador/usuarios/usuarios.component';
import { CapacitacionesComponent } from './view/administrador/capacitaciones/capacitaciones.component';
import { HeaderComponent } from './view/administrador/componentes/header/header.component';
import { MenuComponent } from './view/administrador/componentes/menu/menu.component';
import { FooterComponent } from './view/administrador/componentes/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    InicioAdministradorComponent,
    InicioClienteComponent,
    CursoComponent,
    PostulacionComponent,
    ModalComponent,
    ParticipanteComponent,
    CursosComponent,
    InstitutosComponent,
    UsuariosComponent,
    CapacitacionesComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [ApiService, SesionService, GenericoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
