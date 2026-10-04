import { useEffect, useState } from 'react';
import type { Proyecto } from '../models/Proyecto';
import { obtenerProyectos } from '../services/ProyectoService';

const MENSAJE_ERROR = 'No fue posible cargar los proyectos. Intenta nuevamente.';

function useProyectos() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let vigente = true;
    setCargando(true);
    setError('');

    obtenerProyectos()
      .then((resultado) => {
        if (vigente) setProyectos(resultado.filter((proyecto) => proyecto.destacado === true && proyecto.estado !== false));
      })
      .catch(() => {
        if (vigente) {
          setProyectos([]);
          setError(MENSAJE_ERROR);
        }
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });

    return () => { vigente = false; };
  }, [intento]);

  return {
    proyectos,
    cargando,
    error,
    reintentar: () => setIntento((actual) => actual + 1),
  };
}

export default useProyectos;
