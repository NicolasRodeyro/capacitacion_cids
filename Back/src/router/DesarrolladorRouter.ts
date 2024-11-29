import { Router, Request, Response, NextFunction } from "express";
import { DesarrolladorController } from "../controller/DesarrolladorController";
import { validateDto } from "../middleware/ValidateDTO";
import {
  CreateDesarrolladorDTO,
  UpdateDesarrolladorDTO,
} from "../dto/DesarrolladorDTO";

const DesarroladorRouter = Router();

DesarroladorRouter.post(
  "",
  validateDto(CreateDesarrolladorDTO),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await DesarrolladorController.createDesarrollador(req, res);
    } catch (error) {
      next(error);
    }
  }
);
DesarroladorRouter.get("", (req: Request, res: Response) => {
  DesarrolladorController.getDesarrolladores(req, res);
});
DesarroladorRouter.get("/:id", (req: Request, res: Response) => {
  DesarrolladorController.getDesarrolladorById(req, res);
});
DesarroladorRouter.put(
  "/:id",
  validateDto(UpdateDesarrolladorDTO),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await DesarrolladorController.updateDesarrollador(req, res);
    } catch (error) {
      next(error);
    }
  }
);
DesarroladorRouter.delete("/:id", (req: Request, res: Response) => {
  DesarrolladorController.deleteDesarrollador(req, res);
});

export default DesarroladorRouter;
