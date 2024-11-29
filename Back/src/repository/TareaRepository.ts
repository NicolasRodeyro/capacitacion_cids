import dataSource from "../data-source";
import { CreateTareaDTO, GetTareaDTO } from "../dto/TareaDTO";
import { DesarrolladorEntity } from "../entity/DesarrolladorEntity";
import { EstadoEntity } from "../entity/EstadoEntity";
import { ProyectoEntity } from "../entity/ProyectoEntity";
import { TareaEntity } from "../entity/TareaEntity";
import { Tarea } from "../model/Tarea";

const _tareaRepository = dataSource.getRepository(TareaEntity);

const createTarea = async (payload: CreateTareaDTO): Promise<GetTareaDTO> => {
  try {
    const tarea = {
      ...payload,
      fechaActualizacion: new Date(),
      asignado: payload.asignado as DesarrolladorEntity,
      proyecto: payload.proyecto as ProyectoEntity,
      estado: payload.estado as EstadoEntity,
    };
    return await _tareaRepository.save(tarea);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTareas = async (): Promise<GetTareaDTO[]> => {
  try {
    return await _tareaRepository.find({
      relations: { proyecto: true, asignado: true, estado: true },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getTareaById = async (id: number): Promise<GetTareaDTO | null> => {
  try {
    return await _tareaRepository.findOne({
      where: { id },
      relations: { proyecto: true, asignado: true, estado: true },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const eliminarTarea = async (id: number): Promise<void> => {
  const tarea = await _tareaRepository.findOneBy({ id });
  if (!tarea) {
    throw new Error('Tarea no encontrada');
  }
  // Eliminar la tarea
  await _tareaRepository.remove(tarea);
};

export const TareaRepository = {
  getTareas,
  getTareaById,
  createTarea,
  eliminarTarea,
};
