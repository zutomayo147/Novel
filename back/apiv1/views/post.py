from django.conf import settings

# from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import get_object_or_404

from rest_framework.response import Response

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
import json


# from pathlib import Path

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

        userName = str(request.user.userName)
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


# class PostEdit(
#     generics.RetrieveUpdateDestroyAPIView,
#     # viewsets.GenericViewSet,
# ):
#     # post_content = get_object_or_404(Post, id=book_id)
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
#     permission_classes = (
#         permissions.IsAuthenticatedOrReadOnly,
#         IsOwnerOrReadOnly,
#     )
#     # product = Post.objects.get(id=product_id)
#     # blockusers = BlockUser.objects.filter(from_user=request.user.id, to_user=pk)
#     def update(self, request, title):
#         instance = get_object_or_404(Post, title=title)
#         # serializer = self.serializer_class(instance, data=request.data, partial=True)
#         serializer = self.serializer_class(instance, data=request.data)
#         userName = str(request.user)
#         print(title)
#
#         title = request.data["title"]
#         content = request.data["content"]
#         gitInit(userName, title, content)
#
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#
#         return Response(serializer.data, status=status.HTTP_200_OK)


class ForkPost(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
):
    queryset = Post.objects.all()
    serializer_class = PostForkSerializer
    # permission_classes = (
    #     permissions.IsAuthenticatedOrReadOnly,
    #     # IsOwnerOrReadOnly,
    # )

    def create(self, request, title):
    # def create(self, request):
        #  queryset = self.queryset.get(userName=userName)
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        print(request.data)
        doForkUser = str(request.user.userName)
        print(f"doForkUser:{doForkUser}")
        originTitle = title
        print(f"originTitle:{originTitle}")
        content = request.data["content"]
        print(f"content:{content}")
        originUser = request.data["originUser"]
        print(f"originUser:{originUser}")

        originContent = cloneOriginalPost(originUser, originTitle, doForkUser)
        serializer.save(owner=request.user, content=originContent)
        # serializer.save(owner=request.user)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class Test(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
):
    # queryset = Post.objects.all()
    # serializer_class = PostForkSerializer
    # permission_classes = (
    #     permissions.IsAuthenticatedOrReadOnly,
    #     # IsOwnerOrReadOnly,
    # )

    # def create(self, request, title):
    def create(self, request):
        #  queryset = self.queryset.get(userName=userName)
        print(request)
        print(type(request))
        # serializer = self.serializer_class(data=request.data)
        # request = json.dumps(request.user)
        print(request.user.userName)
        # serializer.is_valid(raise_exception=True)

        # doForkUser = str(request.user)
        # originTitle = title
        # content = request.data["content"]
        # originUser = request.data["originUser"]
        #
        # originContent = cloneOriginalPost(originUser, originTitle, doForkUser)
        # serializer.save(owner=request.user, content=originContent)
        # serializer.save(owner=request.user)

        return Response("1", status=status.HTTP_201_CREATED)


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