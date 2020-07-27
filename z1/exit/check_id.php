<?

$user = 'ga.salesdoubler@gmail.com';
$password = 'Ktyf06032009';

$ch = curl_init();
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Content-Type: application/json'));
curl_setopt($ch, CURLOPT_URL, 'https://esputnik.com/api/v1/contacts?startindex=1&maxrows=100');
curl_setopt($ch,CURLOPT_USERPWD, $user.':'.$password);
curl_setopt($ch,CURLOPT_RETURNTRANSFER, 1);

$output = curl_exec($ch);

$x = json_decode($output, true);

for($i=0; $i<count($x); $i++) {
	$click_id = ($x[$i]['fields'][1]['value']);
	
	if($click_id === '367260066') {
		$id = $x[$i]['id'];
		echo($id);
	}
}


curl_close($ch);
?>