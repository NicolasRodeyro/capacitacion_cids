import { Router, Request, Response } from "express";
import { RolController } from "../controller/RolController";

const RolRouter = Router();

RolRouter.get("/:id", (req: Request, res: Response) => {
  RolController.getRolById(req, res);
});

RolRouter.get("", (req: Request, res: Response) => {
  RolController.getAllRoles(req, res);
});

// RolRouter.post("", (req: Request, res: Response) => {
//   RolController.createRol(req, res);
// });

// RolRouter.put("/:id", (req: Request, res: Response) => {
//   RolController.updateRol(req, res);
// });

export default RolRouter;
