<?php
$promo = "undefined";
    if (!empty($_REQUEST['q'])) {
        $promo = substr(htmlspecialchars(trim($_REQUEST['q'])),0,200);
    }
$campaign = "undefined";
    if (!empty($_REQUEST['utm_campaign'])) {
        $campaign = substr(htmlspecialchars(trim($_REQUEST['utm_campaign'])),0,200);
    }
$source = "undefined";
    if (!empty($_REQUEST['utm_source'])) {
        $source = substr(htmlspecialchars(trim($_REQUEST['utm_source'])),0,200);
    }
$term = "undefined";
    if (!empty($_REQUEST['utm_term'])) {
        $term = substr(htmlspecialchars(trim($_REQUEST['utm_term'])),0,200);
    }
$medium = "undefined";
    if (!empty($_REQUEST['utm_medium'])) {
        $medium = substr(htmlspecialchars(trim($_REQUEST['utm_medium'])),0,200);
    }
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Groshi: Préstamos personales inmediatos | Créditos rápidos y sin aval en Spain</title>
    <meta name="description" content="Préstamos en línea en Spain. Solicita préstamos inmediatos y recibe tu dinero en minutos." >
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="https://fonts.googleapis.com/css?family=Rubik:400,500,700&amp;amp;subset=cyrillic" rel="stylesheet">
	
    <!--
    <link rel="stylesheet" href="css/js-custom-select.css">
	<link rel="stylesheet" href="css/js-custom-scroll.css">
    -->
    
	<link rel="stylesheet" href="css/nouislider.min.css">
	<link rel="stylesheet" href="css/swiper.min.css">
	<link rel="stylesheet" href="css/style.css">
    
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
  fbq('init', '2084142761606364');
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=2084142761606364&ev=PageView&noscript=1"
/></noscript>
<!-- End Facebook Pixel Code -->


    
</head>
<body class="interactive-header">
<noscript><img height="1" width="1" style="display:none" 
src="https://www.facebook.com/tr?id=709294452739820&ev=PageView&noscript=1" 
/></noscript>
<!-- End Facebook Pixel Code -->

	<div class="wrapper">
		<!-- Header-->
		<header class="header">
			<div class="header-offscreen">
				<div class="top-section">
					<div class="cta cta--sm"><a class="btn btn--primary btn-effect" href="#" data-toggle="modal" data-target="#modal-goto">¡Solicitar!</a>
					</div>
					<div class="lang-mobile"></div>
				</div>
				<div class="bottom-section"></div>
			</div>
			<!--<div class="header-primary">
				<div class="container">
                    <a class="logo" href="/">
                    <span class="logo__icon"><img src="images/groshiua-blue.png" alt=""></span>
                    </a>
				</div>
			</div>-->
		</header>
		
        <div class="hero">
			<div class="hero__message">Préstamos entre personas a tasas justas</div>
			<div class="swiper-container hero-slider">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<div class="hero__item">
							<img class="hero__bg" src="images/hero-1.jpg" alt="">
							<div class="hero__info">
								<div class="container">
									<div class="row">
										<div class="col-sm-6 col-lg-7">
											<h3 class="hero__title">¿Necesitas un&nbsp;Préstamo Rápido?</h3>
											<p class="hero__text">En Groshi tenemos el crédito rápido que necesitas.</p>
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
                    <form id="send_form" name="send_form">
                    <div class="calculator calculator--fixed">
						<div class="calculator__contols">
						<h3>Créditos rápidos al instante</h3>
                                                    <fieldset class="form__field">
                                                        <div class="form__wrap">
                                                            <input class="form__input input-capitalize ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required ng-valid-pattern ng-valid-minlength ng-valid-maxlength" id="name" pattern="/^([a-zа-я- ]{2,50})$/i" name="name" type="text">
                                                            <label class="form__label" for="first_name">Nombre y Apellidos&nbsp;*</label>
                                                                               </div>
                                                    </fieldset>
                                                    <fieldset class="form__field">
                                                        <div class="form__wrap">
                                                            <input class="form__input ng-pristine ng-untouched ng-valid-mask ng-empty ng-invalid ng-invalid-required" id="phone" name="tel" type="tel" value="">
                                                            <label class="form__label label--open" for="phone">Número de teléfono&nbsp;*</label>
                                                        </div>
                                                    </fieldset>
                                                    <fieldset class="form__field">
                                                        <div class="form__wrap">
                                                            <input class="form__input ng-pristine ng-untouched ng-empty ng-valid-email ng-invalid ng-invalid-required ng-valid-pattern" id="email" name="email" type="email">
                                                            <label class="form__label" for="email">Email&nbsp;*</label>
                                                        </div>
                                                    </fieldset>
                            <div class="calculator__group">
								<h4 class="calculator__name">Monto del Préstamo</h4>
								<input class="limit-field number-field calculator__value value--money value--money-lg" id="input-money" type="text" ng-maxlength="5" name="money"><span class="calculator__dimension">$</span>
								<div class="range-slider"  id="slider-money" data-value="500" data-min="500" data-max="10000"></div>
								<div class="range-wrapper">
									<div class="range__label range--bottom">500 $</div>
									<div class="range__label range--top">10 000 $</div>
								</div>
							</div>
						</div>
						<div class="calculator__preivew">
							<div class="btn-group btn-group__whith-padding btn-group__w342">
								<a id="submit-btn" onclick="fbq('track', 'Lead');" class="btn btn--primary btn--lg"
								   data-link="https://go.salesdoubler.net/in/offer/1657?aid=65264&dlink=https%3A%2F%2Fwww.credy.mx%2Fform%2F&source=<?php echo $source;?>&campaign=<?php echo $campaign;?>&promo=<?php echo $promo;?>&tid1=<?php echo $medium;?>&tid2=<?php echo $term;?>">¡Solicita!</a>
							</div>
						</div>
					</div>
				</div>
                
               </form> 
			</div>
		</div>
		<div class="container">
			<div class="block">
				<h2 class="heading">¿Cómo Funcionan los préstamos inmediatos con Groshi?</h2>
				<div class="tabs tabs--md">
					<ul class="nav nav-tabs" role="tablist">
						<li class="tab__item active" role="presentation"><a class="tab__link" href="#get-credit" aria-controls="get-credit" role="tab" data-toggle="tab">Como funciona Groshi</a>
						</li>
					</ul>
					<div class="tab-content">
						<div class="tab-pane tab-pane-load active" role="tabpanel" id="get-credit">
							<div class="row hidden-xs">
								<div class="col-sm-6 col-md-3">
									<div class="feature feature--big">
										<div class="feature__media">
											<img src="images/feature-1.png">
										</div><span class="feature__count">1</span><span class="feature__info">Dinos cuánto dinero necesitas.</span>
										<p class="feature__text">No necesitas papeleo,<br> ni perder tiempo en filas</p>
									</div>
								</div>
								<div class="col-sm-6 col-md-3">
									<div class="feature feature--big">
										<div class="feature__media">
											<img src="images/feature-2.png">
										</div><span class="feature__count">2</span><span class="feature__info">Cuéntanos sobre ti.</span>
										<p class="feature__text">Llena correctamente nuestros<br>
                                            breves formularios con información<br>
                                            personal, cuentas de banco</p>
									</div>
								</div>
								<div class="clearfix visible-sm"></div>
								<div class="col-sm-6 col-md-3">
									<div class="feature feature--big">
										<div class="feature__media">
											<img src="images/feature-3.png">
										</div><span class="feature__count">3</span><span class="feature__info">Obtén préstamos personales.</span>
										<p class="feature__text">Responderemos a tu solicitud en minutos,
                                            y en caso de ser aprobado,<br>
                                            ¡recibirás tu crédito personal en<br>
                                            tu cuenta de banco en menos de 2 horas!</p>
									</div>
								</div>
								<div class="col-sm-6 col-md-3">
									<div class="feature feature--big">
										<div class="feature__media">
											<img src="images/feature-4.png">
										</div><span class="feature__count">4</span><span class="feature__info">Paga tu préstamo personal.</span>
										<p class="feature__text">Elige la opción que prefieras<br>
                                            para hacer el pago de tu préstamo</p>
									</div>
								</div>
							</div>
							
						</div>
						
					</div>
				</div>
				<div class="centered-block"><a class="btn btn--primary btn--effect" onclick="fbq('track', 'Lead');" href="https://go.salesdoubler.net/in/offer/1657?aid=65264&dlink=https%3A%2F%2Fwww.credy.mx%2Fform%2F&source=<?php echo $source;?>&campaign=<?php echo $campaign;?>&promo=<?php echo $promo;?>&tid1=<?php echo $medium;?>&tid2=<?php echo $term;?>">¡Solicitar!</a>
				</div>
			</div>
		</div>
		<!--<div class="box">
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
					<div class="centered-block"><a class="btn btn--primary btn--effect scrollup" href="#" >¡Solicitar!</a>
					</div>
				</div>
			</div>
		</div>-->
	</div>
	<!-- Footer-->
	<footer class="footer">
		<div class="container">
			<div class="footer-info">
				<div class="row">
					<!--<div class="col-md-4 col-lg-3 hidden-sm hidden-xs"><a class="logo logo--light" href="/"><span class="logo__icon"><img src="images/groshiua-white.png" alt=""></span>
                    </a></div>-->
					<div class="col-sm-3 col-sm-offset-1 col-md-3 col-md-offset-0"></div>
					<div class="col-sm-4 col-md-2 col-lg-3"></div>
					<div class="col-sm-12 col-md-3">
					  <!--<div class="social social--end"><span class="social__label">Мы в соцсетях</span>
						<ul class="social__content">
						  <li class="social__item"><a class="social__link" href="https://www.facebook.com/%D0%9A%D1%80%D0%B5%D0%B4%D0%B8%D1%82-2049253942071333" target="_blank"><img src="images/facebook.svg" alt="facebook"></a></li>
						</ul>
					  </div>-->
					</div>
				</div>
			</div>
		</div>
      <div class="footer__heler">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="copy">&copy; Todos los derechos reservados. Groshiua.online  </div>
            </div>
            <div class="col-md-3">
              <div class="payment"><span class="payment__item"><img src="images/visa.svg" alt="visa"></span><span class="payment__item payment__item--helper"><img src="images/lock.svg" alt="and"></span><span class="payment__item"><img src="images/mastercard.svg" alt="mastercard"></span></div>
            </div>
            <div class="col-md-3">
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
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="js/jquery.mask.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.5/angular.min.js"></script>
    <script src="js/js-custom-select.min.js"></script>
    <script src="js/js-custom-scroll.min.js"></script>
    <script src="js/nouislider.js"></script>
    <script src="js/theia-sticky-sidebar.js"></script>
    <script src="js/swiper.jquery.min.js"></script>
    <script src="js/app.js"></script>
    <script src="js/script.js"></script>
  </body>
</html>