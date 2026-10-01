"""Casos de uso relacionados con la disponibilidad de la API."""

from repositories.health_repository import HealthRepository


class HealthService:
    def __init__(self, repository: HealthRepository) -> None:
        self.repository = repository

    def get_root_message(self) -> dict[str, str]:
        # Conserva la respuesta histórica que consume el cliente Flutter.
        return {"respuesta": "Funcionando API"}

    def get_health(self) -> dict[str, str]:
        return self.repository.get_status()
