from django.db import models

class User(models.Model):
    username = models.CharField(max_length=200, primary_key=True)
    password = models.CharField(max_length=200)
    def __str__(self):
        return self.username

class Song(models.Model):
    song_name = models.CharField(max_length=200, primary_key=True)
    artist = models.CharField(max_length=200)
    def __str__(self):
        return self.song_name

class Rating(models.Model): # each rating is associated to a user and a song, if either is deleted, so is the rating
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    rating = models.IntegerField(default=0)
    def __str__(self):
        return str(self.user.username + ", " + self.song.song_name)