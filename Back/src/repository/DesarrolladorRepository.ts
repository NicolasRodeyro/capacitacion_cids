import { In } from "typeorm";
import dataSource from "../data-source";
import {
  CreateDesarrolladorDTO,
  GetDesarrolladorDTO,
  UpdateDesarrolladorDTO,
} from "../dto/DesarrolladorDTO";
import { DesarrolladorEntity } from "../entity/DesarrolladorEntity";
import { Desarrollador } from "../model/Desarrollador";

const _desarrolladorRepo = dataSource.getRepository(DesarrolladorEntity);

const createDesarrollador = async (
  payload: CreateDesarrolladorDTO
): Promise<GetDesarrolladorDTO> => {
  try {
    const newDev = {
      ...payload,
      fechaActualizacion: new Date(),
    };
    
    return await _desarrolladorRepo.save(newDev);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDesarrolladorById = async (
  id: number
): Promise<GetDesarrolladorDTO | null> => {
  try {
    return await _desarrolladorRepo.findOne({
      where: { id },
      relations: {
        rol: true,
        proyectosResponsable: true,
        proyectos: true,
        tareas: true,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDesarrolladoresByIds = async (
  ids: number[]
): Promise<DesarrolladorEntity[]> => {
  try {
    return await _desarrolladorRepo.find({
      where: { id: In(ids) },
      relations: {
        rol: true,
        proyectosResponsable: true,
        proyectos: true,
        tareas: true,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDesarrolladoresByRol = async (
  rolId: number
): Promise<GetDesarrolladorDTO[]> => {
  try {
    return await _desarrolladorRepo
      .createQueryBuilder("desarrollador")
      .leftJoinAndSelect("desarrollador.rol", "rol")
      .where("rol.id = :rolId", { rolId })
      .getMany();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDesarrolladores = async (): Promise<GetDesarrolladorDTO[]> => {
  try {
    return await _desarrolladorRepo.find({
      relations: {
        rol: true,
        proyectosResponsable: true,
        proyectos: true,
        tareas: true,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteDesarrollador = async (id: number): Promise<void> => {
  try {
    await _desarrolladorRepo.delete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateDesarrollador = async (
  id: number,
  payload: UpdateDesarrolladorDTO
): Promise<Desarrollador | null> => {
  try {
    const desarrollador = await _desarrolladorRepo.findOne({
      where: { id },
      relations: {
        rol: true,
        proyectosResponsable: true,
        proyectos: true,
        tareas: true,
      },
    });

    if (!desarrollador) {
      return null;
    }

    Object.assign(desarrollador, payload);

    return _desarrolladorRepo.save(desarrollador);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const DesarrolladorRepository = {
  getDesarrolladorById,
  getDesarrolladores,
  createDesarrollador,
  getDesarrolladoresByRol,
  deleteDesarrollador,
  updateDesarrollador,
  getDesarrolladoresByIds,
};
