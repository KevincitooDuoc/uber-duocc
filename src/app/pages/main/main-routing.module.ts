import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },  {
    path: 'home-c',
    loadChildren: () => import('./conductor/home-c/home-c.module').then( m => m.HomeCPageModule)
  },
  {
    path: 'crear-viaje',
    loadChildren: () => import('./conductor/crear-viaje/crear-viaje.module').then( m => m.CrearViajePageModule)
  },
  {
    path: 'modificar-viaje',
    loadChildren: () => import('./conductor/modificar-viaje/modificar-viaje.module').then( m => m.ModificarViajePageModule)
  },
  {
    path: 'home-p',
    loadChildren: () => import('./pasajero/home-p/home-p.module').then( m => m.HomePPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
