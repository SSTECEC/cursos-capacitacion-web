import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { CursosComponent } from './view/administrador/cursos/cursos.component';
import { InicioAdministradorComponent } from './view/administrador/inicio-administrador/inicio-administrador.component';
import { InicioClienteComponent } from './view/cliente/inicio-cliente/inicio-cliente.component';
import { LoginComponent } from './view/general/login/login.component';
import { CursoComponent } from './view/web/curso/curso.component';
import { InicioComponent } from './view/web/inicio/inicio.component';
import { ParticipanteComponent } from './view/web/participante/participante.component';



const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'administrador/inicio', component: InicioAdministradorComponent },
  { path: 'cliente/inicio', component: InicioClienteComponent},  
  { path: 'curso/:id', component: CursoComponent},
  { path: 'participante/:id', component: ParticipanteComponent },
  { path: 'modal', component: ModalComponent},

  /*RUTAS ADMIN */
  { path: 'administrador/certificaciones', component: CursosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
