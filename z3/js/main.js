$('#brands').bxSlider({
minSlides : 2,
maxSlides : 6,
slideWidth : 160,
slideMargin : 10,
auto : true
});

$(window).on('activate.bs.scrollspy', function(e) {
var $hash, $node;
$hash = $("a[href^='#']", e.target).attr("href").replace(/^#/, '');
$node = $('#' + $hash);
if ($node.length) {
$node.attr('id', '');
}

document.location.hash = $hash;
if ($node.length) {
return $node.attr('id', $hash);
}
});

$("a[href^='#']:not('.tbs, .carousel-control, .scrollup, .rdr')").on('click', function(e) {
e.preventDefault();
var hash = this.hash;
var y = $(hash).offset().top-80;
$('html, body').animate({
scrollTop : y
}, 300);
return false;
});

$(window).scroll(function() {
if ($(this).scrollTop() > 100) {
$('.scrollup').fadeIn();
$('nav').addClass('scrolled');
} else {
$('.scrollup').fadeOut();
$('nav').removeClass('scrolled');
}
});

$('.scrollup').click(function() {
$("html, body").animate({
scrollTop : 0
}, 600);
return false;
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});


$(window).load(function() {
      jQuery("#status").fadeOut();
      jQuery("#preloader").delay(500).fadeOut("fast");
    });
    
    
$('a').click(function() {
	url = $(this).data('href');
	if (url !== undefined) {
		window.open(url);
		return false;
	}
}); 

$('ul.nav.navbar-nav > li > a, a.navbar-brand.home').click(function(){
	$('button.navbar-toggle').not('.collapsed').click();
});