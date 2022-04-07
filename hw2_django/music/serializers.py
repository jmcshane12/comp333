from rest_framework import serializers
from .models import User, Song, Year, Rating

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    # The id is automatically created as a primary key by our Django model
    # and we can included it here as well.
    fields = ('username', 'password')

class SongSerializer(serializers.ModelSerializer):
  class Meta:
    model = Song
    # The id is automatically created as a primary key by our Django model
    # and we can included it here as well.
    fields = ('song_name', 'artist', 'genre', 'year')

class YearSerializer(serializers.ModelSerializer):
  class Meta:
    model = Year
    # The id is automatically created as a primary key by our Django model
    # and we can included it here as well.
    fields = ('date', 'top_genre')

class RatingSerializer(serializers.ModelSerializer):
  class Meta:
    model = Rating
    # The id is automatically created as a primary key by our Django model
    # and we can included it here as well.
    fields = ('id', 'user', 'song', 'rating')