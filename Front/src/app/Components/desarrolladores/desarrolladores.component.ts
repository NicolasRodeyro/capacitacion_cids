import {
  Component,
  AfterViewInit,
  ViewChild,
  inject,
  SimpleChanges,
  OnChanges,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { DesarrolladorService } from '../../Services/desarrollador/desarrollador.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ModalComponent } from '../shared/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-desarrolladores',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    DatePipe,
    MatTooltip,
    MatSortModule,
  ],
  templateUrl: './desarrolladores.component.html',
  styleUrl: './desarrolladores.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesarrolladoresComponent implements OnChanges, AfterViewInit {
  private readonly desarrolladorService = inject(DesarrolladorService);
  private readonly router = inject(Router);
  private readonly modal = inject(MatDialog);
  private readonly snackbar = inject(MatSnackBar);

  onOpenModal(id: number, nombre: string) {
    const title = 'Eliminar Desarrollador';
    const content = `¿Está seguro que desea eliminar al desarrollador ${nombre} - id: ${id}?`;
    const dialogRef = this.modal.open(ModalComponent, {
      data: { title, content },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.desarrolladorService.deleteDesarrollador(id).subscribe({
          next: () => {
            this.snackbar.open('Desarrollador eliminado con éxito', 'Cerrar', {
              duration: 3000,
            });
            this.refreshData();
          },
          error: (err) => {
            this.snackbar.open('Error al eliminar el desarrollador', 'Cerrar', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  desarrolladores$ = this.desarrolladorService.getDesarrolladores();

  displayedColumns: string[] = [
    'id',
    'nombre',
    'correo',
    'rol',
    'fecha',
    'acciones',
  ];
  dataSource = new MatTableDataSource<any>([]);
  routes = ['registrar'];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() ver = new EventEmitter<number>();

  ngAfterViewInit() {
    this.refreshData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['desarrolladores']) {
      this.refreshData();
    }
  }

  navigateTo(route: string) {
    this.router.navigate([`/desarrolladores/${route}`]);
  }

  private refreshData(): void {
    this.desarrolladores$.subscribe({
      next: (desarrolladores) => {
        const data = desarrolladores.map((des) => ({
          id: des.id,
          nombre: des.nombre,
          correo: des.correo,
          fecha: des.fechaContratacion,
          rol: des.rol?.nombre,
        }));
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator!;
      },
      error: (err) => {
        console.error('Error fetching desarrolladores:', err);
      },
    });
  }
}
