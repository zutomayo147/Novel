from django.contrib.auth.models import User  # 追加
from rest_framework.decorators import api_view  # 追加
from rest_framework.response import Response  # 追加
from rest_framework.reverse import reverse  # 追加
from rest_framework import generics, permissions, renderers  # 追加

from .models import Snippet
from .permissions import IsOwnerOrReadOnly  # 追加
from .serializers import SnippetSerializer, UserSerializer2  # 追加

# from rest_framework import generics


@api_view(["GET"])  # 追加
def api_root(request, format=None):
    return Response(
        {
            "users": reverse("user-list", request=request, format=format),
            "snippets": reverse("snippet-list", request=request, format=format),
        }
    )


class SnippetList(generics.ListCreateAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)  # 追加

    def perform_create(self, serializer):  # 追加
        serializer.save(owner=self.request.user)


class SnippetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
    )  # 追加


class UserList(generics.ListAPIView):  # 追加
    queryset = User.objects.all()
    serializer_class = UserSerializer2


class UserDetail(generics.RetrieveAPIView):  # 追加
    queryset = User.objects.all()
    serializer_class = UserSerializer2


class SnippetHighlight(generics.GenericAPIView):  # 追加
    queryset = Snippet.objects.all()
    renderer_classes = (renderers.StaticHTMLRenderer,)

    def get(self, request, *args, **kwargs):
        snippet = self.get_object()
        return Response(snippet.highlighted)