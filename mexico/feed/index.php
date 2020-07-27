<?php
$promo = $_GET['promo'];
$source = $_GET['source'];
$campaign = $_GET['campaign'];
$tid1 = $_GET['TID1'];
$tid2 = $_GET['TID2'];
$aid = $_GET['aid'];
if($aid == ''){
    $aid = '71115';
}
$aid = intval($aid);

$source = ''.$_GET['utm_source'];
$campaign = ''.$_GET['utm_campaign'];
$promo = ''.$_GET['utm_medium'];
$tid1 = ''.$_GET['utm_content'];
$tid2 = ''.$_GET['utm_term'];

/*$category = $_GET["utm_term"];
$price = $_GET["utm_content"];
if (($category != '') && ($price != '')) {
$add_link = "&tid1=" . $category . "&tid2=" . $price;
} */
// url +, cookie-
// url +, cookie +
if( $aid != '' ) {
$add_link = "&promo=" . $promo . "&campaign=" . $campaign . "&source=" . $source . "&tid1=" . $tid1. "&tid2=" . $tid2;
$params = array($aid, $promo, $campaign, $source, $tid1, $tid2);
setcookie('zaimdozp', serialize($params), time()+31536000);
}
// url -, cookie+
if($aid == '' && $_COOKIE['zaimdozp']) {
$params = unserialize($_COOKIE['zaimdozp']);
$aid = $params[0];
$promo = $params[1];
$campaign = $params[2];
$source = $params[3];
$tid1 = $params[4];
$tid2 = $params[5];
$add_link = "&promo=" . $promo . "&campaign=" . $campaign . "&source=" . $source . "&tid1=". $tid1. "&tid2=" . $tid2;
}
// url -, cookie-
if( ($aid == '') && ($_COOKIE['zaimdozp'] == '') ) {
$aid = '71115';
$promo = 'ABD';
$campaign = 'Abd';
$tid1 = 'aBd';
$tid2 = 'aBd';
$add_link = "&promo=" . $promo . "&campaign=" . $campaign . "&source=" . $source . "&tid1=". $tid1. "&tid2=" . $tid2;
}
?>
<!doctype html> <!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="">
	<!--<![endif]-->
	<head>
        

		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>Préstamos personales rápidos</title>
		<meta name="description" content="Credy te ofrece los mejores préstamos personales y préstamos al instante del mercado ¡Consigue hasta 3.000 $ de manera rápida y fácil!">
		<meta name='convertiser-verification' content='5401d4f0b0942cc2dc47542c2054b7773b526cec' />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="css/bootstrap.min.css">
		<link rel="stylesheet" href="css/bootstrap-theme.min.css">
		<link rel="stylesheet" href="css/main.css">
		<!-- Google Tag Manager
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PD6QTP8');</script>
<!-- End Google Tag Manager -->
    
        
        <!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '2005129789578029');
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=2005129789578029&ev=PageView&noscript=1"
/></noscript>
<!-- End Facebook Pixel Code -->
        
<!--onesignal-->        
<link rel="manifest" href="/manifest.json" />
<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
<script>
  var OneSignal = window.OneSignal || [];
  OneSignal.push(function() {
    OneSignal.init({
      appId: "c76efed0-a86d-4ed7-8696-9cfec87bdfbb",
    });
  });
</script>        
	</head>
	<body style="background-color:#eeeeee;     padding-top: 0px;"  data-spy="scroll" data-target="#navbar">
		<!-- Google Tag Manager (noscript) 
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PD6QTP8"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
		<a name="home" id="home"></a>
		<!--[if lt IE 8]>
		<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
		<![endif]-->
		<!--<div id="preloader">
			<div id="status"><img src="img/logo.png" alt=""/>
			</div>
		</div>-->
		<!--<nav class="navbar navbar-fixed-top" role="navigation">
		<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand home" href="#home"><img src="img/logo.png" alt="GroshiUA"></a>
				</div>
				<div id="navbar" class="navbar-collapse collapse">
					<ul class="nav navbar-nav pull-right">
						<li style="display: none;">
							<a href="#home"></a>
						</li>
						<li>
							<a href="#credits"><i class="fa fa-money" aria-hidden="true"></i> Кредит онлайн</a>
						</li>
						<li>
							<a href="#conditions"><i class="fa fa-check-square-o" aria-hidden="true"></i> Условия получения кредита</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>-->
		<!--<div class="block green">
			<div class="container">
				<div class="row">
					<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
						<img src="img/1select.svg" alt="Выбрать организацию и ;нажать получить деньги" />
						<h4>Выбрать организацию
						<br />
						и&nbsp;нажать «Получить займ»</h4>
						<p>
							Отправка в несколько организаций повышает шанс на получение кредита.
						</p>
					</div>
					<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
						<img src="img/2wait.svg" alt="Дождаться решения по заявке/звонку оператора" />
						<h4>Дождаться решения
						<br />
						по&nbsp;заявке/звонку оператора</h4>
						<p>
							Решение выносится в&nbsp;течении 5-10 минут.
						</p>
					</div>
					<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
						<img src="img/3get.svg" alt="Получить<br />деньги" />
						<h4>Получить
						<br />
						деньги</h4>
						<p>
							на карту или наличными в отделении банка.
						</p>
					</div>
				</div>
			</div>
		</div>-->
		<div class="container">
            
             
            
			<div id="credits" class="block" data-offset="120">
				<h3 class="center"><img class="title-img" src="img/title-credits.svg" />Préstamos personales</h3>
				<h4 class="center decor">¡Obtén tu préstamo en línea!</h4>

                
                
                
               
   
                
                  <!-- Case 1: credy -->
				<div class="cases">
					<div class="cases-logo">
						<a class="rdr" onclick="fbq('track', 'Lead');" href="#" data-href="//go.salesdoubler.net/in/offer/1657?aid=71115" target="_blank"><img src="img/credy.png" alt="ШвидкоГрошi" /></a>
					</div>
					<div>
						<p class="thead">
							Clasificación
						</p>
						<div class="rate rate4" data-toggle="tooltip" data-placement="top" title="Clasificación: 4"></div>
					</div>
					<div>
						<p class="thead">
							Plazo
						</p>
						<p class="term">
							1-30<span>dias</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Cantidad maxima
						</p>
						<p class="max-sum">
							6000<span>$</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Transferencia
						</p>
						<p class="term">
							15<span>minuto</span>
						</p>
					</div>
					<div class="go">
						<a onclick="fbq('track', 'Lead');" href="#" data-href="//go.salesdoubler.net/in/offer/1657?aid=71115" target="_blank" class="rdr btn btn-success">¡Solicítalo <i class="fa fa-chevron-right" aria-hidden="true"></i></a>
					</div>
				</div>
                  
                
                  <!-- Kueski -->
				<div class="cases">
					<div class="cases-logo">
						<a class="rdr" onclick="fbq('track', 'Lead');" href="#" data-href="//go.salesdoubler.net/in/offer/1838?aid=71115" target="_blank"><img src="img/Kueski.png" alt="ШвидкоГрошi" /></a>
					</div>
					<div>
						<p class="thead">
							Clasificación
						</p>
						<div class="rate rate5" data-toggle="tooltip" data-placement="top" title="Clasificación: 5"></div>
					</div>
					<div>
						<p class="thead">
							Plazo
						</p>
						<p class="term">
							3-28<span>dias</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Cantidad maxima
						</p>
						<p class="max-sum">
							2000<span>$</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Transferencia
						</p>
						<p class="term">
							10<span>minuto</span>
						</p>
					</div>
					<div class="go">
						<a href="#" onclick="fbq('track', 'Lead');" data-href="//go.salesdoubler.net/in/offer/1838?aid=71115" target="_blank" class="rdr btn btn-success">¡Solicítalo <i class="fa fa-chevron-right" aria-hidden="true"></i></a>
					</div>
				</div>
                        
                
                  <!-- boomcredit -->
				<div class="cases">
					<div class="cases-logo">
						<a class="rdr" onclick="fbq('track', 'Lead');" href="#" data-href="//go.salesdoubler.net/in/offer/1834?aid=71115" target="_blank"><img src="img/boomcredit.png" alt="creditlike" /></a>
					</div>
					<div>
						<p class="thead">
							Clasificación
						</p>
						<div class="rate rate5" data-toggle="tooltip" data-placement="top" title="Clasificación: 5"></div>
					</div>
					<div>
						<p class="thead">
							Plazo
						</p>
						<p class="term">
							7-30<span>dias</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Cantidad maxima
						</p>
						<p class="max-sum">
							3000<span>$</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Transferencia
						</p>
						<p class="term">
							12<span>minuto</span>
						</p>
					</div>
					<div class="go">
						<a href="#" onclick="fbq('track', 'Lead');" data-href="//go.salesdoubler.net/in/offer/1834?aid=71115" target="_blank" class="rdr btn btn-success">¡Solicítalo <i class="fa fa-chevron-right" aria-hidden="true"></i></a>
					</div>
				</div>
                
                <!-- creditozen -->
				<div class="cases">
					<div class="cases-logo">
						<a class="rdr" onclick="fbq('track', 'Lead');" href="#" data-href="//go.salesdoubler.net/in/offer/1785?aid=71115" target="_blank"><img src="img/creditozen.png" alt="creditlike" /></a>
					</div>
					<div>
						<p class="thead">
							Clasificación
						</p>
						<div class="rate rate5" data-toggle="tooltip" data-placement="top" title="Clasificación: 5"></div>
					</div>
					<div>
						<p class="thead">
							Plazo
						</p>
						<p class="term">
							5-61<span>dias</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Cantidad maxima
						</p>
						<p class="max-sum">
							10000<span>$</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Transferencia
						</p>
						<p class="term">
							7<span>minuto</span>
						</p>
					</div>
					<div class="go">
						<a href="#" onclick="fbq('track', 'Lead');" data-href="//go.salesdoubler.net/in/offer/1785?aid=71115" target="_blank" class="rdr btn btn-success">¡Solicítalo <i class="fa fa-chevron-right" aria-hidden="true"></i></a>
					</div>
				</div>
                
                <!-- Case: CreditoVictoria -->
				<div class="cases">
					<div class="cases-logo">
						<a class="rdr" onclick="fbq('track', 'Lead');" href="#" data-href="//go.salesdoubler.net/in/offer/1822?aid=71115" target="_blank"><img src="img/CreditoVictoria.png" alt="ШвидкоГрошi" /></a>
					</div>
					<div>
						<p class="thead">
							Clasificación
						</p>
						<div class="rate rate5" data-toggle="tooltip" data-placement="top" title="Clasificación: 5"></div>
					</div>
					<div>
						<p class="thead">
							Plazo
						</p>
						<p class="term">
							1-61<span>dias</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Cantidad maxima
						</p>
						<p class="max-sum">
							10000<span>$</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Transferencia
						</p>
						<p class="term">
							10<span>minuto</span>
						</p>
					</div>
					<div class="go">
						<a onclick="fbq('track', 'Lead');" href="#" data-href="//go.salesdoubler.net/in/offer/1822?aid=71115"  target="_blank" class="rdr btn btn-success">¡Solicítalo <i class="fa fa-chevron-right" aria-hidden="true"></i></a>
					</div>
				</div>
                
                 <!-- solcredit -->
				<div class="cases">
					<div class="cases-logo">
						<a class="rdr" onclick="fbq('track', 'Lead');" href="#" data-href="//go.salesdoubler.net/in/offer/1744?aid=71115" target="_blank"><img src="img/solcredito.png" alt="ШвидкоГрошi" /></a>
					</div>
					<div>
						<p class="thead">
							Clasificación
						</p>
						<div class="rate rate4" data-toggle="tooltip" data-placement="top" title="Clasificación: 4"></div>
					</div>
					<div>
						<p class="thead">
							Plazo
						</p>
						<p class="term">
							1-61<span>dias</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Cantidad maxima
						</p>
						<p class="max-sum">
							10000<span>$</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Transferencia
						</p>
						<p class="term">
							10<span>minuto</span>
						</p>
					</div>
					<div class="go">
						<a onclick="fbq('track', 'Lead');" href="#" data-href="//go.salesdoubler.net/in/offer/1744?aid=71115" target="_blank" class="rdr btn btn-success">¡Solicítalo <i class="fa fa-chevron-right" aria-hidden="true"></i></a>
					</div>
				</div>
                
   
                
                
               
                
                
              
                
                 <!-- creditea 
				<div class="cases">
					<div class="cases-logo">
						<a class="rdr" onclick="fbq('track', 'Lead');" href="#" data-href="//go.salesdoubler.net/in/offer/1836?aid=71115" target="_blank"><img src="img/creditea.png" alt="creditea" /></a>
					</div>
					<div>
						<p class="thead">
							Clasificación
						</p>
						<div class="rate rate5" data-toggle="tooltip" data-placement="top" title="Clasificación: 5"></div>
					</div>
					<div>
						<p class="thead">
							Plazo
						</p>
						<p class="term">
							5-48<span>dias</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Cantidad maxima
						</p>
						<p class="max-sum">
							40000<span>$</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Transferencia
						</p>
						<p class="term">
							15<span>minuto</span>
						</p>
					</div>
					<div class="go">
						<a href="#" onclick="fbq('track', 'Lead');" data-href="//go.salesdoubler.net/in/offer/1836?aid=71115" target="_blank" class="rdr btn btn-success">¡Solicítalo <i class="fa fa-chevron-right" aria-hidden="true"></i></a>
					</div>
				</div> -->
                
                <!-- dineria 
				<div class="cases">
					<div class="cases-logo">
						<a class="rdr" onclick="fbq('track', 'Lead');" href="#" data-href="//go.salesdoubler.net/in/offer/1837?aid=71115" target="_blank"><img src="img/dineria.svg" alt="ШвидкоГрошi" /></a>
					</div>
					<div>
						<p class="thead">
							Clasificación
						</p>
						<div class="rate rate5" data-toggle="tooltip" data-placement="top" title="Clasificación: 5"></div>
					</div>
					<div>
						<p class="thead">
							Plazo
						</p>
						<p class="term">
							3-30<span>dias</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Cantidad maxima
						</p>
						<p class="max-sum">
							8000<span>$</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Transferencia
						</p>
						<p class="term">
							15<span>minuto</span>
						</p>
					</div>
					<div class="go">
						<a onclick="fbq('track', 'Lead');" href="#" data-href="//go.salesdoubler.net/in/offer/1837?aid=71115" target="_blank" class="rdr btn btn-success">¡Solicítalo <i class="fa fa-chevron-right" aria-hidden="true"></i></a>
					</div>
				</div> -->
                
                <!-- moneyman 
				<div class="cases">
					<div class="cases-logo">
						<a class="rdr" href="#" data-href="//go.salesdoubler.net/in/offer/1840?aid=71115" onclick="fbq('track', 'Lead');" target="_blank"><img src="img/logo-shvidkogroshi.png" alt="ШвидкоГрошi" /></a>
					</div>
					<div>
						<p class="thead">
							Clasificación
						</p>
						<div class="rate rate5" data-toggle="tooltip" data-placement="top" title="Clasificación: 5"></div>
					</div>
					<div>
						<p class="thead">
							Plazo
						</p>
						<p class="term">
							1-90<span>dias</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Cantidad maxima
						</p>
						<p class="max-sum">
							4000<span>$</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Transferencia
						</p>
						<p class="term">
							12<span>minuto</span>
						</p>
					</div>
					<div class="go">
						<a href="#" data-href="//go.salesdoubler.net/in/offer/1840?aid=71115" onclick="fbq('track', 'Lead');" target="_blank" class="rdr btn btn-success">¡Solicítalo <i class="fa fa-chevron-right" aria-hidden="true"></i></a>
					</div>
				</div>-->
                
                 <!-- ferratum 
				<div class="cases">
					<div class="cases-logo">
						<a class="rdr" onclick="fbq('track', 'Lead');" href="#" data-href="//go.salesdoubler.net/in/offer/1833?aid=71115" target="_blank"><img src="img/ferratum.png" alt="ШвидкоГрошi" /></a>
					</div>
					<div>
						<p class="thead">
							Clasificación
						</p>
						<div class="rate rate5" data-toggle="tooltip" data-placement="top" title="Clasificación: 5"></div>
					</div>
					<div>
						<p class="thead">
							Plazo
						</p>
						<p class="term">
							1-45<span>dias</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Cantidad maxima
						</p>
						<p class="max-sum">
							5000<span>$</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Transferencia
						</p>
						<p class="term">
							12<span>minuto</span>
						</p>
					</div>
					<div class="go">
						<a onclick="fbq('track', 'Lead');" href="#" data-href="//go.salesdoubler.net/in/offer/1833?aid=71115" target="_blank" class="rdr btn btn-success">¡Solicítalo <i class="fa fa-chevron-right" aria-hidden="true"></i></a>
					</div>
				</div>-->
                
                
                 <!-- Case: lendon 
				<div class="cases">
					<div class="cases-logo">
						<a class="rdr" onclick="fbq('track', 'Lead');" href="#" data-href="//go.salesdoubler.net/in/offer/1841?aid=71115" target="_blank"><img src="img/lendon.png" alt="ШвидкоГрошi" /></a>
					</div>
					<div>
						<p class="thead">
							Clasificación
						</p>
						<div class="rate rate5" data-toggle="tooltip" data-placement="top" title="Clasificación: 5"></div>
					</div>
					<div>
						<p class="thead">
							Plazo
						</p>
						<p class="term">
							1-30<span>dias</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Cantidad maxima
						</p>
						<p class="max-sum">
							10000<span>$</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Transferencia
						</p>
						<p class="term">
							7<span>minuto</span>
						</p>
					</div>
					<div class="go">
						<a onclick="fbq('track', 'Lead');" href="#" data-href="//go.salesdoubler.net/in/offer/1841?aid=71115" target="_blank" class="rdr btn btn-success">¡Solicítalo <i class="fa fa-chevron-right" aria-hidden="true"></i></a>
					</div>
				</div>-->
        
                 
                
            
			
			<p id="conditions" class="justify">
				<strong>No necesitas papeleo, ni perder tiempo en filas que parecen interminables para pedir préstamos rápidos, ¡gracias a nuestro servicio 100% en línea! Utiliza nuestra barra dinámica para seleccionar exactamente cuánto dinero necesitas y por cuánto tiempo. Desde ese momento, sabrás cuánto tendrás que pagar.
</strong>
			</p>
			
		</div>
		
		<div class="block black">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<h4>Usuarios que confían en nosotros: </h4>
						<div id="count">
							<span>5</span>
							<span>3</span>
							<span>2</span>
							<span>1</span>
							<span>2</span>
							<span>5</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<footer style="background-color:#006caa;">
			<div class="container">
				<div class="row">
					
					<!--<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						<p style="color:white;" class="small">
                            <b>Все указанные условия носят информационно-ознакомительный характер и не  являются публичной офертой, а также есть интеллектуальной собственностью, попадя под защиту закона «Об авторском праве».</b>
						</p>
					</div>-->
				</div>
                </div>
		</footer>
		<a class="scrollup" href="#home" style="display: none;"><i class="fa fa-chevron-circle-up" aria-hidden="true"></i></a>
		<script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
		<script src="//use.fontawesome.com/bb1a3e6682.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
		<script>
			window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')
		</script>
		<script src="js/vendor/bootstrap.js"></script>
		<script src="js/jquery.bxslider.js"></script>
		<script src="js/plugins.js"></script>
		<script src="js/main.js"></script>
	
		<script>var user_aid = "<?php echo($aid); ?>";
	$('a.rdr').each(function(){
	link1st = $(this).data('href');
	link1st = link1st.replace(/aid=[0-9]{1,9}/, 'aid='+user_aid);
	link = link1st+"<?php echo $add_link ?>";
	link = link.replace(/#/g,'');
	$(this).data('href', link).attr('data-href', link);
	});
		</script>
	</body>
</html>