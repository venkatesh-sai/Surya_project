from django.db import models
class Enquiry(models.Model):

    STATUS_CHOICES = [
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('closed', 'Closed')
    ]

    name = models.CharField(max_length=100)

    phone = models.CharField(max_length=15)

    email = models.EmailField(blank=True)

    location = models.CharField(max_length=100)

    machine_requirement = models.CharField(max_length=200)

    message = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='new'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name