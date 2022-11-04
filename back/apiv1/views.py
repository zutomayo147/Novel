from accounts.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import generics, permissions, renderers
from rest_framework import status, views, viewsets, generics, mixins
from django.shortcuts import get_object_or_404
from rest_framework.parsers import FormParser,MultiPartParser


from posts.models import Post, Tag, Comment, Like, Saved_post
from profiles.models import Profile
from .permissions import IsOwnerOrReadOnly

# from .serializers import SnippetSerializer, UserSerializer2
# from .serializers.snippet import SnippetSerializer
from .serializers.Post import *
from .serializers.User import *
from .serializers.Profile import *


# @api_view(["GET"])
# def api_root(request, format=None):
#     return Response(
#         {
#             "users": reverse("user-list", request=request, format=format),
#             "snippets": reverse("snippet-list", request=request, format=format),
#         }
#     )


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
    )


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileList(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
    )


class CommentListCreateAPIView(
    mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet
):
    lookup_field = "post__id"
    lookup_url_kwarg = "post_id"
    queryset = Comment.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = CommentSerializer

    def filter_queryset(self, queryset):
        filters = {self.lookup_field: self.kwargs[self.lookup_url_kwarg]}

        return queryset.filter(**filters)

    def create(self, request, book_id=None):
        print("post_id", post_id)
        book = get_object_or_404(Post, id=book_id)
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner=request.user, book=book)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CommentDestroyAPIView(mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Comment.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = CommentSerializer

    def destroy(self, request, pk):
        comment = get_object_or_404(Comment, pk=pk)

        comment.delete()

        return Response(None, status=status.HTTP_204_NO_CONTENT)


class ProfileViewSet(
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet
):
    queryset = Profile.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer

    def retrieve(self, request, username):

        profile = self.queryset.get(user__username=username)

        serializer = self.serializer_class(instance=profile)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, username):
        instance = get_object_or_404(Profile, user__username=username)

        serializer = self.serializer_class(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


class ProfileImageViewSet(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = Profile.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = ProfileImageSerializer
    parser_classes = [FormParser, MultiPartParser]

    def update(self, request, username):

        instance = get_object_or_404(Profile, user__username=username)

        serializer = self.serializer_class(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)