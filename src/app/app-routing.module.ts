import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/autenticacion/login/component/login.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { EntidadComponent } from './features/mantenimientos/entidad/entidad.component';
import { TipoDocumentoComponent } from './features/mantenimientos/tipo-documento/tipo-documento.component';
import { TipoContribuyenteComponent } from './features/mantenimientos/tipo-contribuyente/tipo-contribuyente.component';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'mantenimientos', component: NavbarComponent, canActivate: [authGuard], children: [
    {path: '', component: EntidadComponent},
    {path: 'entidad', component: EntidadComponent},
    {path: 'tipo-documento', component: TipoDocumentoComponent},
    {path: 'tipo-contribuyente', component: TipoContribuyenteComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
