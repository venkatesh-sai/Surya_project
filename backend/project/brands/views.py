from rest_framework import viewsets
from project.permissions import IsStaffOrSuperuser
from .models import Brand
from .serializers import BrandSerializer


class BrandViewSet(viewsets.ModelViewSet):
    permission_classes = [IsStaffOrSuperuser]
    queryset = Brand.objects.all().order_by('name')
    serializer_class = BrandSerializer
