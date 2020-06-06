<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

// Connect to a database
//$conn = mysqli_connect('167.71.129.243', 'root', '', 'ajaxtest');
//$hostname = '167.71.129.243';

$mygeojson = ''; //initiali
$myaudio ='';
$conn = mysqli_connect($hostname, $username, $password, $database) OR DIE ('Unable to connect to database!');

echo 'Processing...';

if(isset($_POST['geojson'])){///////////////////////////////////////////////////////////////////////////////////////////////
  $mygeojson = mysqli_real_escape_string($conn, $_POST['geojson']); //// i !!!!!./////////////////////////////////////////////////
}

if(isset($_POST['audio'])){
  $myaudio = mysqli_real_escape_string($conn, $_POST['audio']);
}

// $myname = $_GET['name'];
//$myname = 'hhhhhhhhhhhh';
//$myname = json_decode($myname1);
//Define the table(users) , the field, and the VALUE that will be inserted
$query = "INSERT INTO lumblu_table(geojson, audio) VALUES('$mygeojson','$myaudio')"; ///// VALUES IS THE FILE THAT WE WANT TO INSERT/////////////////
  //  $query = "INSERT INTO users(audio) VALUES('$myaudio')";
// echo "<script>document.writeln(myname);</script>";
  if(mysqli_query($conn, $query)){
    echo 'User Added...';
  } else {
    echo 'ERROR: '. mysqli_error($conn);
  // }
}

// Check for GET variable
// if(isset($_GET['name'])){
//   echo 'GET: Your name is '. $_GET['name'];
// }

//////////////////////////////////////////////
// Check for POST variable
// if(isset($_POST['nameFF'])){
//   $name = mysqli_real_escape_string($conn, $_POST['nameFF']); //// i !!!!!
//   echo 'POST: Your name is '. $_POST['name'];
//
// $query = "INSERT INTO users(name) VALUES('$name')";
//
//   if(mysqli_query($conn, $query)){
//     echo 'User Added...';
//   } else {
//     echo 'ERROR: '. mysqli_error($conn);
//   }
// }
//
// // Check for GET variable
// if(isset($_GET['name'])){
//   echo 'GET: Your name is '. $_GET['name'];
// }
?>
