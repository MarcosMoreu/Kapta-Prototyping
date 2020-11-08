<?php
include '.env/process.php';
$queryURL = $_POST['qurl'];
$return = goProxy($queryURL);
//echo $return;
?>
