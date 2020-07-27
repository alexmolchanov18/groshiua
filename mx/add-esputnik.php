<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo "Accepted only POST requests.";
    http_response_code(400);
    die();
}

$response = new stdClass();
$response->status = "error";

$user = 'em@salesdoubler.com.ua';
$password = 'Gkd8skHld056KddsJ9';
$subscribe_contact_url = 'https://esputnik.com/api/v1/contact/subscribe';

// Subscribe contact
function send_request($url, $json_value, $user, $password) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($json_value));
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_USERPWD, $user.':'.$password);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSLVERSION, 6);
    curl_setopt($ch, CURLOPT_VERBOSE, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    echo json_encode($json_value);
    $output = curl_exec($ch);

    $result = json_decode($output);

    if (!empty($result)) {
        $response->status = "success";
        $response->id = $result->id;
    }

    echo json_encode($response);

    curl_close($ch);
}


function getRealIpAddr() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }

    return $ip;
}

$email      = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$phone      = filter_var($_POST['phone'], FILTER_SANITIZE_NUMBER_INT);

// Check if phone is present in phone else - search for tel
if (empty($phone)) {
    $phone  = filter_var($_POST['tel'], FILTER_SANITIZE_NUMBER_INT);
}


//replace all but numbers in phone
$phone      = preg_replace('/[^0-9]/', '', $phone);

$name       = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
$country    = filter_var($_POST['country'], FILTER_SANITIZE_STRING);
$money      = filter_var($_POST['money'], FILTER_SANITIZE_NUMBER_INT);


// final check for valid phone or email
if (empty($phone) && empty($email)) {
    echo json_encode($response);
    return;
}

// Create lead
$contact = new stdClass();
$json_contact_value = new stdClass();


/*
    Important fields
*/
// $contact->firstName = $name;
$contact->channels[] = array('type' => 'email', 'value' => $email);
$contact->channels[] = array('type' => 'sms', 'value' => $phone);

/*
    Custom fields
*/
$contact->fields[] = array('id' => 92854, 'value' => $name);
$contact->fields[] = array('id' => 93228, 'value' => $phone);
$contact->fields[] = array('id' => 93221, 'value' => $country);
$contact->fields[] = array('id' => 92856, 'value' => $money);

$json_contact_value->contact = $contact;


// Array of groups
$json_contact_value->groups = array('Subscription');
// print_r($json_contact_value);
send_request($subscribe_contact_url, $json_contact_value, $user, $password);

