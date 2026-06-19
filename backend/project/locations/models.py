from django.db import models


class Location(models.Model):
    name = models.CharField(max_length=120)
    city = models.CharField(max_length=100)
    address = models.TextField()
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    map_url = models.URLField(blank=True)
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order', 'city', 'name']

    def __str__(self):
        return f"{self.name} - {self.city}"
