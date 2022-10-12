from pathlib import Path
from datetime import timedelta

# import environ
#
# env = environ.Env()
# env.read_env(".env")
# SECRET_KEY = env("SECRET_KEY")
SECRET_KEY = "django-insecure-hth*l1+m$4-kb%lk2#wkwn)0^_jzii&5)fs$u&^=&wcq@6mi4)"

BASE_DIR = Path(__file__).resolve().parent.parent


INSTALLED_APPS = [
    "snippets",
    "rest_framework",
    "rest_framework.authtoken",
    "django_filters",
    "djoser",
    "corsheaders",
    # "django-environ",
    "rest_framework_simplejwt",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages", "django.contrib.staticfiles",
]

ROOT_URLCONF = "tutorial.urls"

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

WSGI_APPLICATION = "tutorial.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# REST_FRAMEWORK = {
#     "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
#     "DEFAULT_PERMISSION_CLASSES": [
#         "rest_framework.permissions.IsAuthenticated",
#     ],
#     "DEFAULT_AUTHENTICATION_CLASSES": (
#         # "rest_framework.authentication.SessionAuthentication",
#         # "rest_framework.authentication.BasicAuthentication"
#         # "rest_framework.authentication.TokenAuthentication",
#         "rest_framework_simplejwt.authentication.JWTAuthentication",
#     ),
#     "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
#     "PAGE_SIZE": 10,
# }

# Configure the JWT settings
SIMPLE_JWT = {
    # "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "ACCESS_TOKEN_LIFETIME": timedelta(days=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=140),
    "ROTATE_REFRESH_TOKENS": True,
    # "BLACKLIST_AFTER_ROTATION": False,
    # 暗号のアルゴリズム設定
    "ALGORITHM": "HS256",
    # "SIGNING_KEY": SECRET_KEY,
    "VERIFYING_KEY": None,
    # "USER_ID_FIELD": "id",
    # "USER_ID_CLAIM": "user_id",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "AUTH_HEADER_TYPES": ("JWT",),
}

# DJOSER = {
# 'PASSWORD_RESET_CONFIRM_URL': '#/password/reset/confirm/{uid}/{token}',
# 'USERNAME_RESET_CONFIRM_URL': '#/username/reset/confirm/{uid}/{token}',
# 'ACTIVATION_URL': '#/activate/{uid}/{token}',
# 'SEND_ACTIVATION_EMAIL': True,
# 'SERIALIZERS': {},
# }
# LOGIN_URL = "/"

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


LANGUAGE_CODE = "en-us"

TIME_ZONE = "Asia/Tokyo"

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = "/static/"

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"