"""Punto de entrada de la API.

Este archivo es el corazón de la aplicación: crea FastAPI, registra el
middleware global y conecta los routers. La lógica de negocio vive en las
capas internas, no en este módulo.
"""

import sys
from pathlib import Path

# Permite resolver core/, routes/ y el resto de capas desde Docker o Vercel.
API_DIR = Path(__file__).resolve().parent
if str(API_DIR) not in sys.path:
    sys.path.insert(0, str(API_DIR))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.settings import API_PREFIX, APP_TITLE, APP_VERSION, CORS_ORIGINS
from routes.api_router import router as api_router

app = FastAPI(title=APP_TITLE, version=APP_VERSION)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# index.py solo ensambla la aplicación; las rutas se declaran en routes/.
app.include_router(api_router, prefix=API_PREFIX, tags=["API"])
