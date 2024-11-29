import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Estado } from "../model/Estado";
import { TareaEntity } from "./TareaEntity";

@Entity("estados")
export class EstadoEntity implements Estado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => TareaEntity, (tarea) => tarea.estado)
  tarea: TareaEntity;
}
