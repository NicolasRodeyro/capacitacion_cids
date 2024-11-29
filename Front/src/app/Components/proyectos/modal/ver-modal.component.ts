import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { DesarrolladorService } from '../../../Services/desarrollador/desarrollador.service';
import {
  ReactiveFormsModule,
  Validators,
  NonNullableFormBuilder,
  FormControl,
} from '@angular/forms';
import { first } from 'rxjs';
import { ProyectoService } from '../../../Services/proyecto/proyecto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalComponent } from '../../shared/modal/modal.component';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

interface TaskNode {
  name: string;
  children?: TaskNode[];
}

@Component({
  selector: 'app-ver-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatIcon,
    DatePipe,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatSelectModule,
    AsyncPipe,
    MatTreeModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './ver-modal.component.html',
  styleUrl: './ver-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerModalComponent {
  data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<VerModalComponent>);
  private readonly modal = inject(MatDialog);
  private readonly desarrolladorService = inject(DesarrolladorService);
  private readonly proyectoService = inject(ProyectoService);
  private readonly snackbar = inject(MatSnackBar);

  childrenAccessor = (node: TaskNode) => node.children ?? [];
  dataSource = new MatTreeNestedDataSource<TaskNode>();
  constructor() {
    // Initialize the tree data from the provided data
    if (this.data?.tareas) {
      this.dataSource.data = this.transformToTree(this.data.tareas);
    }
  }
  transformToTree(data: any[]): TaskNode[] {
    return data.map((item) => ({
      name: item.titulo,
      children: [
        { name: `Asignado: ${item.asignado?.nombre}` },
        { name: `Estado: ${item.estado?.nombre}` },
      ],
    }));
  }

  hasChild = (_: number, node: TaskNode) =>
    !!node.children && node.children.length > 0;

  protected readonly fb = inject(NonNullableFormBuilder);
  existingIds = new Set(this.data.desarrolladores.map((d: any) => d.id));
  uniqueDesarrolladores$ = this.desarrolladorService.getFilteredDesarrolladores(
    this.existingIds
  );

  agregarDevForm = this.fb.group({
    desarrolladorId: this.fb.control('', Validators.required),
  });

  agregarTareaForm = this.fb.group({
    titulo: this.fb.control('', Validators.required),
    descripcion: this.fb.control('', Validators.required),
    asignado: this.fb.control('', Validators.required),
    estado: this.fb.control('', Validators.required),
    fechaLimite: this.fb.control('', Validators.required),
  });

  onAddDesarrollador() {
    const desarrolladorId = this.agregarDevForm.get('desarrolladorId')?.value;

    if (!desarrolladorId) {
      return;
    }

    this.uniqueDesarrolladores$.pipe(first()).subscribe((desarrolladores) => {
      this.proyectoService
        .assignDesarrolladorToProyecto(+this.data.id, +desarrolladorId)
        .subscribe({
          next: () => {
            this.snackbar.open('Desarrollador asignado con éxito', 'Cerrar', {
              duration: 3000,
            });
            this.dialogRef.close(true);
          },
          error: () => {
            this.snackbar.open('Error al asignar el desarrollador', 'Cerrar', {
              duration: 3000,
            });
          },
        });
    });
  }

  onOpenModal(id: number, nombre: string) {
    const title = 'Eliminar Desarrollador';
    const content = `¿Está seguro que desea eliminar al desarrollador ${nombre} - id: ${id}?`;
    const dialogRef = this.modal.open(ModalComponent, {
      data: { title, content },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onRemoveDesarrollador(id);
      }
    });
  }

  onRemoveDesarrollador(desarrolladorId: number) {
    this.uniqueDesarrolladores$.pipe(first()).subscribe((desarrolladores) => {
      this.proyectoService
        .unassignDesarrolladorToProyecto(+this.data.id, +desarrolladorId)
        .subscribe({
          next: () => {
            this.snackbar.open(
              'Desarrollador removido del proyecto con éxito',
              'Cerrar',
              {
                duration: 3000,
              }
            );
            this.dialogRef.close(true);
          },
          error: () => {
            this.snackbar.open(
              'Error al remover el desarrollador del proyecto',
              'Cerrar',
              {
                duration: 3000,
              }
            );
          },
        });
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
