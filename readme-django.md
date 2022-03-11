# Instructions for creating music-db (Django)

## 1. Installing Django

Install Django using the command line:

```shell
python3 -m pip install Django
```

## 2. Migrate nessesary database tables

Navigate to the hw2_django directory and run the migrate function from the commnad line using the following prompt:

```shell
python3 manage.py migrate
```

## 3. Populate the database tables

Activate an interactive python session with django enviornment variables using the following command:

```shell
python3 manage.py shell
```

Now import the models from the music app

```python
from music.models import User, Year, Song, Rating
```

First add users to the User table

```python
u1 = User(username = 'Amelia-Earhart', password = 'Youaom139&yu7')
u2 = User(username = 'Otto', password = 'StarWars2*')
u1.save()
u2.save()
```

Now add years to the Year table. Note that normally all of the past ~130 years would be included here, but for the purposes of this demo only years for the songs
we will add in the next step will be included and an error message will be displayed if a user tries to lookup songs for a year not listed in the database. 

```python
y1 = Year(date=1963, top_genre='Rock')
y2 = Year(date=2008, top_genre='Pop')
y3 = Year(date=2015, top_genre='Rap')
y1.save()
y2.save()
y3.save()
```

Now add songs to the Song table

```python
s1 = Song(song_name = 'Freeway', artist = 'Aimee Mann', genre = 'Alternative', year = y2)
s2 = Song(song_name = 'Days of Wine and Roses', artist = 'Bill Evans', genre = 'Jazz', year = y1)
s3 = Song(song_name = 'These Walls', artist = 'Kendrick Lamar', genre = 'Rap', year = y3)
s1.save()
s2.save()
s3.save()
```

Now add ratings to the ratings table

```python
r1 = Rating(user=u1, song=s1, rating=3)
r2 = Rating(user=u1, song=s2, rating=4)
r3 = Rating(user=u2, song=s2, rating=5)
r4 = Rating(user=u1, song=s3, rating=4)
```

## 4. Run the server 

now ^D to exit the python shell and run the following command to start the server

```shell
python3 manage.py runserver
```

## 5. Access website features

Now navigate to http://localhost:8000/music to access all of the website's features!

