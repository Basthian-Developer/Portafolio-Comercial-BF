import type { Proyecto } from '../models/Proyecto';

interface ProyectoCardProps {
  proyecto: Proyecto;
}

// Tarjeta de presentación: recibe datos y no conoce su origen.
function ProyectoCard({ proyecto }: ProyectoCardProps) {
  return (
    <article data-revelar className="overflow-hidden rounded-[20px] border border-borde bg-superficie transition-transform duration-300 hover:border-turquesa motion-safe:hover:-translate-y-1.5">
      {/* El degradado viene de los datos; el resto del diseño usa Tailwind. */}
      <div style={{ background: proyecto.fondo }} className="flex h-[170px] items-end p-4 text-lg font-bold text-tinta" aria-hidden="true">{proyecto.titulo}</div>
      <div className="p-5">
        <h3 className="mb-1 font-bold">{proyecto.titulo}</h3>
        <p className="mb-4 text-[0.95rem] text-texto-suave">{proyecto.descripcion}</p>
        <ul className="flex flex-wrap gap-2" aria-label="Tecnologías">
          {proyecto.tecnologias.map((tecnologia) => (
            <li key={tecnologia} className="rounded-full border border-borde px-2.5 py-1 text-xs text-celeste">{tecnologia}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default ProyectoCard;
