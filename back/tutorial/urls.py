from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),  # 追加
    path("", include("snippets.urls")),  # 追加
    # path("api/auth/", include("accounts.urls")),
    # path("api/v1/", include("apiv1.urls")),
    # path(r"^auth/", include("djoser.urls")),
    # path(r"^auth/", include("djoser.urls.authtoken")),
    # path(r"^auth/", include("djoser.urls.jwt")),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.authtoken")),  # login logot
    path("auth/", include("djoser.urls.jwt")),  # create,refresh,verif jwt
]

if settings.DEBUG:
    urlpatterns += [
        path("api/schema/", SpectacularAPIView.as_view(), name="schema"),  # 追加
        path(
            "api/schema/swagger-ui/",
            SpectacularSwaggerView.as_view(url_name="schema"),
            name="swagger-ui",
        ),  # 追加
        path(
            "api/schema/redoc/",
            SpectacularRedocView.as_view(url_name="schema"),
            name="redoc",
        ),  # 追加
    ]