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
    if request.method == 'POST':
        username = request.POST['username']
        user = get_object_or_404(User, pk=username)

        #return HttpResponseRedirect(reverse('music:song_retrieve'))
        return render(request, 'music/song_retrieve.html', {'user': user}) # not sure how to do the reverse and also pass along the correct variable i.e the user so just using render for now
    
    else:
        return render(request, 'music/song_retrieve.html')

def year_retrieve(request):
    # TODO Implement form that given a year returns all the songs from that year 
    pass





