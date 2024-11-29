import { Request, Response, Router } from "express";
import { EstadoService } from "../service/EstadoService";

const createEstado = async (req: Request, res: Response): Promise<Response> => {
  try {
    const rolData = req.body;
    const newEstado = await EstadoService.createEstado(rolData);

    return res.status(200).json(newEstado);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllEstadoes = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const roles = await EstadoService.getAllEstados();
    return res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getEstadoById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    const rol = await EstadoService.getEstadoById(id);
    return res.status(200).json(rol);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const EstadoController = {
  getEstadoById,
  getAllEstadoes,
  createEstado,
};
