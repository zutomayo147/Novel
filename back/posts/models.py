from django.db import models
from django.conf import settings
import uuid
import os


class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    post_title = models.CharField(verbose_name="タイトル", max_length=50, unique=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, verbose_name="作成者", on_delete=models.CASCADE
    )
    post_caption = models.CharField(max_length=500, blank=True)
    # post_content = models.TextField(blank=True, null=True)
    post_content = models.TextField(
        verbose_name="内容",
        max_length=10000,
    )

    post_created = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    retweet_count = models.IntegerField(default=0)
    favorite_count = models.IntegerField(default=0)
    # remote_address　(投稿元のIPアドレス)
    # post_git = models.FileField(upload_to="file/%Y/%m/%d")
    # filePath = ["userPost", owner.userName]
    # filePath = os.path.join(*filePath)
    # filePath = str(filePath)
    # post_git = models.FileField(upload_to=filePath)
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


# class UploadImage(models.Model):
#     image = models.ImageField(upload_to="img/")


def upload_image(instance, filename):
    return "images/{0}/".format(filename)


class UploadFile(models.Model):
    file = models.ImageField("画像ファイル", upload_to="file/")

    def __str__(self):
        return self.file.url

    @property
    def filename(self):
        return os.path.basename(self.file.name)


class Tag(models.Model):
    """Tag Model"""

    class Meta:
        db_table = "tag"
        ordering = [
            "created_at",
        ]
        verbose_name = verbose_name_plural = "タグ"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content = models.CharField(max_length=10, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content


class Comment(models.Model):
    class Meta:
        db_table = "comment"
        ordering = [
            "created_at",
        ]
        verbose_name = verbose_name_plural = "コメント"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    data = models.TextField(null=False)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    parent_post = models.ForeignKey(Post, on_delete=models.CASCADE)
    # date = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Like(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    parent_post = models.ForeignKey(Post, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now=True)


class Saved_post(models.Model):
    saved_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    saved_posts = models.ManyToManyField(Post)