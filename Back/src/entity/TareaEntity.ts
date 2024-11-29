import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DesarrolladorEntity } from "./DesarrolladorEntity";
import { ProyectoEntity } from "./ProyectoEntity";
import { EstadoEntity } from "./EstadoEntity";
import { Tarea } from "../model/Tarea";

@Entity("tareas")
export class TareaEntity implements Tarea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column({ name: "fecha_limite" })
  fechaLimite: Date;

  @CreateDateColumn({ name: "fecha_creacion" })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: "fecha_actualizacion" })
  fechaActualizacion: Date;

  @ManyToOne(() => DesarrolladorEntity, (desarrollador) => desarrollador.tareas)
  @JoinColumn({ name: "id_asignado" })
  asignado: DesarrolladorEntity;

  @ManyToOne(() => ProyectoEntity, (proyecto) => proyecto.tareas)
  @JoinColumn({ name: "id_proyecto" })
  proyecto: ProyectoEntity;

  @ManyToOne(() => EstadoEntity, (estado) => estado.tarea)
  @JoinColumn({ name: "id_estado" })
  estado: EstadoEntity;
}
