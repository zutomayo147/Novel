from django.db import models
from django.conf import settings


class Profile(models.Model):
    user_name = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    user_showname = models.CharField(null=False, max_length=20)
    user_img = models.ImageField(null=True, upload_to="upload", max_length=None)
    user_detail = models.CharField(null=False, max_length=100)


class Posts(models.Model):
    post_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post_image = models.ImageField(null=True, upload_to="upload", max_length=None)
    post_caption = models.CharField(max_length=100)
    post_created = models.DateTimeField(auto_now_add=True)
    post_content = models.TextField()
    post_git = models.FileField(upload_to="file/%Y/%m/%d")

    # @property
    # def no_of_likes(self):
    #     return Likes.objects.filter(parent_post=self).count()
    #
    # @property
    # def no_of_comments(self):
    #     return Comments.objects.filter(parent_post=self).count()
    #


class Comments(models.Model):
    comment_data = models.TextField(null=False)
    comment_owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE
    )
    parent_post = models.ForeignKey(Posts, on_delete=models.CASCADE)
    comment_date = models.DateTimeField(auto_now=True)


class Likes(models.Model):
    likes_owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    parent_post = models.ForeignKey(Posts, on_delete=models.CASCADE)
    likes_date = models.DateTimeField(auto_now=True)


class Saved_post(models.Model):
    saved_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    saved_posts = models.ManyToManyField(Posts)