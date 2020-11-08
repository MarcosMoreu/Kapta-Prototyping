<?php
header('Content-type', 'application/json');
header('Content-Type', 'application/x-www-form-urlencoded');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


//error_reporting(E_ERROR | E_PARSE); // to avoid printing errors in console
session_cache_limiter('nocache');
$cache_limiter = session_cache_limiter();

function goProxy($queryURL)
{
	$baseURL = 'http://marcosmoreu.carto.com/api/v2/sql?';
	$cartoapi = '&api_key=4e895e6976be4482c0908dabbf81b26b3c96b270';

	$url = $baseURL.'q='.urlencode($queryURL).$cartoapi;

	$result = file_get_contents ($url);
	return $result;
}

?>
