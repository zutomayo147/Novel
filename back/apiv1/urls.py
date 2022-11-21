from django.urls import path, include
from rest_framework import routers
from django.urls import path

from apiv1.views import post, user, profile

router = routers.DefaultRouter()
router.register("post", post.PostViewSet)
# router.register("post/<aa>", post.PostViewSet)
# router.register("post/fork/<originUser>/<originTitle>", post.ForkPost)
# router.register("post/fork", post.ForkPost)
# router.register("fork/<originUser>", post.ForkPost)
# router.register("fork/<title>/", post.ForkPost)
# router.register("post/detail", post.PostDetail)
# router.register("post/edit", post.PostEdit)

# app_name = "apiv1"
urlpatterns = [
    path("", include(router.urls)),
    # path("post/", post.PostViewSet, name="test"),
    # path("post/", post.PostViewSet.as_view(), name="test"),
    # path("post/detail", post.PostDetail.as_view(), name="test"),
    path("post/edit/<title>", post.PostEdit.as_view(), name="edit"),
    # path(
    #     "profiles/<username>/",
    #     views.ProfileViewSet.as_view({"get": "retrieve", "post": "update"}),
    # ),
    path(
        "fork/<title>",
        post.ForkPost.as_view({"post": "create"}),
        name="fork",
    ),
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