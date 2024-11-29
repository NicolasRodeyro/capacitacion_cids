import { Desarrollador } from "../model/Desarrollador";
import { GetDesarrolladorDTO } from "./DesarrolladorDTO";

export type CreateProyectoDTO = {
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  responsable:
    | number
    | Omit<
        Desarrollador,
        "id" | "proyectosResponsable" | "proyectos" | "tareas"
      >;
};

export type GetProyectoDTO = {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  responsable: GetDesarrolladorDTO;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
};

export type UpdateProyectoDTO = {
  nombre?: string;
  descripcion?: string;
  fechaInicio?: Date;
  fechaFin?: Date;
  responsable?:
    | number
    | Omit<
        Desarrollador,
        "id" | "proyectosResponsable" | "proyectos" | "tareas"
      >;
};
