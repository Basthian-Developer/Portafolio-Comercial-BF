import { Check } from 'lucide-react';
import type { Plan } from '../models/Plan';

interface PlanCardProps {
  plan: Plan;
  onElegir: (plan: Plan) => void;
}

// El plan destacado comparte la misma estructura y solo cambia su presentación.
function PlanCard({ plan, onElegir }: PlanCardProps) {
  return (
    <article data-revelar className={`relative flex flex-col rounded-[22px] border border-borde bg-superficie px-7 py-8 transition-transform duration-300 motion-safe:hover:-translate-y-1.5 ${plan.destacado ? 'plan-destacado' : ''}`}>
      <h3 className="text-xl font-bold">{plan.nombre}</h3>
      <p className="mt-1 mb-5 text-[0.93rem] text-texto-suave">{plan.descripcion}</p>
      {/* El precio incluye su moneda solo si hay una tarifa definida. */}
      <p className="texto-degradado mb-2 text-3xl font-extrabold">{plan.precio}</p>
      <p className="mb-4 text-sm text-texto-suave">{plan.detallePrecio}</p>
      <p className="mb-5 text-sm"><span className="font-semibold">Mantenimiento:</span> {plan.mantenimiento}</p>
      {/* flex-1 alinea los botones aunque las listas tengan distinto tamaño. */}
      <ul className="mb-7 flex-1">
        {plan.beneficios.map((beneficio) => (
          <li key={beneficio} className="flex gap-3 py-1.5 text-[0.95rem] text-texto-suave"><Check size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-turquesa" />{beneficio}</li>
        ))}
      </ul>
      <button type="button" onClick={() => onElegir(plan)} className={`boton ${plan.destacado ? 'boton-principal' : 'boton-borde'}`}>Elegir plan {plan.nombre}</button>
    </article>
  );
}

export default PlanCard;
