# from django.contrib import admin
# from django.contrib.auth.models import Group
# from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
#
# # from .forms import UserChangeForm, UserCreationForm
# from .models import Post
#
#
# class UserAdmin(BaseUserAdmin):
#     # form = UserChangeForm
#     # add_form = UserCreationForm
#
#     list_display = (
#         "post_title",
#         "owner",
#         "post_caption",
#         "post_content",
#         "post_created",
#         "created_at",
#         "updated_at",
#     )
#     # list_filter = ("is_staff",)
#     # fieldsets = (
#     #     (None, {"fields": ("userName", "email", "password")}),
#     #     ("Personal info", {"fields": ("role",)}),
#     #     ("Permissions", {"fields": ("is_staff", "is_active")}),
#     # )
#     #
#     # add_fieldsets = (
#     #     (
#     #         None,
#     #         {
#     #             "classes": ("wide",),
#     #             "fields": ("email", "userName", "password1", "password2"),
#     #         },
#     #     ),
#     # )
#     # search_fields = ("email",)
#     # ordering = ("email",)
#     # filter_horizontal = ()
#
#
# admin.site.register(Post, UserAdmin)
# admin.site.unregister(Group)