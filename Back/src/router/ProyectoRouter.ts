import { Router, Request, Response } from "express";
import { ProyectoController } from "../controller/ProyectoController";

const ProyectoRouter = Router();

ProyectoRouter.post("", (req: Request, res: Response) => {
  ProyectoController.createProyecto(req, res);
});

ProyectoRouter.get("/:id", (req: Request, res: Response) => {
  ProyectoController.getProyectoById(req, res);
});

ProyectoRouter.get("", (req: Request, res: Response) => {
  ProyectoController.getAllProyectos(req, res);
});

ProyectoRouter.put("/:id", (req: Request, res: Response) => {
  ProyectoController.updateProyecto(req, res);
});

ProyectoRouter.post(
  "/:id/desarrolladores/:desarrolladorId",
  (req: Request, res: Response) => {
    ProyectoController.assignDesarrolladorToProyecto(req, res);
  }
);

ProyectoRouter.delete(
  "/:id/desarrolladores/:desarrolladorId",
  (req: Request, res: Response) => {
    ProyectoController.unassignDesarrolladorFromProyecto(req, res);
  }
);

export default ProyectoRouter;
