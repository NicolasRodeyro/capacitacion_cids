import { Router, Request, Response } from "express";
import { TareaController } from "../controller/TareaController";

const TareaRouter = Router();

TareaRouter.get("/:id", (req: Request, res: Response) => {
  TareaController.getTareaById(req, res);
});

TareaRouter.get("", (req: Request, res: Response) => {
  TareaController.getAllTareas(req, res);
});

export default TareaRouter;
