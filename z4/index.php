<?php
	$host = 'https://z4.groshiua.site/';
	$promo = $_GET['promo'];
	$source = $_GET['source'];
	$campaign = $_GET['campaign'];
	$tid1 = $_GET['TID1'];
	$tid2 = $_GET['TID2'];
	$aid = $_GET['aid'];

	if ($aid == '') {
    	$aid = '63223';
	}

	$aid = intval($aid);
	$source = '' . $_GET['utm_source'];
	$campaign = '' . $_GET['utm_campaign'];
	$promo = '' . $_GET['utm_medium'];
	$tid1 = '' . $_GET['utm_content'];
	$tid2 = '' . $_GET['utm_term'];

	if ($aid != '') {
		$add_link = "&promo=" . $promo . "&campaign=" . $campaign .
					"&source=" . $source . "&tid1=" . $tid1. "&tid2=" . $tid2;
		$params = array($aid, $promo, $campaign, $source, $tid1, $tid2);
		setcookie('zaimdozp', serialize($params), time()+31536000);
	}
	if ($aid == '' && $_COOKIE['zaimdozp']) {
		$params = unserialize($_COOKIE['zaimdozp']);
		$aid = $params[0];
		$promo = $params[1];
		$campaign = $params[2];
		$source = $params[3];
		$tid1 = $params[4];
		$tid2 = $params[5];
		$add_link = "&promo=" . $promo . "&campaign=" . $campaign .
					"&source=" . $source . "&tid1=". $tid1. "&tid2=" . $tid2;
	}

	if(($aid == '') && ($_COOKIE['zaimdozp'] == '')) {
		$aid = '63223';
		$promo = 'ABD';
		$campaign = 'Abd';
		$tid1 = 'aBd';
		$tid2 = 'aBd';
		$add_link = "&promo=" . $promo . "&campaign=" . $campaign .
					"&source=" . $source . "&tid1=". $tid1. "&tid2=" . $tid2;
	}
	include_once(__DIR__.'/../_common/index.php');
?>