from django.contrib import admin
from posts.models import Post, Comment, Tag, Like, Saved_post


admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Tag)
admin.site.register(Like)
admin.site.register(Saved_post)


# Register your models here.