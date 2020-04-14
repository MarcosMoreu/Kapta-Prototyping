<?php

// Connect to a database
$conn = mysqli_connect('167.71.129.243', 'marcosmxv', 'ulanduse', 'testjson');

// echo 'Processing...';

// Check for POST variable
if(isset($_POST['toSend'])){
  $name = mysqli_real_escape_string($conn, $_POST['toSend']);
//  echo 'POST: Your name is '. $_POST['name'];
//insert into table_name(toSend)
 $query = "INSERT INTO json(testjson) VALUES('$person')";

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
}
