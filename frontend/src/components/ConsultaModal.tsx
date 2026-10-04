import { CheckCircle2, Send, X } from 'lucide-react';
import { useEffect, useId, useState, type FormEvent } from 'react';
import type { Plan } from '../models/Plan';
import { crearConsulta } from '../services/ConsultaService';

interface ConsultaModalProps {
  planSeleccionado: Plan;
  planes: Plan[];
  onPlanChange: (id: number) => void;
  onClose: () => void;
}

// Modal de consulta dividido: datos mínimos a la izquierda y resumen del plan a la derecha.
function ConsultaModal({ planSeleccionado, planes, onPlanChange, onClose }: ConsultaModalProps) {
  const tituloId = useId();
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const [enviada, setEnviada] = useState(false);

  useEffect(() => {
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflowAnterior; };
  }, []);

  async function enviarConsulta(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const datos = new FormData(event.currentTarget);
    setEnviando(true);
    try {
      await crearConsulta({
        nombre: String(datos.get('nombre') ?? ''),
        correo: String(datos.get('correo') ?? ''),
        telefono: String(datos.get('telefono') ?? ''),
        plan: planSeleccionado.id,
        problema: String(datos.get('problema') ?? ''),
      });
      setEnviada(true);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'No fue posible enviar la consulta.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" role="presentation" onKeyDown={(event) => { if (event.key === 'Escape' && !enviando) onClose(); }} onMouseDown={(event) => { if (event.target === event.currentTarget && !enviando) onClose(); }}>
      <div role="dialog" aria-modal="true" aria-labelledby={tituloId} className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-borde bg-fondo-2 shadow-2xl">
        <div className="grid min-[760px]:grid-cols-2">
          <section className="p-6 sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div><p className="mb-1 text-sm font-semibold text-turquesa">Solicitar consulta</p><h2 id={tituloId} className="text-2xl font-bold">Cuéntame sobre tu proyecto</h2></div>
              <button type="button" onClick={onClose} disabled={enviando} className="rounded-full border border-borde px-3 py-1 text-xl leading-none text-texto-suave hover:text-texto disabled:opacity-50" aria-label="Cerrar formulario"><X size={19} aria-hidden="true" /></button>
            </div>
            {enviada ? <div role="status" className="rounded-2xl border border-turquesa/40 bg-turquesa/10 p-5"><h3 className="mb-2 flex items-center gap-2 text-xl font-bold"><CheckCircle2 className="text-turquesa" size={22} aria-hidden="true" />Consulta enviada</h3><p className="text-sm text-texto-suave">Recibí tus datos correctamente. Me pondré en contacto contigo para revisar el proyecto.</p><button type="button" onClick={onClose} className="boton boton-principal mt-5">Cerrar</button></div> : <form onSubmit={enviarConsulta} className="grid gap-4">
              <label className="grid gap-1.5 text-sm font-medium" htmlFor="nombre-cliente">Nombre<input id="nombre-cliente" name="nombre" required minLength={2} maxLength={120} autoComplete="name" className="rounded-xl border border-borde bg-superficie px-4 py-3 text-texto outline-none focus:border-turquesa" /></label>
              <label className="grid gap-1.5 text-sm font-medium" htmlFor="correo-cliente">Correo electrónico<input id="correo-cliente" name="correo" type="email" required minLength={5} maxLength={254} autoComplete="email" className="rounded-xl border border-borde bg-superficie px-4 py-3 text-texto outline-none focus:border-turquesa" /></label>
              <label className="grid gap-1.5 text-sm font-medium" htmlFor="telefono-cliente">Teléfono<input id="telefono-cliente" name="telefono" type="tel" required minLength={5} maxLength={40} autoComplete="tel" className="rounded-xl border border-borde bg-superficie px-4 py-3 text-texto outline-none focus:border-turquesa" /></label>
              <label className="grid gap-1.5 text-sm font-medium" htmlFor="plan-consulta">Plan de interés<select id="plan-consulta" name="plan" value={planSeleccionado.id} onChange={(event) => onPlanChange(Number(event.target.value))} className="rounded-xl border border-borde bg-fondo px-4 py-3 text-texto outline-none focus:border-turquesa">{planes.map((plan) => <option key={plan.id} value={plan.id}>{plan.nombre}</option>)}</select></label>
              <label className="grid gap-1.5 text-sm font-medium" htmlFor="problema-cliente">¿Qué problema necesitas resolver?<textarea id="problema-cliente" name="problema" required minLength={10} maxLength={3000} rows={4} className="resize-y rounded-xl border border-borde bg-superficie px-4 py-3 text-texto outline-none focus:border-turquesa" /></label>
              {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
              <button type="submit" disabled={enviando} className="boton boton-principal mt-2 w-full disabled:cursor-wait disabled:opacity-60">{enviando ? 'Enviando…' : <><Send size={17} aria-hidden="true" />Enviar consulta</>}</button>
            </form>}
          </section>
          <aside className="border-t border-borde bg-superficie p-6 sm:p-8 min-[760px]:border-t-0 min-[760px]:border-l">
            <p className="mb-2 text-sm font-semibold text-turquesa">Resumen de tu consulta</p><h3 className="text-2xl font-bold">Plan {planSeleccionado.nombre}</h3>
            <p className="mt-2 text-sm leading-relaxed text-texto-suave">{planSeleccionado.descripcion}</p>
            <div className="my-6 rounded-2xl border border-borde bg-fondo/60 p-5">
              <p className="text-sm text-texto-suave">Inversión total de referencia</p>
              <p className="mt-1 text-2xl font-extrabold texto-degradado">{planSeleccionado.precio}</p>
              <div className="mt-4 border-t border-borde pt-3">
                <p className="text-sm font-semibold">Desglose de la inversión</p>
                <ul className="mt-3 space-y-2 text-sm text-texto-suave">
                  {planSeleccionado.desgloseInversion.map((item) => <li key={item.concepto} className="flex justify-between gap-3"><span>{item.concepto}</span><span className="shrink-0 font-medium text-texto">{item.monto}</span></li>)}
                </ul>
              </div>
            </div>
            <p className="mb-3 text-sm font-semibold">¿Qué incluye el precio?</p>
            <p className="mb-4 text-sm leading-relaxed text-texto-suave">El precio cubre el dominio y los trabajos y servicios indicados para este plan. No se agregarán cobros por esos conceptos sin conversarlo contigo; cualquier servicio externo o necesidad adicional se acuerda antes.</p>
            <ul className="space-y-2 text-sm text-texto-suave">{planSeleccionado.beneficios.slice(0, 6).map((beneficio) => <li key={beneficio} className="flex gap-2"><span className="text-turquesa" aria-hidden="true">✓</span>{beneficio}</li>)}</ul>
            <p className="mt-6 border-t border-borde pt-4 text-xs leading-relaxed text-texto-suave">Los precios son relativos y conversables. La propuesta final se define después de conocer el alcance del proyecto.</p>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ConsultaModal;
