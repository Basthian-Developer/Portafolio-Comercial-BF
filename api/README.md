# API del portafolio comercial

Base del backend con FastAPI. Su función futura será ofrecer los datos y operaciones que requiera el portafolio comercial. En esta etapa no hay persistencia, autenticación ni funcionalidades comerciales implementadas.

## Archivos

| Archivo | Responsabilidad |
| --- | --- |
| `index.py` | Crea la aplicación FastAPI, configura CORS y declara un APIRouter. |
| `requirements.txt` | Declara `fastapi` y `uvicorn[standard]`, sin fijar versiones. |
| `dockerfile` | Imagen Python 3.13 slim; instala dependencias y ejecuta Uvicorn con recarga. |
| `info.md` | Archivo previo vacío, sin instrucciones adicionales. |
| `README.md` | Guía de esta carpeta. |

La reorganización por capas se aplica únicamente al frontend. El backend conserva su estructura actual.

## Ejecución local

Desde la raíz del repositorio, con Python 3.13 para reproducir el entorno del contenedor:

```bash
python3 -m venv /tmp/portafolio-bf-venv
source /tmp/portafolio-bf-venv/bin/activate
python -m pip install -r api/requirements.txt
python -m uvicorn index:app --app-dir api --reload --port 8000
```

- Servidor: `http://localhost:8000`.
- Swagger UI: `http://localhost:8000/docs`.
- ReDoc: `http://localhost:8000/redoc`.
- Esquema OpenAPI: `http://localhost:8000/openapi.json`.

También se puede ejecutar `docker compose up --build py` desde la raíz. El servicio monta `api/` en `/app`, publica el puerto 8000 y ejecuta `uvicorn index:app --host 0.0.0.0 --port 8000 --reload`. La recarga está orientada al desarrollo.

## Aplicación, rutas y estado actual

`index.py` crea `app = FastAPI()` y un `APIRouter`, previsto para publicarse bajo `/api` con la etiqueta `API`. La función `root` declara una respuesta de diagnóstico:

```json
{"respuesta": "Funcionando API"}
```

**Pendiente detectado:** actualmente `app.include_router(router, ...)` aparece antes de `@router.get("/")`. FastAPI incorpora las rutas existentes al incluir el router, por lo que la ruta declarada después no queda registrada en la aplicación. No debe darse por operativo `GET /api/` con el orden actual. Cuando se aborde el backend, se debe incluir el router después de declarar sus endpoints. Esta preparación de estructura no modifica `index.py`.

## CORS e integración futura

Los orígenes permitidos actualmente son `http://localhost:3000` y `http://localhost:51802`. Se permiten credenciales y todos los métodos y encabezados.

El frontend todavía no realiza consultas al backend. Al conectarlo, sus repositorios de `frontend/src/repositories/api` deberán concentrar el acceso HTTP. Si se utiliza otro origen en desarrollo o producción, habrá que revisar la configuración CORS; permitir un origen no configura por sí mismo una conexión ni autentica solicitudes.

No se leen variables de entorno ni hay una base de datos configurada. No existe una suite de pruebas de API en el repositorio.

## Despliegue

La configuración de Vercel reside en [vercel.json](../vercel.json), que contiene reglas para `/api/` y funciones Python dentro de esta carpeta. El contenedor de desarrollo y esa configuración son mecanismos separados. El despliegue no se ha validado en esta etapa.

Consultar el [README raíz](../README.md) para el objetivo del proyecto y la [guía del frontend](../frontend/README.md) para sus capas.
