import { ExternalLink, GitFork } from 'lucide-react';
import type { Proyecto } from '../models/Proyecto';

interface ProyectoCardProps {
  proyecto: Proyecto;
}

const fondos = [
  'linear-gradient(135deg, #0EA5E9, #14B8A6)',
  'linear-gradient(135deg, #14B8A6, #A7F3D0)',
  'linear-gradient(135deg, #38BDF8, #0EA5E9 60%, #0369A1)',
];

// Tarjeta de presentación: recibe datos y no conoce su origen.
function ProyectoCard({ proyecto }: ProyectoCardProps) {
  return (
    <article data-revelar className="flex h-full w-full max-w-[350px] flex-col overflow-hidden rounded-[20px] border border-borde bg-superficie shadow-[0_12px_35px_rgba(0,0,0,0.16)] transition duration-300 hover:border-turquesa hover:shadow-[0_18px_45px_rgba(14,165,233,0.18)] motion-safe:hover:-translate-y-1.5">
      <div style={{ background: fondos[(proyecto.id - 1) % fondos.length] }} className="relative flex h-[170px] items-end p-5 text-xl font-bold text-tinta">
        <span className="absolute inset-0 bg-linear-to-t from-black/35 to-transparent" aria-hidden="true" />
        <span className="relative drop-shadow-sm">{proyecto.nombre || 'Proyecto sin nombre'}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-5 flex-1 text-[0.95rem] leading-relaxed text-texto-suave">{proyecto.descripcion || 'Sin descripción disponible.'}</p>
        {proyecto.tags && proyecto.tags.length > 0 && <ul className="mb-5 flex flex-wrap gap-2" aria-label="Tecnologías">
          {proyecto.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-borde px-2.5 py-1 text-xs text-celeste">{tag}</li>
          ))}
        </ul>}
        <div className="mt-auto grid grid-cols-2 gap-3">
          <a href={proyecto.github_url} target="_blank" rel="noopener noreferrer" className="boton boton-borde gap-2 px-3 py-2.5 text-sm">
            <GitFork size={16} aria-hidden="true" />GitHub<span className="sr-only"> (abre en otra pestaña)</span>
          </a>
          {proyecto.demo_url ? (
            <a href={proyecto.demo_url} target="_blank" rel="noopener noreferrer" className="boton boton-principal gap-2 px-3 py-2.5 text-sm">
              Demo<ExternalLink size={16} aria-hidden="true" /><span className="sr-only"> (abre en otra pestaña)</span>
            </a>
          ) : (
            <button type="button" disabled aria-disabled="true" className="boton cursor-not-allowed border-borde bg-superficie px-3 py-2.5 text-sm text-texto-suave opacity-50" title="Demo no disponible">
              Demo
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProyectoCard;
