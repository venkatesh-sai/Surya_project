from django.contrib import admin
from .models import Location


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'area', 'phone', 'latitude', 'longitude', 'is_active', 'updated_at')
    list_filter = ('city', 'is_active')
    search_fields = ('name', 'city', 'area', 'address', 'phone', 'email')
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('created_at', 'updated_at')
