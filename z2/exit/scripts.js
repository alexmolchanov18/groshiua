$(window).load(function() {

	function alertMessage(message) {
		$('span.info-text').html(message);
		$('.alert').slideDown().delay(3000).slideUp();
	}


	$('html').on('click', '#popup-close', function() {
		setTimeout(function() {
			$('#popup').fadeOut(333);
			$('#popup-bg').fadeOut(333);
		}, 0);

		setTimeout(function() {
			$('#popup').remove();
			$('#popup-bg').remove();
		}, 500);
	});

	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			setTimeout(function() {
				$('#popup').fadeOut(333);
				$('#popup-bg').fadeOut(333);
			}, 0);

			setTimeout(function() {
				$('#popup').remove();
				$('#popup-bg').remove();
			}, 500);
		}
	});

	if (!($('div').is('#popup'))) {

		$.ajax({
			url : "rdr.php",
			method : "post",
			data : {
				"aff_id" : aff_id
			},
			success : function(data) {

				y = data.indexOf('Disabled');

				$('body').append('' + '<style>#popup{z-index:1000; position: fixed; left: calc(50% - 250px); top: 20px; display: none;}' + '#popup-bg{background: rgba(0,0,0, 0.5); height: 100%; left: 0; position: fixed; top: 0; width: 100%; transition: 0.5s all ease; display: none;}' + '</style>' + '<div id="popup"></div><div id="popup-bg"></div>');

				if (y == -1) {

					$("#popup").html(data);
					$('#aff_id').val(aff_id);

					document.onmousemove = function(e) {
						if ((e.pageY <= 5) && (localStorage.getItem('popup') != 'true')) {

							$('#popup').fadeIn(333);
							$('#popup-bg').fadeIn(333);
						}
					}
				}

			},
			cache : false
		});
	}

	$('html').on('click', '#fsubmit', function(e) {

		e.preventDefault();

		var formid = "#sendform";
		var client = "#client";
		var email = "#email";

		var clientReg = /[a-zA-ZА-Яя-яёЁ ]/i;
		if (!clientReg.test($(client).val())) {
			alertMessage('Некорректно введено имя. Попробуйте ещё раз.');
			$(client).focus();
			return false;
		}

		var emailReg = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
		if (!emailReg.test($(email).val())) {
			alertMessage('Некорректно введён номер телефона. Попробуйте ещё раз.');
			$(email).focus();
			return false;
		}

		dataPOST = $(formid).serialize();

		$.ajax({
			method : "post",
			url : "senddata.php",
			data : dataPOST,
			success : function(data) {
				if (data == '1') {

					$('form#sendform').remove();
					$('div.body').html('<h2 id="thanks">Спасибо, ваша заявка успешно отправлена. Мы с&nbsp;вами свяжемся.</h2>');

					setTimeout(function() {
						$('#popup').fadeOut(333);
						$('#popup-bg').fadeOut(333);
					}, 3000);

					setTimeout(function() {
						$('#popup').remove();
						$('#popup-bg').remove();
					}, 4000);

				}

			}
		});
	});

});
