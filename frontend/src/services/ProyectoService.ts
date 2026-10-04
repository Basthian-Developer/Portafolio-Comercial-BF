// Contratos y llamadas HTTP para la tabla portafolio.proyecto.
import type { Proyecto } from '../models/Proyecto';

export type ProyectoApi = Proyecto;

export interface ProyectoPayload {
  nombre?: string | null;
  descripcion?: string | null;
  tags?: string[] | null;
  github_url: string;
  demo_url?: string | null;
  destacado?: boolean | null;
  estado?: boolean | null;
}

export type ProyectoUpdatePayload = Partial<ProyectoPayload>;

const API_URL = (import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:8000/api' : '/api')).replace(/\/$/, '');

async function solicitar<T>(ruta: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${ruta}`, init);
  if (!response.ok) {
    let detalle = '';
    try {
      const cuerpo = await response.json() as { detail?: unknown };
      detalle = typeof cuerpo.detail === 'string' ? cuerpo.detail : '';
    } catch {
      // Conserva el error HTTP genérico cuando el cuerpo no es JSON.
    }
    throw new Error(detalle || 'No fue posible procesar la solicitud de proyectos.');
  }
  return response.json() as Promise<T>;
}

export function obtenerProyectos(): Promise<Proyecto[]> {
  return solicitar('/proyectos/getall');
}

export function obtenerProyecto(id: number): Promise<Proyecto> {
  return solicitar(`/proyectos/getbyid/${id}`);
}

export function crearProyecto(payload: ProyectoPayload): Promise<Proyecto> {
  return solicitar('/proyectos/crear', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export function actualizarProyecto(id: number, payload: ProyectoUpdatePayload): Promise<Proyecto> {
  return solicitar(`/proyectos/editar/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
