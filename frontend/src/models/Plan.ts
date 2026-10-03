// Contrato de un plan comercial; el precio permite una tarifa o un estado de cotización.
export interface Plan {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  detallePrecio: string;
  mantenimiento: string;
  destacado: boolean;
  beneficios: string[];
  desgloseInversion: { concepto: string; monto: string }[];
}
