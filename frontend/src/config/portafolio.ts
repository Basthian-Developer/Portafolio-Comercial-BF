import type { Proyecto } from '../models/Proyecto';
import type { Plan } from '../models/Plan';

// Identidad y enlaces de contacto públicos del portafolio.
export const nombre = 'Basthian Flores';
export const correo = 'basthianfmillan@gmail.com';
export const redes = {
  instagram: 'https://www.instagram.com/basthian_flores?stkn=MW5xZzcxNnVzZzlzaQ==',
  linkedin: 'https://www.linkedin.com/in/basthian-f-1b895b2a3',
  correo: `mailto:${correo}`,
};

// Mensajes honestos para una etapa inicial de promoción, sin cifras inventadas.
export const estadisticas = [
  { valor: 'A medida', etiqueta: 'Soluciones' },
  { valor: 'Cercana', etiqueta: 'Atención' },
  { valor: 'Clara', etiqueta: 'Planificación' },
];

// Datos de ejemplo del template: reemplazar antes de publicar.
export const proyectos: Proyecto[] = [
      {
        titulo: "Tienda Online Sabores",
        descripcion: "E-commerce con carrito, pagos en línea y panel de administración de productos.",
        fondo: "linear-gradient(135deg, #0EA5E9, #14B8A6)",
        tecnologias: ["HTML", "CSS", "JavaScript"]
      },
      {
        titulo: "Sistema de Reservas Clínica",
        descripcion: "Agenda de citas con recordatorios automáticos y gestión de pacientes.",
        fondo: "linear-gradient(135deg, #14B8A6, #A7F3D0)",
        tecnologias: ["Node.js", "MySQL", "API REST"]
      },
      {
        titulo: "Landing Constructora Andes",
        descripcion: "Sitio corporativo optimizado para SEO que triplicó las consultas de clientes.",
        fondo: "linear-gradient(135deg, #38BDF8, #0EA5E9 60%, #0369A1)",
        tecnologias: ["SEO", "Responsive", "Formularios"]
      }
    ];

// Planificación comercial acordada. Pro no tiene un precio definitivo todavía.
export const planes: Plan[] = [
  {
    id: 1,
    nombre: 'Básico',
    descripcion: 'Una página para presentar tu negocio, servicio o producto. No requiere sistema de gestión ni almacenamiento de datos.',
    precio: 'Desde $95.000 CLP',
    detallePrecio: 'Incluye el desarrollo desde $85.000 CLP más $10.000 CLP por el nombre de dominio.',
    mantenimiento: '$15.000 CLP/mes',
    destacado: false,
    desgloseInversion: [
      { concepto: 'Nombre de dominio', monto: '$10.000 CLP' },
      { concepto: 'Diseño, desarrollo y publicación', monto: 'Desde $85.000 CLP' },
    ],
    beneficios: [
      'Diseño personalizado que se adapta a celulares, tablets y computadores',
      'Entrega del código del sitio y una guía para entenderlo',
      'Sitio publicado y listo para funcionar',
      'Alojamiento del sitio en GitHub Pages o Vercel, cuando el proyecto lo permita',
      'Revisión básica del funcionamiento y registro de errores',
    ],
  },
  {
    id: 2,
    nombre: 'Pro',
    descripcion: 'Un sistema web para negocios que necesitan gestionar información y tareas, además de mostrar sus servicios.',
    precio: '$300.000 CLP',
    detallePrecio: 'Precio relativo y conversable según el alcance final del proyecto.',
    mantenimiento: '$15.000 CLP/mes',
    destacado: true,
    desgloseInversion: [
      { concepto: 'Nombre de dominio', monto: '$10.000 CLP' },
      { concepto: 'Diseño y desarrollo del sistema', monto: '$290.000 CLP' },
    ],
    beneficios: [
      'Sitio y sistema que trabajan juntos, con almacenamiento de información',
      'Diseño personalizado que se adapta a celulares, tablets y computadores',
      'Acceso seguro con inicio de sesión y al menos un perfil administrador',
      'Herramientas para agregar, revisar, modificar y borrar información',
      'Entrega del código y una guía sobre cómo está construido el sistema',
      'Publicación del sistema, alojamiento y dominio incluidos',
      'Revisión básica del funcionamiento y registro de errores; copias de respaldo según el servicio de alojamiento',
    ],
  },
  {
    id: 3,
    nombre: 'Avanzado',
    descripcion: 'Para proyectos más complejos. Definimos las funciones y los servicios necesarios según lo que tu negocio necesita.',
    precio: 'Cotización personalizada',
    detallePrecio: 'El costo depende del alcance y de la infraestructura necesaria.',
    mantenimiento: 'Según proyecto',
    destacado: false,
    desgloseInversion: [
      { concepto: 'Nombre de dominio', monto: '$10.000 CLP' },
      { concepto: 'Diseño, desarrollo e infraestructura', monto: 'Según cotización' },
    ],
    beneficios: [
      'Sitio y sistema que trabajan juntos, con almacenamiento de información',
      'Diseño personalizado que se adapta a celulares, tablets y computadores',
      'Inicio de sesión, perfil administrador y herramientas para agregar, revisar, modificar y borrar información',
      'Procesos automáticos y tareas en segundo plano cuando el proyecto lo necesite',
      'Separación del sistema en servicios independientes cuando sea conveniente',
      'Seguimiento del funcionamiento, registro de errores y copias de respaldo',
      'Conexión con servicios en la nube de AWS o Azure, según el proyecto',
      'Entrega del código y documentación detallada del sistema',
      'Publicación del sistema, alojamiento y dominio incluidos',
    ],
  },
];

// Condiciones compartidas por los planes, visibles junto a las tarjetas.
export const condicionesComerciales = [
  'El pago se realiza al finalizar el desarrollo. La entrega definitiva se efectúa después del pago.',
  'Durante el desarrollo se permiten cambios dentro del alcance del plan. Los cambios posteriores a la entrega pueden cobrarse aparte.',
  'Puedes administrar tu propio dominio y hosting si lo prefieres.',
  'Puedes subir de plan con descuento; las condiciones se acuerdan según el proyecto.',
  'El código genérico puede reutilizarse sin exponer ni reutilizar datos, información privada o elementos propios del cliente.',
  'Se solicitará tu autorización antes de utilizar el proyecto o tu contacto como referencia comercial.',
];
