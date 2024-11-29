import { Desarrollador } from "./Desarrollador";
import { Tarea } from "./Tarea";

export interface Proyecto {
  id: number;
  descripcion: string;
  nombre: string;
  fechaInicio: Date;
  fechaFin: Date;
  responsable: Desarrollador;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  desarrolladores: Desarrollador[];
  tareas: Tarea[];
}
