<?
$aff_id = $_POST['aff_id'];
session_start();
$SESSION['aff_id'] = $aff_id;



$url = "http://salesdoubler.go2affise.com/click?pid=".$aff_id."&offer_id=211";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.6 (KHTML, like Gecko) Chrome/16.0.897.0 Safari/535.6');
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, $aff_id);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_REFERER, $url);
curl_setopt($ch, CURLOPT_COOKIEFILE, '');
$content = curl_exec($ch);
echo($content);
curl_close($ch);


/* $url = "https://rdr.salesdoubler.com.ua/in/offer/1459?aid=".$aff_id;
$headers = get_headers($url,1);
$target_url =  $headers["Location"];
header('Location:'.$target_url.'&aff_id='.$aff_id);
*/

?>
