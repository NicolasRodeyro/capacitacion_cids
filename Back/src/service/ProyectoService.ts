import dataSource from "../data-source";
import {
  CreateProyectoDTO,
  GetProyectoDTO,
  UpdateProyectoDTO,
} from "../dto/ProyectoDTO";
import { ProyectoEntity } from "../entity/ProyectoEntity";
import { Desarrollador } from "../model/Desarrollador";
import { Proyecto } from "../model/Proyecto";
import { ProyectoRepository } from "../repository/ProyectoRepository";
import { DesarrolladorService } from "./DesarrolladorService";

const createProyecto = async (
  proyectoData: CreateProyectoDTO
): Promise<GetProyectoDTO> => {
  try {
    const responsable = await DesarrolladorService.getDesarrolladorById(
      proyectoData.responsable as number
    );
    if (!responsable) {
      throw new Error("Desarrollador not found");
    }
    const payload = {
      ...proyectoData,
      responsable,
    };

    return await ProyectoRepository.createProyecto(payload);
  } catch (error) {
    console.error("Error creating proyecto:", error);
    throw new Error("Could not create proyecto");
  }
};

const getProyectoById = async (id: number): Promise<GetProyectoDTO | null> => {
  try {
    return await ProyectoRepository.getProyectoById(id);
  } catch (error) {
    console.error("Error fetching proyecto:", error);
    throw new Error("Could not fetch proyecto");
  }
};

const getAllProyectos = async (): Promise<GetProyectoDTO[] | []> => {
  try {
    return await ProyectoRepository.getProyectos();
  } catch (error) {
    console.error("Error fetching proyectos:", error);
    throw new Error("Could not fetch proyectos");
  }
};

const updateProyecto = async (
  id: number,
  payload: UpdateProyectoDTO
): Promise<Proyecto> => {
  try {
    let responsable = null;
    if (payload.responsable) {
      responsable = await DesarrolladorService.getDesarrolladorById(
        payload.responsable as number
      );

      if (!responsable) {
        throw new Error("Responsable not found");
      }
    }

    const newPayload = { ...payload, ...(responsable && { responsable }) };

    const updatedProyecto = await ProyectoRepository.updateProyecto(
      id,
      newPayload
    );

    if (!updatedProyecto) {
      throw new Error("Proyecto Not Found");
    }

    return updatedProyecto;
  } catch (error) {
    console.error("Error updating proyecto:", error);
    throw new Error("Could not update proyecto");
  }
};

const assignDesarrolladorToProyecto = async (
  proyectoId: number,
  desarrolladorId: number
): Promise<Proyecto> => {
  try {
    const desarrollador = await DesarrolladorService.getDesarrolladorById(
      desarrolladorId
    );

    const updatedProyecto =
      await ProyectoRepository.assignDesarrolladorToProyecto(
        proyectoId,
        desarrollador!
      );

    if (!updatedProyecto) {
      throw new Error("Proyecto Not Found");
    }

    return updatedProyecto;
  } catch (error) {
    console.error("Error assigning desarrollador to proyecto:", error);
    throw new Error("Could not assign desarrollador to proyecto");
  }
};

const unassignDesarrolladorFromProyecto = async (
  proyectoId: number,
  desarrolladorId: number
): Promise<Proyecto> => {
  try {
    const updatedProyecto =
      await ProyectoRepository.unassignDesarrolladorFromProyecto(
        proyectoId,
        desarrolladorId
      );

    if (!updatedProyecto) {
      throw new Error(
        "Proyecto not found or Desarrollador already not in Proyecto"
      );
    }

    return updatedProyecto;
  } catch (error) {
    console.error("Error unassigning desarrollador from proyecto:", error);
    throw new Error("Could not unassign desarrollador from proyecto");
  }
};

export const ProyectoService = {
  createProyecto,
  getProyectoById,
  getAllProyectos,
  updateProyecto,
  assignDesarrolladorToProyecto,
  unassignDesarrolladorFromProyecto,
};
