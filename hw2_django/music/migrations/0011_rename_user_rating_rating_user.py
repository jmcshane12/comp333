# Generated by Django 4.0.3 on 2022-04-15 03:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0010_alter_rating_user_delete_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='rating',
            old_name='user',
            new_name='rating_user',
        ),
    ]
