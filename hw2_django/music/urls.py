from django.urls import path
from . import views

app_name = "music"

urlpatterns = [
    path('', views.index, name='index'),
    path('registration/', views.registration, name='registration'),
    path('song_retrieve/', views.song_retrieve, name='song_retrieve'),
    path('year_retrieve/', views.year_retrieve, name='year_retrieve'),
]