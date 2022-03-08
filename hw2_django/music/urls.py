from django.urls import path
from . import views

app_name = "music"

urlpatterns = [
    path('', views.index, name='index'),
    path('registration/', views.registration, name='registration'),
    path('retrieve/', views.retrieve, name='retrieve'),
]