import { Request, Response, Router } from "express";
import { ProyectoService } from "../service/ProyectoService";

const createProyecto = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const proyectoData = req.body;

    const proyecto = await ProyectoService.createProyecto(proyectoData);
    return res.status(200).json(proyecto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllProyectos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const roles = await ProyectoService.getAllProyectos();
    return res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProyectoById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    const rol = await ProyectoService.getProyectoById(id);
    return res.status(200).json(rol);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProyecto = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    const updateData = req.body;
    const updatedProyecto = await ProyectoService.updateProyecto(
      id,
      updateData
    );
    return res
      .status(200)
      .json({ updatedProyecto, msg: "Proyecto updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const assignDesarrolladorToProyecto = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id, desarrolladorId } = req.params;
    const updatedProyecto = await ProyectoService.assignDesarrolladorToProyecto(
      +id,
      +desarrolladorId
    );
    return res
      .status(200)
      .json({ updatedProyecto, msg: "Desarolladores assigned successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const unassignDesarrolladorFromProyecto = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id, desarrolladorId } = req.params;
    const updatedProyecto =
      await ProyectoService.unassignDesarrolladorFromProyecto(
        +id,
        +desarrolladorId
      );
    return res
      .status(200)
      .json({ updatedProyecto, msg: "Desarolladores unassigned successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const ProyectoController = {
  getProyectoById,
  getAllProyectos,
  updateProyecto,
  assignDesarrolladorToProyecto,
  unassignDesarrolladorFromProyecto,
  createProyecto,
};
