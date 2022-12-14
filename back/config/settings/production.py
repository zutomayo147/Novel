from .base import *

DEBUG = False

# INSTALLED_APPS += [
#     "debug_toolbar",
#     "drf_spectacular",
#     "django_extensions",
# ]

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


REST_FRAMEWORK = {
    # # "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    # "DEFAULT_PERMISSION_CLASSES": [
    #     "rest_framework.permissions.IsAuthenticated",
    # ],
    # "DEFAULT_AUTHENTICATION_CLASSES": (
    #     # "rest_framework.authentication.SessionAuthentication",
    #     # "rest_framework.authentication.BasicAuthentication"
    #     # "rest_framework.authentication.TokenAuthentication",
    #     "rest_framework_simplejwt.authentication.JWTAuthentication",
    # ),
    # "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    # "PAGE_SIZE": 10,
}

CORS_ORIGIN_WHITELIST = [
    #     "http://localhost:3000",
]


ALLOWED_HOSTS = [
    "example.com",
]