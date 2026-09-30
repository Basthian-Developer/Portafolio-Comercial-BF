# Portafolio Comercial BF

Proyecto orientado a construir el portafolio comercial de Basthian Flores: una presentación de sus servicios, proyectos y experiencia profesional.

## Estado y alcance actual

El proyecto cuenta con una estructura base por capas y una primera página comercial adaptada de un template a React y Tailwind CSS. Incluye presentación, proyectos, planes y contacto. Los planes reflejan la planificación comercial acordada; los proyectos, estadísticas y contacto aún contienen datos de ejemplo. La API mantiene su base de FastAPI; la integración con datos y las funcionalidades de negocio se desarrollarán después.

La organización del frontend toma como referencia la [arquitectura de CRM-Evolution](https://github.com/Basthian-Developer/CRM-Evolution/blob/main/documentacion/arquitectura.md), adaptada a este proyecto.

## Organización

```text
Portafolio-Comercial-BF/
├── api/             # Base de FastAPI y documentación del backend
├── frontend/        # React + TypeScript + Vite + Tailwind, por capas
├── compose.yml      # Entorno de desarrollo con Node y Python
├── vercel.json      # Configuración de compilación y despliegue
└── README.md        # Objetivo y guía general
```

- [Frontend](frontend/README.md): estructura, responsabilidades de las capas, convenciones y comandos.
- [API](api/README.md): archivos, arranque, CORS y estado de las rutas.

## Desarrollo local

Para el frontend, usar Node.js 22.12 o superior dentro de la rama 22 y npm. Para reproducir el entorno Python del contenedor, usar Python 3.13.

Desde la raíz, iniciar el frontend:

```bash
cd frontend
npm ci
npm run dev
```

Disponible en `http://localhost:3000`. Para iniciar la API en otra terminal desde la raíz:

```bash
python3 -m venv /tmp/portafolio-bf-venv
source /tmp/portafolio-bf-venv/bin/activate
python -m pip install -r api/requirements.txt
python -m uvicorn index:app --app-dir api --reload --port 8000
```

La documentación de FastAPI está en `http://localhost:8000/docs`. El frontend todavía no consume la API.

### Con Docker Compose

```bash
docker compose up --build -d
docker compose exec dev npm ci
docker compose exec dev npm run dev
```

El servicio `py` inicia Uvicorn en el puerto 8000. El servicio `dev` permanece activo y requiere ejecutar Vite con el último comando; publica el puerto 3000. Para detener el entorno: `docker compose down`.

## Verificación y despliegue

```bash
cd frontend
npm run lint
npm run build
```

`vercel.json` ejecuta `npm ci` y la compilación dentro de `frontend`, publica `frontend/dist`, conserva el prefijo `/api/` y redirige las demás rutas a `index.html`. Esta configuración está preparada en el repositorio; no implica que el despliegue o la integración estén verificados.

## Licencia y uso

Este proyecto no es de uso libre.

El código está publicado solo para fines de demostración profesional.
No está permitido copiar, reutilizar, modificar o redistribuir este proyecto sin autorización previa.

Copyright © 2026 Basthian Flores. Todos los derechos reservados.
