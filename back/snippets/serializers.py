from django.contrib.auth.models import User
from rest_framework import serializers
from snippets.models import Snippet, LANGUAGE_CHOICES, STYLE_CHOICES
from drf_spectacular.utils import (
    OpenApiParameter,
    extend_schema,
    extend_schema_field,
    extend_schema_serializer,
    OpenApiExample,
)
from drf_spectacular.types import OpenApiTypes


# class SnippetSerializer(serializers.ModelSerializer):
# @extend_schema_field(OpenApiTypes.BYTE)  # also takes basic python types
# @extend_schema_serializer(
#     exclude_fields=("single",),  # schema ignore these fields
#     examples=[
#         OpenApiExample(
#             "Valid example 1",
#             summary="short summary",
#             description="longer description",
#             value={"songs": {"top10": True}, "single": {"top10": True}},
#             request_only=True,  # signal that example only applies to requests
#             response_only=False,  # signal that example only applies to responses
#         ),
#     ],
# )
class SnippetSerializer(serializers.HyperlinkedModelSerializer):  # 追加
    owner = serializers.ReadOnlyField(source="owner.username")
    highlight = serializers.HyperlinkedIdentityField(
        view_name="snippet-highlight", format="html"
    )

    class Meta:
        model = Snippet
        fields = (
            "url",
            "id",
            "highlight",
            "title",
            "code",
            "linenos",
            "language",
            "style",
            "owner",
        )  # 追加


# class UserSerializer2(serializers.ModelSerializer):
class UserSerializer2(serializers.HyperlinkedModelSerializer):  # 追加
    # snippets = serializers.PrimaryKeyRelatedField(
    #     many=True, queryset=Snippet.objects.all()
    # )
    snippets = serializers.HyperlinkedRelatedField(  # new
        many=True, view_name="snippet-detail", read_only=True
    )

    class Meta:
        model = User
        fields = ("url", "id", "username", "snippets")  # 追加