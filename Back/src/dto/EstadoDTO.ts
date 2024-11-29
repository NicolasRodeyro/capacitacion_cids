export type GetEstadoDTO = {
  id: number;
  nombre: string;
};

export type CreateEstadoDTO = {
  nombre: string;
};

export type UpdateEstadoDTO = {
  nombre?: string;
};
