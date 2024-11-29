import dataSource from "../data-source";
import { CreateTareaDTO, GetTareaDTO, UpdateTareaDTO } from "../dto/TareaDTO";
import { TareaEntity } from "../entity/TareaEntity";
import { Tarea } from "../model/Tarea";
import { TareaRepository } from "../repository/TareaRepository";
import { DesarrolladorService } from "./DesarrolladorService";
import { EstadoService } from "./EstadoService";
import { ProyectoService } from "./ProyectoService";

const createTarea = async (tareaData: CreateTareaDTO): Promise<GetTareaDTO> => {
  try {
    const asignado = await DesarrolladorService.getDesarrolladorById(
      tareaData.asignado as number
    );
    if (!asignado) {
      throw new Error("Desarrollador not found");
    }
    const proyecto = await ProyectoService.getProyectoById(
      tareaData.proyecto as number
    );
    if (!proyecto) {
      throw new Error("Proyecto not found");
    }
    const estado = await EstadoService.getEstadoById(
      tareaData.estado as number
    );
    if (!estado) {
      throw new Error("Estado not found");
    }

    const payload = {
      ...tareaData,
      asignado,
      proyecto,
      estado,
    };

    return await TareaRepository.createTarea(payload);
  } catch (error) {
    console.error("Error creating tarea:", error);
    throw new Error("Could not create tarea");
  }
};

const getTareaById = async (id: number): Promise<GetTareaDTO | null> => {
  try {
    return await TareaRepository.getTareaById(id);
  } catch (error) {
    console.error("Error fetching tarea:", error);
    throw new Error("Could not fetch tarea");
  }
};

const getAllTareas = async (): Promise<GetTareaDTO[] | []> => {
  try {
    return await TareaRepository.getTareas();
  } catch (error) {
    console.error("Error fetching tareas:", error);
    throw new Error("Could not fetch tareas");
  }
};

const eliminarTarea = (tareaId: number) => {
  return TareaRepository.eliminarTarea(tareaId);
};

export const TareaService = {
  getTareaById,
  getAllTareas,
  createTarea,
  eliminarTarea,
};
