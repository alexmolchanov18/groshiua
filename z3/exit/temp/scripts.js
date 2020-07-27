

function alertMessage(message) {
	jQuery('span.info-text').html(message);
	jQuery('.alert').slideDown().delay(3000).slideUp();
}
		
		$('html').on('click','#popup-close', function(){ $('#popup').remove(); $('#popup-bg').remove();});
		
		/*	document.onmousemove = function(e) {
				if ( (e.pageY <= 5) && ( localStorage.getItem('popup') != 'true') ) { */

					if ( !($('div').is('#popup')) ) {
						$('body').append(''+
						'<style>#popup{z-index:1000; position: fixed; left: calc(50% - 250px); top: 20px; }' +
						'#popup-bg{  background: rgba(0,0,0, 0.5); height: 100%; left: 0; position: fixed; top: 0; width: 100%; transition: 0.5s all ease;}'+
						'</style>' + '<div id="popup"></div><div id="popup-bg"></div>');

						$.get("/popup/index.php", function(data) {
							$("#popup").html(data);
						});
					}
						// localStorage.setItem('popup', 'true');
			/*	}
			} */
			
			

				




$('html').on('click','#fsubmit', function(e) {
	
	e.preventDefault();
	
	
	var formid = "#sendform";
	var client = "#client";
	var email = "#email";
	

	var clientReg = /[a-zA-ZА-Яя-яёЁ ]/i;
	if ( !clientReg.test($(client).val() ) ) {
		alertMessage('Некорректно введено имя. Попробуйте ещё раз.');
		jQuery(client).focus();
		return false;
	}

	var emailReg = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
	if (!emailReg.test($(email).val() ) ) {
		alertMessage('Некорректно введён номер телефона. Попробуйте ещё раз.');
		jQuery(email).focus();
		return false;
	}

	dataPOST = $(formid).serialize();
	$.ajax({
		method : "post",
		url : "/popup/senddata.php",
		data : dataPOST,
		success : function(data) {
			result = JSON.parse(data);
			if (result.status == 'ok') {
				alertMessage('Спасибо, ваша заявка успешно отправлена. Мы с вами свяжемся.');
				$('#'+formid)[0].reset();
				$('a.close').click();
			} else {
				alertMessage(result.error_msg);
			}
		}
	});
});