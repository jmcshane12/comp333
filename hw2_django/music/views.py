from django.shortcuts import render, get_object_or_404
from django.template import loader
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from .models import User, Song, Rating, Year
from rest_framework import viewsets
from .serializers import UserSerializer, SongSerializer, YearSerializer, RatingSerializer

class UserView(viewsets.ModelViewSet):
  # Create a new TodoSerializer instance.
  serializer_class = UserSerializer
  # Todo.objects.all() retrieves all the Todo objects in the database.
  queryset = User.objects.all()

class SongView(viewsets.ModelViewSet):
  # Create a new TodoSerializer instance.
  serializer_class = SongSerializer
  # Todo.objects.all() retrieves all the Todo objects in the database.
  queryset = Song.objects.all()

class RatingView(viewsets.ModelViewSet):
  # Create a new TodoSerializer instance.
  serializer_class = RatingSerializer
  # Todo.objects.all() retrieves all the Todo objects in the database.
  queryset = Year.objects.all()

class YearView(viewsets.ModelViewSet):
  # Create a new TodoSerializer instance.
  serializer_class = YearSerializer
  # Todo.objects.all() retrieves all the Todo objects in the database.
  queryset = Rating.objects.all()

# view for home page
def index(request):
    return render(request, 'music/index.html')

# view that handles new user registration to database, shows error msg on failure, redirects to index on success
def registration(request):
    if request.method == 'POST':

        reg_username = request.POST['username_register']
        reg_password = request.POST['password']
        

        if len(reg_username) == 0 or len(reg_password) == 0:
            return render(request, 'music/registration.html', {'user_error': "Failed to enter Username and Password"})
        
        # checks to make sure username is free.
        elif not User.objects.filter(username=reg_username).exists():
                # adds new user to db
                new_user = User(username= reg_username, password= reg_password)
                new_user.save()
                return HttpResponseRedirect(reverse('music:registration'))

        else:
            return render(request, 'music/registration.html', {'user_error': "That username is already in use."})
    
    else:
        return render(request, 'music/registration.html')


# View for getting all songs reviewed by a given username
def song_retrieve(request):
    # Check if form was submitted
    if request.method == 'POST':
        username = request.POST['username']
        
        # Check if there was an empty submission
        if len(username) == 0:
            return render(request, 'music/song_retrieve.html', {'alert': "Please enter a Username"})

        
        # If the username is not in the database, display error message
        if not User.objects.filter(username=username).exists():
            return render(request, 'music/song_retrieve.html', {'alert': 'Sorry, that username is not registered'})

        # Otherwise the username is in the database so we render the song_retrieve template with the corresponding User object
        user = get_object_or_404(User, pk=username)
        return render(request, 'music/song_retrieve.html', {'user': user})
    
    else:
        # If just a GET request then just show the song_retrieve template 
        return render(request, 'music/song_retrieve.html')


# View for getting all songs from a given year, along with an 
def year_retrieve(request):
    # Check if form was submitted 
    if request.method == 'POST':
        year = request.POST['year']

        # Check if a year was entered
        if len(year) == 0:
            return render(request, 'music/year_retrieve.html', {'alert': "Please enter a Year"})
        
        # Check if the year is in the database
        if not Year.objects.filter(date=year).exists():
            return render(request, 'music/year_retrieve.html', {'alert': "Sorry, the given year is not registered"})

        date = get_object_or_404(Year, pk=year)
        
        # Check if there are no songs registered with the given year
        if date.song_set.all().count() == 0:
            return render(request, 'music/year_retrieve.html', {'alert':'Sorry, there are no listed songs for the given year!'})

        # Iterate through songs released in the given year, adding a (key,value) pair to the songs dict containing the name of the song as the key 
        # and the average rating along with an indicater stating the song was popular (if the song genre matches the top genre of the given year) as the value
        songs = {}
        for song in date.song_set.all():
            total = 0
            pop = ''
            # Check if song genre matches the top genre for that year
            if song.genre == date.top_genre:
                pop = '.  Song is popular!'
            # Check if the song has any reviews
            if song.rating_set.all().count() == 0:
                songs[song.song_name] = 'No reviews yet.  ' +  'Artist : ' + song.artist + '.  Genre : ' + song.genre + pop
            else:
                # Iterate through reviews of the song and calculate average rating score
                for review in song.rating_set.all():
                    total += review.rating
                avg_score = total / song.rating_set.all().count()
                songs[song.song_name] = 'Average Rating --> ' + str(avg_score) +  '.  Artist : ' + song.artist + '.  Genre : ' + song.genre + pop
        
        return render(request, 'music/year_retrieve.html', {'songs': songs}) 

    else:
        # If just a GET request then just show the year_retrieve template
        return render(request, 'music/year_retrieve.html')

