"""Casos de uso de consultas comerciales."""

from repositories.consulta_repository import ConsultaRepository
from schemas.consulta import ConsultaCreate, ConsultaUpdate


class ConsultaService:
    def __init__(self, repository: ConsultaRepository) -> None:
        self.repository = repository

    def crear_consulta(self, datos: ConsultaCreate) -> dict:
        return self.repository.create(datos.model_dump(exclude_none=True))

    def listar_consultas(self) -> list[dict]:
        return self.repository.get_all()

    def obtener_consulta(self, consulta_id: int) -> dict | None:
        return self.repository.get_by_id(consulta_id)

    def editar_consulta(self, consulta_id: int, cambios: ConsultaUpdate) -> dict | None:
        return self.repository.update(consulta_id, cambios.model_dump(exclude_unset=True))

    def desactivar_consulta(self, consulta_id: int) -> dict | None:
        return self.repository.deactivate(consulta_id)
