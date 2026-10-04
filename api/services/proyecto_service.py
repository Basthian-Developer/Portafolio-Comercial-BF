"""Casos de uso para proyectos del portafolio."""

from repositories.proyecto_repository import ProyectoRepository
from schemas.proyecto import ProyectoCreate, ProyectoUpdate


class ProyectoService:
    def __init__(self, repository: ProyectoRepository) -> None:
        self.repository = repository

    def crear_proyecto(self, datos: ProyectoCreate) -> dict | None:
        return self.repository.create(datos.model_dump(exclude_unset=True))

    def listar_proyectos(self) -> list[dict]:
        return self.repository.get_all()

    def obtener_proyecto(self, proyecto_id: int) -> dict | None:
        return self.repository.get_by_id(proyecto_id)

    def editar_proyecto(self, proyecto_id: int, cambios: ProyectoUpdate) -> dict | None:
        return self.repository.update(proyecto_id, cambios.model_dump(exclude_unset=True))
