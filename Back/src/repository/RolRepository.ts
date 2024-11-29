import dataSource from "../data-source";
import { CreateRolDTO, GetRolDTO } from "../dto/RolDTO";
import { RolEntity } from "../entity/RolEntity";

const _rolRepository = dataSource.getRepository(RolEntity);

const createRol = async (payload: CreateRolDTO): Promise<GetRolDTO> => {
  try {
    return await _rolRepository.save(payload);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getRoles = async (): Promise<GetRolDTO[]> => {
  try {
    return await _rolRepository.find();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getRolById = async (id: number): Promise<GetRolDTO | null> => {
  try {
    return await _rolRepository.findOne({ where: { id } });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const RolRepository = {
  getRoles,
  getRolById,
  createRol,
};
