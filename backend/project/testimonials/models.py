from django.db import models

# Create your models here.
class Testimonial(models.Model):

    customer_name = models.CharField(max_length=100)

    company_name = models.CharField(
        max_length=200,
        blank=True
    )

    logo = models.ImageField(
        upload_to='testimonials/',
        blank=True,
        null=True
    )

    review = models.TextField()

    rating = models.IntegerField(default=5)

    relationship_duration = models.CharField(
        max_length=50,
        blank=True
    )

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.customer_name