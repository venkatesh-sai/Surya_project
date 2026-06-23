from django.contrib import admin
from .models import Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'slug', 'is_active', 'updated_at')
    list_filter = ('brand', 'is_active')
    search_fields = ('name', 'description', 'brand__name')
    prepopulated_fields = {'slug': ('name',)}
