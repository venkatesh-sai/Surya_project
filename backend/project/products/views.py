from rest_framework import viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny
from project.permissions import IsStaffOrSuperuser
from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    lookup_value_regex = '[^/]+'
    queryset = Product.objects.select_related('brand', 'category').prefetch_related('images').all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.action in ('list', 'retrieve'):
            return [AllowAny()]
        return [IsStaffOrSuperuser()]

    def get_queryset(self):
        queryset = Product.objects.select_related('brand', 'category').prefetch_related('images').all()
        user = self.request.user
        if not (user and user.is_authenticated and (user.is_staff or user.is_superuser)):
            queryset = queryset.filter(is_active=True, brand__is_active=True)
        return queryset.order_by('brand__name', 'category__name', 'name')

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        lookup = self.kwargs.get(self.lookup_url_kwarg or self.lookup_field)

        if str(lookup).isdigit():
            obj = get_object_or_404(queryset, pk=lookup)
        else:
            obj = get_object_or_404(queryset, slug=lookup)

        self.check_object_permissions(self.request, obj)
        return obj
