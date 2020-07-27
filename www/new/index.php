<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Groshi UA</title>
	<link rel="stylesheet" href="css/style.css">
	<!-- <link rel="stylesheet" href="css/jquery-ui.css"> -->
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
	<style>
		#confirmation{
			-webkit-appearance: auto;
		}
		.checkbox-box{
			color:#fff;
			text-align: center;
			font-size: 14px;
			margin-top: 10px;
		}
		.checkbox-box a{
			color:#5A78C6;
		}
	</style>
</head>
<body>
	<header>
		<div class="wrapper">
			<div class="logo">
				<img src="/new/img/Logo.png" alt="">
			</div>
			<div class="logo_text">Groshi UA</div>
		</div>
	</header>
	<main>
		<section class="main_section">
			<div class="wrapper">
				<div class="left_side_main">
					<div class="top_text"><strong>Groshi UA</strong>деньги под 0% до 20000 грн</div>
					<div class="bottom_text">Заполняй форму <br>и получай подарки</div>
				</div>
				<div class="right_side_main">
					<div class="calculator">
						<div class="calculator_title">
							Заполните заявку и получите деньги под 0%
						</div>
						
						<!-- <div class="calculator_title">Срок</div>
						<div class="slider-2"></div> -->
						<!-- <div class="slider2_text">Кредит на <span class="days_amount">5</span> дней</div> -->
						<form action="/smartmoney/" method="POST">			
					        <input type="text" name="name" placeholder="Имя">
					        <input class="phone" type="text" name="phone" placeholder="+380 (99) 999-99-99">
					        <button class="submit_button" disabled="" type="submit">Введите данные</button>
						</form>
						<div class="checkbox-box">
			                    <input type="checkbox" id="confirmation" checked="">
			                    <label for="confirmation">Даю согласие на обработку <a target="_blank" href="/lead/privacy.html">персональных данных</a> и согласен с <a target="_blank" href="/lead/terms.html">условиями использования</a></label>
		                </div>
					</div>
				</div>
			</div>
		</section>
		<section class="advantage_section">
			<div class="wrapper">
				<h2>Наши преимущества</h2>
				<div class="advantage_wrapper">
					<div class="advatage_item">
						<img src="/new/img/clock.png" alt="">
						<p>Удобно</p>
					</div>
					<div class="advatage_item">
						<img src="/new/img/cloud.png" alt="">
						<p>Конфиденциально</p>
					</div>
					<div class="advatage_item">
						<img src="/new/img/calendar.png" alt="">
						<p>Продлеваем срок</p>
					</div>
					<div class="advatage_item">
						<img src="/new/img/creditcard.png" alt="">
						<p>Любой банк</p>
					</div>
				</div>
			</div>
		</section>
		<section class="banner_section">
			<div class="wrapper">
				<div class="steps_item">
					<h3>01. Выберите условия</h3>
					<p>Выберите необходимую сумму и срок кредита, после нажмите на кнопку "Получить деньги".</p>
				</div>
				<div class="steps_item">
					<h3>02. Заполните заявку</h3>
					<p>Заполните простую заявку чтобы мы могли принять решение по вашему кредиту.</p>
				</div>
			</div>
		</section>
		
	</main>
	<footer>
			<div class="wrapper">
				<div class="left_side_footer">Работаем круглосуточно,<br>без перерывов</div>
				<div class="right_side_footer">
					<p class="right_title">Контакты</p>
					<p>help@help@groshiua.site</p>
					<p>01024, ул. Пилипа Орлика, 6, Киев</p>
				</div>
			</div>
			<div class="protected">
				<img src="/new/img/lock.svg" alt="">
				<img src="/new/img/visa.svg" alt="">
				<img src="/new/img/mastercard.svg" alt="">
			</div>
		</footer>
</body>
<!-- <script src="js/cookTid.js"></script> -->
<script src="js/jquery-3.1.1.min.js"></script>
<!-- <script src="js/jquery-ui.js"></script>
<script src="js/jquery-touch.js"></script> -->
<script src="js/main.js"></script>
<script src="js/maskinput.js"></script>
<script>
	$(function(){
		$(".submit_button").click(function(e){
			e.preventDefault();
			location.href = "/new/feed/";
		});
	});
</script>
</html>