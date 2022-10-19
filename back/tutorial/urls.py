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
    path("api-auth/", include("rest_framework.urls")),
    path("", include("snippets.urls")),
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
        path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
        path(
            "api/schema/swagger-ui/",
            SpectacularSwaggerView.as_view(url_name="schema"),
            name="swagger-ui",
        ),
        path(
            "api/schema/redoc/",
            SpectacularRedocView.as_view(url_name="schema"),
            name="redoc",
        ),
    ]
    import debug_toolbar

    urlpatterns += [
        path("__debug__/", include(debug_toolbar.urls)),
    ]