# API del portafolio comercial

Backend de FastAPI para el portafolio comercial BF. `index.py` es el punto de entrada y el ensamblador de la aplicación; las rutas, contratos, casos de uso y accesos a datos están separados por capas para que el backend pueda crecer sin concentrar toda la lógica en un solo archivo.

## Arquitectura

```text
api/
├── index.py                    # Corazón: crea FastAPI y registra middleware/routers
├── __init__.py                  # Marca api como paquete Python
├── core/
│   ├── settings.py             # Configuración central, CORS y Supabase
│   └── supabase_client.py      # Cliente Supabase diferido y reutilizable
├── routes/
│   ├── api_router.py           # Agregador de routers bajo /api
│   ├── health_router.py        # Diagnóstico y disponibilidad
│   └── consulta_router.py      # Rutas separadas de consultas
├── schemas/
│   ├── health.py               # Modelos Pydantic de diagnóstico
│   └── consulta.py             # Modelo del formulario comercial
├── services/
│   ├── health_service.py       # Caso de uso de diagnóstico
│   └── consulta_service.py     # Caso de uso para guardar consultas
├── repositories/
│   ├── health_repository.py    # Fuente del diagnóstico
│   └── consulta_repository.py  # Persistencia de consultas en Supabase
├── requirements.txt
└── dockerfile
```

El flujo de una petición es:

```text
cliente → routes → services → repositories
                    ↓
                 schemas
```

- `routes` traduce HTTP a llamadas de aplicación y define códigos, parámetros y respuestas.
- `services` contiene casos de uso; no debe conocer detalles de FastAPI ni de la base de datos.
- `repositories` concentra la lectura y escritura de datos. La implementación actual usa Supabase; se puede reemplazar por otra persistencia sin cambiar las rutas.
- `schemas` define los contratos JSON con Pydantic.
- `core` guarda configuración compartida.
- `index.py` permanece pequeño y funciona como composición de dependencias de la API.

La separación se aplica desde ahora al diagnóstico. Al agregar servicios comerciales, cada recurso puede tener su propio `routes`, `schemas`, `services` y `repositories`.

## Rutas actuales

| Método | Ruta | Uso | Respuesta |
| --- | --- | --- | --- |
| `GET` | `/api/` | Compatibilidad con el cliente Flutter y prueba rápida | `{"respuesta":"Funcionando API"}` |
| `GET` | `/api/health` | Comprobar disponibilidad del backend | `{"estado":"ok","servicio":"Portafolio Comercial BF API"}` |
| `POST` | `/api/consultas/crear` | Crear una consulta | `201` con la fila creada |
| `GET` | `/api/consultas/getall` | Leer todas las consultas | Lista de filas |
| `GET` | `/api/consultas/getbyid/{id}` | Obtener una consulta | Una fila o `404` |
| `PATCH` | `/api/consultas/editar/{id}` | Editar campos enviados | Fila actualizada |
| `PATCH` | `/api/consultas/desactivar/{id}` | Cambiar `estado` a `false` | Fila desactivada |
| `GET` | `/docs` | Swagger UI generado por FastAPI | Documentación interactiva |
| `GET` | `/redoc` | Documentación alternativa | ReDoc |

Todavía no hay autenticación ni rutas de clientes o servicios comerciales. La ruta de consultas ya persiste el formulario en Supabase; el frontend todavía debe conectarse a ella.

## Ejecución local

Desde la raíz, con Python 3.13:

```bash
python3 -m venv /tmp/portafolio-bf-venv
source /tmp/portafolio-bf-venv/bin/activate
python -m pip install -r api/requirements.txt
python -m uvicorn index:app --app-dir api --reload --port 8000
```

Pruebas rápidas:

```bash
curl http://localhost:8000/api/
curl http://localhost:8000/api/health
```

También se puede usar `docker compose up --build py` desde la raíz. El servicio publica el puerto 8000 y monta `api/` para recarga durante el desarrollo.

## CORS

`core/settings.py` permite los orígenes locales `3000`, `51802` y `58571`, usados por Vite y Flutter Web. Si Flutter cambia de puerto, debe añadirse su origen exacto a `CORS_ORIGINS` y reiniciarse Uvicorn.

CORS autoriza el origen del navegador, pero no crea autenticación ni una conexión de datos. En producción se deben declarar únicamente los dominios reales.

## Próxima ampliación

Para un recurso comercial nuevo, crear el contrato en `schemas`, el repositorio, el servicio y las rutas correspondientes. Después, importar ese router en `index.py` y montarlo con un prefijo explícito. Mantener `index.py` como ensamblador evita que las rutas acumulen lógica de negocio.

## Supabase y consultas

Las rutas `POST /api/consultas/crear`, `GET /api/consultas/getall` y `GET /api/consultas/getbyid/{id}` trabajan con la tabla `portafolio.consulta`. El cuerpo de creación es:

```json
{
  "nombre": "Cliente de prueba",
  "correo": "cliente@example.com",
  "telefono": "+56912345678",
  "plan": 2,
  "problema": "Necesito una aplicación para gestionar mis clientes."
}
```

Crea una fila en `portafolio.consulta`. El endpoint de creación recibe únicamente `nombre`, `correo`, `telefono`, `plan` y `problema`. Los campos opcionales `plazo_inicio`, `plazo_final`, `prioridad` y `estado` no se envían desde este formulario y quedan para el sistema administrativo.

La configuración se lee desde `SUPABASE_URL`, `SUPABASE_KEY`, `SUPABASE_SCHEMA` y opcionalmente `SUPABASE_CONSULTAS_TABLE`. Mientras no existan variables de entorno, se usan valores de prueba (`https://test-project.supabase.co`, `test-anon-key`) para que el servidor pueda arrancar; esos valores no permiten guardar datos reales. Copiar `.env.example` como `.env` y reemplazar los valores antes de conectar un proyecto real. `python-dotenv` carga ese archivo automáticamente al iniciar la API.

La tabla usada por el repositorio es la que ya tienes: `portafolio.consulta`. Su estructura esperada es:

```sql
create table portafolio.consulta (
  id bigint generated by default as identity primary key,
  nombre text not null,
  correo text not null,
  telefono text not null,
  plan bigint not null default 1,
  problema varchar not null,
  plazo_inicio date null,
  plazo_final date null,
  prioridad varchar null default 'Normal',
  estado boolean null default true,
  created_at timestamptz not null default now()
);
```

Las rutas requieren que la tabla exista y que la clave configurada tenga permisos de lectura e inserción. En esta etapa los endpoints de lectura están abiertos para pruebas en Postman; no uses esta configuración en producción. El frontend envía únicamente los cinco campos obligatorios; los valores opcionales quedan fuera de este flujo.

## Despliegue en Vercel

El proyecto utiliza `api/index.py` como función FastAPI y `frontend/dist` como salida estática. Vercel instala las dependencias desde `requirements.txt` en la raíz. En Project Settings → Environment Variables debes configurar `SUPABASE_URL`, `SUPABASE_KEY`, `SUPABASE_SCHEMA=portafolio` y `SUPABASE_CONSULTAS_TABLE=consulta` para Production, Preview y Development según corresponda. Nunca subas `api/.env`; está excluido por `.gitignore`.

El frontend usa `/api` automáticamente en producción, por lo que las peticiones permanecen en el mismo dominio. En desarrollo usa `http://localhost:8000/api`; `VITE_API_URL` permite sobrescribirlo. Vercel recomienda que una aplicación FastAPI exponga una instancia `app` en un entrypoint reconocido y que las dependencias estén en `requirements.txt`.
