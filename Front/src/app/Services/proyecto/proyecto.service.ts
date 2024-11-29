import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  protected readonly http = inject(HttpClient);
  protected readonly PROYECTOS_URL = 'http://localhost:3000/proyectos';

  getProyectos(): Observable<any[]> {
    return this.http.get<any[]>(this.PROYECTOS_URL);
  }

  assignDesarrolladorToProyecto(
    proyectoId: number,
    desarrolladorId: number
  ): Observable<any> {
    return this.http.post<any>(
      `${this.PROYECTOS_URL}/${proyectoId}/desarrolladores/${desarrolladorId}`,
      {}
    );
  }

  unassignDesarrolladorToProyecto(
    proyectoId: number,
    desarrolladorId: number
  ): Observable<any> {
    return this.http.delete<any>(
      `${this.PROYECTOS_URL}/${proyectoId}/desarrolladores/${desarrolladorId}`
    );
  }
}
