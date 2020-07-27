<?php
	header("Location: /");
    require_once(__DIR__.'/api/init.php');

    $isDebug = false;
    $smartMoneyAPI = new SmartMoneyAPI($isDebug);
    $smartMoneyAPI->send();
?>