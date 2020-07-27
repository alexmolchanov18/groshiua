var url = window.location.href;
var uri = url.replace("https://groshiua.site/lead/", "");
$(".error-confirmation").hide();
// Валидация данныx из формы ввода
$('#submit').click(function(e) {
  e.preventDefault();
	$('input').each(function() {
		$(this).removeClass('_error');
	});
    // valigation patterns
	var name_reg = /^([a-zа-я-ё]{2,50})$/i;
	var phone_reg = /^\(\d{3}\) \d{3}\-\d{2}\-\d{2}$/i;
	var email_reg = /^([a-zа-я0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;
    // set fields
	var name = $('#name').val();
	var phone = $('#phone').val();
	var email = $('#email').val();
    // valisdation fields
	var is_name = name_reg.test(name);
	var is_phone = phone_reg.test(phone);
	var is_email = email_reg.test(email);
	var is_checkbox = $(".checkbox-box input[type='checkbox']");
    if (!is_name) {
		$('#name').focus();
		$('#name').addClass('_error');
		return false;
	}
    if (!is_phone) {
		$('#phone').focus();
		$('#phone').addClass('_error');
		return false;
	}

            if (is_phone) {
            var blackListPhones = ['111-11-11','222-22-22', '333-33-33', '444-44-44', '555-55-55', '666-66-66', '777-77-77', '888-88-88', '999-99-99', '000-00-00'];
            var count = blackListPhones.length;
            for(i=0; i<count; i++) {
               var flag = phone.indexOf(blackListPhones[i]);
               if(flag != -1) {
                		$('#phone').focus();
                        $('#phone').addClass('_error');
                        return false;
               }
            }
        }

    if (!is_email) {
		$('#email').focus();
		$('#email').addClass('_error');
		return false;
	}

	if(is_checkbox.prop("checked") == false){
		$(".error-confirmation").slideDown();

		return false;
	}
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
	$('#submit').text('Отправка...');
	var esputnikLead = new SubscribeEsputnik({
		"account": "provisioning",
		"site": "z3.groshiua.site",
		"group": "groshiua.online",
		"country": "Ukraine"
	});

	esputnikLead.leadFields = {"name": $("#send_form").find('input[name="name"]').val()};
	esputnikLead.leadFields = {"phone": $("#send_form").find('input[name="phone"]').val()};
	esputnikLead.leadFields = {"email": $("#send_form").find('input[name="email"]').val()};
	esputnikLead.leadFields = {"amount": $("#send_form").find('input[name="amount"]').val()};
	esputnikLead.sendToApi(function() {
		var sendFormData = $("#send_form").serialize();
		sendFormData = sendFormData.replace(/&amount=(\d+)\%20/g,"&amount=$1");
		$.post("send_lids.php", sendFormData, function(data) {
			$.post("https://api.mediabuyingteem.top/statisctics/send/", sendFormData, function(data) {

					$('#submit').removeClass('btn--primary');
					$('#submit').addClass('btn-disabled');
					$('#submit').text('Ваш запрос отправлен');
					$('#submit').off();
					$('#send_form')[0].reset();
					var link = $('#submit').data('href');
					setTimeout("location.href='/"+link+"'", 5);

			});
		});
	});
});
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
$('#phone').mask('(099) 999-99-99', {
	placeholder : "(067) 123-45-67"
});
