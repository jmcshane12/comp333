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

## 3. Run the Django server

Run the following command to start the server:

```shell
python3 manage.py runserver
```

## 4. Run the React frontend

Navigate to the frontend directory and start the react server.

```shell
cd ..
cd frontend
npm start
```

## 4b. If npm is throwing an error, install npm again, and then circle back to step 4.

```shell
npm install
```

## 5. Log in to the website

Open a web browser and go to http://localhost:3000. Click 'New User Registration' to create a new username and password, or log in with your credentials.

## 6. Enjoy the website.

You can now add, edit and delete songs from the database, as well as add, edit or delete ratings for each song. The average rating of each song is also displayed.
