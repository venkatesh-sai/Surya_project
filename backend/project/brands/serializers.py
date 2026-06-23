from rest_framework import serializers
from .models import Brand


class BrandSerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()

    class Meta:
        model = Brand
        fields = '__all__'
        read_only_fields = ('slug', 'created_at', 'updated_at')

    def get_logo_url(self, obj):
        if obj.logo:
            return obj.logo.url
        return ''
