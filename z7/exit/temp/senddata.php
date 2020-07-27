<?
    $api_key = "97e068b6d75d4fa44b0bd51be30a70fb";
    $code = $_POST['code'];
    $format = $_POST['format'];
    $subid = $_POST['subid'];
    $tel = $_POST['tel'];
    $traffic_type = $_POST['traffic_type'];
    $ip = $_POST['ip'];
    
    $url = "https://api.monsterleads.pro/method/order.add?api_key=".$api_key;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_FAILONERROR, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, "code=".$code."&format=".$format."&subid=".$subid."&tel=".$tel."&fraffic_type=".$traffic_type."&ip=".$ip);
    $result = curl_exec($ch);
    curl_close($ch);
    echo $result;
?>
