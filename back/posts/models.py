from django.db import models
from django.conf import settings
import uuid


class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    post_title = models.CharField(verbose_name="タイトル", max_length=50)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, verbose_name="作成者", on_delete=models.CASCADE
    )
    post_caption = models.CharField(max_length=100, blank=True)
    # post_content = models.TextField(blank=True, null=True)
    post_content = models.TextField(verbose_name="内容")

    post_created = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # post_git = models.FileField(upload_to="file/%Y/%m/%d")
    # post_history = models.FileField(upload_to="")
    # is_fork = models.BooleanField()
    # is_original = models.BooleanField()
    # is_original = models.BooleanField()

    # @property
    # def no_of_likes(self):
    #     return Likes.objects.filter(parent_post=self).count()
    #
    # @property
    # def no_of_comments(self):
    #     return Comments.objects.filter(parent_post=self).count()
    #


class Tag(models.Model):
    """Tag Model"""

    class Meta:
        db_table = "tag"
        ordering = [
            "created_at",
        ]
        verbose_name = verbose_name_plural = "タグ"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content


class Comment(models.Model):
    data = models.TextField(null=False)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    parent_post = models.ForeignKey(Post, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now=True)


class Like(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    parent_post = models.ForeignKey(Post, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now=True)


class Saved_post(models.Model):
    saved_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    saved_posts = models.ManyToManyField(Post)