from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from brands.models import Brand

class Category(models.Model):
    brand = models.ForeignKey(
        Brand,
        on_delete=models.SET_NULL,
        related_name='categories',
        blank=True,
        null=True
    )

    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True, null=True)

    description = models.TextField(blank=True)

    image = models.ImageField(
        upload_to='categories/',
        blank=True,
        null=True
    )

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['brand__name', 'name']
        verbose_name_plural = 'categories'

    def save(self, *args, **kwargs):
        if not self.slug:
            base = f"{self.brand.name if self.brand else 'general'} {self.name}"
            self.slug = slugify(base)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.brand.name} - {self.name}" if self.brand else self.name
