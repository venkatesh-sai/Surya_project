from rest_framework import viewsets
from project.permissions import IsStaffOrSuperuser
from .models import Category
from .serializers import CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [IsStaffOrSuperuser]
    queryset = Category.objects.select_related('brand').all().order_by('brand__name', 'name')
    serializer_class = CategorySerializer
