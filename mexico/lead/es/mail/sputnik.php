<?
$email = 'inforix@salesdoubler.com.ua';
$user = 'provisioning@salesdoubler.com.ua';
$password = 'u*8W56gN7L1c';

$first_name = substr(htmlspecialchars(trim($_POST['name'])), 0, 50);

/* if($first_name == '') { $first_name = 'Anonimous'; }
if($phone == '') { $phone = ' '; } 
if($email == '') { $email = 'abc@ukr.net'; } */

$phone = substr(htmlspecialchars(trim($_POST['phone'])), 0, 50);
$email = substr(htmlspecialchars(trim($_POST['email'])), 0, 50);
$sum = substr(htmlspecialchars(trim($_POST['money'])), 0, 500);
$sum = str_replace('+','',$sum);
$sum = str_replace(' ','',$sum);
$ip =  $_SERVER['REMOTE_ADDR'];

$subscribe_contact_url = 'https://esputnik.com/api/v1/contact/subscribe';
$contact = new stdClass();
$contact->firstName = $first_name;
$contact->sms = $phone;

$contact->channels = array(
array('type'=>'email', 'value' => $email),
array('type'=>'sms', 'value' => $phone),
);

$contact->fields = array(
	array('id' => '85338', 'value' => $ip),
    array('id' => '85344', 'value' => $sum),
);

$json_contact_value->contact = $contact;
$json_contact_value->groups = array('groshiua.online');	// ������, � ������� ����� ������� �������


send_request($subscribe_contact_url, $json_contact_value, $user, $password);

function send_request($url, $json_value, $user, $password) {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($json_value));
	curl_setopt($ch, CURLOPT_HEADER, 1);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Content-Type: application/json'));
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch,CURLOPT_USERPWD, $user.':'.$password);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER, 1);
	$output = curl_exec($ch);
	echo($output);
	curl_close($ch);
}


?>