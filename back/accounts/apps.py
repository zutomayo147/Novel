from django.apps import AppConfig


class AccountsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "accounts"

    def ready(self):
        try:
            from . import signals
        except ImportError:
            raise Exception("Error: Cannot import accounts/signals")