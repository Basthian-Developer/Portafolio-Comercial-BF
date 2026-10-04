"""Configuración central de la aplicación FastAPI."""

import os
from pathlib import Path

from dotenv import load_dotenv

# Carga api/.env si existe; las variables del sistema mantienen prioridad.
load_dotenv(Path(__file__).resolve().parents[1] / ".env")

APP_TITLE = "Portafolio Comercial BF API"
APP_VERSION = "0.1.0"
API_PREFIX = "/api"

# Valores de prueba para que la aplicación pueda arrancar antes de configurar Supabase.
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://test-project.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "test-anon-key")
SUPABASE_SCHEMA = os.getenv("SUPABASE_SCHEMA", "portafolio")
SUPABASE_CONSULTAS_TABLE = os.getenv("SUPABASE_CONSULTAS_TABLE", "consulta")
SUPABASE_PROYECTOS_TABLE = os.getenv("SUPABASE_PROYECTOS_TABLE", "proyecto")

# Orígenes locales conocidos: Vite y Flutter Web.
CORS_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:59854",
]
