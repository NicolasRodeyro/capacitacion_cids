export type GetRolDTO = {
  id: number;
  nombre: string;
};

export type CreateRolDTO = {
  nombre: string;
};

export type UpdateRolDTO = {
  nombre?: string;
};
