// Contrato mínimo que coincide con los campos obligatorios de portafolio.consulta.
export interface ConsultaPayload {
  nombre: string;
  correo: string;
  telefono: string;
  plan: number;
  problema: string;
}

const API_URL = (import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:8000/api' : '/api')).replace(/\/$/, '');

// La página delega el envío HTTP a esta capa, no al componente visual.
export async function crearConsulta(payload: ConsultaPayload): Promise<void> {
  const response = await fetch(`${API_URL}/consultas/crear`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('No fue posible enviar la consulta. Intenta nuevamente.');
  }
}
