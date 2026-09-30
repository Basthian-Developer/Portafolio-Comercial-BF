// Contrato de un plan comercial; el precio permite una tarifa o un estado de cotización.
export interface Plan {
  nombre: string;
  descripcion: string;
  precio: string;
  detallePrecio: string;
  mantenimiento: string;
  destacado: boolean;
  beneficios: string[];
}
