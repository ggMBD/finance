# Generated by Django 5.0.2 on 2024-02-14 05:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='transaction',
            old_name='update',
            new_name='updated',
        ),
    ]
