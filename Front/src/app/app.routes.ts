import { Routes } from '@angular/router';
import { LayoutComponent } from './Components/layout/layout.component';
import { DesarrolladoresComponent } from './Components/desarrolladores/desarrolladores.component';
import { ProyectosComponent } from './Components/proyectos/proyectos.component';
import { RolesComponent } from './Components/roles/roles.component';
import { RegistrarDesarrolladorComponent } from './Components/registrar-desarrollador/registrar-desarrollador.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'desarrolladores',
        loadComponent: () =>
          import('./Components/desarrolladores/desarrolladores.component').then(
            (m) => m.DesarrolladoresComponent
          ),
      },
      {
        path: 'desarrolladores/registrar',
        loadComponent: () =>
          import(
            './Components/registrar-desarrollador/registrar-desarrollador.component'
          ).then((m) => m.RegistrarDesarrolladorComponent),
      },
      {
        path: 'proyectos',
        loadComponent: () =>
          import('./Components/proyectos/proyectos.component').then(
            (m) => m.ProyectosComponent
          ),
      },
      {
        path: 'roles',
        loadComponent: () =>
          import('./Components/roles/roles.component').then(
            (m) => m.RolesComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
