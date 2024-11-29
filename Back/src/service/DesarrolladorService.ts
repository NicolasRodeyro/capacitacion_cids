import {
  CreateDesarrolladorDTO,
  GetDesarrolladorDTO,
  UpdateDesarrolladorDTO,
} from "../dto/DesarrolladorDTO";
import { RolService } from "./RolService";
import { Desarrollador } from "../model/Desarrollador";
import { DesarrolladorRepository } from "../repository/DesarrolladorRepository";

const getAllDesarrolladores = async (): Promise<GetDesarrolladorDTO[]> => {
  try {
    return await DesarrolladorRepository.getDesarrolladores();
  } catch (error: any) {
    throw error;
  }
};

const createDesarrollador = async (
  newDevParams: CreateDesarrolladorDTO
): Promise<GetDesarrolladorDTO> => {
  try {
    const rol = await RolService.getRolById(newDevParams.rol.id);

    if (!rol) {
      throw new Error("Rol not found");
    }
    return await DesarrolladorRepository.createDesarrollador(newDevParams);
  } catch (error) {
    console.error("Error creating desarrollador:", error);
    throw new Error("Could not create desarrollador");
  }
};

const getDesarrolladorById = async (
  devId: number
): Promise<GetDesarrolladorDTO | null> => {
  try {
    return await DesarrolladorRepository.getDesarrolladorById(devId);
  } catch (error) {
    console.error("Error fetching desarrollador:", error);
    throw new Error("Could not fetch desarrollador");
  }
};

const getDesarrolladoresByIds = async (
  ids: number[]
): Promise<GetDesarrolladorDTO[]> => {
  try {
    return await DesarrolladorRepository.getDesarrolladoresByIds(ids);
  } catch (error) {
    console.error("Error fetching desarrolladores:", error);
    throw new Error("Could not fetch desarrolladores");
  }
};

const getAllDesarrolladoresByRol = async (
  rolId: number
): Promise<GetDesarrolladorDTO[] | []> => {
  try {
    return await DesarrolladorRepository.getDesarrolladoresByRol(rolId);
  } catch (error) {
    console.error("Error fetching desarrolladores:", error);
    throw new Error("Could not fetch desarrolladores");
  }
};

const deleteDesarrollador = async (devId: number): Promise<void> => {
  try {
    const desarrollador = await DesarrolladorRepository.getDesarrolladorById(
      devId
    );

    if (!desarrollador) {
      throw new Error("Desarrollador not found");
    }

    return await DesarrolladorRepository.deleteDesarrollador(devId);
  } catch (error) {
    console.error("Error deleting desarrollador:", error);
    throw new Error("Could not delete desarrollador");
  }
};

const updateDesarrollador = async (
  devId: number,
  updateDev: UpdateDesarrolladorDTO
): Promise<Desarrollador> => {
  try {
    if (updateDev.rol) {
      const rol = await RolService.getRolById(updateDev.rol.id);

      if (!rol) {
        throw new Error("Rol not found");
      }
    }
    const updated = await DesarrolladorRepository.updateDesarrollador(
      devId,
      updateDev
    );
    if (!updated) {
      throw new Error("Desarrollador not found");
    }
    return updated;
  } catch (error) {
    console.error("Error updating desarrollador:", error);
    throw new Error("Could not update desarrollador");
  }
};

export const DesarrolladorService = {
  createDesarrollador,
  getAllDesarrolladores,
  getAllDesarrolladoresByRol,
  getDesarrolladorById,
  deleteDesarrollador,
  updateDesarrollador,
  getDesarrolladoresByIds,
};
