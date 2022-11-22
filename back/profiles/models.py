from statistics import mode
import uuid
from django.db import models


class Profile(models.Model):
    """Profile Model"""

    class Meta:
        db_table = "profile"
        ordering = [
            "created_at",
        ]
        verbose_name = verbose_name_plural = "プロファイル"

    # user = models.OneToOneField("accounts.CustomUser", on_delete=models.CASCADE)
    userName = models.OneToOneField("accounts.CustomUser", on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to="images/", blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        # return self.user.userName
        return self.userName.userName