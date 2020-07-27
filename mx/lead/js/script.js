var url = window.location.href;
var uri = url.replace("https://groshiua.site/lead/", "");
// Валидация данныx из формы ввода
$('#submit').click(function() {
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
  if (!is_email) {
    $('#email').focus();
    $('#email').addClass('_error');
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

  var esputnikLead = new SubscribeEsputnik({
    "account": "provisioning",
    "site": "mx.groshiua.site",
    "group": "groshiua.online",
    "country": "Ukraine"
  });

  esputnikLead.leadFields = {"name": $("#send_form").find('input[name="name"]').val()};
  esputnikLead.leadFields = {"phone": $("#send_form").find('input[name="phone"]').val()};
  esputnikLead.leadFields = {"email": $("#send_form").find('input[name="email"]').val()};
  esputnikLead.leadFields = {"amount": $("#send_form").find('input[name="money"]').val()};
  esputnikLead.sendToApi(function() {
        setTimeout("location.href='https://groshiua.site/" + uri + "'", 600);
  });

    $('#submit').removeClass('btn--primary');
    $('#submit').addClass('btn-disabled');
    $('#submit').text('Ваш запрос отправлен');
    $('#submit').off();
    $('#send_form')[0].reset();
    //uri = uri+$('#submit').attr('data-href');

  $.post("send_lids.php", $("#send_form").serialize(), function(data) {
    //	console.info(data);
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
    scrollTop: 0
  }, 1000);
  return false;
});
$('#phone').mask('(099) 999-99-99', {
  placeholder: "(067) 123-45-67"
});
