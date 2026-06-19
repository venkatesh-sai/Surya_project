from rest_framework import viewsets
from project.permissions import IsStaffOrSuperuser
from .models import Testimonial
from .serializers import TestimonialSerializer


class TestimonialViewSet(viewsets.ModelViewSet):
    permission_classes = [IsStaffOrSuperuser]
    queryset = Testimonial.objects.all().order_by('customer_name')
    serializer_class = TestimonialSerializer
