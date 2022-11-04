from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

# from django.urls import include, path
# from rest_framework import routers
# from apiv1 import views
#
# router = routers.DefaultRouter()
# router.register(r"questions", views.QuestionViewSet)
#
# urlpatterns = [
#     path("", include(router.urls)),
# ]


urlpatterns = [
    path("admin/", admin.site.urls),
    # path("api/v1/", include("apiv1.urls")),
    path("", include("apiv1.urls")),
    path("api-auth/", include("rest_framework.urls")),  # 追加
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.authtoken")),  # login logot
    path("auth/", include("djoser.urls.jwt")),  # create,refresh,verif jwt
]

if settings.DEBUG:
    import debug_toolbar

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
        path("__debug__/", include("debug_toolbar.urls")),
    ]
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)