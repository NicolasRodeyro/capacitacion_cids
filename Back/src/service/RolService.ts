import dataSource from "../data-source";
import { CreateRolDTO, GetRolDTO, UpdateRolDTO } from "../dto/RolDTO";
import { RolEntity } from "../entity/RolEntity";
import { Rol } from "../model/Rol";
import { RolRepository } from "../repository/RolRepository";

const createRol = async (rolData: CreateRolDTO): Promise<GetRolDTO> => {
  try {
    return await RolRepository.createRol(rolData);
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw new Error("Could not fetch roles");
  }
};

const getRolById = async (id: number): Promise<GetRolDTO | null> => {
  try {
    return await RolRepository.getRolById(id);
  } catch (error) {
    console.error("Error fetching rol:", error);
    throw new Error("Could not fetch rol");
  }
};

const getAllRoles = async (): Promise<GetRolDTO[] | []> => {
  try {
    return await RolRepository.getRoles();
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw new Error("Could not fetch roles");
  }
};

// export class RolService {
//   private readonly rolDataSource = dataSource.getRepository(RolEntity);

//   async getRolByName(name: string): Promise<GetRolDTO> {
//     try {
//       const rol = await this.rolDataSource.findOne({ where: { nombre: name } });

//       if (!rol) {
//         throw new Error("Could not find rol");
//       }

//       return mapToRolDTO(rol);
//     } catch (error) {
//       console.error("Error fetching rol:", error);
//       throw new Error("Could not fetch rol");
//     }
//   }

//   async getRolById(rolId: number): Promise<GetRolDTO> {
//     try {
//       const rol = await this.rolDataSource.findOne({ where: { id: rolId } });

//       if (!rol) {
//         throw new Error("Could not find rol");
//       }

//       return mapToRolDTO(rol);
//     } catch (error) {
//       console.error("Error fetching rol:", error);
//       throw new Error("Could not fetch rol");
//     }
//   }

//   async getAllRoles(): Promise<GetRolDTO[] | []> {
//     try {
//       const roles = await this.rolDataSource.find();

//       return roles.map((rol) => mapToRolDTO(rol));
//     } catch (error) {
//       console.error("Error fetching roles:", error);
//       throw new Error("Could not fetch roles");
//     }
//   }

//   async createRol(rolData: CreateRolDTO): Promise<RolEntity> {
//     try {
//       const newRol = this.rolDataSource.create(rolData);

//       return this.rolDataSource.save(newRol);
//     } catch (error) {
//       console.error("Error fetching roles:", error);
//       throw new Error("Could not fetch roles");
//     }
//   }

//   async updateRol(rolId: number, rolData: UpdateRolDTO): Promise<void> {
//     try {
//       const result = await this.rolDataSource.update(rolId, rolData);

//       if (result.affected === 0) {
//         throw new Error("Rol not found");
//       }

//       console.log("Rol updated successfully");
//     } catch (error) {
//       console.error("Error fetching roles:", error);
//       throw new Error("Could not fetch roles");
//     }
//   }
// }

export const RolService = {
  getRolById,
  getAllRoles,
  createRol,
};
