from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from .models import User, Song, Rating

def index(request): # view for home page
    template = loader.get_template('music/index.html')
    return HttpResponse(template.render({'error_message': False}, request))

def registration(request): # view that handles new user registration to database, shows error msg on failure, redirects to index on success
    reg_username = request.POST['username_register']
    reg_password = request.POST['password']
    
    if len(reg_username) == 0 or len(reg_password) == 0:
        return render(request, 'music/index.html', {'user_error': "Failed to enter Username and Password"})
    else:

        valid_name = True # checks to make sure username is free. There may be a better way to do this
        for user in User.objects.all():
            if user.username == reg_username:
                valid_name = False
        
        if valid_name: # adds new user to db
            new_user = User(username= reg_username, password= reg_password)
            new_user.save()
            return HttpResponseRedirect(reverse('music:index'))

        else:
            return render(request, 'music/index.html', {'user_error': "That username is already in use."})

def retrieve(request): #TODO view that shows index.html template with input user's song ratings
    HttpResponse("you are at the rating retrieval page")