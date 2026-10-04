"""Endpoints CRUD de proyectos, sin eliminación."""

from fastapi import APIRouter, Depends, HTTPException, status

from core.settings import SUPABASE_PROYECTOS_TABLE, SUPABASE_SCHEMA
from core.supabase_client import get_supabase_client
from repositories.proyecto_repository import ProyectoRepository
from schemas.proyecto import ProyectoCreate, ProyectoRead, ProyectoUpdate
from services.proyecto_service import ProyectoService

router = APIRouter(prefix="/proyectos", tags=["Proyectos"])


def get_proyecto_service() -> ProyectoService:
    repository = ProyectoRepository(
        get_supabase_client(), SUPABASE_SCHEMA, SUPABASE_PROYECTOS_TABLE
    )
    return ProyectoService(repository)


@router.post("/crear", response_model=ProyectoRead, status_code=status.HTTP_201_CREATED, summary="Crear proyecto")
def create_proyecto(datos: ProyectoCreate, service: ProyectoService = Depends(get_proyecto_service)) -> ProyectoRead:
    proyecto = service.crear_proyecto(datos)
    if proyecto is None:
        raise HTTPException(status_code=500, detail="No fue posible crear el proyecto")
    return proyecto


@router.get("/getall", response_model=list[ProyectoRead], summary="Leer todos los proyectos")
def get_all_proyectos(service: ProyectoService = Depends(get_proyecto_service)) -> list[ProyectoRead]:
    return service.listar_proyectos()


@router.get("/getbyid/{proyecto_id}", response_model=ProyectoRead, summary="Leer proyecto por ID")
def get_proyecto_by_id(proyecto_id: int, service: ProyectoService = Depends(get_proyecto_service)) -> ProyectoRead:
    proyecto = service.obtener_proyecto(proyecto_id)
    if proyecto is None:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
    return proyecto


@router.put("/editar/{proyecto_id}", response_model=ProyectoRead, summary="Actualizar proyecto")
def update_proyecto(proyecto_id: int, cambios: ProyectoUpdate, service: ProyectoService = Depends(get_proyecto_service)) -> ProyectoRead:
    if not cambios.model_dump(exclude_unset=True):
        raise HTTPException(status_code=422, detail="Debes enviar al menos un campo para actualizar")
    proyecto = service.editar_proyecto(proyecto_id, cambios)
    if proyecto is None:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
    return proyecto
