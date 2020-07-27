<?php
    include "SalesDoublerApiLeads.php";
    $sd = new SalesDoublerApiLeads();
    $url = $sd->getUrl();

    $utm_source   = $_GET['utm_source'];
    $utm_campaign = $_GET['utm_campaign'];
    $utm_medium   = $_GET['utm_medium'];
    $utm_term     = $_GET['utm_term'];
    $utm_content  = $_GET['utm_content'];

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Онлайн-кредит на карту, не выходя из домa</title>
    <meta name="description" content="Оформите кредит онлайн до 15000 грн на свою банковскую карту ⭐ Выдаем займ за 5-7 минут без залога и справок" >
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="https://fonts.googleapis.com/css?family=Rubik&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/jquery-ui.css">
	<link rel="stylesheet" href="css/nouislider.min.css">
	<link rel="stylesheet" href="css/swiper.min.css">
	


    

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
  fbq('init', '225196278198377');
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=225196278198377&ev=PageView&noscript=1"
/></noscript>
<!-- End Facebook Pixel Code --> 
    <!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PD6QTP8');</script>
<!-- End Google Tag Manager -->
<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
<script>
  var OneSignal = window.OneSignal || [];
  OneSignal.push(function() {
    OneSignal.init({
      appId: "947b17ad-de12-4491-b639-fdd34c5fe654",
    });
  });
</script>

<!--esputnik-->        
<!-- <script>
	(function(i,s,o,g,r,a,m){
	i["esSdk"] = r;
	i[r] = i[r] || function() {
		(i[r].q = i[r].q || []).push(arguments)
	}, a=s.createElement(o), m=s.getElementsByTagName(o)[0]; a.async=1; a.src=g;
	m.parentNode.insertBefore(a,m)}
	) (window, document, "script", "https://esputnik.com/scripts/v1/public/scripts?apiKey=eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0NTI0ZWZhYTJkYzI2MGRmYTM4YTE1NDBlMWIzYWQ0ZWNjYjkyNzE3MzI0MGQzOWQwOThhNTM3ZWRlODY1ZjA5MjliNGYxMzQ0OWE1ZTMyMzJjMGEzMGU1ZDA2YTk4NDYwM2VmZjc1YTEwNjkyOWU2Y2E2NDUyOWI2MzVmYmM0NGE4ZDZiZDcxNzUyMDI0MjlmMTczYmEyNWI2ODI0YTEwMWI5OWEwY2RjNTRmNzM1NGYzMDdhZDk2OTVhODg2ODAyYjI5YjEyYWNmYmUifQ.KXkzthLfY2OdEAK4lPQ1wiZxOoysXaqm0jcmjesvTVXA589hWYUPR4rr9B9RAz5kkhkUcUs5wf7xAoAXEnXUOA&domain=19B8CB3D-77AC-4315-B436-6C9FBF6CBCB3", "es");
	es("pushOn");
</script> -->
<style type="text/css">
	.hidden-body {
		display: none;
	}
</style>
</head>
<body class="interactive-header">
    <!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PD6QTP8"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
	<div class="wrapper">
		<!-- Header-->
		<header class="header">
			<div class="header-offscreen">
				<div class="top-section">
					<div class="cta cta--sm"><a class="btn btn--primary btn-effect" href="#" data-toggle="modal" data-target="#modal-goto">Оформить Кредит</a>
					</div>
					<div class="lang-mobile"></div>
				</div>
				<div class="bottom-section"></div>
			</div>
			<div class="header-primary">
				<div class="container">
                    
                    <span class="logo__icon"><img src="images/groshiua-blue.png" alt=""></span>
                    
				</div>
			</div>
		</header>

        <div class="hero">
			<div class="hero__message">Кредит на карту, не&nbsp;выходя из&nbsp;дома</div>
			<div class="swiper-container hero-slider">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<div class="hero__item">
							<img class="hero__bg" src="images/hero-1.jpg" alt="">
							<div class="hero__info">
								<div class="container">
									<div class="row">
										<div class="col-sm-6 col-lg-7">
											<h3 class="hero__title">Онлайн кредит на&nbsp;карту не&nbsp;выходя из&nbsp;дома</h3>
											<p class="hero__text">Для новых клиентов — кредит от&nbsp;0%</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="container relative">
					<div class="swiper-pagination pagination-hero"></div>
				</div>
			</div>
			<div class="container relative">


                <div class="hero-calc">
                    <form id="send_form" name="send_form" action="/smartmoney/">
                    <div class="calculator calculator--fixed">
						<div class="calculator__contols">
						<h3>Оформить кредит</h3>
							<fieldset class="form__field">
								<div class="form__wrap">
									<input class="form__input input-capitalize" required="" id="name" name="first_name" type="text">
									<label class="form__label" for="first_name">Имя&nbsp;*</label>
								</div>
							</fieldset>
							<fieldset class="form__field">
								<div class="form__wrap">
									<input class="form__input ng-pristine ng-untouched ng-valid-mask ng-empty ng-invalid ng-invalid-required" id="phone" name="phone" type="tel" value="" autocomplete="off">
									<label class="form__label label--open" for="phone">Мобильный телефон&nbsp;*</label>
								</div>
							</fieldset>
							<!-- <fieldset class="form__field">
								<div class="form__wrap">
									<input class="form__input ng-pristine ng-untouched ng-empty ng-valid-email ng-invalid ng-valid-pattern" id="email" name="email" type="email">
									<label class="form__label" for="email">Электронный адрес</label>
								</div>
							</fieldset> -->
                            <!-- <div class="calculator__group">
								<h4 class="calculator__name">Cумма кредита</h4>
								<input class="limit-field number-field calculator__value value--money value--money-lg" id="input-money" type="text" ng-maxlength="5" name="amount"><span class="calculator__dimension">грн</span>
								<div class="slider-1"></div>
								<div class="range-wrapper">
									<div class="range__label range--bottom">500 грн</div>
									<div class="range__label range--top">15 000 грн</div>
								</div>
							</div> -->
						</div>

                        <input type="hidden" name="access-token" value="6643fc5ba5413d74e388e20cba50d833"/>
                        <input type="hidden" id="utm_source" name="utm_source" value="<? echo $utm_source; ?>"/>
                        <input type="hidden" id="utm_campaign" name="utm_campaign" value="<? echo $utm_campaign; ?>"/>
                        <input type="hidden" id="utm_term" name="utm_term" value="<? echo $utm_term; ?>"/>
                        <input type="hidden" id="utm_medium" name="utm_medium" value="<? echo $utm_medium; ?>"/>
                        <input type="hidden" id="utm_content" name="utm_content" value="<? echo $utm_content; ?>"/>

                        <div class="calculator__preivew">
							<div class="btn-group btn-group__whith-padding btn-group__w342">
                            <button class="btn btn--primary btn--effect" disabled="" id="submit_button" type="submit">Введите данные</button>
							</div>
							<div class="checkbox-box">
			                    <input type="checkbox" id="confirmation" checked="">
			                    <label for="confirmation">Даю согласие на обработку <a href="privacy.html">персональных данных</a> и согласен с <a href="terms.html">условиями использования</a></label>
		                	</div>
		                	<p class="error error-confirmation">Примите условия соглашения</p>
						</div>
					</div>
				</div>

               </form>
			</div>
		</div>
		<div class="container">
			<div class="block">
				<h2 class="heading">Как это работает?</h2>
				<div class="tabs tabs--md">
					<ul class="nav nav-tabs" role="tablist">
						<li class="tab__item active" role="presentation"><a class="tab__link" href="#get-credit" aria-controls="get-credit" role="tab" data-toggle="tab">Как получить кредит</a>
						</li>
						<li class="tab__item" role="presentation"><a class="tab__link" href="#pay-credit" aria-controls="pay-credit" role="tab" data-toggle="tab">Как погасить кредит</a>
						</li>
					</ul>
					<div class="tab-content">
						<div class="tab-pane tab-pane-load active" role="tabpanel" id="get-credit">
							<div class="row hidden-xs">
								<div class="col-sm-6 col-md-3">
									<div class="feature feature--big">
										<div class="feature__media">
											<img src="images/feature-1.png">
										</div><span class="feature__count">1</span><span class="feature__info">Выберите необходимые <br> сумму и срок кредита</span>
										<p class="feature__text">Просто перетяните бегунок
											<br>или введите нужные значения</p>
									</div>
								</div>
								<div class="col-sm-6 col-md-3">
									<div class="feature feature--big">
										<div class="feature__media">
											<img src="images/feature-2.png">
										</div><span class="feature__count">2</span><span class="feature__info">Заполните анкету <br> и добавьте карту</span>
										<p class="feature__text">Один раз при регистрации.
											<br>Для последующих кредитов
											<br>просто выберите сумму и срок</p>
									</div>
								</div>
								<div class="clearfix visible-sm"></div>
								<div class="col-sm-6 col-md-3">
									<div class="feature feature--big">
										<div class="feature__media">
											<img src="images/feature-3.png">
										</div><span class="feature__count">3</span><span class="feature__info">Ожидайте получение <br> решения в течении</span>
										<p class="feature__text">Решения принимаются
											<br>ежедневно с 8:00 до 21:00,
											<br>без выходных</p>
									</div>
								</div>
								<div class="col-sm-6 col-md-3">
									<div class="feature feature--big">
										<div class="feature__media">
											<img src="images/feature-4.png">
										</div><span class="feature__count">4</span><span class="feature__info">Получите деньги</span>
										<p class="feature__text">Зачисление денег
											<br>на карту</p>
									</div>
								</div>
							</div>
							<div class="visible-xs">
								<div class="swiper-container mobile-feature">
									<div class="swiper-wrapper">
										<div class="swiper-slide">
											<div class="feature feature--big">
												<div class="feature__media">
													<img src="images/feature-1.png">
												</div><span class="feature__count">1</span><span class="feature__info">Выберите необходимые <br> сумму и срок кредита</span>
												<p class="feature__text">Просто перетяните бегунок
													<br>или введите нужные значения</p>
											</div>
										</div>
										<div class="swiper-slide">
											<div class="feature feature--big">
												<div class="feature__media">
													<img src="images/feature-2.png">
												</div><span class="feature__count">2</span><span class="feature__info">Заполните анкету <br> и добавьте карту</span>
												<p class="feature__text">Один раз при регистрации.
													<br>Для последующих кредитов
													<br>просто выберите сумму и срок</p>
											</div>
										</div>
										<div class="swiper-slide">
											<div class="feature feature--big">
												<div class="feature__media">
													<img src="images/feature-3.png">
												</div><span class="feature__count">3</span><span class="feature__info">Ожидайте получение <br> решения в течении 15 минут</span>
												<p class="feature__text">Решения принимаются
													<br>ежедневно с 8:00 до 21:00,
													<br>без выходных</p>
											</div>
										</div>
										<div class="swiper-slide">
											<div class="feature feature--big">
												<div class="feature__media">
													<img src="images/feature-4.png">
												</div><span class="feature__count">4</span><span class="feature__info">Получите деньги</span>
												<p class="feature__text">Зачисление денег
													<br>на карту за 1-2 минуты</p>
											</div>
										</div>
									</div>
									<div class="relative hidden-sm hidden-md hidden-lg">
										<div class="swiper-pagination swiper-pagination--light pagination-feature"></div>
									</div>
								</div>
							</div>
						</div>
						<div class="tab-pane tab-pane-load" role="tabpanel" id="pay-credit">
							<div class="row hidden-xs">
								<div class="col-sm-6 col-md-3">
									<div class="feature feature--big">
										<div class="feature__media">
											<img src="images/feature-5.png">
										</div><span class="feature__count">1</span><span class="feature__info">Ознакомьтесь с <br> информацией по кредиту</span>
										<p class="feature__text">Постарайтесь вносить
											<br>все платежи вовремя</p>
									</div>
								</div>
								<div class="col-sm-6 col-md-3">
									<div class="feature feature--big">
										<div class="feature__media">
											<img src="images/feature-6.png">
										</div><span class="feature__count">2</span><span class="feature__info">Внесите деньги любым <br> удобным вам способом</span>
										<p class="feature__text">Через личный кабинет,
											<br>интернет-банкинг, терминалы
											<br>или кассу в банке</p>
									</div>
								</div>
								<div class="clearfix visible-sm"></div>
								<div class="col-sm-6 col-md-3">
									<div class="feature feature--big">
										<div class="feature__media">
											<img src="images/feature-7.png">
										</div><span class="feature__count">3</span><span class="feature__info">Проверьте остаток по счету</span>
										<p class="feature__text">Если на счету ноль,
											<br>кредит считается закрытым
											<br>и можно оформить новый кредит</p>
									</div>
								</div>
								<div class="col-sm-6 col-md-3">
									<div class="feature feature--big">
										<div class="feature__media">
											<img src="images/feature-1.png">
										</div><span class="feature__count">4</span><span class="feature__info">Оформите новый кредит</span>
										<p class="feature__text">Заявка на последующие кредиты
											<br>обрабатывается намного быстрее</p>
									</div>
								</div>
							</div>
							<div class="visible-xs">
								<div class="swiper-container mobile-feature">
									<div class="swiper-wrapper">
										<div class="swiper-slide">
											<div class="feature feature--big">
												<div class="feature__media">
													<img src="images/feature-5.png">
												</div><span class="feature__count">1</span><span class="feature__info">Ознакомьтесь с <br> информацией по кредиту</span>
												<p class="feature__text">Постарайтесь вносить
													<br>все платежи вовремя</p>
											</div>
										</div>
										<div class="swiper-slide">
											<div class="feature feature--big">
												<div class="feature__media">
													<img src="images/feature-6.png">
												</div><span class="feature__count">2</span><span class="feature__info">Внесите деньги любым <br> удобным вам способом</span>
												<p class="feature__text">Через личный кабинет,
													<br>интернет-банкинг, терминалы
													<br>или кассу в банке</p>
											</div>
										</div>
										<div class="swiper-slide">
											<div class="feature feature--big">
												<div class="feature__media">
													<img src="images/feature-7.png">
												</div><span class="feature__count">3</span><span class="feature__info">Проверьте остаток по счету</span>
												<p class="feature__text">Если на счету ноль,
													<br>кредит считается закрытым
													<br>и можно оформить новый кредит</p>
											</div>
										</div>
										<div class="swiper-slide">
											<div class="feature feature--big">
												<div class="feature__media">
													<img src="images/feature-1.png">
												</div><span class="feature__count">4</span><span class="feature__info">Оформите новый кредит</span>
												<p class="feature__text">Заявка на последующие кредиты
													<br>обрабатывается мгновенно,
													<br>через 5 минут деньги будут
													<br>у вас на карте</p>
											</div>
										</div>
									</div>
									<div class="relative hidden-sm hidden-md hidden-lg">
										<div class="swiper-pagination swiper-pagination--light pagination-feature"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="centered-block"><a class="btn btn--primary btn--effect scrollup" href="#">Оформить Кредит</a>
				</div>
			</div>
		</div>
		<div class="box">
			<div class="container">
				<div class="block">
					<div class="hidden-xs swiper-container feature-slider">
						<div class="tabs tabs--section tabs--limit">
							<ul class="nav nav-tabs tab-pagination">
								<li class="tab__item active">
									<a class="tab__link" href="#" data-reference="1"> <span class="tab_holder">Какие условия онлайн кредитования в&nbsp;Groshiua.online?</span>
									</a>
								</li>
								<li class="tab__item">
									<a class="tab__link" href="#" data-reference="2"> <span class="tab_holder">Что нужно для получения кредита?</span>
									</a>
								</li>
								<li class="tab__item">
									<a class="tab__link" href="#" data-reference="3"> <span class="tab_holder">Почему клиенты выбирают Groshiua.online?</span>
									</a>
								</li>
							</ul>
						</div>
						<div class="swiper-wrapper">
							<div class="swiper-slide">
								<div class="row">
									<div class="col-sm-6 col-md-3">
										<div class="feature feature--big">
											<img class="feature__icon" src="images/pocket.svg"><span class="feature__info">От 500 до 15 000 грн</span>
											<p class="feature__text">С неограниченным
												<br>количеством продлений</p>
										</div>
									</div>
									<div class="clearfix visible-sm"></div>
									<div class="col-sm-6 col-md-3">
										<div class="feature feature--big">
											<img class="feature__icon" src="images/date.svg"><span class="feature__info">Круглосуточный прием <br> заявок</span>
											<p class="feature__text">Оформить заявку через сайт
												<br>можно 24/7/365</p>
										</div>
									</div>
								</div>
							</div>
							<div class="swiper-slide">
								<div class="row">
									<div class="col-sm-6 col-md-3">
										<div class="feature feature--big">
											<img class="feature__icon" src="images/citizen.svg"><span class="feature__info">Быть гражданином <br> Украины</span>
											<p class="feature__text">Нет возможности проверить
												<br>информацию по гражданам
												<br>других стран</p>
										</div>
									</div>
									<div class="col-sm-6 col-md-3">
										<div class="feature feature--big">
											<img class="feature__icon" src="images/passport.svg"><span class="feature__info">Быть старше 18 лет</span>
											<p class="feature__text">Согласно законодательству,
												<br>мы не можем предоставлять
												<br>кредиты особам,
												<br>не достигшим совершенолетия</p>
										</div>
									</div>
									<div class="clearfix visible-sm"></div>
									<div class="col-sm-6 col-md-3">
										<div class="feature feature--big">
											<img class="feature__icon" src="images/cards.svg"><span class="feature__info">Карта любого банка</span>
											<p class="feature__text">Мы выдаем кредиты только
												<br>онлайн, без визита в офис</p>
										</div>
									</div>
									<div class="col-sm-6 col-md-3">
										<div class="feature feature--big">
											<img class="feature__icon" src="images/scan.svg"><span class="feature__info">Скан-копии <br> паспорта и ИНН</span>
											<p class="feature__text">Скан-копию можно
												<br>заменить качественным
												<br>фото документа</p>
										</div>
									</div>
								</div>
							</div>
							<div class="swiper-slide">
								<div class="row">
									<div class="col-sm-12 col-md-7">
										<div class="row">
											<div class="col-sm-4">
												<div class="feature feature--big">
													<img class="feature__icon" src="images/trial.svg"><span class="feature__info">Кредиты от 0%<br />новым клиентам </span>
													<p class="feature__text">Кредит под 0% новым клиентам — обыч&shy;ная прак&shy;тика для микро&shy;кредит&shy;ных ком&shy;паний </p>
												</div>
											</div>
											<div class="col-sm-4">
												<div class="feature feature--big">
													<img class="feature__icon icon--tall" src="images/rules.svg"><span class="feature__info">Прозрачные условия</span>
													<p class="feature__text">Без залога, поручителя
														<br>и справок о доходах.
														<br>Нет скрытых платежей
														<br>и комиссий</p>
												</div>
											</div>
											<div class="col-sm-4">
												<div class="feature feature--big">
													<img class="feature__icon" src="images/request.svg"><span class="feature__info">Удобное оформление <br> заявки</span>
													<p class="feature__text">Без очередей в банке
														<br>и кипы лишних документов</p>
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix visible-sm"></div>
									<div class="col-sm-12 col-md-5">
										<div class="row">
											<div class="col-sm-4 col-sm-offset-2 col-md-6 col-md-offset-0">
												<div class="feature feature--big">
													<img class="feature__icon" src="images/clock.svg"><span class="feature__info">Быстрое решение <br> по кредиту</span>
													<p class="feature__text">Для первого обращения -
														<br>до 15 минут, для
														<br>последующих кредитов -
														<br>до 5 минут</p>
												</div>
											</div>
											<div class="col-sm-4 col-md-6">
												<div class="feature feature--big">
													<img class="feature__icon" src="images/week.svg"><span class="feature__info">Кредиты на срок от&nbsp;1 дня</span>
													<p class="feature__text">
                                                    Вы можете взять кредит на&nbsp;срок от 1 до 60 дней
														</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="visible-xs">
						<div class="accordion panel-group" id="feature-accordion" role="tablist" aria-multiselectable="true">
							<div class="panel">
								<div class="panel-heading" id="feature-1">
									<h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#feature-accordion" href="#feature-which" aria-expanded="true" aria-controls="feature-which">Какие условия онлайн кредитования в&nbsp;Groshiua.online?</a></h4>
								</div>
								<div class="panel-collapse collapse in collapse-load" id="feature-which" role="tabpanel" aria-labelledby="feature-1">
									<div class="panel-body">
										<div class="swiper-container mobile-feature">
											<div class="swiper-wrapper">
												<div class="swiper-slide">
													<div class="feature feature--big">
														<img class="feature__icon" src="images/pocket.svg"><span class="feature__info">От 500 до 15 000 грн <br> на срок до 30 дней</span>
														<p class="feature__text">С неограниченным
															<br>количеством продлений</p>
													</div>
												</div>
												<div class="swiper-slide">
													<div class="feature feature--big">
														<img class="feature__icon icon--lg" src="images/circle.svg"><span class="feature__info">Зачисление на карту <br> за 1-2 минуты</span>
														<p class="feature__text">Вы не успеете покинуть
															<br>сайт до того, как деньги
															<br>поступят на карту</p>
													</div>
												</div>
												<div class="swiper-slide">
													<div class="feature feature--big">
														<img class="feature__icon" src="images/date.svg"><span class="feature__info">Круглосуточный прием <br> заявок</span>
														<p class="feature__text">Оформить заявку через сайт
															<br>можно 24/7/365</p>
													</div>
												</div>
												<div class="swiper-slide">
													<div class="feature feature--big">
														<img class="feature__icon" src="images/clock-alt.svg"><span class="feature__info">Решения по кредитам <br> с 8:00 до 21:00</span>
														<p class="feature__text">Ежедневно, без
															<br>праздников и выходных</p>
													</div>
												</div>
											</div>
											<div class="relative">
												<div class="swiper-pagination pagination-feature"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="panel">
								<div class="panel-heading" id="feature-2">
									<h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" data-parent="#feature-accordion" href="#feature-what" aria-expanded="false" aria-controls="feature-what">Что нужно для получения кредита?</a></h4>
								</div>
								<div class="panel-collapse collapse collapse-load" id="feature-what" role="tabpanel" aria-labelledby="feature-2">
									<div class="panel-body">
										<div class="swiper-container mobile-feature">
											<div class="swiper-wrapper">
												<div class="swiper-slide">
													<div class="feature feature--big">
														<img class="feature__icon" src="images/citizen.svg"><span class="feature__info">Быть гражданином <br> Украины</span>
														<p class="feature__text">Нет возможности проверить
															<br>информацию по гражданам
															<br>других стран</p>
													</div>
												</div>
												<div class="swiper-slide">
													<div class="feature feature--big">
														<img class="feature__icon" src="images/passport.svg"><span class="feature__info">Быть старше 18 лет</span>
														<p class="feature__text">Согласно законодательству,
															<br>мы не можем предоставлять
															<br>кредиты особам,
															<br>не достигшим совершенолетия</p>
													</div>
												</div>
												<div class="swiper-slide">
													<div class="feature feature--big">
														<img class="feature__icon" src="images/cards.svg"><span class="feature__info">Карта любого банка</span>
														<p class="feature__text">Мы выдаем кредиты только
															<br>онлайн, без визита в офис</p>
													</div>
												</div>
												<div class="swiper-slide">
													<div class="feature feature--big">
														<img class="feature__icon" src="images/scan.svg"><span class="feature__info">Скан-копии <br> паспорта и ИНН</span>
														<p class="feature__text">Скан-копию можно
															<br>заменить качественным
															<br>фото документа</p>
													</div>
												</div>
											</div>
											<div class="relative">
												<div class="swiper-pagination pagination-feature"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="panel">
								<div class="panel-heading" id="feature-3">
									<h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" data-parent="#feature-accordion" href="#feature-why" aria-expanded="false" aria-controls="feature-why">Почему клиенты выбирают Groshiua.online?</a></h4>
								</div>
								<div class="panel-collapse collapse collapse-load" id="feature-why" role="tabpanel" aria-labelledby="feature-3">
									<div class="panel-body">
										<div class="swiper-container mobile-feature">
											<div class="swiper-wrapper">
												<div class="swiper-slide">
													<div class="feature feature--big">
														<img class="feature__icon" src="images/trial.svg"><span class="feature__info">5 дней бесплатного <br> пользования кредитом</span>
														<p class="feature__text">Для новых клиентов мы не
															<br>начисляем проценты за
															<br>первые <strong class="nowrap">5 дней</strong> пользования
															<br>кредитом. Совсем</p>
													</div>
												</div>
												<div class="swiper-slide">
													<div class="feature feature--big">
														<img class="feature__icon icon--tall" src="images/rules.svg"><span class="feature__info">Прозрачные условия</span>
														<p class="feature__text">Без залога, поручителя
															<br>и справок о доходах.
															<br>Нет скрытых платежей
															<br>и комиссий</p>
													</div>
												</div>
												<div class="swiper-slide">
													<div class="feature feature--big">
														<img class="feature__icon" src="images/request.svg"><span class="feature__info">Удобное оформление <br> заявки</span>
														<p class="feature__text">Без очередей в банке
															<br>и кипы лишних документов</p>
													</div>
												</div>
												<div class="swiper-slide">
													<div class="feature feature--big">
														<img class="feature__icon" src="images/clock.svg"><span class="feature__info">Быстрое решение <br> по кредиту</span>
														<p class="feature__text">Для первого обращения -
															<br>до 15 минут, для
															<br>последующих кредитов -
															<br>до 5 минут</p>
													</div>
												</div>
												<div class="swiper-slide">
													<div class="feature feature--big">
														<img class="feature__icon" src="images/week.svg"><span class="feature__info">Кредиты на срок от&nbsp;1 дня</span>
														<p class="feature__text">В жизни бывает всякое.
															<br>Если не можете погасить
															<br>кредит в срок,
															<br>воспользуйтесь акцией
															<br>7 дней без штрафов и пени</p>
													</div>
												</div>
											</div>
											<div class="relative">
												<div class="swiper-pagination pagination-feature"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="centered-block"><a class="btn btn--primary btn--effect scrollup" href="#" >Оформить Кредит</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Footer-->
	<footer class="footer">
		<div class="container">
			<div class="footer-info">
				<div class="row">
					<div class="col-md-4 col-lg-3 hidden-sm hidden-xs"><a class="logo logo--light" href="/"><span class="logo__icon"><img src="images/groshiua-white.png" alt=""></span>
                    </a></div>
					<div class="col-sm-3 col-sm-offset-1 col-md-3 col-md-offset-0"></div>
					<div class="col-sm-4 col-md-2 col-lg-3"></div>
					<div class="col-sm-12 col-md-3">
					  <div class="social social--end"><span class="social__label">Мы в соцсетях</span>
						<ul class="social__content">
						  <li class="social__item"><a class="social__link" href="https://www.facebook.com/MoneyGus/" target="_blank"><img src="images/facebook.svg" alt="facebook"></a></li>
						</ul>
					  </div>
					</div>
				</div>
			</div>
		</div>
      <div class="footer__heler">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="copy">&copy; Все права защищены. Groshiua.online  </div>
            </div>
            <div class="col-md-3">
              <div class="payment"><span class="payment__item"><img src="images/visa.svg" alt="visa"></span><span class="payment__item payment__item--helper"><img src="images/lock.svg" alt="and"></span><span class="payment__item"><img src="images/mastercard.svg" alt="mastercard"></span></div>
            </div>
            <div class="col-md-3">
              <div class="reference">Разработано в <a class="reference__link" href="#"><img src="images/logo_reference.svg" alt=""></a></div>
            </div>
          </div>
        </div>
      </div>
    </footer>


    <!-- Image-->
    <div class="modal modal--screen fade" id="modal-image" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <button class="modal-close" type="button" data-dismiss="modal" aria-label="Close"></button><img src="images/licence-lg.jpg" alt="">
        </div>
      </div>
    </div>
    <div class="overlay"></div>
    <script src="js/jquery-3.2.1.js"></script>
    <script src="js/jquery.mask.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script src="js/nouislider.js"></script>
    <script src="js/swiper.jquery.min.js"></script>
    <script src="js/script.js"></script>
    <script async defer src="js/site_visit.js"></script>
    <!-- <script src="/lead/js/check_submit.js"></script> -->
    <script>
    	$(function(){
    		$("#phone").keyup(function(){
    			let phl = $(this).val().length;
    			// console.log(phl);
    			if(phl == 15){
	 				$("#submit_button").prop("disabled",false);
	 				$("#submit_button").text("Дальше");
 				}else{
	 				$("#submit_button").prop("disabled",true);
	 				$("#submit_button").text("Введите данные");
 				}
    		});
    	});
    </script>
  </body>
</html>
