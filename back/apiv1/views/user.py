from accounts.models import User
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework.reverse import reverse
# from rest_framework import generics, permissions, renderers
from rest_framework import status, views, viewsets, generics, mixins
from django.shortcuts import get_object_or_404
# from rest_framework.parsers import FormParser, MultiPartParser


from apiv1.permissions import IsOwnerOrReadOnly

from apiv1.serializers.User import *

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer