from rest_framework import viewsets
from project.permissions import IsStaffOrSuperuser
from .models import Location
from .serializers import LocationSerializer


class LocationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsStaffOrSuperuser]
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
