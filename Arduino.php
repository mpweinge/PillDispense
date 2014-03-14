<?php

header("Content-Type: text/plain");
header("Access-Control-Allow-Origin: *");

$ArduinoName = "http://192.168.240.1/arduino/" . $_GET['number'];

if (isset($_GET['SendText']))
{
	$cookie = tmpfile();
	$userAgent = 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31' ;

	$ch = curl_init($ArduinoName);

	$options = array(
	    CURLOPT_CONNECTTIMEOUT => 20 , 
	    CURLOPT_USERAGENT => $userAgent,
	    CURLOPT_AUTOREFERER => true,
	    CURLOPT_FOLLOWLOCATION => true,
	    CURLOPT_RETURNTRANSFER => true,
	    CURLOPT_COOKIEFILE => $cookie,
	    CURLOPT_COOKIEJAR => $cookie ,
	    CURLOPT_SSL_VERIFYPEER => 0 ,
	    CURLOPT_SSL_VERIFYHOST => 0
	);

	curl_setopt_array($ch, $options);
	$kl = curl_exec($ch);
	curl_close($ch);
	echo $kl;
}