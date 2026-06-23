from rest_framework import viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny
from project.permissions import IsStaffOrSuperuser
from .models import Location
from .serializers import LocationSerializer


class LocationViewSet(viewsets.ModelViewSet):
    lookup_value_regex = '[^/]+'
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

    def get_permissions(self):
        if self.action in ('list', 'retrieve'):
            return [AllowAny()]
        return [IsStaffOrSuperuser()]

    def get_queryset(self):
        queryset = Location.objects.all()
        user = self.request.user
        if not (user and user.is_authenticated and (user.is_staff or user.is_superuser)):
            queryset = queryset.filter(is_active=True)
        return queryset.order_by('city', 'area', 'name')

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        lookup = self.kwargs.get(self.lookup_url_kwarg or self.lookup_field)

        if str(lookup).isdigit():
            obj = get_object_or_404(queryset, pk=lookup)
        else:
            obj = get_object_or_404(queryset, slug=lookup)

        self.check_object_permissions(self.request, obj)
        return obj
