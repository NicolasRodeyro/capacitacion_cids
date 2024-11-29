import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatListItem,
  MatListItemIcon,
  MatListItemTitle,
  MatNavList,
} from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatNavList,
    MatListItem,
    RouterLink,
    MatIcon,
    MatListItemIcon,
    MatListItemTitle,
  ],
  templateUrl: './sidenav.component.html',
  styles: ` mat-list-item {
      display: flex;
      align-items: center;
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  navItems = [
    { name: 'Inicio', route: '/', icon: 'home' },
    { name: 'Desarrolladores', route: '/desarrolladores', icon: 'person' },
    { name: 'Proyectos', route: '/proyectos', icon: 'folder' },
    { name: 'Tareas', route: '/tareas', icon: 'task' },
  ];
}
