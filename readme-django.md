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
>>> from music.models import User, Year, Song, Rating
```

First add users to the User table

```python
>>> u1 = User(username = 'Amelia-Earhart', password = 'Youaom139&yu7')
>>> u2 = User(username = 'Otto', password = 'StarWars2*')
>>> u1.save()
>>> u2.save()
```

Now add years to the Year table. Note that normally all of the past ~130 years would be included here, but for the purposes of this demo only years for the songs
we will add in the next step will be included, and a 404 message will be generated if a user tries to lookup songs for a year not listed in the database. 

```python
>>> y1 = Year(date=1963, top_genre='Rock')
>>> y2 = Year(date=2008, top_genre='Pop')
>>> y3 = Year(date=2015, top_genre='Rap')
>>> y1.save()
>>> y2.save()
>>> y3.save()
```

Now add songs to the Song table

```python
>>> s1 = Song()
>>> s2 = 
>>> s3 = 
```

## 4. Run the server 



## 5. Access website features


