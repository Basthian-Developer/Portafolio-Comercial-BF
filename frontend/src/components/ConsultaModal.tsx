import { useEffect, useId, type FormEvent } from 'react';
import type { Plan } from '../models/Plan';

interface ConsultaModalProps {
  planSeleccionado: Plan;
  planes: Plan[];
  onPlanChange: (nombre: string) => void;
  onClose: () => void;
}

// Modal de consulta: prepara el formulario para conectarlo a la API posteriormente.
function ConsultaModal({ planSeleccionado, planes, onPlanChange, onClose }: ConsultaModalProps) {
  const tituloId = useId();

  useEffect(() => {
    const overflowAnterior = document.body.style.overflow;
    const cerrarConEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', cerrarConEscape);
    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener('keydown', cerrarConEscape);
    };
  }, [onClose]);

  function enviarConsulta(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div role="dialog" aria-modal="true" aria-labelledby={tituloId} className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-borde bg-fondo-2 shadow-2xl">
        <div className="grid min-[760px]:grid-cols-2">
          <section className="p-6 sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div><p className="mb-1 text-sm font-semibold text-turquesa">Solicitar consulta</p><h2 id={tituloId} className="text-2xl font-bold">Cuéntame sobre tu proyecto</h2></div>
              <button type="button" onClick={onClose} className="rounded-full border border-borde px-3 py-1 text-xl leading-none text-texto-suave hover:text-texto" aria-label="Cerrar formulario">×</button>
            </div>
            <form onSubmit={enviarConsulta} className="grid gap-4">
              <label className="grid gap-1.5 text-sm font-medium" htmlFor="nombre-cliente">Nombre<input id="nombre-cliente" name="nombre" required autoComplete="name" className="rounded-xl border border-borde bg-superficie px-4 py-3 text-texto outline-none focus:border-turquesa" /></label>
              <label className="grid gap-1.5 text-sm font-medium" htmlFor="correo-cliente">Correo electrónico<input id="correo-cliente" name="correo" type="email" required autoComplete="email" className="rounded-xl border border-borde bg-superficie px-4 py-3 text-texto outline-none focus:border-turquesa" /></label>
              <label className="grid gap-1.5 text-sm font-medium" htmlFor="telefono-cliente">Teléfono<input id="telefono-cliente" name="telefono" type="tel" required autoComplete="tel" className="rounded-xl border border-borde bg-superficie px-4 py-3 text-texto outline-none focus:border-turquesa" /></label>
              <label className="grid gap-1.5 text-sm font-medium" htmlFor="plan-consulta">Plan de interés<select id="plan-consulta" name="plan" value={planSeleccionado.nombre} onChange={(event) => onPlanChange(event.target.value)} className="rounded-xl border border-borde bg-fondo px-4 py-3 text-texto outline-none focus:border-turquesa">{planes.map((plan) => <option key={plan.nombre} value={plan.nombre}>{plan.nombre}</option>)}</select></label>
              <label className="grid gap-1.5 text-sm font-medium" htmlFor="problema-cliente">¿Qué problema necesitas resolver?<textarea id="problema-cliente" name="problema" required rows={4} className="resize-y rounded-xl border border-borde bg-superficie px-4 py-3 text-texto outline-none focus:border-turquesa" /></label>
              <button type="submit" className="boton boton-principal mt-2 w-full">Enviar consulta</button>
            </form>
          </section>
          <aside className="border-t border-borde bg-superficie p-6 sm:p-8 min-[760px]:border-t-0 min-[760px]:border-l">
            <p className="mb-2 text-sm font-semibold text-turquesa">Resumen de tu consulta</p><h3 className="text-2xl font-bold">Plan {planSeleccionado.nombre}</h3>
            <p className="mt-2 text-sm leading-relaxed text-texto-suave">{planSeleccionado.descripcion}</p>
            <div className="my-6 rounded-2xl border border-borde bg-fondo/60 p-5"><p className="text-sm text-texto-suave">Referencia de inversión</p><p className="mt-1 text-3xl font-extrabold texto-degradado">{planSeleccionado.precio}</p><p className="mt-2 text-sm text-texto-suave">{planSeleccionado.detallePrecio}</p></div>
            <p className="mb-3 text-sm font-semibold">Incluye como referencia:</p><ul className="space-y-2 text-sm text-texto-suave">{planSeleccionado.beneficios.slice(0, 6).map((beneficio) => <li key={beneficio} className="flex gap-2"><span className="text-turquesa" aria-hidden="true">✓</span>{beneficio}</li>)}</ul>
            <p className="mt-6 border-t border-borde pt-4 text-xs leading-relaxed text-texto-suave">Los precios son relativos y conversables. La propuesta final se define después de conocer el alcance del proyecto.</p>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ConsultaModal;
