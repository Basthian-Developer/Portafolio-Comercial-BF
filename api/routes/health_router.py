"""Rutas de disponibilidad y diagnóstico de la API."""

from fastapi import APIRouter

from repositories.health_repository import HealthRepository
from schemas.health import ApiResponse, HealthResponse
from services.health_service import HealthService

router = APIRouter(tags=["Health"])
health_service = HealthService(HealthRepository())


@router.get("/", response_model=ApiResponse, summary="Comprobar conexión")
def root() -> ApiResponse:
    return health_service.get_root_message()


@router.get("/health", response_model=HealthResponse, summary="Estado de la API")
def health() -> HealthResponse:
    return health_service.get_health()
