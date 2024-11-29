import {
  Component,
  ViewChild,
  inject,
  SimpleChanges,
  ChangeDetectionStrategy,
  OnChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ModalComponent } from '../shared/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProyectoService } from '../../Services/proyecto/proyecto.service';
import { MatRippleModule } from '@angular/material/core';
import { VerModalComponent } from './modal/ver-modal.component';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    DatePipe,
    MatTooltip,
    MatSortModule,
    MatRippleModule,
  ],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProyectosComponent {
  private readonly proyectoService = inject(ProyectoService);
  private readonly router = inject(Router);
  private readonly modal = inject(MatDialog);

  proyectos$ = this.proyectoService.getProyectos();

  displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'fechaInicio',
    'fechaFin',
  ];
  dataSource = new MatTableDataSource<any>([]);
  routes = ['registrar'];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort;

  onRowClick(row: any): void {
    const dialogRef = this.modal.open(VerModalComponent, {
      width: '1000px',
      height: '800px',
      maxWidth: '90%',
      data: row,
    });

    dialogRef.afterClosed().subscribe((shouldRefresh: boolean) => {
      if (shouldRefresh) {
        this.refreshData();
      }
    });
  }

  ngAfterViewInit() {
    this.refreshData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['proyectos']) {
      this.refreshData();
    }
  }

  private refreshData(): void {
    this.proyectos$.subscribe({
      next: (proyectos) => {
        const data = proyectos.map((proyecto) => ({
          id: proyecto.id,
          nombre: proyecto.nombre,
          descripcion: proyecto.descripcion,
          fechaInicio: proyecto.fechaInicio,
          fechaFin: proyecto.fechaFin,
          responsable: proyecto.responsable,
          desarrolladores: proyecto.desarrolladores,
          tareas: proyecto.tareas,
        }));
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator!;
      },
      error: (err) => {
        console.error('Error fetching proyectos:', err);
      },
    });
  }
}
