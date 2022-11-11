import factory
from accounts import models


class RandomUserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.User
    # FACTORY_FOR = models.User


    id = factory.Faker("id")
    email = factory.Faker("email")
    userName = factory.Faker("username")
    role = factory.Faker("role")
    is_active = factory.Faker("is_active")
    is_staff = factory.Faker("is_staff")
    created_at = factory.Faker("created_at")
    updated_at = factory.Faker("updated_at")

# users  = RandomUserFactory.create_batch(10)
# for user in users:
#     print(user)
user = RandomUserFactory.create()

# Another, different, factory for the same object
# class AdminFactory(factory.Factory):
#     class Meta:
#         model = models.User
#
#     first_name = 'Admin'
#     last_name = 'User'
#     admin = True