import uuid

from django.contrib import auth
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password, **extra_fields):
        if not username:
            raise ValueError("The username must be set.")
        if not email:
            raise ValueError("The email must be set.")
        if not password:
            raise ValueError("The password must be set.")

        user = self.model(
            username=username, email=self.normalize_email(email), **extra_fields
        )
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, email, password, **extra_fields):
        if not username:
            raise ValueError("The username must be set.")
        if not email:
            raise ValueError("The email must be set.")
        if not password:
            raise ValueError("The password must be set.")

        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("role", 1)
        if extra_fields.get("role") != 1:
            raise ValueError("Superuser must have role of Global Admin")

        user = self.create_user(username, email, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user

    # def with_perm(
    #     self, perm, is_active=True, include_superusers=True, backend=None, obj=None
    # ):
    #     if backend is None:
    #         backends = auth._get_backends(return_tuples=True)
    #         if len(backends) == 1:
    #             backend, _ = backends[0]
    #         else:
    #             raise ValueError(
    #                 "You have multiple authentication backends configured and "
    #                 "therefore must provide the `backend` argument."
    #             )
    #     elif not isinstance(backend, str):
    #         raise TypeError(
    #             "backend must be a dotted import path string (got %r)." % backend
    #         )
    #     else:
    #         backend = auth.load_backend(backend)
    #     if hasattr(backend, "with_perm"):
    #         return backend.with_perm(
    #             perm,
    #             is_active=is_active,
    #             include_superusers=include_superusers,
    #             obj=obj,
    #         )
    #     return self.none()


class User(AbstractBaseUser, PermissionsMixin):
    ADMIN = 1
    MANAGER = 2
    EMPLOYEE = 3
    CUSTOMER = 4

    ROLE_CHOICES = (
        (ADMIN, "Admin"),
        (MANAGER, "Manager"),
        (EMPLOYEE, "Employee"),
        (CUSTOMER, "Customer"),
    )

    id = models.UUIDField(
        primary_key=True, unique=True, editable=False, default=uuid.uuid4
    )
    email = models.EmailField(db_index=True, unique=True)
    username = models.CharField(db_index=True, max_length=50, unique=True)
    role = models.PositiveSmallIntegerField(
        choices=ROLE_CHOICES, blank=True, null=True, default=4
    )
    is_active = models.BooleanField(default=True)
    # admin pageにログインできるかどうかのFlag
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # ログイン時に使用するField
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email