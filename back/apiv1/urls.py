from django.urls import path, include
from rest_framework import routers
from django.urls import path

# from apiv1.views import post, user, profile
from apiv1.views import post, user

router = routers.DefaultRouter()
router.register("post", post.PostViewSet)

urlpatterns = [
    path("", include(router.urls)),
    # path("post/edit/<title>", post.PostEdit.as_view(), name="edit"),
    # path(
    #     "profiles/<username>/",
    #     views.ProfileViewSet.as_view({"get": "retrieve", "post": "update"}),
    # ),
    path(
        "post/fork/<title>",
        post.ForkPost.as_view({"post": "create"}),
        name="fork",
    ),
    # path(
    #     "post/fork/",
    #     post.ForkPost.as_view({"post": "create"}),
    #     name="fork",
    # ),
    path("image/", post.ImageFileView.as_view(), name="images"),
    path("test/", post.Test.as_view({"post": "create"}), name="test"),
    path(
        "post/<post_id>/comments/",
        post.CommentListCreateAPIView.as_view({"post": "create", "get": "list"}),
    ),
    path("post/comments/<pk>/", post.CommentDestroyAPIView.as_view({"get": "destroy"})),
    # path("tags/", views.TagListAPIView.as_view({"get": "list"})),
    # path(
    #     "profiles/<userName>/",
    #     profile.ProfileViewSet.as_view({"get": "retrieve", "post": "update"}),
    # ),
    # path(
    #     "profiles/image/<userName>/",
    #     profile.ProfileImageViewSet.as_view({"post": "update"}),
    # ),
]