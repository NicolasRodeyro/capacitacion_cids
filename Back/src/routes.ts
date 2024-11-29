import { Ruta } from "./model/Ruta";
import DesarroladorRouter from "./router/DesarrolladorRouter";
import ProyectoRouter from "./router/ProyectoRouter";
import RolRouter from "./router/RolRouter";
import TareaRouter from "./router/TareaRouter";

export const ROUTES: Ruta[] = [
  {
    path: "/desarrolladores",
    router: DesarroladorRouter,
  },
  {
    path: "/roles",
    router: RolRouter,
  },
  {
    path: "/tareas",
    router: TareaRouter,
  },
  {
    path: "/proyectos",
    router: ProyectoRouter,
  },
];
