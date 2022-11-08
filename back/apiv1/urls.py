from django.urls import path, include
from rest_framework import routers
from django.urls import path

from apiv1.views import post, user, profile

router = routers.DefaultRouter()
# router.register("post", views.PostList)

# app_name = "apiv1"
urlpatterns = [
    path("", include(router.urls)),
    path("test/", post.NewPost.as_view(), name="test"),
    path("post/", post.PostList.as_view(), name="post-list"),
    # path("myview/", post.MyView.as_view(), name="post-list"),
    # path("post/comment", views.CommentList.as_view(), name="comment-list"),
    path(
        "post/<post_id>/comments/",
        post.CommentListCreateAPIView.as_view({"post": "create", "get": "list"}),
    ),
    path("post/comments/<pk>/", post.CommentDestroyAPIView.as_view({"get": "destroy"})),
    # path("tags/", views.TagListAPIView.as_view({"get": "list"})),
    path(
        "profiles/<username>/",
        profile.ProfileViewSet.as_view({"get": "retrieve", "post": "update"}),
    ),
    path(
        "profiles/image/<username>/",
        profile.ProfileImageViewSet.as_view({"post": "update"}),
    ),
]