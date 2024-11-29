import { Request, Response, Router } from "express";
import { RolService } from "../service/RolService";

const createRol = async (req: Request, res: Response): Promise<Response> => {
  try {
    const rolData = req.body;
    const newRol = await RolService.createRol(rolData);

    return res.status(200).json(newRol);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllRoles = async (req: Request, res: Response): Promise<Response> => {
  try {
    const roles = await RolService.getAllRoles();
    return res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getRolById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    const rol = await RolService.getRolById(id);
    return res.status(200).json(rol);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const updateRol = async (req: Request, res: Response): Promise<Response> => {
//   try {
//     const id = parseInt(req.params.id, 10);
//     const rolData = req.body;
//     const updatedRol = await rolService.updateRol(id, rolData);
//     return res.status(200).json({ msg: "Rol updated successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
export const RolController = {
  getRolById,
  getAllRoles,
  createRol,
};
