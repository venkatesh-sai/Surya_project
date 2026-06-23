import json

from rest_framework import serializers
from .models import Product, ProductImage


class KeyFeaturesField(serializers.Field):
    def to_representation(self, value):
        if isinstance(value, list):
            return value
        if isinstance(value, str):
            return [line.strip() for line in value.splitlines() if line.strip()]
        return []

    def to_internal_value(self, data):
        if isinstance(data, list):
            return data
        if isinstance(data, str):
            try:
                parsed = json.loads(data)
            except json.JSONDecodeError:
                parsed = None

            if isinstance(parsed, list):
                return [str(item).strip() for item in parsed if str(item).strip()]

            return [line.strip() for line in data.splitlines() if line.strip()]

        return []


class SpecificationsField(serializers.Field):
    def to_representation(self, value):
        if isinstance(value, dict):
            return value
        if isinstance(value, str):
            try:
                parsed = json.loads(value)
            except json.JSONDecodeError:
                return {}
            return parsed if isinstance(parsed, dict) else {}
        return {}

    def to_internal_value(self, data):
        if isinstance(data, dict):
            return data
        if isinstance(data, str):
            try:
                parsed = json.loads(data)
            except json.JSONDecodeError:
                parsed = {}
                for line in data.splitlines():
                    if ":" not in line:
                        continue
                    key, value = line.split(":", 1)
                    if key.strip() and value.strip():
                        parsed[key.strip()] = value.strip()
            return parsed if isinstance(parsed, dict) else {}
        return {}


class ProductImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ('id', 'image', 'image_url', 'alt_text', 'is_primary', 'sort_order', 'created_at')
        read_only_fields = ('id', 'created_at')

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return ''


class ProductSerializer(serializers.ModelSerializer):
    brand_name = serializers.CharField(source='brand.name', read_only=True)
    brand_slug = serializers.CharField(source='brand.slug', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    image_url = serializers.SerializerMethodField()
    primary_image_url = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    brochure_file_url = serializers.SerializerMethodField()
    key_features = KeyFeaturesField(required=False)
    specifications = SpecificationsField(required=False)

    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ('slug', 'created_at', 'updated_at')

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return ''

    def get_primary_image_url(self, obj):
        primary_image = None
        prefetched_images = getattr(obj, '_prefetched_objects_cache', {}).get('images')

        if prefetched_images is not None:
            primary_image = next((image for image in prefetched_images if image.is_primary), None)
            if primary_image is None and prefetched_images:
                primary_image = prefetched_images[0]
        else:
            primary_image = obj.images.filter(is_primary=True).first() or obj.images.first()

        if primary_image and primary_image.image:
            return primary_image.image.url

        return self.get_image_url(obj)

    def get_images(self, obj):
        product_images = list(obj.images.all())
        if product_images:
            return ProductImageSerializer(product_images, many=True, context=self.context).data

        if obj.image:
            return [{
                'id': None,
                'image': obj.image.name,
                'image_url': obj.image.url,
                'alt_text': obj.name,
                'is_primary': True,
                'sort_order': 0,
                'created_at': obj.created_at,
            }]

        return []

    def get_brochure_file_url(self, obj):
        if obj.brochure_file:
            return obj.brochure_file.url
        return ''

    def create(self, validated_data):
        product = super().create(validated_data)
        self._save_uploaded_images(product)
        return product

    def update(self, instance, validated_data):
        product = super().update(instance, validated_data)
        self._save_uploaded_images(product)
        return product

    def _save_uploaded_images(self, product):
        request = self.context.get('request')
        if not request:
            return

        uploaded_images = request.FILES.getlist('images')
        if not uploaded_images:
            return

        existing_count = product.images.count()
        has_primary = product.images.filter(is_primary=True).exists()

        for index, image in enumerate(uploaded_images):
            ProductImage.objects.create(
                product=product,
                image=image,
                alt_text=product.name,
                is_primary=not has_primary and index == 0,
                sort_order=existing_count + index,
            )
