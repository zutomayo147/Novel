from django.urls import path, include
from rest_framework import routers
from django.urls import path

from apiv1 import views

router = routers.DefaultRouter()
# router.register("post", views.PostList)

# app_name = "apiv1"
urlpatterns = [
    path("", include(router.urls)),
    path("posts/", views.PostList.as_view(), name="post-list"),
    # path(
    #     "posts/<post_id>/comments/",
    #     views.CommentListCreateAPIView.as_view({"post": "create", "get": "list"}),
    # ),
    # path(
    #     "books/comments/<pk>/", views.CommentDestroyAPIView.as_view({"get": "destroy"})
    # ),
    # path("tags/", views.TagListAPIView.as_view({"get": "list"})),
    # path(
    #     "profiles/<username>/",
    #     views.ProfileViewSet.as_view({"get": "retrieve", "post": "update"}),
    # ),
    # path(
    #     "profiles/image/<username>/",
    #     views.ProfileImageViewSet.as_view({"post": "update"}),
    # ),
]