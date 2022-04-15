from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Song, Year, Rating

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('username', 'password')
  
  def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class SongSerializer(serializers.ModelSerializer):
  class Meta:
    model = Song
    fields = ('song_name', 'artist', 'genre', 'year')

class YearSerializer(serializers.ModelSerializer):
  class Meta:
    model = Year
    fields = ('date', 'top_genre')

class RatingSerializer(serializers.ModelSerializer):
  class Meta:
    model = Rating
    # The id is automatically created as a primary key by our Django model
    # and we can included it here as well.
    fields = ('id', 'user', 'song', 'rating')