export interface Ticket {
  id?: string;
  clienteId: string;
  asunto: string;
  descripcion?: string;
  estado: string;
  fecha_creacion: string;
  asignado_a: string;
}
