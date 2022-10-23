from .base import *

DEBUG = True

INSTALLED_APPS += [
    "debug_toolbar",
    "drf_spectacular",
    "django_extensions",
]

REST_FRAMEWORK = {
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": (
        # "rest_framework.authentication.SessionAuthentication",
        # "rest_framework.authentication.BasicAuthentication"
        # "rest_framework.authentication.TokenAuthentication",
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
}
CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
    "http://0.0.0.0:3000",
]
ALLOWED_HOSTS = ["0.0.0.0", "127.0.0.1", "localhost"]


CORS_ALLOW_HEADERS = (
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "csrftoken",
    "x-requested-with",
    "access-control-allow-origin",
)


MIDDLEWARE += ["debug_toolbar.middleware.DebugToolbarMiddleware"]

# REST_FRAMEWORK  += {
# }