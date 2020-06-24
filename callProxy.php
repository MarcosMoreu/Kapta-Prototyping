<?php
include '.env/hidden.php';
$queryURL = $_POST['qurl'];
$return = goProxy($queryURL);
echo $return;
?>
