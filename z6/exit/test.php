<?php

$url = 'http://offers.salesdoubler.affise.com/postback?clickid=367817971&action_id=266951231&goal=1&sum=0&secure=9c0ea3afa4f5115c19e1b90a87dd7d7b';
/*$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.6 (KHTML, like Gecko) Chrome/16.0.897.0 Safari/535.6');
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_REFERER, $url);
curl_setopt($ch, CURLOPT_COOKIEFILE, '');
$content = curl_exec($ch);
curl_close($ch);

echo($content);
 */

/* $headers = get_headers($url,1);
$target_url =  $headers["Location"]; */
header('Location:'.$url);






?>