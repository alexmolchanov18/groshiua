<?php
$promo = $_GET['promo'];
$source = $_GET['source'];
$campaign = $_GET['campaign'];
$tid1 = $_GET['TID1'];
$tid2 = $_GET['TID2'];
$aid = $_GET['aid'];
if($aid == ''){
    $aid = '63223';
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
$aid = '63223';
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
		<title>GroshiUA — сравнение кредитов онлайн</title>
		<meta name="description" content="">
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
  fbq('init', '256702678525602');
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=256702678525602&ev=PageView&noscript=1"
/></noscript>
<!-- End Facebook Pixel Code -->
        
<!--onesignal-->        
<link rel="manifest" href="/manifest.json" />
<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
<script>
  var OneSignal = window.OneSignal || [];
  OneSignal.push(function() {
    OneSignal.init({
      appId: "b8fd757f-8f7b-4a30-936b-e43a6ec9708d",
    });
  });
</script>        
	</head>
	<body style="background-color:#eeeeee"  data-spy="scroll" data-target="#navbar">
		<!-- Google Tag Manager (noscript) 
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PD6QTP8"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
		<a name="home" id="home"></a>
		<!--[if lt IE 8]>
		<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
		<![endif]-->
		<div id="preloader">
			<div id="status"><img src="img/logo.png" alt=""/>
			</div>
		</div>
		<nav class="navbar navbar-fixed-top" role="navigation">
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
		</nav>
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
				<h3 class="center"><img class="title-img" src="img/title-credits.svg" /> Мы подобрали для вас самые выгодные кредиты</h3>
				<h4 class="center decor">Больше заполненных заявок — выше шанс получить деньги!</h4>

                
                
                 <!-- miloan -->
				<div class="cases st0">
					<div class="cases-logo">
						<a class="rdr" href="#" data-href="//go.salesdoubler.net/in/offer/1436?aid=63223" onclick="fbq('track', 'Lead');" target="_blank"><img src="img/logo-miloan.svg" alt="Miloan" /></a>
					</div>
					<div>
						<p class="thead">
							Рейтинг
						</p>
						<div class="rate rate5" data-toggle="tooltip" data-placement="top" title="Рейтинг: 5"></div>
					</div>
					<div>
						<p class="thead">
							На срок
						</p>
						<p class="term">
							1-30<span>дней</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Максимальная сумма
						</p>
						<p class="max-sum">
							12.000<span>грн</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Ставка
						</p>
						<p class="term">
							0%<span>в день</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Рассмотрение
						</p>
						<p class="term">
							10<span>минут</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Способ получения
						</p>
						<div class="receipt"><img src="img/ico-bank.png" alt=""/><img src="img/ico-card.png" alt=""/>
						</div>
					</div>
					<div class="go">
						<a href="#" data-href="//go.salesdoubler.net/in/offer/1436?aid=63223" onclick="fbq('track', 'Lead');" target="_blank" class="rdr btn btn-success">Полу&shy;чить займ <i class="fa fa-chevron-right" aria-hidden="true"></i></a>
					</div>
				</div>
                
                <!-- CreditKasa -->
				<div class="cases recomend">
					<div class="cases-logo">
						<a class="rdr" href="#" data-href="//go.salesdoubler.net/in/offer/1492?aid=63223" onclick="fbq('track', 'Lead');" target="_blank"><img src="img/logo-creditkasa.png" alt="Credit Kasa" /></a>
					</div>
					<div>
						<p class="thead">
							Рейтинг
						</p>
						<div class="rate rate45" data-toggle="tooltip" data-placement="top" title="Рейтинг: 4.5"></div>
					</div>
					<div>
						<p class="thead">
							На срок
						</p>
						<p class="term">
							3-60<span>дней</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Максимальная сумма
						</p>
						<p class="max-sum">
							10.000<span>грн</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Ставка
						</p>
						<p class="term">
							0%<span>в день</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Рассмотрение
						</p>
						<p class="term">
							8<span>минут</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Способ получения
						</p>
						<div class="receipt"><img src="img/ico-card.png" alt=""/>
						</div>
					</div>
					<div class="go">
						<a href="#" data-href="//go.salesdoubler.net/in/offer/1492?aid=63223" onclick="fbq('track', 'Lead');" target="_blank" class="rdr btn btn-success">Полу&shy;чить займ <i class="fa fa-chevron-right" aria-hidden="true"></i></a>
					</div>
				</div>

                
                 <!-- BizPozika 
				<div class="cases recomend">
					<div class="cases-logo">
						<a class="rdr" href="#" data-href="//go.salesdoubler.net/in/offer/1728?aid=63223" onclick="fbq('track', 'Lead');" target="_blank"><img src="img/bizlogo.png" alt="BizPozika" /></a>
					</div>
					<div>
						<p class="thead">
							Рейтинг
						</p>
						<div class="rate rate45" data-toggle="tooltip" data-placement="top" title="Рейтинг: 4.5"></div>
					</div>
					<div>
						<p class="thead">
							На срок
						</p>
						<p class="term">
							3-60<span>дней</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Максимальная сумма
						</p>
						<p class="max-sum">
							50.000<span>грн</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Ставка
						</p>
						<p class="term">
							0.1%<span>в день</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Рассмотрение
						</p>
						<p class="term">
							15<span>минут</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Способ получения
						</p>
						<div class="receipt"><img src="img/ico-card.png" alt=""/>
						</div>
					</div>
					<div class="go">
						<a href="#" data-href="//go.salesdoubler.net/in/offer/1728?aid=63223" onclick="fbq('track', 'Lead');" target="_blank" class="rdr btn btn-success">Полу&shy;чить займ <i class="fa fa-chevron-right" aria-hidden="true"></i></a>
					</div>
				</div>-->
                
                
                <!-- ШвидкоГрошi -->
				<div class="cases">
					<div class="cases-logo">
						<a class="rdr" href="#" data-href="//go.salesdoubler.net/in/offer/1272?aid=63223" onclick="fbq('track', 'Lead');" target="_blank"><img src="img/logo-shvidkogroshi.png" alt="ШвидкоГрошi" /></a>
					</div>
					<div>
						<p class="thead">
							Рейтинг
						</p>
						<div class="rate rate5" data-toggle="tooltip" data-placement="top" title="Рейтинг: 5"></div>
					</div>
					<div>
						<p class="thead">
							На срок
						</p>
						<p class="term">
							1-30<span>дней</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Максимальная сумма
						</p>
						<p class="max-sum">
							5000<span>грн</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Ставка
						</p>
						<p class="term">
							2%<span>в день</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Рассмотрение
						</p>
						<p class="term">
							10<span>минут</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Способ получения
						</p>
						<div class="receipt"><img src="img/ico-bank.png" alt=""/><img src="img/ico-card.png" alt=""/>
						</div>
					</div>
					<div class="go">
						<a href="#" data-href="//go.salesdoubler.net/in/offer/1272?aid=63223" onclick="fbq('track', 'Lead');" target="_blank" class="rdr btn btn-success">Полу&shy;чить займ <i class="fa fa-chevron-right" aria-hidden="true"></i></a>
					</div>
				</div>
                
                
                 <!-- Case: Dinero -->
				<div class="cases st0">
					<div class="cases-logo">
						<a class="rdr" href="#" data-href="//go.salesdoubler.net/in/offer/1571?aid=63223" onclick="fbq('track', 'Lead');" target="_blank"><img src="img/logo-dinero.png" alt="Dinero" /></a>
					</div>
					<div>
						<p class="thead">
							Рейтинг
						</p>
						<div class="rate rate45" data-toggle="tooltip" data-placement="top" title="Рейтинг: 4.5"></div>
					</div>
					<div>
						<p class="thead">
							На срок
						</p>
						<p class="term">
							3-60<span>дней</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Максимальная сумма
						</p>
						<p class="max-sum">
							10.000<span>грн</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Ставка
						</p>
						<p class="term">
							0%<span>в день</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Рассмотрение
						</p>
						<p class="term">
							5<span>минут</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Способ получения
						</p>
						<div class="receipt"><img src="img/ico-card.png" alt=""/>
						</div>
					</div>
					<div class="go">
						<a href="#" data-href="//go.salesdoubler.net/in/offer/1571?aid=63223" onclick="fbq('track', 'Lead');" target="_blank" class="rdr btn btn-success">Полу&shy;чить займ <i class="fa fa-chevron-right" aria-hidden="true"></i></a>
					</div>
				</div>
                  
                
                 <!-- Case: bistrozaem -->
				<div class="cases st0">
					<div class="cases-logo">
						<a class="rdr" href="#" data-href="//go.salesdoubler.net/in/offer/852?aid=63223" onclick="fbq('track', 'Lead');" target="_blank"><img src="img/logo-bistrozaim.png" alt="kf" /></a>
					</div>
					<div>
						<p class="thead">
							Рейтинг
						</p>
						<div class="rate rate45" data-toggle="tooltip" data-placement="top" title="Рейтинг: 4.5"></div>
					</div>
					<div>
						<p class="thead">
							На срок
						</p>
						<p class="term">
							7-65<span>дней</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Максимальная сумма
						</p>
						<p class="max-sum">
							10.000<span>грн</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Ставка
						</p>
						<p class="term">
							0%<span>в день</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Рассмотрение
						</p>
						<p class="term">
							5<span>минут</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Способ получения
						</p>
						<div class="receipt"><img src="img/ico-card.png" alt=""/>
						</div>
					</div>
					<div class="go">
						<a href="#" data-href="//go.salesdoubler.net/in/offer/852?aid=63223" onclick="fbq('track', 'Lead');" target="_blank" class="rdr btn btn-success">Полу&shy;чить займ <i class="fa fa-chevron-right" aria-hidden="true"></i></a>
					</div>
				</div>
                
                <!-- Case 1: Moneyveo -->
				<div class="cases zerro">
					<div class="cases-logo">
						<a class="rdr" href="#" data-href="//go.salesdoubler.net/in/offer/250?aid=63223" onclick="fbq('track', 'Lead');" target="_blank"><img src="img/logo-moneyveo.png" alt="Moneyveo" /></a>
					</div>
					<div>
						<p class="thead">
							Рейтинг
						</p>
						<div class="rate rate5" data-toggle="tooltip" data-placement="top" title="Рейтинг: 5.0"></div>
					</div>
					<div>
						<p class="thead">
							На срок
						</p>
						<p class="term">
							3-60<span>дней</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Максимальная сумма
						</p>
						<p class="max-sum">
							15.000<span>грн</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Ставка
						</p>
						<p class="term">
							0%<span>в день</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Рассмотрение
						</p>
						<p class="term">
							5<span>минут</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Способ получения
						</p>
						<div class="receipt"><img src="img/ico-card.png" alt=""/>
						</div>
					</div>
					<div class="go">
						<a href="#" data-href="//go.salesdoubler.net/in/offer/250?aid=63223" onclick="fbq('track', 'Lead');" target="_blank" class="rdr btn btn-success">Полу&shy;чить займ <i class="fa fa-chevron-right" aria-hidden="true"></i></a>
					</div>
				</div>
                             
                 <!-- AlexCredit -->
				<div class="cases zerro">
					<div class="cases-logo">
						<a class="rdr" href="#" data-href="//go.salesdoubler.net/in/offer/1509?aid=63223" onclick="fbq('track', 'Lead');" target="_blank"><img src="img/logo-alexcredit.png" alt="AlexCredit" /></a>
					</div>
					<div>
						<p class="thead">
							Рейтинг
						</p>
						<div class="rate rate5" data-toggle="tooltip" data-placement="top" title="Рейтинг: 5"></div>
					</div>
					<div>
						<p class="thead">
							На срок
						</p>
						<p class="term">
							3-60<span>дней</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Максимальная сумма
						</p>
						<p class="max-sum">
							10.000<span>грн</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Ставка
						</p>
						<p class="term">
							0%<span>в день</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Рассмотрение
						</p>
						<p class="term">
							10<span>минут</span>
						</p>
					</div>
					<div>
						<p class="thead">
							Способ получения
						</p>
						<div class="receipt"><img src="img/ico-card.png" alt=""/>
						</div>
					</div>
					<div class="go">
						<a href="#" data-href="//go.salesdoubler.net/in/offer/1509?aid=63223" onclick="fbq('track', 'Lead');" target="_blank" class="rdr btn btn-success">Полу&shy;чить займ <i class="fa fa-chevron-right" aria-hidden="true"></i></a>
					</div>
				</div>
                    

                
                 
                
            
			<div id="banners">
				<a class="rdr" href="#" data-href="//go.salesdoubler.net/in/offer/250?aid=63223" onclick="fbq('track', 'Lead');" target="_blank"><img src="img/banner-moneyveo.jpg" alt="Moneyveo"/></a>
				<a class="rdr" href="#" data-href="//go.salesdoubler.net/in/offer/1509?aid=63223" onclick="fbq('track', 'Lead');" target="_blank"><img src="img/banner-alexcredit.jpg" alt="AlexCredit"/></a>
			</div>
			<p id="conditions" class="justify">
				<strong>Мы собрали лучшие предложения кредитных организаций и банков Украины. Осталось выбрать то, что вам подходит. Быстро получить кредит иногда единственная возможность решить сложные финансовые проблемы. Микрозайм даст возможность доделать затянувшийся ремонт, отлично отдохнуть во время отпуска или же поправить собственное здоровье. Как распорядиться суммой – дело получателя, главное – вовремя вернуть занятые деньги.</strong>
			</p>
			<div id="tabs">
				<!-- Nav tabs -->
				<ul class="nav nav-tabs" role="tablist">
					<li role="presentation" class="active">
						<a class="tbs" href="#credit-info" aria-controls="credit-info" role="tab" data-toggle="tab"><img src="img/credit-info.svg" alt="Суть кредитования"/> Суть кредитования</a>
					</li>
					<li role="presentation">
						<a class="tbs" href="#credit-conditions" aria-controls="credit-conditions" role="tab" data-toggle="tab"><img src="img/credit-conditions.svg" alt="Условия кредитования"/> Условия получения микрозайма</a>
					</li>
					<li role="presentation">
						<a class="tbs" href="#credit-online" aria-controls="credit-online" role="tab" data-toggle="tab"><img src="img/credit-online.svg" alt="Условия кредитования"/> Онлайн-оформление микрозайма</a>
					</li>
				</ul>
				<!-- Tab panes -->
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane fade in active" id="credit-info">
						<h4>Cуть кредитования</h4>
						<p>
							О возможности получения микрокредита сегодня известно практически каждому. В этом нет ничего удивительного, ведь рекламу о денежных займах можно увидеть всюду. Теперь нет необходимости тратить время на просиживание очередей в банках, ведь существует множество финансовых организаций, которые могут дать микрозайм каждому гражданину Украины.
						</p>
						<p>
							Несмотря на то, что подобные займы доступны совсем недавно, они уже успели стать популярными среди населения. Большой особенностью является и то, что для получения нужной суммы достаточно всего лишь подать заявку и подождать несколько часов. С большой вероятностью вам будет дан положительный ответ, ведь, как правило, подобные микрофинансовые организации всегда принимают положительное решение. Теперь внезапно возникнувшие проблемы можно решить с помощью подобной финансовой организации и полученного там кредита.
						</p>
					</div>
					<div role="tabpanel" class="tab-pane fade" id="credit-conditions">
						<h4>Условие получения микрозайма</h4>
						<p>
							В отличие от кредитования в банках, вам не понадобится собирать огромный пакет документов. В большинстве случаев нужно предоставить всего лишь паспорт и идентификационный код. Их достаточно для оформления в МФО заявки для получения средств в долг. Процедура занимает всего несколько часов, после чего вы сможете получить деньги в свое распоряжение.
						</p>
						<p>
							<strong>При получении небольшого кредита в МФО можно рассчитывать на такие преимущества:</strong>
						</p>
						<ul>
							<li>
								Нет необходимости собирать большой пакет документов;
							</li>
							<li>
								Заявка рассматривается в течение нескольких часов;
							</li>
							<li>
								Нет лишних требований – без справки о доходах, поручителей;
							</li>
							<li>
								Нет лишних комиссий – все просто и понятно.
							</li>
						</ul>
						<p>
							Подобные условия позволяют в краткий срок решить свои проблемы, а также погасить свою задолженность без проблем. Сделать это можно любым удобным для вас способом.
						</p>
						<p>
							<strong>Осуществить платеж можно такими путями:</strong>
						</p>
						<ul>
							<li>
								Посетив офис организации;
							</li>
							<li>
								Через банковский перевод;
							</li>
							<li>
								Электронными платежами и т.д.
							</li>
						</ul>
						<p>
							Важно учитывать, что при микрокредитовании устанавливается определенная плата за пользование наличными, полученными в МФО. Главное – вовремя погасите необходимую сумму, указанную в условиях, иначе микрофинансовая организация может ввести штрафы и наказать комиссией, что значительно повлияет на сумму вашего долга.
						</p>
					</div>
					<div role="tabpanel" class="tab-pane fade" id="credit-online">
						<h4>Онлайн-оформление микрозайма</h4>
						<p>
							Уровень современного развития позволяет получить потребительский кредит от МФО даже не выходя из дома. Перечень условий при этом не меняется, а выплаты производятся на банковскую карту.
						</p>
						<p>
							На нашем сайте groshiua.online вы можете найти информацию о существующих МФО на территории Украины, условиях получения там займа, контактные телефоны и адреса. Это удобный сервис, способный сэкономить ваше время. На рассмотрение заявки, поданной в онлайн режиме, уходит от 15 минут до нескольких часов, после чего деньги будут зачислены на карту. Отказ практически невозможен, ведь большинство компаний работают со студентами, пенсионерами и даже людьми из черных банковских списков.
						</p>
						<p>
							Решив проблемы, поспешите вернуть заём – чем быстрее вы это сделаете, тем меньше процентов вам насчитают.
						</p>
					</div>
				</div>
			</div>
		</div>
		<div id="partners">
			<div class="container">
				<div class="brands">
					<ul class="responsive item" id="brands">
						<li><a class="rdr" href="#" data-href="//go.salesdoubler.net/in/offer/250?aid=63223" onclick="fbq('track', 'Lead');" target="_blank"><img alt="Moneyveo" src="img/logo-moneyveo.png" /></a></li>
                        <li><a class="rdr" href="#" data-href="//go.salesdoubler.net/in/offer/1571?aid=63223" onclick="fbq('track', 'Lead');" target="_blank"><img alt="Dinero" src="img/logo-dinero.png" /></a></li>
                        <li><a class="rdr" href="#" data-href="//go.salesdoubler.net/in/offer/1492?aid=63223" onclick="fbq('track', 'Lead');" target="_blank"><img alt="CreditKasa" src="img/logo-creditkasa.png" /></a></li>
						<li><a class="rdr" href="#" data-href="//go.salesdoubler.net/in/offer/1509?aid=63223" onclick="fbq('track', 'Lead');" target="_blank"><img alt="AlexCredit" src="img/logo-alexcredit.png" /></a></li>
                        <li><a class="rdr" href="#" data-href="//go.salesdoubler.net/in/offer/1556?aid=63223" onclick="fbq('track', 'Lead');" onclick="fbq('track', 'Lead');" target="_blank"><img alt="Cash in Sky" src="img/logo-cashinsky.png" /></a></li>
                        
					</ul>
				</div>
			</div>
		</div>
		<div class="block black">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<h4>Пользователи, которые нам доверяют: </h4>
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
					<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
						<a class="home" href="#home"><img src="img/white-logo.png" alt="GroshiUA" /></a>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						<p style="color:white;" class="small">
                            <b>Все указанные условия носят информационно-ознакомительный характер и не  являются публичной офертой, а также есть интеллектуальной собственностью, попадя под защиту закона «Об авторском праве».</b>
						</p>
					</div>
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