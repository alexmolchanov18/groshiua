<?php
$name = substr(htmlspecialchars(trim($_POST['name'])), 0, 50);
$phone = substr(htmlspecialchars(trim($_POST['phone'])), 0, 50);
$email = substr(htmlspecialchars(trim($_POST['email'])), 0, 50);
$money = substr(htmlspecialchars(trim($_POST['money'])), 0, 500);
$money = str_replace('+','',$money);
$money = str_replace(' ','',$money);
$ip =  $_SERVER['REMOTE_ADDR']; 

$mess = 'Имя: '.$name."\r\n".
'Телефон: '.$phone."\r\n".
'E-mail: '.$email."\r\n".
'Сумма: '.$money.' гривен'."\r\n".
'IP-адрес: '.$ip;

// подключаем файл класса для отправки почты
require 'class.phpmailer.php';
$mail = new PHPMailer();
$mail -> From = $email;
// от кого

$mail -> addAddress('provisioning@salesdoubler.com.ua', 'Groshi.ua');

// выставляем формат письма HTML
$mail -> IsHTML(false);

$mail -> Subject = 'Запрос от Groshi.ua';
$mail -> Body = $mess;

// отправляем наше письмо
if (!$mail -> Send())
	die('Mailer Error: ' . $mail -> ErrorInfo);
echo $money;

if (!empty($_POST['submit']))
	complete_mail();

?>