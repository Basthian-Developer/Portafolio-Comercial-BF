"""Cliente único y diferido para Supabase."""

from functools import lru_cache

from supabase import Client, create_client

from core.settings import SUPABASE_KEY, SUPABASE_URL


@lru_cache(maxsize=1)
def get_supabase_client() -> Client:
    """Crea el cliente una sola vez, cuando una ruta realmente lo necesita."""
    return create_client(SUPABASE_URL, SUPABASE_KEY)
