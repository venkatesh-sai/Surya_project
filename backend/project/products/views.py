from rest_framework import viewsets
from project.permissions import IsStaffOrSuperuser
from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = [IsStaffOrSuperuser]
    queryset = Product.objects.select_related('category', 'category__brand').all().order_by('name')
    serializer_class = ProductSerializer
