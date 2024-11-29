import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { NgClass, AsyncPipe } from '@angular/common';
import {
  ReactiveFormsModule,
  Validators,
  NonNullableFormBuilder,
  FormControl,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DesarrolladorService } from '../../Services/desarrollador/desarrollador.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

type FormularioRegistro = {
  nombre: FormControl<string>;
  correo: FormControl<string>;
  rol: FormControl<string>;
  fechaContratacion: FormControl<string>;
};

@Component({
  selector: 'app-registrar-desarrollador',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    NgClass,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AsyncPipe,
  ],
  templateUrl: './registrar-desarrollador.component.html',
  styleUrl: './registrar-desarrollador.component.scss',
})
export class RegistrarDesarrolladorComponent {
  private readonly desarrolladorService = inject(DesarrolladorService);
  private readonly router = inject(Router);
  protected readonly fb = inject(NonNullableFormBuilder);
  private readonly snackbar = inject(MatSnackBar);

  @Output() readonly submitForm = new EventEmitter();
  roles$ = this.desarrolladorService.getRoles();

  registrarDevForm = this.fb.group({
    nombre: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    correo: this.fb.control('', [Validators.required, Validators.email]),
    rol: this.fb.control('', Validators.required),
    fechaContratacion: this.fb.control('', Validators.required),
  });

  onSubmit(): void {
    if (this.registrarDevForm.invalid) {
      this.registrarDevForm.markAllAsTouched();
      return;
    }

    const { nombre, correo, rol, fechaContratacion } =
      this.registrarDevForm.getRawValue();

    this.roles$.pipe(first()).subscribe((roles) => {
      const selectedRol = roles.find(({ id }) => id === +rol);

      if (selectedRol) {
        const payload = {
          nombre,
          correo,
          rol: selectedRol,
          fechaContratacion: new Date(fechaContratacion),
        };

        this.desarrolladorService.registrarDesarrollador(payload).subscribe({
          next: () => {
            this.snackbar.open('Desarrollador creado con éxito', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/desarrolladores']);
          },
          error: () => {
            this.snackbar.open('Error al crear el desarrollador', 'Cerrar', {
              duration: 3000,
            });
          },
        });
      } else {
        console.error('Role not found!');
      }
    });
  }

  clearForm(): void {
    this.registrarDevForm.reset();
  }
}
