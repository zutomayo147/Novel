from accounts.models import CustomUser
from django.conf import settings


# from rest_framework.decorators import api_view
from rest_framework.response import Response

# from django.http import JsonResponse
from rest_framework.reverse import reverse
from rest_framework import generics, permissions, renderers

from rest_framework import status, views, viewsets, mixins
from rest_framework.generics import GenericAPIView, CreateAPIView
from django.shortcuts import get_object_or_404
from posts.models import Post, Tag, Comment, Like, Saved_post
from apiv1.permissions import IsOwnerOrReadOnly
from apiv1.serializers.Post import *
from apiv1.serializers.CustomUser import *

from rest_framework.views import APIView
from rest_framework.response import Response
from django.views import View
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from rest_framework.exceptions import ParseError
import os
os.environ["GIT_PYTHON_REFRESH"] = "quiet"
import git

# media_root = str(settings.MEDIA_ROOT)
def moveToUserPost(userName: str, postname: str):
    os.chdir(settings.BASE_DIR)
    os.chdir("../")
    os.chdir(f"media/Novels/{userName}/{postname}")


def gitInit(userName: str, postname: str):
    # os.chdir(settings.BASE_DIR)
    os.chdir(f"../media/Novels")
    # os.chdir("media/Novels")
    os.mkdir(userName)
    os.chdir(userName)
    os.mkdir(postname)
    os.chdir(postname)
    url = os.getcwd()
    git.Repo.init(url)


#
#     pass
# class SampleView(APIView):
class NewPost(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# class NewPost(GenericAPIView):
#     # class NewPost(CreateAPIView):
#     # authentication_classes = [TokenAuthentication]
#     # permission_classes = [IsAuthenticated]
#     serializer_class = PostSerializer
#
#     # def get(self, request):
#     #     # user = self.request.user
#     #     # host = self.request.get_host
#     #     user = str(self.request.user.username)
#     #     moveToUserRepo(user)
#     #
#     #     data = {"user": user}
#     #     return JsonResponse(data, status=status.HTTP_200_OK)
#     def post(self, request, post_title):
#         user = str(self.request.user.username)
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


class EditPost(GenericAPIView):
    # class NewPost(CreateAPIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    # def get(self, request):
    #     # user = self.request.user
    #     # host = self.request.get_host
    #     user = str(self.request.user.username)
    #     moveToUserRepo(user)
    #
    #     data = {"user": user}
    #     return JsonResponse(data, status=status.HTTP_200_OK)
    def post(self, request, post_title):
        user = str(self.request.user.userName)
        # post_content = get_object_or_404(Post, id=book_id)
        post = get_object_or_404(Post, post_title=post_title)
        gitInit(user, post.post_title)

        # f = open('write_test.txt', 'w')
        f = open(f"{post.post_title}.txt", "w")
        f.write(post.post_content)
        f.close()

        # repo.git.add('bar.txt')

        data = {"user": user}
        return JsonResponse(data, status=status.HTTP_200_OK)


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