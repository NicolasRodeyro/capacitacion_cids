import { DataSource } from "typeorm";
import "reflect-metadata";
import { EstadoEntity } from "./entity/EstadoEntity";
import { TareaEntity } from "./entity/TareaEntity";
import { RolEntity } from "./entity/RolEntity";
import { ProyectoEntity } from "./entity/ProyectoEntity";
import { DesarrolladorEntity } from "./entity/DesarrolladorEntity";

const dataSource = new DataSource({
  type: "postgres",
  host: "strikingly-cool-mullet.data-1.use1.tembo.io",
  port: 5432,
  username: "postgres",
  password: "tnxstXwXzubch6tZ",
  database: "postgres",
  entities: [
    DesarrolladorEntity,
    ProyectoEntity,
    RolEntity,
    TareaEntity,
    EstadoEntity,
  ],
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  logging: false,
});

export default dataSource;
