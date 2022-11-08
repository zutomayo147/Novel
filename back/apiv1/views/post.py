from accounts.models import CustomUser
from django.conf import settings


# from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
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

# )
# @api_view(["GET", "POST"])
# def hello_world(request):
#     if request.method == "POST":
#         return Response({"message": "Got some data!", "data": request.data})
#     return Response({"message": "Hello, world!"})
def moveUserPost(user:str,postname:str)-->None:
    dir = str(settings.BASE_DIR)
    media_root = str(settings.MEDIA_ROOT)
    os.chdir("MEDIA_ROOT")

    pass
# class SampleView(APIView):
class NewPost(GenericAPIView):
    # class NewPost(CreateAPIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    # serializer_class = PostSerializer

    def get(self, request):
        # user = self.request.user
        # host = self.request.get_host
        user = self.request.user.username
        user = str(self.request.user.username)
        # dir = settings.BASE_DIR
        dir = str(settings.BASE_DIR)
        media_root = str(settings.MEDIA_ROOT)

        wd = os.path.join(media_root, user)
        # user = json.loads(user)
        print(user)
        data = {"user": user, "dir": dir, "media": media_root, "wd": wd}
        return JsonResponse(data, status=status.HTTP_200_OK)


#         return JsonResponse(data)
# return Response(data, status=status.HTTP_200_OK)

# liked_posts = Post.objects.filter(likes__author__id=request.user.id)
# serializer_data = self.serializer_class(
#     liked_posts, many=True, context={"request": request}
# ).data
#
# return Response(data=serializer_data)
class UploadImageAPI(GenericAPIView):
    queryset = UploadImage.objects.all()
    parser_classes = [FormParser, MultiPartParser]

    def post(self, request, *args, **kwargs):
        try:
            file = request.data["file"]
            # logger.info(file)
        except KeyError:
            raise ParseError("Request has no resource file attached")
        return JsonResponse({}, status=status.HTTP_201_CREATED)


# from apiv1.serializers.Profile import *
# class MyView(View):
#     def get(self, request, *args, **kwargs):
#         return HttpResponse("Hello, World!")
#
#
# def myview(request, *args, **kwargs):
#     view_obj = MyView()
#     view_obj.request = request
#     view_obj.args = args
#     view_obj.kwargs = kwargs
#     return view_obj.dispatch(request, *args, **kwargs)




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