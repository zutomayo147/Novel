from .base import *

DEBUG = True

INSTALLED_APPS += [
    "debug_toolbar",
    "drf_spectacular",
    "django_extensions",
]

# REST_FRAMEWORK = {
#     "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
#     "DEFAULT_PERMISSION_CLASSES": [
#         "rest_framework.permissions.IsAuthenticated",
#     ],
#     "DEFAULT_AUTHENTICATION_CLASSES": (
#         "rest_framework.authentication.SessionAuthentication",
#         "rest_framework.authentication.BasicAuthentication"
#         # "rest_framework.authentication.TokenAuthentication",
#         # "rest_framework_simplejwt.authentication.JWTAuthentication",
#     ),
#     "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
#     "PAGE_SIZE": 10,
# }

# REST_FRAMEWORK += {
#     "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
# }

CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
    "http://0.0.0.0:3000",
    # "localhost:3000",
    # "0.0.0.0:3000",
]
ALLOWED_HOSTS = ["0.0.0.0", "127.0.0.1", "localhost"]

# TEMPLATES += [
#     {
#         "BACKEND": "django.template.backends.django.DjangoTemplates",
#         "APP_DIRS": True,
#     }
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

if DEBUG:
    import socket  # only if you haven't already imported this

    hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())
    INTERNAL_IPS = [ip[: ip.rfind(".")] + ".1" for ip in ips] + [
        "127.0.0.1",
        "10.0.2.2",
        "0.0.0.0",
    ]
DEBUG_TOOLBAR_CONFIG = {
    "SHOW_TOOLBAR_CALLBACK": lambda request: True,
}