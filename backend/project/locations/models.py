from django.db import models
from django.utils import timezone
from django.utils.text import slugify


class Location(models.Model):
    name = models.CharField(max_length=160)
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True)
    city = models.CharField(max_length=100)
    area = models.CharField(max_length=120, blank=True)
    address = models.TextField()
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    working_hours = models.CharField(max_length=160, blank=True)
    google_maps_url = models.URLField(max_length=1000, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    services_available = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['city', 'area', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.name} {self.city} {self.area}".strip())
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - {self.city}"
