from rest_framework import serializers
from profiles.models import Profile
from .CustomUser import CustomUserSerializer


class ProfileSerializer(serializers.ModelSerializer):
    """Serializer for Profile Model"""

    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ["user", "bio", "image"]
        read_only_fields = ("image",)


class ProfileImageSerializer(serializers.ModelSerializer):
    """Serializer for Profile Model"""

    user = CustomUserSerializer(read_only=True)
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Profile
        fields = "__all__"