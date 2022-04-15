from django.contrib import admin
from .models import Song, Rating, Year, Reg

admin.site.register(Song)
admin.site.register(Year)
admin.site.register(Rating)
admin.site.register(Reg)