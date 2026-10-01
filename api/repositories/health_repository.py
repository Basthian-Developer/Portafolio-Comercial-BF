"""Acceso a la información básica del estado de la API.

Esta implementación es temporal y no depende de una base de datos. Cuando se
incorpore persistencia, las rutas seguirán usando el servicio y solo cambiará
esta capa.
"""


class HealthRepository:
    def get_status(self) -> dict[str, str]:
        return {
            "estado": "ok",
            "servicio": "Portafolio Comercial BF API",
        }
