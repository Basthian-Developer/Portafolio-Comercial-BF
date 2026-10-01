import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Enlaces locales: esta página no necesita un router.
const enlaces = [
  { nombre: 'Inicio', destino: '#inicio' },
  { nombre: 'Proyectos', destino: '#proyectos' },
  { nombre: 'Planes', destino: '#planes' },
];

function Navbar() {
  // React controla el menú y el fondo; no se modifican clases manualmente.
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [conFondo, setConFondo] = useState(() => window.scrollY > 20);
  const botonMenu = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // El listener pasivo permite seguir desplazando la página sin bloquearla.
    function actualizarFondo() {
      setConFondo(window.scrollY > 20);
    }

    // Al volver a escritorio se descarta el estado del menú móvil.
    const escritorio = window.matchMedia('(min-width: 821px)');
    function cerrarEnEscritorio(event: MediaQueryListEvent) {
      if (event.matches) setMenuAbierto(false);
    }

    window.addEventListener('scroll', actualizarFondo, { passive: true });
    escritorio.addEventListener('change', cerrarEnEscritorio);
    // Limpieza necesaria al desmontar y durante las comprobaciones de StrictMode.
    return () => {
      window.removeEventListener('scroll', actualizarFondo);
      escritorio.removeEventListener('change', cerrarEnEscritorio);
    };
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${conFondo || menuAbierto ? 'border-borde bg-fondo/85 backdrop-blur-xl' : 'border-transparent'}`}>
      <nav aria-label="Navegación principal" className="mx-auto flex h-[70px] w-[92%] max-w-[1120px] items-center justify-between"
        onKeyDown={(event) => {
          // Escape cierra el desplegable y devuelve el foco al botón que lo abrió.
          if (event.key === 'Escape' && menuAbierto) {
            setMenuAbierto(false);
            botonMenu.current?.focus();
          }
        }}
      >
        <a href="#inicio" onClick={() => setMenuAbierto(false)} className="texto-degradado text-xl font-extrabold tracking-tight" aria-label="Basthian Flores, inicio">
          {'<Basthian />'}
        </a>
        {/* El botón comunica su estado y el menú al que pertenece. */}
        <button ref={botonMenu} type="button" aria-controls="menu-principal" aria-expanded={menuAbierto}
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuAbierto((abierto) => !abierto)}
          className="cursor-pointer rounded-[10px] border border-borde px-3 py-1.5 text-xl min-[821px]:hidden"
        >
          {menuAbierto ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
        </button>
        <ul id="menu-principal" className={`${menuAbierto ? 'flex' : 'hidden'} absolute inset-x-0 top-[70px] flex-col items-center gap-5 border-b border-borde bg-fondo/97 p-6 min-[821px]:static min-[821px]:flex min-[821px]:flex-row min-[821px]:gap-8 min-[821px]:border-0 min-[821px]:bg-transparent min-[821px]:p-0`}>
          {enlaces.map((enlace) => (
            <li key={enlace.destino}>
              <a href={enlace.destino} onClick={() => setMenuAbierto(false)} className="font-medium text-texto-suave transition-colors hover:text-texto">{enlace.nombre}</a>
            </li>
          ))}
          <li><a href="#contacto" onClick={() => setMenuAbierto(false)} className="boton boton-principal px-5 py-2">Contáctame</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
