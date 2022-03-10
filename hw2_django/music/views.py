from django.shortcuts import render, get_object_or_404
from django.template import loader
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from .models import User, Song, Rating, Year

def index(request): # view for home page
    return render(request, 'music/index.html')

def registration(request): # view that handles new user registration to database, shows error msg on failure, redirects to index on success
    if request.method == 'POST':

        reg_username = request.POST['username_register']
        reg_password = request.POST['password']
        
        if len(reg_username) == 0 or len(reg_password) == 0:
            return render(request, 'music/registration.html', {'user_error': "Failed to enter Username and Password"})
        else:
            valid_name = True # checks to make sure username is free. There may be a better way to do this
            for user in User.objects.all():
                if user.username == reg_username:
                    valid_name = False
            
            if valid_name: # adds new user to db
                new_user = User(username= reg_username, password= reg_password)
                new_user.save()
                return HttpResponseRedirect(reverse('music:registration'))

            else:
                return render(request, 'music/registration.html', {'user_error': "That username is already in use."})
    
    else:
        return render(request, 'music/registration.html')

def song_retrieve(request):
    # Check if form was submitted
    if request.method == 'POST':
        username = request.POST['username']
        user = get_object_or_404(User, pk=username)

        #return HttpResponseRedirect(reverse('music:song_retrieve'))
        return render(request, 'music/song_retrieve.html', {'user': user}) # not sure how to do the reverse and also pass along the correct variable i.e the user so just using render for now
    
    else:
        # If just a GET request then just show the song lookup page 
        return render(request, 'music/song_retrieve.html')

def year_retrieve(request):
    # Check if form was submitted 
    if request.method == 'POST':
        year = request.POST['year']
        date = get_object_or_404(Year, pk=year)
        # Check if there are no songs registered with the given year
        if date.song_set.all().count() == 0:
            return render(request, 'music/year_retrieve.html', {'alert':'Sorry, there are no listed songs for the given year!'})
        songs = {}
        # Iterate through songs released in the given year, adding a (key,value) pair to the songs dict containing the name of the song as the key 
        # and the average rating along with an indicater stating the song was popular (if the song genre matches the top genre of the given year) as the value
        for song in date.song_set.all():
            total = 0
            pop = ''
            # Check if song genre matches the top genre for that year
            if song.genre == date.top_genre:
                pop = 'Song is popular!'
            # Check if the song has any reviews
            if song.rating_set.all().count() == 0:
                songs[song.song_name] = 'No reviews yet.' + pop
            else:
                # Iterate through reviews of the song and calculate average rating score
                for review in song.rating_set.all():
                    total += review.rating
                avg_score = total / song.rating_set.all().count()
                songs[song.song_name] = 'Average Rating --> ' + str(avg_score) + ". " + pop
        
        #return HttpResponseRedirect(reverse('music:year_retrieve'))
        return render(request, 'music/year_retrieve.html', {'songs': songs}) # not sure how to do the reverse and also pass along the correct variable i.e the year so just using render for now

    else:
        # If just a GET request then just show the year lookup page 
        return render(request, 'music/year_retrieve.html')



