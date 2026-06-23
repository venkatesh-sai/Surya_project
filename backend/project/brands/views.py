from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from project.permissions import IsStaffOrSuperuser
from .models import Brand
from .serializers import BrandSerializer


class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

    def get_permissions(self):
        if self.action in ('list', 'retrieve'):
            return [AllowAny()]
        return [IsStaffOrSuperuser()]

    def get_queryset(self):
        queryset = Brand.objects.all()
        user = self.request.user
        if not (user and user.is_authenticated and (user.is_staff or user.is_superuser)):
            queryset = queryset.filter(is_active=True)
        return queryset.order_by('name')
