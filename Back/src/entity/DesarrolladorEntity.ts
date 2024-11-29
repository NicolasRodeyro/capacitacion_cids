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
import { RolEntity } from "./RolEntity";
import { ProyectoEntity } from "./ProyectoEntity";
import { Desarrollador } from "../model/Desarrollador";
import { TareaEntity } from "./TareaEntity";

@Entity("desarrolladores")
export class DesarrolladorEntity implements Desarrollador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @ManyToOne(() => RolEntity, (rol) => rol.desarrollador)
  @JoinColumn({ name: "id_rol" })
  rol: RolEntity;

  @Column({ name: "fecha_contratacion" })
  fechaContratacion: Date;

  @CreateDateColumn({ name: "fecha_creacion" })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: "fecha_actualizacion" })
  fechaActualizacion: Date;

  @ManyToMany(() => ProyectoEntity, (proyecto) => proyecto.desarrolladores)
  @JoinTable({
    name: "desarrollador_x_proyecto",
    joinColumn: { name: "id_desarrollador", referencedColumnName: "id" },
    inverseJoinColumn: { name: "id_proyecto", referencedColumnName: "id" },
  })
  proyectos: ProyectoEntity[];

  @OneToMany(() => ProyectoEntity, (proyecto) => proyecto.responsable)
  proyectosResponsable: ProyectoEntity[];

  @OneToMany(() => TareaEntity, (tarea) => tarea.asignado)
  tareas: TareaEntity[];
}
