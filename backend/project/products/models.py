from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from brands.models import Brand
from categories.models import Category

class Product(models.Model):
    brand = models.ForeignKey(
        Brand,
        on_delete=models.SET_NULL,
        related_name='products',
        blank=True,
        null=True
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        related_name='products',
        blank=True,
        null=True
    )

    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=240, unique=True, blank=True, null=True)

    model = models.CharField(max_length=120, blank=True)
    product_type = models.CharField(max_length=160, blank=True)
    paper_size = models.CharField(max_length=160, blank=True)
    print_speed = models.CharField(max_length=200, blank=True)
    print_resolution = models.CharField(max_length=160, blank=True)
    memory = models.CharField(max_length=160, blank=True)
    tray_capacity = models.CharField(max_length=240, blank=True)
    connectivity = models.CharField(max_length=240, blank=True)
    warranty = models.CharField(max_length=160, blank=True)

    description = models.TextField()

    image = models.ImageField(
        upload_to='products/',
        blank=True,
        null=True
    )

    key_features = models.JSONField(default=list, blank=True)
    specifications = models.JSONField(default=dict, blank=True)

    brochure_file = models.FileField(
        upload_to='brochures/',
        blank=True,
        null=True
    )

    is_featured = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['brand__name', 'category__name', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            base = self.model or self.name
            self.slug = slugify(base)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='images'
    )
    image = models.ImageField(upload_to='products/')
    alt_text = models.CharField(max_length=240, blank=True)
    is_primary = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now, editable=False)

    class Meta:
        ordering = ['sort_order', 'id']

    def save(self, *args, **kwargs):
        if self.is_primary:
            ProductImage.objects.filter(product=self.product, is_primary=True).exclude(pk=self.pk).update(is_primary=False)
        elif not ProductImage.objects.filter(product=self.product, is_primary=True).exclude(pk=self.pk).exists():
            self.is_primary = True
        super().save(*args, **kwargs)

    def __str__(self):
        return self.alt_text or f"{self.product} image"
