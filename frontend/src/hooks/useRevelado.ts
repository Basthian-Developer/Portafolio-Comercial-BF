import { useEffect, useRef } from 'react';

// Observa únicamente los elementos de la sección recibida, sin consultas globales.
function useRevelado() {
  const contenedor = useRef<HTMLElement>(null);

  useEffect(() => {
    const raiz = contenedor.current;
    if (!raiz) return;

    const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (movimientoReducido.matches || !('IntersectionObserver' in window)) return;

    // Cada elemento se revela una vez y deja de ser observado.
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.remove('revelar-pendiente');
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.15 });

    function observar(elemento: HTMLElement) {
      elemento.classList.add('revelar-pendiente');
      observador.observe(elemento);
    }

    raiz.querySelectorAll<HTMLElement>('[data-revelar]').forEach(observar);

    // Las tarjetas de proyectos aparecen después de la respuesta de la API.
    const cambios = new MutationObserver((mutaciones) => {
      mutaciones.forEach((mutacion) => mutacion.addedNodes.forEach((nodo) => {
        if (!(nodo instanceof HTMLElement)) return;
        if (nodo.matches('[data-revelar]')) observar(nodo);
        nodo.querySelectorAll<HTMLElement>('[data-revelar]').forEach(observar);
      }));
    });
    cambios.observe(raiz, { childList: true, subtree: true });

    return () => {
      cambios.disconnect();
      observador.disconnect();
      raiz.querySelectorAll<HTMLElement>('[data-revelar]').forEach((elemento) => elemento.classList.remove('revelar-pendiente'));
    };
  }, []);

  return contenedor;
}

export default useRevelado;
