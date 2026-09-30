import type { Proyecto } from '../models/Proyecto';
import type { Plan } from '../models/Plan';

// Identidad y contacto en un solo lugar. El teléfono aún es el ejemplo del template.
export const nombre = 'Basthian Flores';
export const numeroWhatsapp = '56900000000';
export const enlaceWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent('Hola, me interesa cotizar un proyecto web.')}`;

// Estas cifras son ilustrativas; deben sustituirse por información real.
export const estadisticas = [
  { valor: '30+', etiqueta: 'Proyectos' },
  { valor: '5 años', etiqueta: 'De experiencia' },
  { valor: '100%', etiqueta: 'Clientes felices' },
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
    nombre: 'Básico',
    descripcion: 'Web sencilla de una página, landing page o sitio de presentación. Sin backend ni base de datos.',
    precio: 'Desde $85.000 CLP',
    detallePrecio: 'Más el costo del dominio, que se suma a la tarifa base.',
    mantenimiento: '$15.000 CLP/mes',
    destacado: false,
    beneficios: [
      'Frontend con diseño personalizado y responsive',
      'Código fuente y documentación de entrega',
      'Despliegue y entrega funcionando',
      'Hosting en GitHub Pages o Vercel cuando el proyecto lo permita',
      'Monitoreo y logs básicos',
    ],
  },
  {
    nombre: 'Pro',
    descripcion: 'Sistema web completo para negocios que necesitan más que una página informativa.',
    precio: '$300.000 CLP',
    detallePrecio: 'Precio relativo y conversable según el alcance final del proyecto.',
    mantenimiento: '$15.000 CLP/mes',
    destacado: true,
    beneficios: [
      'Frontend, backend / API y base de datos',
      'Diseño personalizado y responsive',
      'Autenticación y al menos un rol administrador',
      'Operaciones CRUD: crear, consultar, editar y eliminar datos',
      'Código fuente y documentación técnica',
      'Despliegue, hosting y dominio incluidos',
      'Monitoreo y logs básicos; backups según hosting',
    ],
  },
  {
    nombre: 'Avanzado',
    descripcion: 'Sistema de mayor complejidad. La infraestructura y las capacidades se definen según los requisitos del proyecto.',
    precio: 'Cotización personalizada',
    detallePrecio: 'El costo depende del alcance y de la infraestructura necesaria.',
    mantenimiento: 'Según proyecto',
    destacado: false,
    beneficios: [
      'Frontend, backend / API y base de datos',
      'Diseño personalizado y responsive',
      'Autenticación, rol administrador y operaciones CRUD',
      'Redis, workers y colas según las necesidades',
      'Microservicios cuando corresponda',
      'Monitoreo, logs y backups',
      'Integraciones con AWS / Azure según el proyecto',
      'Código fuente y documentación extendida',
      'Despliegue, hosting y dominio incluidos',
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
