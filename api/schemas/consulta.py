"""Contratos Pydantic alineados con portafolio.consulta."""

from datetime import date, datetime

from pydantic import BaseModel, Field


class ConsultaCreate(BaseModel):
    """Únicamente los cinco campos que envía el formulario público."""

    nombre: str = Field(..., min_length=2, max_length=120)
    correo: str = Field(..., min_length=5, max_length=254)
    telefono: str = Field(..., min_length=5, max_length=40)
    plan: int = Field(..., ge=1)
    problema: str = Field(..., min_length=10, max_length=3000)


class ConsultaUpdate(BaseModel):
    """Campos editables; todos son opcionales para actualizaciones parciales."""

    nombre: str | None = Field(default=None, min_length=2, max_length=120)
    correo: str | None = Field(default=None, min_length=5, max_length=254)
    telefono: str | None = Field(default=None, min_length=5, max_length=40)
    plan: int | None = Field(default=None, ge=1)
    problema: str | None = Field(default=None, min_length=10, max_length=3000)
    plazo_inicio: date | None = None
    plazo_final: date | None = None
    prioridad: str | None = Field(default=None, max_length=40)
    estado: bool | None = None


class ConsultaRead(ConsultaCreate):
    """Fila completa devuelta por Supabase."""

    id: int
    created_at: datetime | None = None
    plazo_inicio: date | None = None
    plazo_final: date | None = None
    prioridad: str | None = None
    estado: bool | None = None
