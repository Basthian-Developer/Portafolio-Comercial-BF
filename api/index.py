"""Punto de entrada de la API.

Este archivo es el corazón de la aplicación: crea FastAPI, registra el
middleware global y conecta los routers. La lógica de negocio vive en las
capas internas, no en este módulo.
"""

import logging
import sys
from pathlib import Path

# Permite resolver core/, routes/ y el resto de capas desde Docker o Vercel.
API_DIR = Path(__file__).resolve().parent
if str(API_DIR) not in sys.path:
    sys.path.insert(0, str(API_DIR))

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from core.settings import API_PREFIX, APP_TITLE, APP_VERSION, CORS_ORIGINS
from routes.api_router import router as api_router

app = FastAPI(title=APP_TITLE, version=APP_VERSION)
logger = logging.getLogger(__name__)


@app.exception_handler(Exception)
async def unexpected_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Loguea fallos de infraestructura y conserva una respuesta JSON en Vercel."""
    logger.exception("Error no controlado atendiendo %s %s", request.method, request.url.path)
    return JSONResponse(
        status_code=500,
        content={
            "detail": "Error interno al procesar la solicitud",
            "error": str(exc),
            "type": type(exc).__name__,
        },
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# index.py solo ensambla la aplicación; las rutas se declaran en routes/.
app.include_router(api_router, prefix=API_PREFIX, tags=["API"])
