// Representación de una fila de portafolio.proyecto.
export interface Proyecto {
  id: number;
  created_at: string;
  nombre: string | null;
  descripcion: string | null;
  tags: string[] | null;
  github_url: string;
  demo_url: string | null;
  destacado: boolean | null;
  estado: boolean | null;
}
