import { AdminService } from './services/admin.service';
import { ListadoComponent } from './components/listado/listado.component';
import { MenuComponent } from './components/menu/menu.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargaComponent } from './components/carga/carga.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'listado', component: ListadoComponent },
  { path: 'login', component: LoginComponent, canActivate: [ AuthService, AdminService] },
  // auth va a comprobar que haya token - admin comprueba la validez del token
  { path: 'carga', component: CargaComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/error', pathMatch: 'full'}
];

/**
 * GUARDS:
 *  CanActivate -> se activa antesd de salir de una ruta.
 *     Recive un array de servicios que implementen la interfaz CanActivate para dif validaciones
 *  CanActivateChild
 *  CanDeactivate
 *  CanLoad
 */

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
