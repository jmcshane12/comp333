# Instructions for creating music-db

## 1. Create music_db Database

Create the music_db database:

```sql
CREATE DATABASE music_db;
```

## 2. Users Table

Create the users table, with username and password set to take character strings with a maximum length of 255, and the primary key set to username. Then, insert the two rows from the handout:

```sql
CREATE TABLE `music_db`.`users` ( `username` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , PRIMARY KEY (`username`)) ENGINE = InnoDB;
INSERT INTO `users` (`username`, `password`) VALUES ('Amelia-Earhart', 'Youaom139&yu7');
INSERT INTO `users` (`username`, `password`) VALUES ('Otto', 'StarWars2*');
```

## 3. Song Table

Create the song table, which lists songs and artists represented as character strings with a maximum length of 255, with song as the primary key.

```sql
CREATE TABLE `music_db`.`artists` ( `song` VARCHAR(255) NOT NULL , `artist` VARCHAR(255) NOT NULL , PRIMARY KEY (`song`)) ENGINE = InnoDB;
INSERT INTO `artists` (`song`, `artist`) VALUES ('Freeway', 'Aimee Mann');
INSERT INTO `artists` (`song`, `artist`) VALUES ('Days of Wine and Roses', 'Bill Evans');
INSERT INTO `artists` (`song`, `artist`) VALUES ('These Walls', 'Kendrick Lamar');
```

## 4. Ratings Table

Create the ratings table, with an automatically incrementing id, where the primary key is set to id, id and rating are integers with a maximum length of 1, username and song take character strings with a maximum length of 255. Additionally, we need to alter this table such that username and songs are foreign keys, such that if a username or song are deleted, the ratings corresponding with either variable are deleted as well.

```sql
CREATE TABLE `music_db`.`ratings` ( `id` INT(1) NOT NULL AUTO_INCREMENT , `username` VARCHAR(255) NOT NULL , `song` VARCHAR(255) NOT NULL , `rating` INT(1) NOT NULL , PRIMARY KEY (`id`), FOREIGN KEY (`username`) REFERENCES `music_db`.`users` (`username`) ON DELETE CASCADE, FOREIGN KEY (`song`) REFERENCES `music_db`.`artists` (`song`) ON DELETE CASCADE) ENGINE = InnoDB;
INSERT INTO `ratings` (`id`, `username`, `song`, `rating`) VALUES (NULL, 'Amelia-Earhart', 'Freeway', '3');
INSERT INTO `ratings` (`id`, `username`, `song`, `rating`) VALUES (NULL, 'Amelia-Earhart', 'Days of Wine and Roses', '4');
INSERT INTO `ratings` (`id`, `username`, `song`, `rating`) VALUES (NULL, 'Otto', 'Days of Wine and Roses', '5');
INSERT INTO `ratings` (`id`, `username`, `song`, `rating`) VALUES (NULL, 'Amelia-Earhart', 'These Walls', '4');
```