"""Persistencia de consultas en el schema portafolio de Supabase."""

from typing import Any

from supabase import Client


class ConsultaRepository:
    def __init__(self, client: Client, schema_name: str, table_name: str) -> None:
        self.client = client
        self.schema_name = schema_name
        self.table_name = table_name

    def _table(self):
        return self.client.schema(self.schema_name).table(self.table_name)

    def create(self, consulta: dict[str, Any]) -> dict[str, Any]:
        response = self._table().insert(consulta).execute()
        return response.data[0] if response.data else consulta

    def get_all(self) -> list[dict[str, Any]]:
        response = self._table().select("*").order("created_at", desc=True).execute()
        return response.data or []

    def get_by_id(self, consulta_id: int) -> dict[str, Any] | None:
        response = self._table().select("*").eq("id", consulta_id).maybe_single().execute()
        return response.data

    def update(self, consulta_id: int, cambios: dict[str, Any]) -> dict[str, Any] | None:
        response = self._table().update(cambios).eq("id", consulta_id).execute()
        return response.data[0] if response.data else None

    def deactivate(self, consulta_id: int) -> dict[str, Any] | None:
        """Marca una consulta como inactiva y devuelve la fila actualizada.

        ``select("*")`` solicita la representación actualizada a PostgREST.
        Sin esta selección, Supabase puede aplicar el cambio pero devolver
        ``data=[]``, haciendo que la ruta responda 404 de forma incorrecta.
        """
        response = (
            self._table()
            .update({"estado": False})
            .eq("id", consulta_id)
            .select("*")
            .execute()
        )
        return response.data[0] if response.data else None
