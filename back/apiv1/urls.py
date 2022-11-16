from django.urls import path, include
from rest_framework import routers
from django.urls import path

from apiv1.views import post, user, profile

router = routers.DefaultRouter()
# router.register("post", views.PostList)

# app_name = "apiv1"
urlpatterns = [
    path("", include(router.urls)),
    path("post/", post.NewPost.as_view(), name="test"),
    path("post/detail", post.PostDetail.as_view(), name="test"),
    path("post/edit/<post_title>", post.PostEdit.as_view(), name="edit"),
    path("image/", post.ImageFileView.as_view(), name="images"),
    path(
        "post/<post_id>/comments/",
        post.CommentListCreateAPIView.as_view({"post": "create", "get": "list"}),
    ),
    path("post/comments/<pk>/", post.CommentDestroyAPIView.as_view({"get": "destroy"})),
    # path("tags/", views.TagListAPIView.as_view({"get": "list"})),
    path(
        "profiles/<userName>/",
        profile.ProfileViewSet.as_view({"get": "retrieve", "post": "update"}),
    ),
    path(
        "profiles/image/<userName>/",
        profile.ProfileImageViewSet.as_view({"post": "update"}),
    ),
]