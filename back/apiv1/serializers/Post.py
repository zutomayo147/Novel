from rest_framework import serializers

# from posts.models import Post, Tag, Comment, Like, Saved_post, UploadImage
from posts.models import Post, Tag, Comment, Like, Saved_post, UploadFile
# from posts.models import Post, Tag, Comment, Like, Saved_post
from .CustomUser import CustomUserSerializer


class TagRelatedField(serializers.RelatedField):
    """methodがいつ呼び出されるか不明？？"""

    def get_queryset(self):
        return Tag.objects.all()

    def to_internal_value(self, data):
        """tagがすでに登録されていないTagの時はcreate, ある時はget"""
        # data = {"content": "something"}
        tag, created = Tag.objects.get_or_create(**data)

        return tag

    def to_representation(self, value):
        return value.content


# class UploadImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UploadImage
#         fields = "__all__"
class UploadFileSerializer(serializers.ModelSerializer):
    file = serializers.ImageField()
    file_name = serializers.SerializerMethodField()

    class Meta:
        model = UploadFile
        fields = "__all__"

    def get_file_name(self, obj):
        return obj.filename


class PostSerializer(serializers.ModelSerializer):

    owner = CustomUserSerializer(read_only=True)
    # tagList = TagRelatedField(many=True, source="tags")

    class Meta:
        model = Post
        fields = [
            "id",
            "post_title",
            "owner",
            "post_caption",
            "post_content",
        ]

    # def create(self, validated_data):
    #     tags = validated_data.pop("tags", [])
    #     book = Post.objects.create(**validated_data)
    #
    #     for tag in tags:
    #         book.tags.add(tag)
    #
    #     return book


class EditSerializer(serializers.ModelSerializer):

    owner = CustomUserSerializer(read_only=True)
    # tagList = TagRelatedField(many=True, source="tags")

    class Meta:
        model = Post
        fields = [
            "owner",
            "post_caption",
            "post_content",
        ]

    # def create(self, validated_data):
    #     tags = validated_data.pop("tags", [])
    #     book = Post.objects.create(**validated_data)
    #
    #     for tag in tags:
    #         book.tags.add(tag)
    #
    #     return book


class CommentSerializer(serializers.ModelSerializer):
    """Serializer for Comment Model"""

    owner = CustomUserSerializer(read_only=True)
    parent_post = PostSerializer(read_only=True)

    class Meta:
        model = Comment
        # fields = ["id", "data", "parent_post", "owner"]
        fields = ["data", "parent_post", "owner", "created_at", "updated_at"]


class TagSerializer(serializers.ModelSerializer):
    """Serializer for Tag Model"""

    class Meta:
        model = Tag
        fields = ["id", "content"]