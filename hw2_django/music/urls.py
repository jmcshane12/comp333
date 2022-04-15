from django.urls import path, include
from . import views
from django.contrib import admin
from rest_framework import routers
from music import views

app_name = "music"

# Create a new router.

#router = routers.DefaultRouter()

# Register our TodoView for use under the /todos path (first argument).
# r indicates a raw string in Python meaning that characters like '\' are escaped.
# Reference to our TodoView (second argument).
# The basename 'todo' for use in our code (third argument)
# https://stackoverflow.com/questions/22083090/what-base-name-parameter-do-i-need-in-my-route-to-make-this-django-api-work
# For more info see: https://www.django-rest-framework.org/api-guide/routers/

#router.register(r'users', views.UserView, 'User')
#router.register(r'songs', views.SongView, 'Song')
#router.register(r'ratings', views.RatingView, 'Rating')
#router.register(r'years', views.YearView, 'Year')


urlpatterns = [
    path('', views.index, name='index'),
    path('registration/', views.registration, name='registration'),
    path('song_retrieve/', views.song_retrieve, name='song_retrieve'),
    path('year_retrieve/', views.year_retrieve, name='year_retrieve'),
#    path('admin/', admin.site.urls),
#    path('api/', include(router.urls))
]