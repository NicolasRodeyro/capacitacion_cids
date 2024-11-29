import { Request, Response, Router } from "express";
import { TareaService } from "../service/TareaService";

const createTarea = async (req: Request, res: Response): Promise<Response> => {
  try {
    const rolData = req.body;
    const newTarea = await TareaService.createTarea(rolData);

    return res.status(200).json(newTarea);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllTareas = async (req: Request, res: Response): Promise<Response> => {
  try {
    const roles = await TareaService.getAllTareas();
    return res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTareaById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    const rol = await TareaService.getTareaById(id);
    return res.status(200).json(rol);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const TareaController = {
  getTareaById,
  getAllTareas,
};
