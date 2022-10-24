from django.db import models
from django.conf import settings


class Profile(models.Model):
    user_name = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    user_showname = models.CharField(null=False, max_length=20)
    user_img = models.ImageField(null=True, upload_to="upload", max_length=None)
    user_detail = models.CharField(null=False, max_length=100)