# Generated by Django 4.0.3 on 2022-04-13 16:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0008_alter_rating_unique_together'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='rating',
            unique_together=set(),
        ),
    ]
