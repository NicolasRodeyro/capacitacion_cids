import {
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { GetRolDTO } from "./RolDTO";
import { Rol } from "../model/Rol";

export class CreateDesarrolladorDTO {
  @IsNotEmpty({ message: "El nombre es obligatorio." })
  @IsString({ message: "El nombre debe ser un texto." })
  nombre: string;

  @IsNotEmpty({ message: "El correo es obligatorio." })
  @IsEmail({}, { message: "El correo debe ser un formato de correo válido." })
  correo: string;

  @IsNotEmpty({ message: "El rol es obligatorio." })
  @ValidateNested()
  rol: Rol;

  @IsNotEmpty({ message: "La fecha de contratación es obligatoria." })
  @IsDateString(
    {},
    { message: "La fecha de contratación debe ser un formato de fecha válido." }
  )
  fechaContratacion: Date;
}

export class GetDesarrolladorDTO {
  id: number;
  nombre: string;
  correo: string;
  rol: GetRolDTO;
  fechaContratacion: Date;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

export class UpdateDesarrolladorDTO {
  @IsOptional()
  @IsString({ message: "El nombre debe ser un texto." })
  nombre: string;

  @IsOptional()
  @IsEmail({}, { message: "El correo debe ser un formato de correo válido." })
  correo: string;

  @IsOptional()
  @ValidateNested()
  rol: Rol;

  @IsOptional()
  @IsDateString(
    {},
    { message: "La fecha de contratación debe ser un formato de fecha válido." }
  )
  fechaContratacion: Date;
}
