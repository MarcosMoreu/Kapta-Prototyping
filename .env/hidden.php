<?php
header('Content-type', 'application/json');
header('Content-Type', 'application/x-www-form-urlencoded');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


//error_reporting(E_ERROR | E_PARSE); // to avoid printing errors in console
session_cache_limiter('nocache');
$cache_limiter = session_cache_limiter();

function goProxy($dataURL)
{
	$baseURL = 'http://marcosmoreu.carto.com/api/v2/sql?';
	//  					^ CHANGE THE 'CARTODB-USER-NAME' to your cartoDB url!
	$cartoapi = '&api_key=4e895e6976be4482c0908dabbf81b26b3c96b270';
  // $dataURL = INSERT INTO lumblu (the_geom) VALUES (ST_SetSRID(ST_GeomFromGeoJSON('{"type":"Point","coordinates":[ 15,20 ]}'),4326))
	//				 ^ENTER YOUR API KEY HERE!
	$url = $baseURL.'q='.urlencode($dataURL).$cartoapi;

//	$url = $baseURL.'q='.$dataURL.$api;


	$result = file_get_contents ($url);
	return $result;
}

//for process.php file

// $hostname = '167.71.129.243';
// $username = 'marcosmxv';
// $password = 'ulanduse';
// $database = 'lumblu';

$planetKey = "2b11aafd06e2464a85d2e97c5a176a9a";
$sentinelKey = "064f130d-c591-45b7-a80d-397152d6e995";
$firebaseKey = "AIzaSyDt3_yMQ5Zu_MhqlRzssZ_931YEBzMsIMk";
$cartousername = 'marcosmoreu';
$cartoapi = '&api_key=4e895e6976be4482c0908dabbf81b26b3c96b270';
// $_POST['planetKey'] = "2b11aafd06e2464a85d2e97c5a176a9a";
// $_POST['sentinelKey'] = "064f130d-c591-45b7-a80d-397152d6e995";
// $_POST['firebaseKey'] = "AIzaSyDt3_yMQ5Zu_MhqlRzssZ_931YEBzMsIMk";


?>

<?php echo $planetKey; ?>,
<?php echo $sentinelKey; ?>,
<?php echo $firebaseKey; ?>,
<?php echo $cartousername; ?>,
<?php echo $cartoapi; ?>
