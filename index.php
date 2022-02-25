<!-- 
  COMP 333: Software Engineering
  Sebastian Zimmeck (szimmeck@wesleyan.edu) 

  PHP sample script for querying a database with SQL. This script can be run 
  from inside the htdocs directory in XAMPP. The script assumes that there is a 
  database set up (e.g., via PHPMyAdmin) named COMP333_SQL_Tutorial with a 
  student_grades table per the sql_tutorial.md.
-->

<!DOCTYPE HTML>
<html lang="en">
<head>
  <!-- This is the default encoding type for the Html Form post submission. 
  Encoding type tells the browser how the form data should be encoded before 
  sending the form data to the server. 
  https://www.logicbig.com/quick-info/http/application_x-www-form-urlencoded.html-->
  <meta http-equiv="Content-Type" content="application/x-www-form-urlencoded"/>
  <link rel="stylesheet" type="text/css" href="music_style.css" media="screen" />
<title>Music Database Registration and Song Retrieval</title>
</head>

<body>
  <!-- 
    PHP code for retrieving data from the database.
  -->
  <?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "music_db";

    // Create server connection.
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check server connection.
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    if(isset($_REQUEST["submit"])){
      // Variables for the output and the web form below.
      $out_value = array();
      $s_username = $_REQUEST['username'];

      // Check that the user entered data in the form.
      if(!empty($s_username)){
        // If so, prepare SQL query with the data.
        $sql_query = "SELECT * FROM ratings WHERE username = ('$s_username')";
        // Send the query and obtain the result.
        // mysqli_query performs a query against the database.
        $result = mysqli_query($conn, $sql_query);
        // mysqli_fetch_assoc rturns an associative array that corresponds to the 
        // fetched row or NULL if there are no more rows.
        // Probably does not make much of a difference here, but, e.g., if there are
        // multiple rows returned, you can iterate over those with a loop.
        $firstrow = mysqli_fetch_assoc($result);
        if ($firstrow == NULL){
            array_push($out_value, "No songs found for this user. Make sure you are registered and have rated songs.");
        }
        else {
            array_push($out_value, $firstrow['song'] . " -> " . $firstrow['rating']);
        }
        while($row = mysqli_fetch_assoc($result)){
            array_push($out_value, $row['song'] . " -> " . $row['rating']);
        }
      }
      else{
        array_push($out_value, "Please enter username.");
      }
    }

    if(isset($_REQUEST["register"])){
        // Variables for the output and the web form below.
        $out_value_register = "";
        $s_username = $_REQUEST['username_register'];
        $s_password = $_REQUEST['password'];

        // Check that the user entered data in the form.
        if(!empty($s_username) && !empty($s_password)){
            // If so, prepare SQL query with the data.
            $sql_query = "INSERT INTO users (`username`, `password`) VALUES ('$s_username', '$s_password')";
            // Send the query and obtain the result.
            // mysqli_query performs a query against the database.
            if(mysqli_query($conn, $sql_query)){
                $out_value_register = "Registration successful!";
            }
            else{
                $out_value_register = "Username already taken. Please choose a different username.";
            }
            // mysqli_fetch_assoc rturns an associative array that corresponds to the 
            // fetched row or NULL if there are no more rows.
            // Probably does not make much of a difference here, but, e.g., if there are
            // multiple rows returned, you can iterate over those with a loop.
        }
        else {
            $out_value_register = "Please enter a username and password.";
        }
    }

    $conn->close();
  ?>

  <!-- 
    HTML code for the form by which the user can query data.
    Note that we are using names (to pass values around in PHP) and not ids
    (which are for CSS styling or JavaScript functionality).
    You can leave the action in the form open 
    (https://stackoverflow.com/questions/1131781/is-it-a-good-practice-to-use-an-empty-url-for-a-html-forms-action-attribute-a)
  -->

  <h1>music_db</h1>
  <hr>
  <h2>Registration</h2>

  <form method="POST" action="">
  Username: <input type="text" name="username_register" /><br>
  Password: <input type="text" name="password" /><br>
  <input type="submit" name="register" value="Register"/>
  </form>

  <p><?php 
    if(!empty($out_value_register)){
        echo $out_value_register;
    }
    ?></p>

  <br>
  <br>
  <hr>

  <h2>Retrieve Songs by Username</h2>

  <form method="POST" action="">
  Username: <input type="text" name="username" /><br>
  <input type="submit" name="submit" value="Submit"/>
  <!-- 
    Make sure that there is a value available for $out_value.
    If so, print to the screen.
  -->
  <p><?php 
    
    if(!empty($out_value)){
      foreach($out_value as $song){
          echo $song;
          echo "<br>";
      }
    }
    
  ?></p>
  </form>
</body>
</html>