# Generated by Django 4.0.3 on 2022-04-13 16:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0007_song_genre_song_year'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='rating',
            unique_together={('user', 'song')},
        ),
    ]
