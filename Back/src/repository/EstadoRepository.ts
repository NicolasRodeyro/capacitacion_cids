import dataSource from "../data-source";
import { CreateEstadoDTO, GetEstadoDTO } from "../dto/EstadoDTO";
import { EstadoEntity } from "../entity/EstadoEntity";

const _estadoRepository = dataSource.getRepository(EstadoEntity);

const createEstado = async (
  payload: CreateEstadoDTO
): Promise<GetEstadoDTO> => {
  try {
    return await _estadoRepository.save(payload);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getEstado = async (): Promise<GetEstadoDTO[]> => {
  try {
    return await _estadoRepository.find();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getEstadoById = async (id: number): Promise<GetEstadoDTO | null> => {
  try {
    return await _estadoRepository.findOne({ where: { id } });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const EstadoRepository = {
  getEstado,
  getEstadoById,
  createEstado,
};
