import express, { Express, json, Response, Request } from "express";
import { ROUTES } from "./routes";
import cors from "cors";
import "reflect-metadata";

const PORT = 3000;

const app: Express = express();

app.use(json());
app.use(cors({ origin: "http://localhost:4200" }));

ROUTES.forEach(({ router, path }) => {
  app.use(path, router);
});

export const initializeApp = () => {
  app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
  });
};
