from rest_framework import serializers
from .models import Category


class CategorySerializer(serializers.ModelSerializer):
    brand_name = serializers.CharField(source='brand.name', read_only=True)

    class Meta:
        model = Category
        fields = '__all__'
