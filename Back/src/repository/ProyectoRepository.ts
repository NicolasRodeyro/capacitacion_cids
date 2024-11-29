import dataSource from "../data-source";
import { GetDesarrolladorDTO } from "../dto/DesarrolladorDTO";
import {
  CreateProyectoDTO,
  GetProyectoDTO,
  UpdateProyectoDTO,
} from "../dto/ProyectoDTO";
import { DesarrolladorEntity } from "../entity/DesarrolladorEntity";
import { ProyectoEntity } from "../entity/ProyectoEntity";
import { Proyecto } from "../model/Proyecto";

const _proyectoRepository = dataSource.getRepository(ProyectoEntity);

const createProyecto = async (
  payload: CreateProyectoDTO
): Promise<GetProyectoDTO> => {
  try {
    const proyecto = {
      ...payload,
      fechaActualizacion: new Date(),
      responsable: payload.responsable as DesarrolladorEntity,
    };

    return await _proyectoRepository.save(proyecto);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProyectos = async (): Promise<GetProyectoDTO[]> => {
  try {
    return await _proyectoRepository.find({
      relations: {
        responsable: true,
        desarrolladores: true,
        tareas: {
          asignado: true,
          estado: true,
          proyecto: true,
        },
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getProyectoById = async (id: number): Promise<GetProyectoDTO | null> => {
  try {
    return await _proyectoRepository.findOne({
      where: { id },
      relations: {
        responsable: true,
        desarrolladores: {
          rol: true,
        },
        tareas: true,
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const updateProyecto = async (
  id: number,
  payload: UpdateProyectoDTO
): Promise<Proyecto | null> => {
  try {
    const proyecto = await _proyectoRepository.findOne({
      where: { id },
      relations: { tareas: true, responsable: true, desarrolladores: true },
    });

    if (!proyecto) {
      return null;
    }

    Object.assign(proyecto, payload);

    return await _proyectoRepository.save(proyecto);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const assignDesarrolladorToProyecto = async (
  proyectoId: number,
  desarrollador: GetDesarrolladorDTO
): Promise<Proyecto | null> => {
  try {
    const proyecto = await _proyectoRepository.findOne({
      where: { id: proyectoId },
      relations: { desarrolladores: true },
    });

    if (!proyecto) {
      return null;
    }

    const exists = proyecto.desarrolladores.some(
      (des) => des.id === desarrollador.id
    );

    if (exists) {
      return proyecto;
    }

    proyecto.desarrolladores.push(desarrollador as any);

    return await _proyectoRepository.save(proyecto);
  } catch (error) {
    console.error("Error assigning desarrollador to proyecto:", error);
    throw new Error("Could not assign desarrollador to proyecto");
  }
};

const unassignDesarrolladorFromProyecto = async (
  proyectoId: number,
  desarrolladorId: number
): Promise<Proyecto | null> => {
  try {
    const proyecto = await _proyectoRepository.findOne({
      where: { id: proyectoId },
      relations: { desarrolladores: true },
    });

    if (!proyecto) {
      return null;
    }

    const beforeLength = proyecto.desarrolladores.length;
    proyecto.desarrolladores = proyecto.desarrolladores.filter(
      (des) => des.id !== desarrolladorId
    );

    if (beforeLength === proyecto.desarrolladores.length) {
      return null;
    }

    return await _proyectoRepository.save(proyecto);
  } catch (error) {
    console.error("Error unassigning desarrollador from proyecto:", error);
    throw new Error("Could not unassign desarrollador from proyecto");
  }
};

export const ProyectoRepository = {
  createProyecto,
  getProyectos,
  getProyectoById,
  updateProyecto,
  assignDesarrolladorToProyecto,
  unassignDesarrolladorFromProyecto,
};
