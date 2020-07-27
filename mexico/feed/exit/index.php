<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

$click_id=$_GET['clickid'];
$aff_id=$_POST['aff_id'];

if($click_id!='') {
setcookie("sd",$click_id,time()+31536000);
} else {
$click_id=1;
}
?>

<link rel="stylesheet" href="//zaimdozp.com.ua/exit/bootstrap.css">
<link href="//zaimdozp.com.ua/exit/styles.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Scada:400,700&amp;subset=cyrillic" rel="stylesheet">
<script src="//use.fontawesome.com/bb1a3e6682.js"></script>

<div id="popup-inner">

	<div class="header">
		<img id="pig" src="//zaimdozp.com.ua/exit/pig.png" alt="Кредит на выгодных условиях">
		<h2>Хотите получить кредит на&nbsp;самых выгодных условиях?</h2>
	</div>

	<div class="body">

		<form id="sendform">
			<h3>Подпишитесь на&nbsp;нашу рассылку с&nbsp;акциями кредитных компаний:</h3>
			<input type="hidden" id="click_id" name="click_id" value="<?php echo($click_id); ?>"/>
			<input type="hidden" id="aff_id" name="aff_id" value="<?php echo($aff_id); ?>"/>
			<div class="input-group">
				<span class="input-group-addon"><i class="fa fa-user" aria-hidden="true"></i></span>
				<input type="text" id="client" name="client" class="form-control" placeholder="Ваше имя…">
			</div>
			<div class="input-group">
				<span class="input-group-addon"><i class="fa fa-envelope" aria-hidden="true"></i></span>
				<input type="email" id="email" name="email" class="form-control" placeholder="Ваш email…">
			</div>
			<button class ="btn btn-primary blue btn-block" name="fsubmit" id="fsubmit">
				Подписаться »
			</button>
		</form>

	</div>

	<a id="popup-close"><i class="fa fa-2x fa-times-circle" aria-hidden="true"></i></a>
</div>