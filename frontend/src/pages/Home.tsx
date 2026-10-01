import { ExternalLink, Mail } from 'lucide-react';
import { useCallback, useState } from 'react';
import Navbar from '../components/Navbar';
import ProyectoCard from '../components/ProyectoCard';
import PlanCard from '../components/PlanCard';
import ConsultaModal from '../components/ConsultaModal';
import { condicionesComerciales, estadisticas, nombre, planes, proyectos, redes } from '../config/portafolio';
import useRevelado from '../hooks/useRevelado';
import './Home.css';

function Home() {
  // Los datos estáticos no necesitan estado ni useMemo: se importan una sola vez.
  const contenido = useRevelado();
  const anioActual = new Date().getFullYear();
  const [planSeleccionado, setPlanSeleccionado] = useState<(typeof planes)[number] | null>(null);
  const cerrarModal = useCallback(() => setPlanSeleccionado(null), []);

  function seleccionarPlan(plan: (typeof planes)[number]) {
    setPlanSeleccionado(plan);
  }

  function cambiarPlan(idPlan: number) {
    const plan = planes.find((item) => item.id === idPlan);
    if (plan) setPlanSeleccionado(plan);
  }

  return (
    <>
      {/* Acceso directo para quienes navegan con teclado. */}
      <a href="#contenido" className="sr-only fixed top-2 left-2 z-[60] rounded-lg bg-fondo p-3 focus:not-sr-only">Saltar al contenido</a>
      <Navbar />
      <main id="contenido" ref={contenido} tabIndex={-1}>
        {/* Presentación principal y llamadas a las secciones de la misma página. */}
        <section id="inicio" className="pt-36 pb-20">
          <div className="mx-auto grid w-[92%] max-w-[1120px] items-center gap-12 min-[821px]:grid-cols-[1.15fr_0.85fr]">
            <div data-revelar>
              <span className="mb-5 inline-block rounded-full border border-borde bg-superficie px-3.5 py-1.5 text-sm font-semibold text-turquesa">● Disponible para nuevos proyectos</span>
              <h1 className="mb-5 text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.08] font-bold tracking-[-1.5px]">Soy Basthian Flores y creo sitios web que <span className="texto-degradado">venden por ti</span></h1>
              <p className="mb-8 max-w-[520px] text-lg text-texto-suave">Soy desarrollador web y consultor informático. Transformo tu negocio en una presencia digital rápida, moderna y lista para convertir visitas en clientes.</p>
              <div className="mb-10 flex flex-wrap gap-4">
                <a href="#planes" className="boton boton-principal">Ver planes</a>
                <a href="#proyectos" className="boton boton-borde">Mis proyectos</a>
              </div>
              {/* Cifras del template centralizadas en config/portafolio.ts. */}
              <dl className="flex flex-wrap gap-6 sm:gap-10">
                {estadisticas.map((estadistica) => (
                  <div key={estadistica.etiqueta} className="flex flex-col">
                    <dt className="order-2 text-sm text-texto-suave">{estadistica.etiqueta}</dt>
                    <dd className="texto-degradado text-3xl font-bold">{estadistica.valor}</dd>
                  </div>
                ))}
              </dl>
            </div>
            {/* Separar flotación y revelado evita que compitan por transform. */}
            <div data-revelar className="hidden min-w-0 min-[821px]:block" aria-hidden="true">
              <div className="ventana-codigo rounded-[18px] border border-borde bg-[#030c1e]/80 px-6 py-5 font-mono text-sm text-texto-suave shadow-[0_0_60px_rgba(14,165,233,0.25)]">
                <div className="mb-4 flex gap-1.5">
                  {[0, 1, 2].map((punto) => <span key={punto} className="size-2.5 rounded-full bg-linear-135 from-celeste to-turquesa opacity-80" />)}
                </div>
                <p><span className="text-celeste">const</span> desarrollador = {'{'}</p>
                <p className="pl-4">rol: <span className="text-turquesa">"Full Stack Web"</span>,</p>
                <p className="pl-4">enfoque: <span className="text-turquesa">"Resultados"</span>,</p>
                <p className="pl-4">entrega: <span className="text-turquesa">"Rápida y segura"</span>,</p>
                <p className="pl-4">soporte: <span className="text-turquesa">true</span></p>
                <p>{'};'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* React genera las tarjetas con map y claves estables, sin innerHTML. */}
        <section id="proyectos" aria-labelledby="titulo-proyectos" className="py-20">
          <div className="mx-auto w-[92%] max-w-[1120px]">
            <div data-revelar className="mx-auto mb-12 max-w-[620px] text-center">
              <h2 id="titulo-proyectos" className="mb-3 text-[clamp(1.9rem,4vw,2.6rem)] font-bold tracking-tight">Proyectos <span className="texto-degradado">destacados</span></h2>
              <p className="text-texto-suave">Algunos trabajos recientes que muestran cómo convierto ideas en soluciones reales.</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(290px,100%),1fr))] gap-6">
              {proyectos.map((proyecto) => <ProyectoCard key={proyecto.titulo} proyecto={proyecto} />)}
            </div>
          </div>
        </section>

        {/* Planes comerciales; sus textos se editan desde la configuración. */}
        <section id="planes" aria-labelledby="titulo-planes" className="py-20">
          <div className="mx-auto w-[92%] max-w-[1120px]">
            <div data-revelar className="mx-auto mb-12 max-w-[620px] text-center">
              <h2 id="titulo-planes" className="mb-3 text-[clamp(1.9rem,4vw,2.6rem)] font-bold tracking-tight">Planes de <span className="texto-degradado">desarrollo web</span></h2>
              <p className="text-texto-suave">Desde una web de presentación hasta un sistema a medida. Revisa el alcance y las condiciones de cada plan.</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(290px,100%),1fr))] gap-6">
              {planes.map((plan) => <PlanCard key={plan.nombre} plan={plan} onElegir={seleccionarPlan} />)}
            </div>
            <p className="mt-6 text-center text-sm text-texto-suave">Los precios son relativos y conversables según el alcance, la infraestructura y las necesidades de cada proyecto.</p>
            {/* Condiciones acordadas, centralizadas junto a los datos de los planes. */}
            <div className="mt-10 rounded-2xl border border-borde bg-superficie p-6 sm:p-8">
              <h3 className="mb-4 text-xl font-bold">Condiciones comerciales</h3>
              <ul className="list-disc space-y-3 pl-5 text-sm text-texto-suave">
                {condicionesComerciales.map((condicion) => <li key={condicion}>{condicion}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* Contacto externo: el enlace se construye sin efectos ni acceso al DOM. */}
        <section id="contacto" aria-labelledby="titulo-contacto" className="py-20">
          <div className="mx-auto w-[92%] max-w-[1120px]">
            <div data-revelar className="rounded-[26px] border border-borde bg-linear-135 from-celeste/18 to-turquesa/18 px-6 py-14 text-center">
              <h2 id="titulo-contacto" className="mb-3 text-[clamp(1.7rem,4vw,2.4rem)] font-bold">¿Listo para <span className="texto-degradado">empezar</span>?</h2>
              <p className="mb-6 text-texto-suave">Cuéntame tu idea y conversemos sobre la mejor solución para tu proyecto.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={redes.instagram} className="boton boton-principal" target="_blank" rel="noopener noreferrer"><ExternalLink size={18} aria-hidden="true" />Instagram<span className="sr-only"> (abre en otra pestaña)</span></a>
                <a href={redes.linkedin} className="boton boton-borde" target="_blank" rel="noopener noreferrer"><ExternalLink size={18} aria-hidden="true" />LinkedIn<span className="sr-only"> (abre en otra pestaña)</span></a>
                <a href={redes.correo} className="boton boton-borde"><Mail size={18} aria-hidden="true" />Correo electrónico</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      {planSeleccionado && <ConsultaModal planSeleccionado={planSeleccionado} planes={planes} onPlanChange={cambiarPlan} onClose={cerrarModal} />}
      {/* Año calculado en cada render; no hace falta un estado adicional. */}
      <footer className="px-4 py-10 text-center text-sm text-texto-suave">© {anioActual} {nombre}. Todos los derechos reservados.</footer>
    </>
  );
}

export default Home;
