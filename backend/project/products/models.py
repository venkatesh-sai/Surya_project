from django.db import models
from categories.models import Category

class Product(models.Model):

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='products'
    )

    name = models.CharField(max_length=200)

    model_number = models.CharField(
        max_length=100,
        blank=True
    )

    description = models.TextField()

    image = models.ImageField(
        upload_to='products/'
    )

    features = models.TextField(
        blank=True
    )

    specifications = models.TextField(
        blank=True
    )

    brochure = models.FileField(
        upload_to='brochures/',
        blank=True,
        null=True
    )

    sales = models.BooleanField(default=True)

    rental = models.BooleanField(default=False)

    amc = models.BooleanField(default=False)

    service_support = models.BooleanField(default=True)

    featured = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name