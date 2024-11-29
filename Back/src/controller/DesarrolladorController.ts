import { Request, Response } from "express";
import { DesarrolladorService } from "../service/DesarrolladorService";
import { RolService } from "../service/RolService";

const createDesarrollador = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newDev = req.body;
    const desarrollador = await DesarrolladorService.createDesarrollador(
      newDev
    );
    return res.status(200).json(desarrollador);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getDesarrolladores = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // const { rolId } = req.query;
    // if (rolId) {
    //   console.log(rolId);
    //   const desarrolladores =
    //     await DesarrolladorService.getAllDesarrolladoresByRol(Number(rolId));
    //   return res.status(200).json(desarrolladores);
    // }
    const desarrolladores = await DesarrolladorService.getAllDesarrolladores();
    return res.status(200).json(desarrolladores);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getDesarrolladorById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const desarrollador = await DesarrolladorService.getDesarrolladorById(id);
    return res.status(200).json(desarrollador);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteDesarrollador = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedDev = await DesarrolladorService.deleteDesarrollador(id);
    return res
      .status(200)
      .send({ msg: "Desarrollador deleted successfully", deleted: deletedDev });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateDesarrollador = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updateData = req.body;
    const updatedDev = await DesarrolladorService.updateDesarrollador(
      id,
      updateData
    );
    return res.status(200).json({ msg: "Desarrollador updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const DesarrolladorController = {
  getDesarrolladores,
  getDesarrolladorById,
  createDesarrollador,
  deleteDesarrollador,
  updateDesarrollador,
};
