import dataSource from "../data-source";
import {
  CreateEstadoDTO,
  GetEstadoDTO,
  UpdateEstadoDTO,
} from "../dto/EstadoDTO";
import { EstadoEntity } from "../entity/EstadoEntity";
import { Estado } from "../model/Estado";
import { EstadoRepository } from "../repository/EstadoRepository";

const createEstado = async (
  rolData: CreateEstadoDTO
): Promise<GetEstadoDTO> => {
  try {
    return await EstadoRepository.createEstado(rolData);
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw new Error("Could not fetch roles");
  }
};

const getEstadoById = async (id: number): Promise<GetEstadoDTO | null> => {
  try {
    return await EstadoRepository.getEstadoById(id);
  } catch (error) {
    console.error("Error fetching rol:", error);
    throw new Error("Could not fetch rol");
  }
};

const getAllEstados = async (): Promise<GetEstadoDTO[] | []> => {
  try {
    return await EstadoRepository.getEstado();
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw new Error("Could not fetch roles");
  }
};

export const EstadoService = {
  getEstadoById,
  getAllEstados,
  createEstado,
};
