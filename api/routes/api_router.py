"""Router raíz que agrupa los routers de cada recurso de la API."""

from fastapi import APIRouter

from routes.consulta_router import router as consulta_router
from routes.health_router import router as health_router

router = APIRouter()

# Cada recurso mantiene sus endpoints en un módulo independiente.
router.include_router(health_router)
router.include_router(consulta_router)
