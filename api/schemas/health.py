"""Contratos de entrada y salida para las rutas de diagnóstico."""

from pydantic import BaseModel


class ApiResponse(BaseModel):
    respuesta: str


class HealthResponse(BaseModel):
    estado: str
    servicio: str
