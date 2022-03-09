from django.contrib import admin

from .models import User, Song, Rating, Year

admin.site.register(User)
admin.site.register(Song)
admin.site.register(Year)
admin.site.register(Rating)
