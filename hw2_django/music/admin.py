from django.contrib import admin

from .models import User, Song, Rating

admin.site.register(User)
admin.site.register(Song)
admin.site.register(Rating)