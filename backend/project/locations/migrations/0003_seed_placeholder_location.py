from django.db import migrations
from django.utils.text import slugify


def seed_placeholder_location(apps, schema_editor):
    Location = apps.get_model('locations', 'Location')
    name = 'Surya Enterprises'
    city = 'Telangana'

    Location.objects.update_or_create(
        slug=slugify(f'{name} {city}'),
        defaults={
            'name': name,
            'city': city,
            'area': 'Contact for details',
            'address': 'Contact for details',
            'phone': '9866294418',
            'email': '',
            'working_hours': 'Contact for details',
            'google_maps_url': '',
            'services_available': 'Sales\nService\nInstallation Support\nAMC',
            'is_active': True,
        },
    )


def remove_placeholder_location(apps, schema_editor):
    Location = apps.get_model('locations', 'Location')
    Location.objects.filter(slug=slugify('Surya Enterprises Telangana')).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('locations', '0002_alter_location_options_remove_location_display_order_and_more'),
    ]

    operations = [
        migrations.RunPython(seed_placeholder_location, remove_placeholder_location),
    ]
