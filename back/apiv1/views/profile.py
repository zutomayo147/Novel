from accounts.models import CustomUser
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import generics, permissions, renderers
from rest_framework import status, views, viewsets, generics, mixins
from django.shortcuts import get_object_or_404
from rest_framework.parsers import FormParser, MultiPartParser


from profiles.models import Profile
from apiv1.permissions import IsOwnerOrReadOnly

from apiv1.serializers.Profile import *

class ProfileList(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
    )



class ProfileViewSet(
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet
):
    queryset = Profile.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer

    def retrieve(self, request, userName):

        profile = self.queryset.get(user__userName=userName)

        serializer = self.serializer_class(instance=profile)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, userName):
        instance = get_object_or_404(Profile, user__userName=userName)

        serializer = self.serializer_class(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


class ProfileImageViewSet(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = Profile.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = ProfileImageSerializer
    parser_classes = [FormParser, MultiPartParser]

    def update(self, request, userName):

        instance = get_object_or_404(Profile, user__userName=userName)

        serializer = self.serializer_class(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)