from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import generics, permissions, renderers

from .models import Snippet
from .permissions import IsOwnerOrReadOnly
from .serializers import SnippetSerializer, UserSerializer2
from drf_spectacular.utils import (
    extend_schema,
    extend_schema_view,
    OpenApiExample,
    OpenApiParameter,
)
from drf_spectacular.types import (
    OpenApiTypes,
)


@api_view(["GET"])
def api_root(request, format=None):
    return Response(
        {
            "users": reverse("user-list", request=request, format=format),
            "snippets": reverse("snippet-list", request=request, format=format),
        }
    )


@extend_schema_view(
    list=extend_schema(description="りすとととと"),
    post=extend_schema(
        description="POSere",
        parameters=[
            # QuerySerializer,  # serializer fields are converted to parameters
            # OpenApiParameter(
            #     "nested", QuerySerializer
            # ),  # serializer object is converted to a parameter
            OpenApiParameter("queryparam1", OpenApiTypes.UUID, OpenApiParameter.QUERY),
            OpenApiParameter(
                "pk", OpenApiTypes.UUID, OpenApiParameter.PATH
            ),  # path variable was overridden
            OpenApiParameter(
                name="release",
                type=OpenApiTypes.DATE,
                location=OpenApiParameter.QUERY,
                description="Filter by release date",
                examples=[
                    OpenApiExample(
                        "Example 1",
                        summary="short optional summary",
                        description="longer description",
                        value="1993-08-23",
                    ),
                ],
            ),
        ],
        auth=None,
        # change the auto-generated operation name
        operation_id=None,
        # or even completely override what AutoSchema would generate. Provide raw Open API spec as Dict.
        operation=None,
        # request=YourRequestSerializer,
        # responses=YourResponseSerializer,
        examples=[  # 追加部分始
            OpenApiExample(
                "入力例1",
                summary="A社の田中太郎",
                description="存在しない会社のUUIDを入力したら作成できないので注意してください！",
                value={
                    "name": "田中太郎",
                    "email": "tanakatarou@gmail.com",
                    "phone_num": "09012345678",
                    "send_email_notification": False,
                    "company": "4533a69e-9e29-4961-bef6-f0d7bddb95be",
                },
            ),
        ],
    ),
    get=extend_schema(description="ユーザの一覧取得"),
)
class SnippetList(generics.ListCreateAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)  # 追加

    def perform_create(self, serializer):  # 追加
        serializer.save(owner=self.request.user)


class SnippetDetail(generics.RetrieveUpdateDestroyAPIView):
# class SnippetDetail(generics.ListCreateAPIView):
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