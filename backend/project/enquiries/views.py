from rest_framework import viewsets
from project.permissions import IsStaffOrSuperuser
from .models import Enquiry
from .serializers import EnquirySerializer


class EnquiryViewSet(viewsets.ModelViewSet):
    permission_classes = [IsStaffOrSuperuser]
    queryset = Enquiry.objects.all().order_by('-created_at')
    serializer_class = EnquirySerializer
