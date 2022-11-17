from django.conf import settings
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import get_object_or_404
from django.views import View
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import generics, permissions, renderers
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


# def make_remote_repo(userName: str, post_title: str) -> None:
#     # back/config/media/
#     if not os.path.exists("remote_repo"):
#         os.makedirs("remote_repo")
#     os.chdir("remote_repo")
#
#     if not os.path.exists(userName):
#         os.makedirs(userName)
#     os.chdir(userName)
#
#     if not os.path.exists(post_title):
#         os.makedirs(post_title)
#     os.chdir(post_title)
#     git.Repo.init(bare=True, shared=True)


# def gitInit(userName: str, post_title: str, post_content: str) -> None:
#     # back/config/media/
#     os.chdir(settings.MEDIA_ROOT)
#
#     # back/config/media/
#     make_remote_repo(userName, post_title)
#     os.chdir(settings.MEDIA_ROOT)
#     pwd = os.getcwd()
#     remoteUrl = f"{pwd}/remote_repo/{userName}/{post_title}"
#
#     if not os.path.exists(userName):
#         os.makedirs(userName)
#     os.chdir(userName)
#
#     if not os.path.exists(post_title):
#         os.makedirs(post_title)
#     os.chdir(post_title)
#
#     git.Repo.init()
#     repo = git.Repo()
#
#     try:
#         repo.create_remote("origin", url=remoteUrl)
#     except git.exc.GitCommandError as error:
#         print(f"Error creating remote: {error}")
#
#     with open(f"{post_title}.md", "w") as f:
#         f.write(post_content)
#
#     repo.index.add(f"{post_title}.md")
#     repo.index.commit("Initial commit.")
#     # # Pull from remote repo
#     # print(repo.remotes.origin.pull())
#     # Push changes
#     # repo.remotes.origin.push(refspec="main:origin")
#     subprocess.run(["git", "fetch"])
#     subprocess.run(["git", "merge", "--allow-unrelated-histories", "origin/main"])

    # repo.remotes.origin.push("main")


# LoginRequiredMixin
class NewPost(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        print(serializer)
        serializer.is_valid(raise_exception=True)

        userName = str(request.user)
        post_title = request.data["post_title"]
        post_content = request.data["post_content"]

        gitInit(userName, post_title, post_content)
        serializer.save(owner=request.user)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)


# def gitPush(userName: str, post_title: str, post_content: str) -> None:
#     # back/config/media/
#     os.chdir(settings.MEDIA_ROOT)
#
#     # back/config/media/
#     pwd = os.getcwd()
#     remoteUrl = f"{pwd}/remote_repo/{userName}/{post_title}"
#
#     # if not os.path.exists(userName):  # ディレクトリが存在するか確認
#     #     os.makedirs(userName)  # ディレクトリ作成
#     os.chdir(userName)
#
#     # if not os.path.exists(post_title):  # ディレクトリが存在するか確認
#     #     os.makedirs(post_title)  # ディレクトリ作成
#     os.chdir(post_title)
#
#     git.Repo.init()
#     repo = git.Repo()
#
#     try:
#         repo.create_remote("origin", url=remoteUrl)
#     except git.exc.GitCommandError as error:
#         print(f"Error creating remote: {error}")
#
#     with open(f"{post_title}.md", "w") as f:
#         f.write(post_content)
#
#     repo.index.add(f"{post_title}.md")
#     repo.index.commit("commit")
#     # # Pull from remote repo
#     # print(repo.remotes.origin.pull())
#     # Push changes
#     # repo.remotes.origin.push(refspec="main:origin")
#     repo.remotes.origin.push("main")
#     # subprocess.run(["git", "fetch"])
#     # subprocess.run(["git", "merge", "--allow-unrelated-histories", "origin/main"])


class PostEdit(generics.RetrieveUpdateDestroyAPIView):
    # post_content = get_object_or_404(Post, id=book_id)
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
    )
    # product = Post.objects.get(id=product_id)
    # blockusers = BlockUser.objects.filter(from_user=request.user.id, to_user=pk)
    def update(self, request, post_title):
        instance = get_object_or_404(Post, post_title=post_title)
        serializer = self.serializer_class(instance, data=request.data, partial=True)
        userName = str(request.user)

        post_title = request.data["post_title"]
        post_content = request.data["post_content"]
        gitInit(userName, post_title, post_content)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


class ForkPost(generics.RetrieveUpdateDestroyAPIView):
    pass
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


# class NewPost(GenericAPIView):
#     # class NewPost(CreateAPIView):
#     # authentication_classes = [TokenAuthentication]
#     # permission_classes = [IsAuthenticated]
#     serializer_class = PostSerializer
#
#     # def get(self, request):
#     #     # user = self.request.user
#     #     # host = self.request.get_host
#     #     user = str(self.request.user.userName)
#     #     moveToUserRepo(user)
#     #
#     #     data = {"user": user}
#     #     return JsonResponse(data, status=status.HTTP_200_OK)
#     def post(self, request, post_title):
#         user = str(self.request.user.userName)
#         # post_content = get_object_or_404(Post, id=book_id)
#         post = get_object_or_404(Post, post_title=post_title)
#         gitInit(user, post.post_title)
#
#         # f = open('write_test.txt', 'w')
#         f = open(f"{post.post_title}.txt", "w")
#         f.write(post.post_content)
#         f.close()
#
#         # repo.git.add('bar.txt')
#
#         data = {"user": user}
#         return Response(data, status=status.HTTP_200_OK)


# class EditPost(GenericAPIView):
#     # class NewPost(CreateAPIView):
#     # authentication_classes = [TokenAuthentication]
#     # permission_classes = [IsAuthenticated]
#     serializer_class = PostSerializer
#
#     # def get(self, request):
#     #     # user = self.request.user
#     #     # host = self.request.get_host
#     #     user = str(self.request.user.userName)
#     #     moveToUserRepo(user)
#     #
#     #     data = {"user": user}
#     #     return JsonResponse(data, status=status.HTTP_200_OK)
#     def post(self, request, post_title):
#         user = str(self.request.user.userName)
#         # post_content = get_object_or_404(Post, id=book_id)
#         post = get_object_or_404(Post, post_title=post_title)
#         gitInit(user, post.post_title)
#
#         # f = open('write_test.txt', 'w')
#         f = open(f"{post.post_title}.txt", "w")
#         f.write(post.post_content)
#         f.close()
#
#         # repo.git.add('bar.txt')
#
#         data = {"user": user}
#         return JsonResponse(data, status=status.HTTP_200_OK)


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


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
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