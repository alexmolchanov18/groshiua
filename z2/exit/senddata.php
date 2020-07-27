<?

$user = 'ga.salesdoubler@gmail.com';
$password = 'Ktyf06032009';

$last_name = $_POST['client'];
$email = $_POST['email'];
$aff_id = $_POST['aff_id'];
$click_id = $_POST['click_id'];

// Send to eSputnik
$create_contact_url = 'https://esputnik.com/api/v1/contact';
$contact = new stdClass();
$contact -> firstName = $last_name;
$contact -> channels = array( array('type' => 'email', 'value' => $email));
$contact -> fields = array( array('id' => '46786', 'value' => $aff_id), array('id' => '48931', 'value' => $click_id) );
$contact -> groups = array( array('name' => 'Group1'));

$id = send_request($create_contact_url, $contact, $user, $password);

function send_request($url, $json_value, $user, $password) {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($json_value));
	curl_setopt($ch, CURLOPT_HEADER, false);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Content-Type: application/json'));
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_USERPWD, $user . ':' . $password);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$output = curl_exec($ch);
	curl_close($ch);
	$out = json_decode($output, true);
	$id = $out['id'];
	return $id;
}

/*
$ch = curl_init();
curl_setopt($ch, CURLOPT_HEADER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Content-Type: application/json'));
curl_setopt($ch, CURLOPT_URL, 'https://esputnik.com/api/v1/contacts?startindex=1&maxrows=10');
curl_setopt($ch,CURLOPT_USERPWD, $user.':'.$password);
curl_setopt($ch,CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
$x = json_decode($output, true);
curl_close($ch);

for($i=0; $i<count($x); $i++) {
	$click = ($x[$i]['fields'][1]['value']);
		if($click == $click_id) {
			$id = $x[$i]['id'];
		}
}
*/

$url = 'http://offers.salesdoubler.affise.com/postback?clickid='.$click_id.'&action_id='.$id.'&goal=1&sum=0&secure=9c0ea3afa4f5115c19e1b90a87dd7d7b';

$ch = curl_init();
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

$message = json_decode($content, true);
echo $message = $message['status'];

?>
