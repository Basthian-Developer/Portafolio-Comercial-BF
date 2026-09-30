import { useEffect, useRef } from 'react';

// Observa únicamente los elementos de la sección recibida, sin consultas globales.
function useRevelado() {
  const contenedor = useRef<HTMLElement>(null);

  useEffect(() => {
    const elementos = contenedor.current?.querySelectorAll<HTMLElement>('[data-revelar]');
    const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!elementos || movimientoReducido.matches || !('IntersectionObserver' in window)) return;

    // Cada elemento se revela una vez y deja de ser observado.
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.remove('revelar-pendiente');
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.15 });

    elementos.forEach((elemento) => {
      elemento.classList.add('revelar-pendiente');
      observador.observe(elemento);
    });

    // Si la preferencia cambia mientras la página está abierta, mostrar todo.
    function mostrarTodo() {
      if (!movimientoReducido.matches) return;
      observador.disconnect();
      elementos?.forEach((elemento) => elemento.classList.remove('revelar-pendiente'));
    }
    movimientoReducido.addEventListener('change', mostrarTodo);

    return () => {
      observador.disconnect();
      movimientoReducido.removeEventListener('change', mostrarTodo);
      elementos.forEach((elemento) => elemento.classList.remove('revelar-pendiente'));
    };
  }, []);

  return contenedor;
}

export default useRevelado;
