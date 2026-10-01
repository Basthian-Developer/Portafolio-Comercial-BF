"""Endpoints separados para administrar consultas comerciales."""

from fastapi import APIRouter, Depends, HTTPException, status

from core.settings import SUPABASE_CONSULTAS_TABLE, SUPABASE_SCHEMA
from core.supabase_client import get_supabase_client
from repositories.consulta_repository import ConsultaRepository
from schemas.consulta import ConsultaCreate, ConsultaRead, ConsultaUpdate
from services.consulta_service import ConsultaService

router = APIRouter(prefix="/consultas", tags=["Consultas"])


def get_consulta_service() -> ConsultaService:
    """Construye el servicio con sus dependencias de infraestructura."""
    repository = ConsultaRepository(get_supabase_client(), SUPABASE_SCHEMA, SUPABASE_CONSULTAS_TABLE)
    return ConsultaService(repository)


@router.post("/crear", response_model=ConsultaRead, status_code=status.HTTP_201_CREATED, summary="Crear consulta")
def create_consulta(datos: ConsultaCreate, service: ConsultaService = Depends(get_consulta_service)) -> ConsultaRead:
    return service.crear_consulta(datos)


@router.get("/getall", response_model=list[ConsultaRead], summary="Leer todas las consultas")
def get_all_consultas(service: ConsultaService = Depends(get_consulta_service)) -> list[ConsultaRead]:
    return service.listar_consultas()


@router.get("/getbyid/{consulta_id}", response_model=ConsultaRead, summary="Leer una consulta por ID")
def get_consulta_by_id(consulta_id: int, service: ConsultaService = Depends(get_consulta_service)) -> ConsultaRead:
    consulta = service.obtener_consulta(consulta_id)
    if consulta is None:
        raise HTTPException(status_code=404, detail="Consulta no encontrada")
    return consulta


@router.patch("/editar/{consulta_id}", response_model=ConsultaRead, summary="Editar una consulta")
def update_consulta(consulta_id: int, cambios: ConsultaUpdate, service: ConsultaService = Depends(get_consulta_service)) -> ConsultaRead:
    consulta = service.editar_consulta(consulta_id, cambios)
    if consulta is None:
        raise HTTPException(status_code=404, detail="Consulta no encontrada")
    return consulta


@router.patch("/desactivar/{consulta_id}", response_model=ConsultaRead, summary="Desactivar una consulta")
def deactivate_consulta(consulta_id: int, service: ConsultaService = Depends(get_consulta_service)) -> ConsultaRead:
    consulta = service.desactivar_consulta(consulta_id)
    if consulta is None:
        raise HTTPException(status_code=404, detail="Consulta no encontrada")
    return consulta
