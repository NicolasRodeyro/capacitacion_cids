import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DesarrolladorEntity } from "./DesarrolladorEntity";
import { Rol } from "../model/Rol";

@Entity("roles")
export class RolEntity implements Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => DesarrolladorEntity, (desarrollador) => desarrollador.rol)
  desarrollador: DesarrolladorEntity;
}
