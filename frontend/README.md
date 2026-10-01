# Frontend del portafolio comercial

Frontend de React, TypeScript, Vite y Tailwind CSS para el portafolio comercial BF. `pages/Home.tsx` adapta el template HTML a React, con presentación, proyectos, planes y contacto. Los planes reflejan la planificación comercial acordada; los proyectos, estadísticas y contacto todavía conservan ejemplos del template.

## Estructura por capas

Inspirada en [CRM-Evolution](https://github.com/Basthian-Developer/CRM-Evolution/blob/main/documentacion/arquitectura.md):

```text
frontend/
├── public/                     # Archivos servidos directamente, como favicon.svg
├── src/
│   ├── assets/                 # Imágenes y recursos importados desde el código
│   ├── components/             # Elementos de interfaz reutilizables
│   ├── config/
│   │   └── dependencies/       # Composición de servicios y repositorios
│   ├── hooks/                  # Estado y coordinación de lógica con React
│   ├── models/                 # Tipos y entidades del dominio
│   ├── pages/
│   │   ├── Home.tsx            # Página comercial que compone las secciones
│   │   ├── Home.css            # Animaciones y borde degradado del plan destacado
│   │   └── views/              # Futuras vistas internas de las páginas
│   ├── repositories/
│   │   ├── interface/          # Contratos de acceso a datos
│   │   └── api/                # Futuras implementaciones HTTP
│   ├── router/                 # Futura configuración de navegación
│   ├── services/               # Casos de uso y reglas de negocio
│   ├── index.css               # Estilos globales
│   └── main.tsx                # Entrada de React; monta Home en StrictMode
├── index.html                  # Documento HTML y contenedor root
├── package.json                # Dependencias y comandos
├── package-lock.json           # Versiones de dependencias fijadas por npm
├── vite.config.ts              # Configuración de Vite y plugin de React
├── tsconfig*.json              # Configuración de TypeScript
├── eslint.config.js            # Reglas de análisis estático
└── .gitignore                  # Exclusiones de dependencias y compilación
```

Las carpetas sin implementación contienen `.gitkeep` para conservarlas en Git. Se puede retirar cada marcador al añadir código a su carpeta.

## Responsabilidades y dependencias

El flujo previsto cuando exista acceso a datos es:

```text
pages / views → hooks → services → repositories/interface
                                         ↑
                                  repositories/api
```

- `pages` compone pantallas; `pages/views` alberga vistas internas cuando sean necesarias. `components` contiene piezas visuales reutilizables que reciben datos y eventos por propiedades.
- `hooks` conecta el estado de React con los servicios y expone estados de carga, resultados y errores.
- `services` concentra reglas de negocio y depende de contratos de repositorios, sin importar componentes de React ni detalles HTTP.
- `models` define tipos compartidos del dominio, sin depender de la interfaz o del transporte.
- `repositories/interface` declara los contratos; `repositories/api` los implementará y concentrará las llamadas HTTP y la adaptación de respuestas.
- `config/dependencies` construirá repositorios y servicios para que los hooks puedan utilizarlos. `config` admite otras configuraciones compartidas cuando sean necesarias.
- `router` contendrá las rutas cuando se incorpore navegación.

La adaptación reserva repositorios API porque este proyecto ya tiene un backend FastAPI. No se añade la fuente JSON del CRM ni su configuración de React Query, pues todavía no existen esas necesidades aquí.

## Convenciones y estado actual

Usar PascalCase para componentes y modelos (`Home.tsx`), el prefijo `use` para hooks y nombres descriptivos para servicios y repositorios. Los estilos específicos de Home viven junto a la página y los globales en `index.css`.

`App.tsx` pasa a ser `pages/Home.tsx`; `main.tsx` importa y renderiza `Home` directamente. Los recursos visuales siguen en `assets`. Se usan imports relativos: no hay alias configurados.

La página usa `Navbar`, `ProyectoCard` y `PlanCard` desde `components`, los contratos `Proyecto` y `Plan` desde `models`, datos locales desde `config/portafolio.ts` y el hook `useRevelado` desde `hooks`. No hay router instalado, consultas HTTP, servicios ni inyección de dependencias funcionando todavía. No introducir llamadas HTTP directamente en páginas o componentes cuando se conecte la API.

## Instalación y comandos

Desde `frontend/`, con Node.js 22.12 o superior dentro de la rama 22 y npm:

```bash
npm ci
npm run dev
```

| Comando | Función |
| --- | --- |
| `npm run dev` | Inicia Vite en `0.0.0.0:3000`, accesible en `http://localhost:3000`. |
| `npm run lint` | Ejecuta ESLint. |
| `npm run build` | Comprueba TypeScript y genera `dist/`. |
| `npm run preview` | Sirve localmente la compilación de `dist/`. |

No hay un ejecutor de pruebas configurado. Tampoco hay variables de entorno ni proxy para la API definidos actualmente. Al incorporar HTTP, habrá que definir la URL del backend y revisar CORS para el origen utilizado.

El entorno Docker y el despliegue se describen en el [README raíz](../README.md). La documentación del backend está en [api/README.md](../api/README.md).

## Tailwind CSS con Vite

La integración ya está instalada. Para reproducir la instalación desde la raíz:

```bash
cd frontend
npm install -D tailwindcss @tailwindcss/vite
npm run dev
```

En un clon nuevo basta con `npm ci` para instalar las versiones del lockfile. Vite ya existía en el proyecto: no es necesario crear otra aplicación.

`vite.config.ts` registra `tailwindcss()` junto a `react()`. `src/index.css` importa `tailwindcss` y define la paleta con `@theme`. La integración utiliza Tailwind 4 y no necesita `tailwind.config.js`, `postcss.config.js` ni `npx tailwindcss init -p`. Referencia: [instalación oficial con Vite](https://tailwindcss.com/docs/installation/using-vite).

### Cómo se reparten los estilos

- Tailwind en los componentes: distribución, espaciados, tipografía, colores, responsive y estados hover.
- `index.css`: tokens, fondo global, foco accesible y estilos compartidos de botones mediante `@apply`.
- `pages/Home.css`: borde compuesto del plan destacado, flotación y entrada al hacer scroll.

El menú y la ventana de código cambian de presentación a los 821 px, como en el template. Las rejillas adaptan sus columnas al espacio disponible. El movimiento reducido desactiva animaciones y mantiene visible el contenido.

### Datos y lógica de React

Editar `config/portafolio.ts` para cambiar nombre, correo, enlaces de Instagram y LinkedIn, estadísticas, proyectos y planes. Los indicadores del hero son textos neutros porque el portafolio está en una etapa inicial de promoción. El contacto usa actualmente Instagram, LinkedIn y correo electrónico.

`Home` compone las secciones y genera tarjetas con `map`. Los componentes reciben propiedades tipadas y no acceden a la API. Los datos estáticos se mantienen fuera del render, por lo que no se necesita `useMemo` ni duplicarlos en `useState`.

`Navbar` usa `useState` para el menú y el fondo al desplazarse, `useRef` para devolver el foco al cerrar con Escape y `useEffect` para registrar y retirar listeners. El menú cierra al elegir un enlace y al pasar a escritorio.

`useRevelado` usa `useRef` para limitar la búsqueda a `main` y `useEffect` para observar elementos con `IntersectionObserver`. Desconecta el observador al desmontar; los elementos son visibles si no hay soporte o se solicita movimiento reducido. Los comentarios explican responsabilidades, estado, efectos y bloques de JSX.

### Planes comerciales acordados

- Básico: desde $85.000 CLP más el dominio, sin descontarlo de la tarifa base. Web sencilla sin backend ni base de datos; mantenimiento de $15.000 CLP/mes.
- Pro — Aplicación Web Completa: frontend, backend y base de datos, autenticación, rol administrador y CRUD. Precio aún por definir; mantenimiento de $15.000 CLP/mes.
- Avanzado: cotización y mantenimiento según proyecto; capacidades e infraestructura según requisitos.

`Plan` incluye precio de presentación, detalle del precio y mantenimiento. Las condiciones compartidas están en `condicionesComerciales` y se muestran debajo de las tarjetas. Para Básico se prioriza la aclaración posterior de que el dominio se cobra adicionalmente; Pro y Avanzado incluyen hosting y dominio sin inventar una duración contratada. Clouding.io se consideró para Pro, pero no hay infraestructura contratada ni configurada aquí.

La futura carga de estos tres planes como registros de `services` en Supabase y su administración desde React Native siguen pendientes. Actualmente son datos locales: editarlos requiere volver a compilar y desplegar el frontend.


### Envío de consultas

El modal de planes usa `services/ConsultaService.ts` para enviar `nombre`, `correo`, `telefono`, `plan` y `problema` mediante `POST /api/consultas/crear`. El plan visual tiene IDs locales `1` (Básico), `2` (Pro) y `3` (Avanzado), porque la columna `portafolio.consulta.plan` es `bigint`.

La URL base puede cambiarse con `VITE_API_URL`; en desarrollo usa `http://localhost:8000/api` y en producción usa `/api` en el mismo dominio. Los campos administrativos `plazo_inicio`, `plazo_final`, `prioridad` y `estado` no se envían desde el formulario.
