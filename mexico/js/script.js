var url = window.location.href;
var uri = url.replace("https://groshiua.online/lead/", "");

$('#phone').change(function () {
    var phone = $(this).val().replace(/\D/g, '');
    if (phone.length < 8 || phone.length > 11) {
        $('#phone').focus();
        $('#phone').addClass('_error');
    } else {
        $(this).removeClass('_error');
    }
});

// Валидация данныx из формы ввода
$('a#submit-btn').click(function(e) {
	e.preventDefault();
	$('input').each(function() {
		$(this).removeClass('_error');
	});

    // valigation patterns

	var email_reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // set fields
	var name = $('#name').val();
	var phone = $('#phone').val().replace(/\D/g, '');
	var email = $('#email').val();

    // valisdation fields

	var is_email = email_reg.test(email);

    if (!name.length) {
		$('#name').focus();
		$('#name').addClass('_error');
		return false;
	}

    if (phone.length < 8 || phone.length > 11) {
		$('#phone').focus();
		$('#phone').addClass('_error');
		return false;
	}

    if (!is_email) {
		$('#email').focus();
		$('#email').addClass('_error');
		return false;
	}


	var dataLink = $('a#submit-btn').data('link');
	const scriptURL = 'https://script.google.com/macros/s/AKfycbz-k3MPdkpiSljfTi28fhl1T_M1aeSpBH_de9ttp0oYCvT4tAE/exec';
	const form = document.forms['send_form'];

	dataLink = dataLink.replace(/#/g, '');


	fetch(scriptURL, { method: 'POST', body: new FormData(form) })
		.then(function (response) {

			console.log('Success!', response);
			// window.location.href = dataLink;
			// return closeOverlay
		}).catch(function (error) {
		return console.error('Error!', error.message);
	});

	var esputnikLead = new SubscribeEsputnik({
		"account": "em",
		"site": "mexico.groshiua.site",
		"group": "Subscription",
		"country": "Mexico",
		"country_phone_code": "52"
	});

	esputnikLead.leadFields = {"name": $("#send_form").find('input[name="name"]').val()};
	esputnikLead.leadFields = {"phone": "52" + $("#send_form").find('input[name="tel"]').val()};
	esputnikLead.leadFields = {"email": $("#send_form").find('input[name="email"]').val()};
	esputnikLead.leadFields = {"amount": $("#send_form").find('input[name="money"]').val()};
	esputnikLead.sendToApi(function() {
		window.location.href = dataLink;
	});
/*	fetch('add-esputnik.php', { method: 'POST', body: new FormData(form) })
		.then(function (response) {

			console.log('Success! Esputnik', response);
			// window.location.href = dataLink;
			// return closeOverlay
		}).catch(function (error) {
		return console.error('Error! Esputnik', error.message);
	});*/
	//return false;



    /* not phone, not email
	if (!phone && !email) {
		$('#phone').focus();
		$('#phone').addClass('_error');
		$('#email').addClass('_error');
		return false;
	}

    // phone & email, incorrect phone
	if ((phone && email) && !is_phone) {
		$('#phone').focus();
		$('#phone').addClass('_error');
		return false;
	}

    // phone & email, incorrect email
	if ((phone && email) && !is_email) {
		$('#email').focus();
		$('#email').addClass('_error');
		return false;
	}

    // only phone, incorrect phone
	if ((phone && !email) && !is_phone) {
		$('#phone').focus();
		$('#phone').addClass('_error');
		return false;
	}

    // only email, incorrect email
	if ((!phone && email) && !is_email) {
		$('#email').focus();
		$('#email').addClass('_error');
		return false;
	} */



	// $.post("mail/sputnik2.php", $("#send_form").serialize(), function(data) {
  //
	// $('#submit').removeClass('btn--primary');
	// $('#submit').addClass('btn-disabled');
	// $('#submit').text('Ваш запрос отправлен');
	// $('#submit').off();
	// $('#send_form')[0].reset();
  //
	// setTimeout("location.href='https://groshiua.online/" + uri + "'", 600);
	// console.log(data);
  //
	// });
  //
	// $.post("send_lids.php", $("#send_form").serialize(), function(data) {
	// //	console.info(data);
	// });

});

var dataLink = $('a#submit-btn').data('link');

// function getParameterByName(name, url) {
   //    if (!url) url = window.location.href;
   //    name = name.replace(/[\[\]]/g, '\\$&');
   //    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
   //        results = regex.exec(url);
   //    if (!results) return null;
   //    if (!results[2]) return '';
   //    return decodeURIComponent(results[2].replace(/\+/g, ' '));
   //  }
   //
   //  var foo = getParameterByName('utm_source');
   //  var boo = getParameterByName('utm_medium');

// $('#submit-btn').click(function (e) {
// 	var dataLink = $('a#submit-btn').data('link');
// 	const scriptURL = 'https://script.google.com/macros/s/AKfycbz-k3MPdkpiSljfTi28fhl1T_M1aeSpBH_de9ttp0oYCvT4tAE/exec';
// 	const form = document.forms['send_form'];

// 	dataLink = dataLink.replace(/#/g, '');


// 	e.preventDefault();

// 	fetch(scriptURL, { method: 'POST', body: new FormData(form) })
// 		.then(function (response) {

// 			console.log('Success!', response);
// 			// window.location.href = dataLink;
// 			// return closeOverlay
// 		}).catch(function (error) {
// 		return console.error('Error!', error.message);
// 	});
// 	//return false;
// 	window.location.href = dataLink;
// });

$('.js-country').val('mexico');

//Submit по enter
$('input').keypress(function(e) {
	if (e.keyCode == 13) {
		$('#submit').click();
	}
});
$('.scrollup').click(function() {
	$("html, body").animate({
		scrollTop : 0
	}, 1000);
	return false;
});
// mexico placeholder: +52 __ ____ ____
// $('#phone').mask('(999) 999-99-99', {
// 	placeholder : "(552) 123-45-67"
// });
