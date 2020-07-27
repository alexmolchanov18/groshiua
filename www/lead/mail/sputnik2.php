<?
$email = 'inforix@salesdoubler.com.ua';
$user = 'provisioning@salesdoubler.com.ua';
$password = 'U*8W56gN7L1c';

$first_name = substr(htmlspecialchars(trim($_POST['name'])), 0, 50);

$parts = parse_url($url);
parse_str($parts['query'], $query);
//echo $query['utm_source'];
//echo $query['utm_campaign'];


// if($first_name == '') { $first_name = ''; }

$phone = substr(htmlspecialchars(trim($_POST['phone'])), 0, 50);
$email = substr(htmlspecialchars(trim($_POST['email'])), 0, 50);
$sum = substr(htmlspecialchars(trim($_POST['money'])), 0, 500);
$utm_source = substr(htmlspecialchars(trim($_POST['utm_source'])), 0, 500);
$utm_campaign = substr(htmlspecialchars(trim($_POST['utm_campaign'])), 0, 500);

echo $utm_source;
echo(' ');
echo $utm_campaign; 



$sum = str_replace('+','',$sum);
$sum = str_replace(' ','',$sum);
$ip =  $_SERVER['REMOTE_ADDR'];

$subscribe_contact_url = 'https://esputnik.com/api/v1/contact/subscribe';

$json_contact_value = new stdClass();
$contact = new stdClass();
$contact->firstName = $first_name;
$contact->channels = array(
		array('type'=>'email', 'value' => $email),
		array('type'=>'sms', 'value' => $phone)
		);

$contact->fields = array(
	array('id' => '85338', 'value' => $ip),
    array('id' => '85344', 'value' => $sum),
    array('id' => '86879', 'value' => $utm_source),
    array('id' => '86880', 'value' => $utm_campaign),
);


$json_contact_value->contact = $contact;
$json_contact_value->groups = array('groshiua.online');	// группы, в которые будет помещен контакт
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


// Save to CSV
$db_name = "database.csv";
$data=";$first_name;;;;;;$email;$phone;;;;;;;;;;$ip;$sum;$utm_source;$utm_campaign" . "\r\n";
file_put_contents($db_name,$data,FILE_APPEND|LOCK_EX);
?>
