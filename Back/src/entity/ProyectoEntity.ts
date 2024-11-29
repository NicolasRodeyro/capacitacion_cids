import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DesarrolladorEntity } from "./DesarrolladorEntity";
import { Proyecto } from "../model/Proyecto";
import { TareaEntity } from "./TareaEntity";

@Entity("proyectos")
export class ProyectoEntity implements Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column({ name: "fecha_inicio" })
  fechaInicio: Date;

  @Column({ name: "fecha_fin" })
  fechaFin: Date;

  @CreateDateColumn({ name: "fecha_creacion" })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: "fecha_actualizacion" })
  fechaActualizacion: Date;

  @ManyToOne(
    () => DesarrolladorEntity,
    (desarrollador) => desarrollador.proyectosResponsable
  )
  @JoinColumn({ name: "id_responsable" })
  responsable: DesarrolladorEntity;

  @ManyToMany(
    () => DesarrolladorEntity,
    (desarrollador) => desarrollador.proyectos
  )
  desarrolladores: DesarrolladorEntity[];

  @OneToMany(() => TareaEntity, (tarea) => tarea.proyecto)
  tareas: TareaEntity[];
}
