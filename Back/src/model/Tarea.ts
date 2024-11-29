import { Desarrollador } from "./Desarrollador";
import { Proyecto } from "./Proyecto";
import { Estado } from "./Estado";

export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  fechaLimite: Date;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  proyecto: Proyecto;
  asignado: Desarrollador;
  estado: Estado;
}
