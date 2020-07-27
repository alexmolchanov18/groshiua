<?
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

$userIp = $_SERVER["REMOTE_ADDR"];
$click_id = $_GET['aff_sub'];
if($click_id !=''){
setcookie("sd", $click_id, time()+31536000);
} else {
$click_id = 1;
}
?>


<link href="/popup/styles.css" rel="stylesheet"> 
<link href="https://fonts.googleapis.com/css?family=Scada:400,700&amp;subset=cyrillic" rel="stylesheet"> 

<div id="popup-inner">
	
<div class="header">
<h2>Хотите получить кредит на&nbsp;самых выгодных условиях?</h2>
</div>

<div class="body">
<h3>Подпишитесь на&nbsp;нашу рассылку с&nbsp;акциями кредитных компаний:</h3>
<form id="sendform">
<input type="hidden" id="userip" name="userip" value="<?php echo($userIp); ?>"/>
<input type="hidden" id="clickid" name="clickid" value="<?php echo($click_id); ?>"/>	
<input type="text" id="client" name="client" placeholder="Ваше имя…" /></br>
<input type="email" id="email" name="email" placeholder="Ваше email…" /></br>
<button name="fsubmit" id="fsubmit">Подписаться »</button>	
	
	
</form>
	
	
</div>
	
<a id="popup-close">X</a>
</div>