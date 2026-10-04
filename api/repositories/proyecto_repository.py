"""Persistencia de proyectos en Supabase."""

from typing import Any

from supabase import Client


class ProyectoRepository:
    def __init__(self, client: Client, schema_name: str, table_name: str) -> None:
        self.client = client
        self.schema_name = schema_name
        self.table_name = table_name

    def _table(self):
        return self.client.schema(self.schema_name).table(self.table_name)

    def create(self, proyecto: dict[str, Any]) -> dict[str, Any] | None:
        response = self._table().insert(proyecto).select("*").execute()
        return response.data[0] if response.data else None

    def get_all(self) -> list[dict[str, Any]]:
        response = self._table().select("*").order("created_at", desc=True).execute()
        return response.data or []

    def get_by_id(self, proyecto_id: int) -> dict[str, Any] | None:
        response = self._table().select("*").eq("id", proyecto_id).maybe_single().execute()
        return response.data

    def update(self, proyecto_id: int, cambios: dict[str, Any]) -> dict[str, Any] | None:
        response = (
            self._table()
            .update(cambios)
            .eq("id", proyecto_id)
            .select("*")
            .execute()
        )
        return response.data[0] if response.data else None
