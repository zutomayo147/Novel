from django.conf import settings

# from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import get_object_or_404

# from django.views import View
from rest_framework.response import Response

# from rest_framework.reverse import reverse
from rest_framework import generics, permissions, mixins
from rest_framework import status, views, viewsets, mixins
from rest_framework.generics import GenericAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from rest_framework.exceptions import ParseError

from posts.models import Post, Tag, Comment, Like, Saved_post

from apiv1.permissions import IsOwnerOrReadOnly
from apiv1.serializers.Post import *
from apiv1.serializers.CustomUser import *

import os
from pathlib import Path

# import subprocess
# import git

from .gitFunction import *

os.environ["GIT_PYTHON_REFRESH"] = "quiet"
os.environ["GIT_PYTHON_GIT_EXECUTABLE"] = "/usr/bin/git"


# LoginRequiredMixin
class PostViewSet(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    # mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # ordering = ('id', 'username',)

    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def create(self, request, *args):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        # print(args[0])

        userName = str(request.user)
        title = request.data["title"]
        content = request.data["content"]

        gitInit(userName, title, content)
        serializer.save(owner=request.user)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

        # TODO reverse

    # def list(self, request, userName):
    #     # instance = get_object_or_404(Profile, user__username=username)
    #     queryset = self.queryset.get(userName=userName)
    #     # filterset = PostFilter(request.query_params, queryset=self.queryset)
    #     if not queryset.is_valid():
    #         raise ValidationError(queryset.errors)
    #
    #     page = self.paginate_queryset(queryset.qs)
    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)
    #
    #     serializer = self.get_serializer(queryset.qs, many=True)
    #     return Response(serializer.data)

    def retrieve(self, request, pk):
        # def retrieve(self, request, title, userName):

        # post = get_object_or_404(Post, title=title userName = userName)
        post = get_object_or_404(Post, pk=pk)
        serializer = self.serializer_class(instance=post)

        return Response(serializer.data, status=status.HTTP_200_OK)

    # def update(self, request, pk):
    #     instance = get_object_or_404(Post, pk=pk)
    #     serializer = self.serializer_class(instance, data=request.data, partial=True)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        post.delete()

        return Response(None, status=status.HTTP_204_NO_CONTENT)


class PostEdit(
    generics.RetrieveUpdateDestroyAPIView,
    # viewsets.GenericViewSet,
):
    # post_content = get_object_or_404(Post, id=book_id)
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
    )
    # product = Post.objects.get(id=product_id)
    # blockusers = BlockUser.objects.filter(from_user=request.user.id, to_user=pk)
    def update(self, request, title):
        instance = get_object_or_404(Post, title=title)
        # serializer = self.serializer_class(instance, data=request.data, partial=True)
        serializer = self.serializer_class(instance, data=request.data)
        userName = str(request.user)
        print(title)

        title = request.data["title"]
        content = request.data["content"]
        gitInit(userName, title, content)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


# class AuthenticatedUser(APIView):
# class ForkPost(APIView):
#     # authentication_classes = [JWTAuthentication]
#     # permission_classes = [IsAuthenticated]
#
#     def post(self, request, originUser, originTitle):
#         data = UserSerializer(request.user).data
#         data["permissions"] = [p["name"] for p in data["role"]["permissions"]]
#         return Response({"data": data})


class ForkPost(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    # mixins.ListModelMixin,
    # mixins.RetrieveModelMixin,
    # mixins.UpdateModelMixin,
    # mixins.DestroyModelMixin,
):
    queryset = Post.objects.all()
    serializer_class = PostForkSerializer
    # permission_classes = (
    #     permissions.IsAuthenticatedOrReadOnly,
    #     # IsOwnerOrReadOnly,
    # )

    # @api_view(['POST'])
    # def create(self, request, originUser, originTitle):
    # def create(self, request):
    # def create(self, request, originUser, originTitle):
    # def create(self, request, originUser):
    # def create(self, request):
    def create(self, request, title):
        #  queryset = self.queryset.get(userName=userName)
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        # print(1)
        # print(originUser)
        # print(originTitle)

        doForkUser = str(request.user)
        # title = request.data["title"]
        originTitle = title
        content = request.data["content"]
        originUser = request.data["originUser"]
        # gitInit(userName, title, content)
        originContent = cloneOriginalPost(originUser, originTitle, doForkUser)
        # serializer.save(owner=request.user, content=originContent)
        serializer.save(owner=request.user)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # def create(self, request):
    #     serializer = self.serializer_class(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #
    #     userName = str(request.user)
    #     title = request.data["title"]
    #     content = request.data["content"]
    #
    #     gitInit(userName, title, content)
    #     serializer.save(owner=request.user)
    #
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)

    # post_content = get_object_or_404(Post, id=book_id)
    # queryset = Post.objects.all()
    # serializer_class = PostSerializer
    # permission_classes = (
    #     permissions.IsAuthenticatedOrReadOnly,
    #     IsOwnerOrReadOnly,
    # )
    # # product = Post.objects.get(id=product_id)
    # # blockusers = BlockUser.objects.filter(from_user=request.user.id, to_user=pk)
    # def update(self, request, post_title):
    #     instance = get_object_or_404(Post, post_title=post_title)
    #     serializer = self.serializer_class(instance, data=request.data, partial=True)
    #     userName = str(request.user)
    #
    #     post_title = request.data["post_title"]
    #     post_content = request.data["post_content"]
    #     gitInit(userName, post_title, post_content)
    #
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #
    #     return Response(serializer.data, status=status.HTTP_200_OK)


class ImageFileView(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = UploadFile.objects.all()
    serializer_class = UploadFileSerializer


# def ArticlesView(request):
#     articles = Article.objects.all()
#     liked_list = []
#     for article in articles:
#         liked = article.like_set.filter(user=request.user)
#         if liked.exists():
#             liked_list.append(article.id)
#
#     context = {
#         "articles": articles,
#         "liked_list": liked_list,
#     }
#
#     return render(request, "{自分のapp名}/articles.html", context)

# def LikeView(request):
#     if request.method == "POST":
#         article = get_object_or_404(Article, pk=request.POST.get("article_id"))
#         user = request.user
#         liked = False
#         like = Like.objects.filter(article=article, user=user)
#         if like.exists():
#             like.delete()
#         else:
#             like.create(article=article, user=user)
#             liked = True
#
#         context = {
#             "article_id": article.id,
#             "liked": liked,
#             "count": article.like_set.count(),
#         }
#
#     if request.is_ajax():
#         return JsonResponse(context)


# class UploadImageAPI(GenericAPIView):
#     queryset = UploadImage.objects.all()
#     parser_classes = [FormParser, MultiPartParser]
#
#     def post(self, request, *args, **kwargs):
#         try:
#             file = request.data["file"]
#             # logger.info(file)
#         except KeyError:
#             raise ParseError("Request has no resource file attached")
#         return JsonResponse({}, status=status.HTTP_201_CREATED)


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CommentListCreateAPIView(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
):
    lookup_field = "post__id"
    # lookup_url_kwarg = "post_id"
    lookup_url_kwarg = "id"
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def filter_queryset(self, queryset):
        filters = {self.lookup_field: self.kwargs[self.lookup_url_kwarg]}

        return queryset.filter(**filters)

    def create(self, request, post_id=None):
        post = get_object_or_404(Post, id=post_id)
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        # serializer.save(owner=request.user, book=book)
        serializer.save(owner=request.user, post=post)

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