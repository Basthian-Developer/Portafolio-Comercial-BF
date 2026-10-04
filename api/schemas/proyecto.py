"""Contratos Pydantic alineados con portafolio.proyecto."""

from datetime import datetime

from pydantic import BaseModel, Field, field_validator


class ProyectoCreate(BaseModel):
    nombre: str | None = Field(default=None, max_length=255)
    descripcion: str | None = None
    tags: list[str] | None = None
    github_url: str = Field(..., min_length=1, max_length=2048)
    demo_url: str | None = Field(default=None, max_length=2048)
    destacado: bool | None = None
    estado: bool | None = None


class ProyectoUpdate(BaseModel):
    nombre: str | None = Field(default=None, max_length=255)
    descripcion: str | None = None
    tags: list[str] | None = None
    github_url: str | None = Field(default=None, min_length=1, max_length=2048)
    demo_url: str | None = Field(default=None, max_length=2048)
    destacado: bool | None = None
    estado: bool | None = None

    @field_validator("github_url", mode="before")
    @classmethod
    def github_url_no_puede_ser_nula(cls, value):
        if value is None:
            raise ValueError("github_url no puede ser nulo")
        return value


class ProyectoRead(BaseModel):
    id: int
    created_at: datetime
    nombre: str | None = None
    descripcion: str | None = None
    tags: list[str] | None = None
    github_url: str
    demo_url: str | None = None
    destacado: bool | None = None
    estado: bool | None = None
