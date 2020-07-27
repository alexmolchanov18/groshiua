// Form validation
var app = angular.module('app', ['ngMessages','ui.mask']);

app.controller('formController', function($scope) {
  $scope.data = {};

  // Set default value
  // $scope.inputFName = 'Константин';
  // $scope.inputLName = 'Ярушковский-Иванов';

  $scope.someSelected = function (object) {
    if (!object) return false;
    return Object.keys(object).some(function (key) {
     	return object[key];
    });
  }

  $scope.doTouched = function() {
     $scope.form.agreement.$setTouched();
  }
});

// Upload file quantity and extension validation
var _validFileExtensions = [".jpg", ".jpeg", ".png"];

function validateSingleInput(oInput) {
    var sFileName = oInput;

    if (sFileName.length > 0) {
        for (var j = 0; j < _validFileExtensions.length; j++) {
            var sCurExtension = _validFileExtensions[j];
            if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                return false;
            }
        }
    }

    return true;
}

// Input file validation
app.directive('validFile',function(){
  return {
    require:'ngModel',
    link:function(scope,el,attrs,ngModel){

      el.bind('change',function(){
        scope.$apply(function(){

			// Detect free capacity
			var self = $(el),
				patron = self.parents('.upload-group');
			var uploaded_items = patron.find('.upload--success').length;

			if( el[0].files.length > (el[0].dataset.max - uploaded_items) ){
				ngModel.$setValidity('quantity', false);
			} else {
				ngModel.$setValidity('quantity', true);

				for(var i = 0; i < el[0].files.length; i++){
					if( validateSingleInput(el[0].files[i].name) ){
						self.val('');
						ngModel.$setValidity('extension', false);
					} else {
						ngModel.$setValidity('extension', true);
					}
				}
			}

          	ngModel.$setViewValue(el.val());
          	ngModel.$render();
        });
      });
    }
  }
});

// Fields compare validation
app.directive("compareTo", function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});

app.directive("moreThan", function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=moreThan"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.moreThan = function(modelValue) {
                return (parseInt(modelValue) >= parseInt(scope.otherModelValue));
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});

app.directive('validPlace', function() {
  	return {
	    require : 'ngModel',
	    link : function(scope, element, attrs, ngModel) {
		    ngModel.$parsers.push(function(value) {
		        if(!value || value.length == 0) return;

		        var test,
		        	expression = /\d/;

		        test = expression.test(value);

		        ngModel.$setValidity('number', test);
		        return value;
		    });
	    }
  	};
});

app.directive('validNaming', function() {
  	return {
	    require : 'ngModel',
	    link : function(scope, element, attrs, ngModel) {
		    ngModel.$parsers.push(function(value) {
		        if(!value || value.length == 0) return;

		        var test,
		        	text_type = $(element).data('alpha'),
		        	expression_latin = /[a-zA-Zа-яА-ЯёЁґҐєЄіІїЇ]+/,
		        	expression_cyr = /[а-яА-ЯёЁґҐєЄіІїЇ]+/;

		        if ( text_type == "cyrillic" ){
		        	test = expression_cyr.test(value);
		        } else{
		        	test = expression_latin.test(value);
		        }

		        ngModel.$setValidity('naming', test);
		        return value;
		    });
	    }
  	};
});

$(document).ready(function(){
	// Basic variables
	var display_width = $(window).outerWidth();

	// Media validation
	var display_type,
    	previus_display;

    // Animation time
    	var time_fast = 380,
    		time_slow = 620;

    // Detect current device
    if( display_width >= 1280){
		previus_display = 'desk';
	} else if( display_width >= 993 && display_width < 1280){
		previus_display = 'laptop';
	} else if( display_width >= 768 && display_width < 993){
		previus_display = 'tablet';
	} else if( display_width < 768){
		previus_display = 'mobile';
	}

	// Overlay
	$('.overlay').on('click', function(){
		var elements_array = ['.nav-toggle', '.header-offscreen'];

		for (var i = 0; i < elements_array.length; i++){
			$(elements_array[i])[0].classList.remove('active');
		}

		$(this)[0].classList.remove('active');
	});

	function toggle_overlay(){
		$('.overlay')[0].classList.toggle('active');
	}

	// Navigation
	$('.nav-toggle').on('click', function(e){
		e.preventDefault();

/*		if( !($(this).hasClass('active')) ) {
			window.removeEventListener("mousewheel", MouseWheelHandler, false);
			window.removeEventListener("DOMMouseScroll", MouseWheelHandler, false);
		} else {
			window.addEventListener("mousewheel", MouseWheelHandler, false);
			window.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
		}*/

		$(this)[0].classList.toggle('active');
		$('.header-offscreen')[0].classList.toggle('active');

		$(this).parents('.header').find('.login')[0].classList.toggle('hide');
		$(this).parents('body')[0].classList.toggle('static-position');
		toggle_overlay();
	});


	// window.blockMenuHeaderScroll = false;

	// $(window).on('touchstart', function(e){
	//     if ($(e.target).parents('.header').length > 0)
	//     {
	//         blockMenuHeaderScroll = true;
	//     }
	// });

	// $(window).on('touchend', function(){
	//     blockMenuHeaderScroll = false;
	// });

	// $(window).on('touchmove', function(e){
	// 	if( $('body').hasClass('static-position') ){
	// 	    if (blockMenuHeaderScroll)
	// 	    {
	// 	        e.preventDefault();
	// 	    }
	// 	}
	// });

	// Multilevel menu
	$('.menu__control, .menu__claster').on('click', function(e){
		e.preventDefault();

		var menu_level = $(this).data('level');
		$(menu_level)[0].classList.add('active');

		$(this).parents('.menu')[0].classList.add('active');
	});

	$('.menu__return').on('click', function(e){
		e.preventDefault();

		$(this).parent()[0].classList.remove('active');

		$(this).parents('.menu')[0].classList.remove('active');
	});

	// Lang toggle
	$('.lang__item').on('click', function(e){
		e.preventDefault();

		var controls = '.lang__item',
			target = $(this),
			toggle = $('.lang__toggle');
			selected_lang = target.data('lang'),
			current_lang = toggle.data('current');

		if( selected_lang != current_lang ){
			toggle.data('current', selected_lang)[0].classList.toggle('change');

			target.siblings(controls).each(function(){
				$(this)[0].classList.remove('active');
			});
			target[0].classList.add('active');
		}
	});

	$('.lang__toggle').on('click', function(){
		var controls = '.lang__item',
			toggle = $(this),
			current_lang = toggle.data('current');

		if( current_lang == "ru" ){
			change_lang('urk');
		} else {
			change_lang('ru');
		}

		function change_lang(language_code){
			toggle.data('current', language_code);

			toggle.siblings(controls).each(function(){
				$(this)[0].classList.remove('active');
			});
			$('[data-lang="' + language_code +'"]')[0].classList.add('active');
		}

		toggle[0].classList.toggle('change');
	});

	// Contact info
	$('.contact-info__control').on('click', function(e){
		e.preventDefault();

		$(this)[0].classList.toggle('active');
		$(this).siblings('.contact-info__helper')[0].classList.toggle('active');
	});

	$('.link--call').on('click', function(e){
		if($('.contact-info__control').hasClass('active')){
			$('.contact-info__control').trigger('click');
		}
	});

	// Tooltip
	$('.tooltip-trigger').on('mouseenter', function(){
		var tooltip = $(this).find('.tooltip');

		tooltip[0].classList.add('active');
	}).on('mouseleave', function(){
		$(this).find('.tooltip')[0].classList.remove('active');
	});

	$('.tooltip-trigger').on('click', function(e){
		e.preventDefault();
		e.stopImmediatePropagation();
	});

	// Form
	$('.form').on('submit', function(e){
      	e.preventDefault();
      	var form = $(this);

      	if ( hasClass(this, 'ng-valid') ){
      		if( hasClass(this, 'captcha-validate')){

      			if( hasClass(this, 'form--modal') ){

      				widgetId2 = grecaptcha.render('recaptcha-alt', {
	                	'sitekey' : '6LeiKDAUAAAAAKeKeYASbw3AwSbe2QH7l3pqYRMt',
	                	'callback' : onSubmitAlt,
	                	'size' : "invisible"
	                });

      				grecaptcha.execute(widgetId2);

      			} else {

      				widgetId1 = grecaptcha.render('recaptcha', {
	                	'sitekey' : '6LeiKDAUAAAAAKeKeYASbw3AwSbe2QH7l3pqYRMt',
	                	'callback' : onSubmit,
	                	'size' : "invisible"
	                });
      				grecaptcha.execute(widgetId1);

      			}

      		} else {
      			if( hasClass(this, 'form--modal') ){
	      			$(this).parents('.modal-content')[0].classList.add('submit-success');
	      		}

	      		if( hasClass(this, 'form--tabs') ){
	      			$(this).parents('.tab-pane')[0].classList.add('submit-success');
	      		}

	      		var formInput = form.serialize();
	      		$.post(form.attr('action'), formInput);
      		}
      	}

    	form[0].classList.add('ng-dirty');

    	form.find('.form__error').each(function(){
    		$(this)[0].classList.remove('ng-hide');
    	});

    	form.find('.ng-untouched').each(function(){
    		$(this)[0].classList.remove('ng-untouched');
    		$(this)[0].classList.add('ng-touched');
    	});

    	form.find('.form__input, .checkbox').each(function(){
    		$(this)[0].classList.remove('ng-pristine');
    	})

    	form.find('.custom-select-block[class*="required"]').each(function(){
    		if ( hasClass(this, 'ng-pristine') ){
    			this.classList.add('invalided');
    		}
    	});
  	});

  	$('.submit-control').on('click', function(e){
  		e.preventDefault();
  		var form_target = $(this).data('connect');

		$(form_target).submit();
  	});

  	$('.btn--addon').on('click', function(e){
  		e.preventDefault();
  	});

  	$('.calc-sidebar').on('click', function(e){
  		e.preventDefault();

  		$(this).parents('.calculator__info')[0].classList.remove('active');

  		$('html, body').animate({
	        scrollTop: $( $(this).data('target') ).offset().top - (display_width < 480 ? 30 : -40)
	    }, time_slow);
  	});

  	$('.info-close').on('click', function(e){
  		e.preventDefault();
  		$(this).parents('.calculator__info')[0].classList.remove('active');
  	});

  	$('.link-info-calc').on('mouseenter', function(){
  		if(display_width > 768){
  			$(this).siblings('.tooltip')[0].classList.add('active');
  		}
  	}).on('mouseleave', function(){
  		if(display_width > 768){
  			$(this).siblings('.tooltip')[0].classList.remove('active');
  		}
  	});

  	$('.link-info-calc').on('click', function(e){
  		if(display_width < 768){
  			e.preventDefault();

  			if( $(this).siblings('.tooltip').hasClass('active') ){
				$(this).siblings('.tooltip')[0].classList.remove('active');
			} else {
				var tooltip = $(this).siblings('.tooltip');
				tooltip[0].classList.add('active');

				var bottom_of_element = tooltip.offset().top + tooltip.outerHeight();
				var bottom_of_screen = $(window).scrollTop() + $(window).height();

				if(bottom_of_element > bottom_of_screen){
					$('html, body').animate({
				        scrollTop: $(window).scrollTop() + (bottom_of_element - bottom_of_screen)
				    }, time_slow);
				}
			}
  		}
  	});

  	$('.edit-form').on('click', function(){
  		$('.edit-close').trigger('click');
  	});

  	$('.edit-calc').on('click', function(e){
  		e.preventDefault();
  		$('.calc-close').trigger('click');
  	});

	$('.form__input').each(function(){
		if( $(this).val().length > 0 ){
			$(this).parent()[0].classList.add('passed');
		}
	});

	$('.form__input').on('focus', function(){
		$(this).parent()[0].classList.add('focused');
	}).on('blur', function(){
		var self = $(this);
		self.parent()[0].classList.remove('focused');

		if( self.val().length > 0 && !hasClass(this, 'ng-invalid')){
			self.parent()[0].classList.add('passed');

			if( self.hasClass('input-change') ){
				if(self.attr('type') == 'tel' ){
					self.parents('.form')[0].classList.add('phone-changed');
				} else {
					self.parents('.form')[0].classList.add('email-changed');
				}
			}
		} else {
			self.parent()[0].classList.remove('passed');

			if( self.hasClass('input-change') ){
				if(self.attr('type') == 'tel' ){
					self.parents('.form')[0].classList.remove('phone-changed');
				} else {
					self.parents('.form')[0].classList.remove('email-changed');
				}
			}
		}
	});

	$('.input-capitalize').on('input', function(event) {
        var self = $(this)
        	input_value = self.val();

        var words = input_value.split(' '),
        	result = [];;

        for ( var i = 0; i < words.length; i++){
        	result[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1);
        }

        self.val(result.join(' '));
    });

    $('.input-uppercase').on('input', function(event) {
    	var self = $(this);

    	self.val(self.val().toUpperCase());
    	self.trigger('change');
    });

    $('.input-separate').on('input', function(event) {
    	var self = $(this),
    		input_value = self.val();

    		clean_value = input_value.split('-').join('');
    		if (clean_value.length > 8){
    			self.val(clean_value.substr(0,8) + "-" + clean_value.substr(8));
    		}
    });

    $('.input-latin').on('input', function(e) {
    	var self = $(this),
    		input_value = self.val(),
    		current_value = input_value.slice(-1),
    		test_cyrillic = /[а-яА-ЯёЁґҐєЄіІїЇ]/;

    	if (test_cyrillic.test(current_value)){
    		self.val(input_value.slice(0, -1));
    		$(this).trigger('change');
    	}
    });

    $('.input-cyrillic').on('input', function(e) {
    	var self = $(this),
    		input_value = self.val(),
    		current_value = input_value.slice(-1),
    		test_cyrillic = /[а-яА-ЯёЁґҐєЄіІїЇ]/;

    	if (!test_cyrillic.test(current_value)){
    		self.val(input_value.slice(0, -1));
    		$(this).trigger('change');
    	}
    });

    $('.limit-words').on('input', function(e) {
    	var self = $(this),
    		input_value = self.val(),
    		words = input_value.split(' ').length;

    		if (words > 3){
    			self.val(input_value.slice(0, -1));
    			$(this).trigger('change');
    		}
    });

    $('.personal-income').on('input', function(event) {
    	var related = $(this).data('sum');
    	$(related).change();
    });

    $('[ng-model="inputPassword"]').on('input', function(event) {
    	var self = $(this),
    		related = $('[ng-model="inputRePassword"]');

    	if( self.val() == related.val() ){
    		$('[ng-model="inputRePassword"]').blur();
    	}
    });

	$('.form__toggle').on('click', function(e){
		e.preventDefault();
		var pass_toggle = $(this);

		if( hasClass(this, 'active') ){
			pass_toggle.siblings('.form__input').attr('type', 'password');
		} else {
			pass_toggle.siblings('.form__input').attr('type', 'text');
		}

		pass_toggle[0].classList.toggle('active');
	});

	$('.upload-group').each(function(){
		var current_uploads = $(this).find('.upload-preview').length;

		if(current_uploads > 0){
			$(this).find('.filecheck').val('exist');
           	$(this).find('.filecheck').trigger('change');
		}
	});

	$('.select-search').jsCustomSelect({
		search: true,
		searchNoResults: 'Нет совпадений',
		searchInputHeight: 58,
		'max-height': 255,
		placeholder: '',
        scroll: {
            minScrollbarLength: 40
        }
	});

	$('.select-list').jsCustomSelect({
		search: false,
		placeholder: '',
        scroll: {
            minScrollbarLength: 40
        },
        change:function(e){
        	$(e).parents('.select-group').find('.select-list-item').each(function(){
        		$(this)[0].classList.remove('selected');

        		if ( $(this).data('value') == e.value ){
        			$(this)[0].classList.add('selected');
        		}
        	});
        }
	});

	$('.select-choose').jsCustomSelect({
		search: false,
		'max-height': 250,
		placeholder: '',
        scroll: {
            minScrollbarLength: 40
        },
        change: function(e){
        	$(e).parents('.card')[0].classList.add('card--change');

        	$(e).parents('.select-group').find('.select-list-item').each(function(){
        		$(this)[0].classList.remove('selected');

        		if ( $(this).data('value') == e.value ){
        			$(this)[0].classList.add('selected');
        		}
        	});
        }
	});

	$('.value-field').on('click', function(){
		var self = $(this),
			parent = self.parents('.select'),
			dropdown = parent.find('.custom-select-list');

		if(parent.hasClass('open')){
			var bottom_of_element = dropdown.offset().top + dropdown.outerHeight();
    		var bottom_of_screen = $(window).scrollTop() + $(window).height();

    		if(bottom_of_element > bottom_of_screen){
    			$('html, body').animate({
			        scrollTop: $(window).scrollTop() + (bottom_of_element - bottom_of_screen)
			    }, time_slow);
    		}
		}
	});

	$('.select-label').on('click', function(e){
		e.preventDefault();

		$(this).siblings('.select').find('.value-field').trigger('click');
	});

	$('.card-confirm').on('click', function(e){
		e.preventDefault();

		$(this).parents('.card')[0].classList.remove('card--change');
	});

	$('select').on('change', function(){
		$(this).parent()[0].classList.add('selected');

		$(this).siblings('.custom-select-block')[0].classList.remove('invalided', 'ng-pristine', 'ng-untouched', 'ng-empty', 'ng-invalid');
	});

	$('select').on('focus', function(){
		$(this).on('keydown', function(e){
			if ( (e.keyCode >= 35 && e.keyCode <= 40) ) {
	            e.preventDefault();
	        }
		});
	});

	if ( $('.licence').length > 0 ){
		$('.licence').each(function(){
			var new_id = $(this).attr('id');

			new jsCustomScroll(document.getElementById(new_id));
		});
	}

	if ( $('#notification-box').length > 0 ){
		new jsCustomScroll(document.getElementById('notification-box'));
	}

	$('.user__box').on('click', function(e){
		e.preventDefault();

		// Scroll top
		$('html, body').animate({
	        scrollTop: $(this).offset().top - 100
	    }, time_slow);
		$(this).parent()[0].classList.toggle('active');
	});

	$('.notification').on('click', function(e){
		e.preventDefault();
	});

	$('.notification-more').on('click touchstart', function(e){
		e.preventDefault();

		$(this)[0].classList.toggle('active');
		$(this).siblings('.notification-full').slideToggle(time_fast);
	});

	// new jsCustomScroll(document.getElementById('licence'));


	$('.repeat-group .link--info').on('click', function(e){
		e.preventDefault();
		var self = $(this),
			parent = self.parent(),
			timer = parent.find('.tiny-timer');

		var time_left = timer.find('.seconds').html();

		if ( !time_left || time_left === 0 ){

			parent[0].classList.add('active');

			var minute = addSeconds(59);
			initializeClock(timer, minute);

		}

		setTimeout(function(){
			parent[0].classList.remove('active');
		}, 60000)
	});

	$('.btn-decline').on('click', function(e){
		e.preventDefault();

		setTimeout(function(){
			$('#modal-decline').modal('show');
		}, 500);
	});

	// Range slider
	var slider_money = document.getElementById('slider-money'),
		input_money = document.getElementById('input-money');

	if ( slider_money ){
		var min_value = slider_money.getAttribute('data-min') == 0 ? 0 : parseInt(slider_money.getAttribute('data-min')) || 500,
			max_value = parseInt(slider_money.getAttribute('data-max')) || 3000;

		range_slider(slider_money, input_money, {
			start: slider_money.getAttribute('data-value') || 500,
			step: parseInt(slider_money.getAttribute('data-step')) || 50,
			connect: [true, false],
			range: {
				'min': min_value,
				'max': max_value
			}
		});
	}

	var slider_time = document.getElementById('slider-time'),
		input_time = document.getElementById('input-time');

	if ( slider_time) {
		var min_value = slider_time.getAttribute('data-min') == 0 ? 0 : parseInt(slider_time.getAttribute('data-min')) || 1,
			max_value = parseInt(slider_time.getAttribute('data-max')) || 20;

		range_slider(slider_time, input_time, {
			start: slider_time.getAttribute('data-value') || 20,
			step: 1,
			connect: [true, false],
			range: {
				'min': 1,
				'max': 20
			}
		});

		slider_time.noUiSlider.on('update', function( values, handle ) {
			var slider__label = $('.value--time'),
				current_item = parseInt(values[handle]),
				label_variants = ['день', 'дня', 'дней'];

			slider__label[0].classList.remove('dimension--sm');

			if( current_item == 1 ){
				slider__label.next().html(label_variants[0]);
			} else if(current_item == 2 || current_item == 3 || current_item == 4) {
				slider__label.next().html(label_variants[1]);
				slider__label[0].classList.add('dimension--sm');
			} else {
				slider__label.next().html(label_variants[2]);
			}
		});
	}

	function range_slider(id, input, config){
		noUiSlider.create(id, config);

		id.noUiSlider.on('update', function( values, handle ) {
			var number = parseInt(values[handle]);
			input.value = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		});

		input.addEventListener('change', function(){
			this.value = this.value.replace(/ /g,'');
    		id.noUiSlider.set(this.value);
		});
	}


	$('.number-field').on('keydown', function(e){
		// Allow: backspace, delete, tab, escape, enter
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                return;
        }

        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
	});

	$('.limit-field').on('keydown', function(e){
		var limit = $(this).attr('ng-maxlength'),
			value_symbols = $(this).val().length;

			function getSelectedText() {
			    var text = "";
			    if (typeof window.getSelection != "undefined") {
			        text = window.getSelection().toString();
			    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
			        text = document.selection.createRange().text;
			    }
			    return text;
			}
			var selectedText = getSelectedText();

			if ( limit <= value_symbols && selectedText.length < 1) {

				// Allow: backspace, delete, tab, escape, enter
				if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
	             	// Allow: Ctrl+A, Command+A
	            	(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
	            	// Allow: home, end, left, right, down, up
	            	(e.keyCode >= 35 && e.keyCode <= 40)) {
	               		return;
		        } else {
		        	e.preventDefault();
		        }

        	}
	});

	$('.calculator__info-toggle').on('click', function(e){
		e.preventDefault();
		var info_block = $(this).parent()
		info_block[0].classList.add('active');

		if( display_width < 768 ){
			setTimeout(function(){
				var bottom_of_element = info_block.offset().top + info_block.outerHeight();
				var bottom_of_screen = $(window).scrollTop() + $(window).height();

				if(bottom_of_element > bottom_of_screen){
					$('html, body').animate({
				        scrollTop: $(window).scrollTop() + (bottom_of_element - bottom_of_screen)
				    }, time_slow);
				}
			}, time_slow)
		}
	});

	$('.tabs-view a').on('click', function(e){
		var current_situation = $(this).data('view');

		if (current_situation == 'login'){
			$('body')[0].classList.add('clean-view');
		} else {
			$('body')[0].classList.remove('clean-view');
		}
	});

	$('.accordion a, .faq-accordion a').on('click', function(e){
		var self = $(this);

		setTimeout(function(){
			$('html, body').animate({
		        scrollTop: self.offset().top - (display_width < 480 ? 70 : 0)
		    }, time_slow);
		}, 350);
	});

	if( $('content--faq').length > 0 ){
		activator(obj);
	}

	// Toggle calc config
	$('.calculator-config').on('click', function(e){
		e.preventDefault();
		var calc = $(this).parents('.calculator');

		calc[0].classList.add('active');

		calc.find('.calculator__preivew-header').slideUp(time_fast);
		calc.find('.calculator__top').delay(time_fast).slideDown(time_slow);
		calc.find('.calculator__submit').delay(time_fast + time_slow).slideDown(time_fast);
	});

	$('.calculator__submit > .btn').on('click', function(e){
		e.preventDefault();
		var calc = $(this).parents('.calculator');

		calc[0].classList.remove('active');

		calc.find('.calculator__submit').slideUp(time_fast);
		calc.find('.calculator__top').delay(time_fast).slideUp(time_slow);
		calc.find('.calculator__preivew-header').delay(time_fast + time_slow).slideDown(time_fast);
	});

	// Edit page interaction
	$('.calc-open').on('click', function(e){
		e.preventDefault();
		var toggle = $(this),
			parent = toggle.parents('.toogle-section');

			toggle[0].classList.add('insivible')
			parent.find('.credit')[0].classList.add('credit--open');

			parent.find('.calculator').slideDown(time_slow);
			parent.find('.change-controls').delay(time_slow).slideDown(time_fast);

			// Hide next
			$('.next-block').slideUp(time_fast);
	});

	$('.calc-close').on('click', function(e){
		e.preventDefault();
		var toggle = $(this),
			parent = toggle.parents('.toogle-section'),
			alt = parent.find('.calc-open');

			alt[0].classList.remove('insivible')
			parent.find('.credit')[0].classList.remove('credit--open');

			parent.find('.change-controls').slideUp(time_fast);
			parent.find('.calculator').delay(time_fast).slideUp(time_slow);

			$('html, body').animate({
		        scrollTop: parent.offset().top - (display_width < 480 ? 70 : 0)
		    }, time_slow);

			// Hide next
			$('.next-block').slideDown(time_fast);
	});

	// Edit form interaction
	$('.edit-open').on('click', function(e){
		e.preventDefault();
		var toggle = $(this),
			parent = toggle.parents('.toogle-section');

			toggle[0].classList.add('insivible')
			parent.find('.toggle-first').slideUp(time_slow);
			parent.find('.toggle-second').delay(time_slow).slideDown(time_slow);

			// Hide next
			$('.next-block').slideUp(time_fast);
	});

	$('.edit-close').on('click', function(e){
		e.preventDefault();
		var toggle = $(this),
			parent = toggle.parents('.toogle-section'),
			alt = parent.find('.edit-open');

			alt[0].classList.remove('insivible')
			parent.find('.toggle-second').slideUp(time_slow);
			parent.find('.toggle-first').delay(time_slow).slideDown(time_slow);

			// Scroll top
			$('html, body').animate({
		        scrollTop: parent.offset().top - (display_width < 480 ? 70 : 0)
		    }, time_slow);

			// Show next
			$('.next-block').slideDown(time_fast);
	});

	// Interactive section change
	$('.toggle-next').on('click', function(e){
		e.preventDefault();

		var toggle = $(this),
			current_section = toggle.data('current'),
			target_section = toggle.data('target')
			parent = toggle.parents('.toogle-section');

			parent.find(current_section).slideUp(time_slow);
			parent.find(target_section).delay(time_slow).slideDown(time_slow);
	});

	$('.config-top-hide').on('click', function(e){
		$('.config-top').slideUp(time_slow);
	});

	$('.config-top-show').on('click', function(e){
		$('.config-top').slideDown(time_slow)
	});


	$('.pass-change').on('click', function(e){
		e.preventDefault();

		$(this)[0].classList.add('insivible');
		$('.password-form').slideDown(time_slow);
	});

	$('.pass-back').on('click', function(e){
		e.preventDefault();

		$('.pass-change')[0].classList.remove('insivible');
		$('.password-form').slideUp(time_slow);
	});


	$('#passport_id').change(function() {

        if($(this).is(":checked")) {
        	$('.passport-regular').slideUp(time_slow);
            $('.passport-id').delay(time_slow).slideDown(time_slow);
        } else {
        	$('.passport-id').slideUp(time_slow);
            $('.passport-regular').delay(time_slow).slideDown(time_slow);
        }

    })

	$('.detail__control').on('click', function(e){
		e.preventDefault();
		var self = $(this);
			current_state = self.html(),
			open_state = self.data('open'),
			close_state = self.data('close');

		if( current_state == open_state ){
			self.html(close_state);
			self[0].classList.remove('active');
			self.siblings('.detail--more').slideUp(time_fast);
		} else {
			self.html(open_state);
			self[0].classList.add('active');
			self.siblings('.detail--more').slideDown(time_fast);
		}
	});

	$('.promo-code__toggle').on('click', function(e){
		e.preventDefault();
		var self = $(this);

		if ( self.parents('.promo-code').hasClass('promo-code--single') ){
			self.parents('.promo-code').siblings('.btn-group')[0].classList.add('group--shrink');
		}

		self.slideToggle(time_fast)
		self.siblings('.promo-code__form').delay(time_fast).slideToggle(time_fast);
	});

	$('.promo-code__close').on('click', function(e){
		e.preventDefault();
		var self = $(this);

		if ( self.parents('.promo-code').hasClass('promo-code--single') ){
			setTimeout(function(){
				self.parents('.promo-code').siblings('.btn-group')[0].classList.remove('group--shrink');
			}, time_fast);
		}

		self.parents('.promo-code__form').slideToggle(time_fast)
		self.parents('.promo-code').find('.promo-code__toggle').delay(time_fast).slideToggle(time_fast);
	});

    $('.sequence-toggle').on('click', function(e){
		e.preventDefault();

		$(this)[0].classList.toggle('active');
		$(this).next().slideToggle(time_slow);
	});

	$('.document-toggle').on('click', function(e){
		e.preventDefault();
		var self = $(this),
			text_block = self.find('.toggle-text'),
			current_state = text_block.html(),
			open_state = self.data('open'),
			close_state = self.data('close'),
			parent_block = self.parents('.document');

			if (current_state == open_state){
				text_block.html(close_state);
				parent_block[0].classList.add('active');
				parent_block.find('.document__preview').slideDown(time_slow);

				setTimeout(function(){
					$('html, body').animate({
				        scrollTop: parent_block.offset().top - (display_width < 480 ? 70 : 0)
				    }, time_slow);
				}, time_slow);

			} else {
				text_block.html(open_state);
				parent_block[0].classList.remove('active');
				parent_block.find('.document__preview').slideUp(time_slow);
			}

	});

	$('.sidebar').theiaStickySidebar({
	  containerSelector: '.main-content',
      additionalMarginTop: 20,
      additionalMarginBottom: 20
    });

	$('.login-target').on('click', function(e){
		e.preventDefault();

		$(this)[0].classList.toggle('active');
		$(this).siblings('.login').slideToggle(time_slow);
	});

	$('.nav-sidebar-target').on('click', function(e){
		e.preventDefault();

		$(this)[0].classList.toggle('active');
		$(this).siblings('.nav-sidebar').slideToggle(time_slow);
	});

	$('.faq-sidebar .nav-sidebar__item').on('click', function(e){
		e.preventDefault();
		var self = $(this),
			parent = self.parents('.faq-sidebar');

		if( display_width < 993 ){
			$('.nav-sidebar-target').trigger('click');

			setTimeout(function(){
				$('html, body').animate({
			        scrollTop: $(self.data('faq')).offset().top - (display_width < 480 ? 130 : 60)
			    }, time_slow);
			}, time_slow);
		} else {
			$('html, body').animate({
		        scrollTop: $(self.data('faq')).offset().top - 60
		    }, time_slow);
		}

		parent.find('.nav-sidebar__item').each(function(){
			$(this)[0].classList.remove('active');
		});

		self[0].classList.add('active');
	});


	$('.link-fake').on('click', function(e){
		e.preventDefault();
		var target_link = $(this).data('target');

		// window.location.replace(target_link);
		window.open(target_link, '_blank');
	});

	$('.link-more').on('click', function(e){
		e.preventDefault();
		var self = $(this);
			current_state = self.html(),
			open_state = self.data('open'),
			close_state = self.data('close');

		if( current_state == open_state ){
			self.html(close_state);
			self[0].classList.add('active');
			self.siblings('.seo-full').slideDown(time_fast);
		} else {
			self.html(open_state);
			self[0].classList.remove('active');
			self.siblings('.seo-full').slideUp(time_fast);

			$('html, body').animate({
	        	scrollTop: self.parent().offset().top - 120
	   		}, time_slow);
		}
	});

	// Sliders
	var pricing_slider = new Swiper('.pricing-group', {
        slidesPerView: 3,
        pagination: '.pagination-pricing',
        paginationClickable: true,
        simulateTouch: false,
        breakpoints: {
		    560: {
		     	slidesPerView: 1,
		    },
		    768: {
		      	slidesPerView: 2,
		    },
		    993: {
		      slidesPerView: 3,
		    },
		    1279: {
		      slidesPerView: 2,
		    }
		}
    });

	var pricing_slider_full = new Swiper('.pricing-row', {
        slidesPerView: 4,
        spaceBetween: 30,
        pagination: '.pagination-pricing',
        paginationClickable: true,
        loop: true,
        breakpoints: {
		    560: {
		     	slidesPerView: 1,
		    },
		    768: {
		      	slidesPerView: 2,
		    },
		    993: {
		      slidesPerView: 3,
		    }
		}
    });

	// var hero_slider = new Swiper('.hero-slider', {
   //      slidesPerView: 1,
   //      pagination: '.pagination-hero',
   //      paginationClickable: true,
   //      autoplay: 5000,
   //      speed: 840,
   //      loop: true,
   //      simulateTouch: false
   //  });

    var feature_slider = new Swiper('.feature-slider', {
        slidesPerView: 1,
        autoplay: 5000,
        loop: true,
        onSlideChangeStart: function () {
        	if(feature_slider){
        		$('.tab-pagination .tab__item').each(function(){
			    	$(this)[0].classList.remove('active');
			    });
		    	$('[data-reference="' + (feature_slider.realIndex + 1) + '"]').parent()[0].classList.add('active');
        	}
		}
    });

    $('.tab-pagination .tab__link').on('click', function(e){
    	e.preventDefault();

    	var reference = $(this).data('reference');
    	feature_slider.slideTo(reference);

    	$('.tab-pagination .tab__item').each(function(){
	    	$(this)[0].classList.remove('active');
	    });
    	$(this).parent()[0].classList.add('active');
    });

	var mobile_feature = new Swiper('.mobile-feature', {
        slidesPerView: 2,
        pagination: '.pagination-feature',
        paginationClickable: true,
        loop: true,
        breakpoints: {
		    560: {
		     	slidesPerView: 1,
		    }
		}
    });

	// Global click detection
	$(document).on('click', function(e){
		// Select search autofocus
		if( $(e.target).parents('.select-search').length > 0 ){
			var self = $(e.target),
				search__input = self.parents('.select-search').find('.search-input');
			search__input.focus();
		}

		if( !$(e.target).parents('.info-calc-holder').length > 0 && $('.tooltip-single').length > 0){
			$('.tooltip-single')[0].classList.remove('active');
		}

		if( !$(e.target).parents('.user__contols').length > 0 && $('.user__contols').length > 0){
			$('.user__contols')[0].classList.remove('active');
		}

		if( !$(e.target).parents('.contact-info--line').length > 0){
			if($('.contact-info__control').hasClass('active')){
				$('.contact-info__control').trigger('click');
			}
		}

		if( !$(e.target).parents('.login').length > 0){
			if( $('.login').hasClass('active') ){
				$('.login')[0].classList.remove('active');
			}
		}
	});

	$('.tooltip-trigger').on('touchstart', function(e){
		if( $(this).find('.tooltip').hasClass('active') ){
			$(this).find('.tooltip')[0].classList.remove('active');
		} else {
			var tooltip = $(this).find('.tooltip');
			tooltip[0].classList.add('active');

			var bottom_of_element = tooltip.offset().top + tooltip.outerHeight();
			var bottom_of_screen = $(window).scrollTop() + $(window).height();

			var top_of_element = tooltip.offset().top;
			var top_of_screen = $(window).scrollTop();

			if(bottom_of_element > bottom_of_screen){
				$('html, body').animate({
			        scrollTop: $(window).scrollTop() + (bottom_of_element - bottom_of_screen)
			    }, time_slow);
			}

			if(top_of_element < top_of_screen){
				$('html, body').animate({
			        scrollTop: $(window).scrollTop() - tooltip.outerHeight()
			    }, time_slow);
			}
		}
	});

	$('.login__toggle').on('click', function(e){
		e.preventDefault();
		var self = $(this);

		if ( display_width < 993 ){
			$(this).parent()[0].classList.toggle('active');
		}
	});

	$(document).on('touchstart', function(e){
		if( !$(e.target).parents('.tooltip-trigger').length > 0 && $('.tooltip').length > 0){
			$('.tooltip').each(function(){
				$(this)[0].classList.remove('active');
			});
		}

		if( !$(e.target).parents('.user__contols').length > 0 && $('.user__contols').length > 0){
			$('.user__contols')[0].classList.remove('active');
		}

		if( !$(e.target).parents('.contact-info--line').length > 0){
			if($('.contact-info__control').hasClass('active')){
				$('.contact-info__control').trigger('click');
			}
		}

		if( !$(e.target).parents('.login').length > 0){
			if( $('.login').hasClass('active') ){
				$('.login')[0].classList.remove('active');
			}
		}
	});

	$(document).on('keypress', function(e) {
	    if ( e.keyCode === 13 ){
        	if ( $('.next-step').length > 0 ){
        		if ( $('.next-step').attr('type') == 'submit' ){
        			$('.next-step').trigger('click');
        		} else {
        			window.location.replace($('.next-step').attr('href'));
        		}

        	}
        }
	});

	// Select tab behavior
	$(document).on('keydown', function(e) {
	    if ( e.keyCode === 9 ){
	    	setTimeout(function(){
	    		var $focused = $(':focus'),
	    			$target = $focused.siblings('.custom-select-block');

	    		$('.custom-select-block.open').find('.value-field').trigger('click');
	    		if( $target.length > 0 ){
	    			$target.find('.value-field').trigger('click');
	    		}

	    	}, 120);
        }
	});

	// Onload rules
	if ( display_width < 993 ){
		$('.lang').appendTo('.lang-mobile');

		$('.fast-calc').appendTo('.mobile-calc');

		$('.seo-transition__content').prependTo('.seo-full');
	}

	$('.modal-resp').on('click', function(e){
		if ( display_width < 768 ){
			e.stopImmediatePropagation();
		}
	});

	$('.detail__control').on('click', function(e){
		if ( display_width < 768 ){
			var self = $(this);

			setTimeout(function(){
				$('html, body').animate({
			        scrollTop: self.parent().offset().top - (display_width < 480 ? 70 : 0)
			    }, time_slow);
			}, time_slow);
		}
	});

	$('.pass-change').on('click', function(e){
		if ( display_width < 768 ){
			var self = $(this);

			setTimeout(function(){
				$('html, body').animate({
			        scrollTop: self.siblings('.password-form').offset().top - (display_width < 480 ? 50 : -20)
			    }, time_slow);
			}, time_slow);
		}
	});

	$('.calculator-config, .calculator__submit .btn').on('click', function(e){
		if ( display_width < 993 ){
			var self = $(this);

			setTimeout(function(){
				$('html, body').animate({
			        scrollTop: self.parents('.calculator').offset().top - 66
			    }, time_slow);
			}, time_slow + time_fast);
		}

	});

	$('.number-field').on('touchstart', function() {
		var number_value = $(this).val().replace(/ /g,'');
		$(this).val(number_value);

	  	$(this).attr('type', 'number');
	});

	$('.number-field + .form__label').on('touchstart', function() {
	  $(this).siblings('.number-field').attr('type', 'number');
	});

	$('.number-field').on('keydown blur', function() {
	  $(this).attr('type', 'text');
	});

	// Scroll events
	// Go top link
	// $(".top-scroll").hide();
  //
	// $('.top-scroll').click(function (e) {
	// 	e.preventDefault();
	//     $('body,html').animate({
	//       scrollTop: 0
	//     }, 800);
	//     return false;
	// });


	var timer,
		last_scroll_value = 0;

	$(window).scroll(function(event){
		if ( timer ) clearTimeout(timer);
		var scroll_value = $(this).scrollTop();

		timer = setTimeout(function(){

			// Scroll top link
		    if (scroll_value > 200) {
		      $('.top-scroll').fadeIn(500);
		    } else {
		      $('.top-scroll').fadeOut(500);
		    }
		   	last_scroll_value = scroll_value;
	   	}, 30);
	});


	$(window).on('resize', function(){
    	display_width = $(window).outerWidth();

    	// Detect new display type
    	if( display_width >= 1280){
    		display_type = 'desk';
    	} else if( display_width >= 993 && display_width < 1280){
    		display_type = 'laptop';
    	} else if( display_width >= 768 && display_width < 993){
    		display_type = 'tablet';
    	} else if( display_width < 768){
    		display_type = 'mobile';
    	}

    	// Resposive behaiour
    	if (previus_display != display_type) {
    		if( display_type == 'tablet' ){
    			$('.lang').appendTo('.lang-mobile');

    			$('.fast-calc').appendTo('.mobile-calc');

    			$('.seo-transition__content').prependTo('.seo-full');
    		} else if ( display_type == 'laptop' ) {
    			$('.lang').appendTo('.lang-desktop');

    			$('.fast-calc').appendTo('.desktop-calc');

    			if( $('.nav-toggle').hasClass('active') ){
    				$('.nav-toggle').trigger('click');
    			}

    			$('.seo-transition__content').prependTo('.seo-transition');
    		}
		}

		if (previus_display != display_type) {
    		if( display_type == 'mobile' ){
    			if( $('.tab-pane-load').length > 0 && display_width < 768 ){
					$('.tab-pane-load').each(function(){
						$(this)[0].classList.remove('tab-pane-load');
					})
				}

				if( $('.collapse-load').length > 0 && display_width < 768 ){
					$('.collapse-load').each(function(){
						$(this)[0].classList.remove('collapse-load')
					})
				}
    		}
    	}

		// Set up compare value
		return previus_display = display_type;
    });

    // Init countdown
	$('.timer').each(function() {
		var endtime,
			$this = $(this);

		if( $this.hasClass('timer--short')){
			endtime = addMinutes(5);
		} else{
			endtime = addMinutes(15);
		}

		initializeClock($this, endtime);
	});

	$(window).on('load', function(){
		if($('#document-page').length > 0){
			var url = window.location.href.split("#");
			$("#" + url[1]).find('.document-toggle').trigger('click');
		}

		if( $('.tab-pane-load').length > 0 && display_width < 768 ){
			$('.tab-pane-load').each(function(){
				$(this)[0].classList.remove('tab-pane-load')
			})
		}

		if( $('.collapse-load').length > 0 && display_width < 768 ){
			$('.collapse-load').each(function(){
				$(this)[0].classList.remove('collapse-load')
			})
		}

		if($('.sidebar').length > 0 && $('.box').length > 0){
			var sidebar = $('.sidebar').height(),
				box = $('.box').height();

			if ( sidebar > box ) {
				$('.box').css('min-height', sidebar);
			}
		}

		$('.select .search-input').on('input', function(event) {
	    	var self = $(this)
	        	input_value = self.val();

	        var words = input_value.split(' '),
	        	result = [];

	        for ( var i = 0; i < words.length; i++){
	        	result[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1);
	        }

	        self.val(result.join(' '));
	    });

	});
});

// Recaptcha submision
function onSubmit(token){
	var form = document.getElementById("form-question");

	if( hasClass(form, 'form--tabs') ){
		$(formv).parents('.tab-pane')[0].classList.add('submit-success');
	}

	// form.submit();
}

function onSubmitAlt(token){
	var form = document.getElementById("form-question-alt");

	if( hasClass(form, 'form--modal') ){
		$(form).parents('.modal-content')[0].classList.add('submit-success');
	}

	// form.submit();
}

// Countdown
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(clock_class, endtime) {
  var clock = $(clock_class),
  	  daysSpan = clock.find('.days'),
  	  hoursSpan = clock.find('.hours'),
  	  minutesSpan = clock.find('.minutes'),
  	  secondsSpan = clock.find('.seconds');

  function updateClock() {
  	var t = getTimeRemaining(endtime);

  	daysSpan.html( t.days );
	hoursSpan.html( ('0' + t.hours).slice(-2) );
	minutesSpan.html( ('0' + t.minutes).slice(-2) );
	secondsSpan.html( ('0' + t.seconds).slice(-2) );

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var obj = [{
    $item: $('#question-all'),
    $menuItem: $("a[data-faq='#question-all']"),
}, {
    $item: $('#question-general'),
    $menuItem: $("a[data-faq='#question-general']"),
}, {
    $item: $('#question-get'),
    $menuItem: $("a[data-faq='#question-get']"),
}, {
    $item: $('#question-pay'),
    $menuItem: $("a[data-faq='#question-pay']"),
}, {
    $item: $('#question-exist'),
    $menuItem: $("a[data-faq='#question-exist']"),
}, {
    $item: $('#question-decline'),
    $menuItem: $("a[data-faq='#question-decline']"),
}, {
    $item: $('#question-delay'),
    $menuItem: $("a[data-faq='#question-delay']"),
}, {
    $item: $('#question-lk'),
    $menuItem: $("a[data-faq='#question-lk']"),
}, {
    $item: $('#question-bank'),
    $menuItem: $("a[data-faq='#question-bank']"),
}]

function activator(obj) {
    var index = -1, timer;
    $(window).scroll(function(e) {
    	if ( timer ) clearTimeout(timer);

    	timer = setTimeout(function(){
	        var top = $(this).scrollTop();
	        for (var i = 0; i < obj.length; i++) {
	            var itemToTop = obj[i].$item.offset().top - 100;
	            if (top > itemToTop) {
	                index = i;
	            }
	        };

	        if (index != -1) {
	            for (var i = 0; i < obj.length; i++) {
	                obj[i].$menuItem.removeClass('active')
	            }
	            obj[index].$menuItem.addClass('active');
	        }
    	}, 20);
    });
}

// Helpers function
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

// Set time
function addMinutes(minutes) {
    return new Date(Date.now() + minutes*60000);
}

function addSeconds(seconds) {
    return new Date(Date.now() + seconds*1000);
}

// Page smooth scroll
Math.easeOutQuad = function (t, b, c, d) { t /= d; return -c * t*(t-2) + b; };

var
  interval, // scroll is being eased
  mult = 0, // how fast do we scroll
  dir = 0, // 1 = scroll down, -1 = scroll up
  steps = 70, // how many steps in animation
  length = 40; // how long to animate
function MouseWheelHandler(e) {
  e.preventDefault(); // prevent default browser scroll
  clearInterval(interval); // cancel previous animation
  ++mult; // we are going to scroll faster
  var delta = -Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))); // cross-browser
  if(dir!=delta) { // scroll direction changed
    mult = 1; // start slowly
    dir = delta;
  }
  // in this cycle, we determine which element to scroll
  for(var tgt=e.target; tgt!=document.documentElement; tgt=tgt.parentNode) {
    var oldScroll = tgt.scrollTop;
    tgt.scrollTop+= delta;
    if(oldScroll!=tgt.scrollTop) break;
    // else the element can't be scrolled, try its parent in next iteration
  }
  var start = tgt.scrollTop;
  var end = start + length*mult*delta; // where to end the scroll
  var change = end - start; // base change in one step
  var step = 0; // current step
  interval = setInterval(function() {
    var pos = Math.easeOutQuad(step++,start,change,steps); // calculate next step
    tgt.scrollTop = pos; // scroll the target to next step
    if(step>=steps) { // scroll finished without speed up - stop animation
      mult = 0; // next scroll will start slowly
      clearInterval(interval);
    }
  },10);
}

// nonstandard: Chrome, IE, Opera, Safari
// window.addEventListener("mousewheel", MouseWheelHandler, false);
// nonstandard: Firefox
// window.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRm9ybSB2YWxpZGF0aW9uXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsnbmdNZXNzYWdlcycsJ3VpLm1hc2snXSk7XG5cbmFwcC5jb250cm9sbGVyKCdm��    ��                    ���            Pn�    H��             ��     @       ��            bHVlXG4gIC8vICRzY29wZS5pbnB1dEZOYW1lID0gJ9Ca0L7QvdGB0YLQsNC90YLQuNC9JztcbiAgLy8gJHNjb3BlLmlucHV0TE5hbWUgPSAn0K/RgNGD0YjQutC+0LLRgdC60LjQuS3QmNCy0LDQvdC+0LInO1xuXG4gICRzY29wZS5zb21lU2VsZWN0ZWQgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgaWYgKCFvYmplY3QpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqZWN0KS5zb21lKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgXHRyZXR1cm4gb2JqZWN0W2tleV07XG4gICAgfSk7XG4gIH1cblxuICAkc2NvcGUuZG9Ub3VjaGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICRzY29wZS5mb3JtLmFncmVlbWVudC4kc2V0VG91Y2hlZCgpO1xuICB9XG59KTtcblxuLy8gVXBsb2FkIGZpbGUgcXVhbnRpdHkgYW5kIGV4dGVuc2lvbiB2YWxpZGF0aW9uXG52YXIgX3ZhbGlkRmlsZUV4dGVuc2lvbnMgPSBbXCIuanBnXCIsIFwiLmpwZWdcIiwgXCIucG5nXCJdOyAgICBcblxuZnVuY3Rpb24gdmFsaWRhdGVTaW5nbGVJbnB1dChvSW5wdXQpIHtcbiAgICB2YXIgc0ZpbGVOYW1lID0gb0lucHV0O1xuXG4gICAgaWYgKHNGaWxlTmFtZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgX3ZhbGlkRmlsZUV4dGVuc2lvbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHZhciBzQ3VyRXh0ZW5zaW9uID0gX3ZhbGlkRmlsZUV4dGVuc2lvbnNbal07XG4gICAgICAgICAgICBpZiAoc0ZpbGVOYW1lLnN1YnN0cihzRmlsZU5hbWUubGVuZ3RoIC0gc0N1ckV4dGVuc2lvbi5sZW5ndGgsIHNDdXJFeHRlbnNpb24ubGVuZ3RoKS50b0xvd2VyQ2FzZSgpID09IHNDdXJFeHRlbnNpb24udG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufVxuXG4vLyBJbnB1dCBmaWxlIHZhbGlkYXRpb25cbmFwcC5kaXJlY3RpdmUoJ3ZhbGlkRmlsZScsZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHtcbiAgICByZXF1aXJlOiduZ01vZGVsJyxcbiAgICBsaW5rOmZ1bmN0aW9uKHNjb3BlLGVsLGF0dHJzLG5nTW9kZWwpe1xuICAgICAgXG4gICAgICBlbC5iaW5kKCdjaGFuZ2UnLGZ1bmN0aW9uKCl7XG4gICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuXG5cdFx0XHQvLyBEZXRlY3QgZnJlZSBjYXBhY2l0eVxuXHRcdFx0dmFyIHNlbGYgPSAkKGVsKSxcblx0XHRcdFx0cGF0cm9uID0gc2VsZi5wYXJlbnRzKCcudXBsb2FkLWdyb3VwJyk7XG5cdFx0XHR2YXIgdXBsb2FkZWRfaXRlbXMgPSBwYXRyb24uZmluZCgnLnVwbG9hZC0tc3VjY2VzcycpLmxlbmd0aDtcblxuXHRcdFx0aWYoIGVsWzBdLmZpbGVzLmxlbmd0aCA+IChlbFswXS5kYXRhc2V0Lm1heCAtIHVwbG9hZGVkX2l0ZW1zKSApe1xuXHRcdFx0XHRuZ01vZGVsLiRzZXRWYWxpZGl0eSgncXVhbnRpdHknLCBmYWxzZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRuZ01vZGVsLiRzZXRWYWxpZGl0eSgncXVhbnRpdHknLCB0cnVlKTtcblxuXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZWxbMF0uZmlsZXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdGlmKCB2YWxpZGF0ZVNpbmdsZUlucHV0KGVsWzBdLmZpbGVzW2ldLm5hbWUpICl7XG5cdFx0XHRcdFx0XHRzZWxmLnZhbCgnJyk7XG5cdFx0XHRcdFx0XHRuZ01vZGVsLiRzZXRWYWxpZGl0eSgnZXh0ZW5zaW9uJywgZmFsc2UpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRuZ01vZGVsLiRzZXRWYWxpZGl0eSgnZXh0ZW5zaW9uJywgdHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cbiAgICAgICAgICBcdG5nTW9kZWwuJHNldFZpZXdWYWx1ZShlbC52YWwoKSk7XG4gICAgICAgICAgXHRuZ01vZGVsLiRyZW5kZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn0pO1xuXG4vLyBGaWVsZHMgY29tcGFyZSB2YWxpZGF0aW9uXG5hcHAuZGlyZWN0aXZlKFwiY29tcGFyZVRvXCIsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlcXVpcmU6IFwibmdNb2RlbFwiLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgb3RoZXJNb2RlbFZhbHVlOiBcIj1jb21wYXJlVG9cIlxuICAgICAgICB9LFxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cmlidXRlcywgbmdNb2RlbCkge1xuICAgICAgICAgICAgIFxuICAgICAgICAgICAgbmdNb2RlbC4kdmFsaWRhdG9ycy5jb21wYXJlVG8gPSBmdW5jdGlvbihtb2RlbFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZGVsVmFsdWUgPT0gc2NvcGUub3RoZXJNb2RlbFZhbHVlO1xuICAgICAgICAgICAgfTtcbiBcbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaChcIm90aGVyTW9kZWxWYWx1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBuZ01vZGVsLiR2YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG5cbmFwcC5kaXJlY3RpdmUoXCJtb3JlVGhhblwiLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXF1aXJlOiBcIm5nTW9kZWxcIixcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIG90aGVyTW9kZWxWYWx1ZTogXCI9bW9yZVRoYW5cIlxuICAgICAgICB9LFxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cmlidXRlcywgbmdNb2RlbCkge1xuICAgICAgICAgICAgIFxuICAgICAgICAgICAgbmdNb2RlbC4kdmFsaWRhdG9ycy5tb3JlVGhhbiA9IGZ1bmN0aW9uKG1vZGVsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHBhcnNlSW50KG1vZGVsVmFsdWUpID49IHBhcnNlSW50KHNjb3BlLm90aGVyTW9kZWxWYWx1ZSkpO1xuICAgICAgICAgICAgfTtcbiBcbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaChcIm90aGVyTW9kZWxWYWx1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBuZ01vZGVsLiR2YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG5cbmFwcC5kaXJlY3RpdmUoJ3ZhbGlkUGxhY2UnLCBmdW5jdGlvbigpIHtcbiAgXHRyZXR1cm4ge1xuXHQgICAgcmVxdWlyZSA6ICduZ01vZGVsJyxcblx0ICAgIGxpbmsgOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIG5nTW9kZWwpIHtcblx0XHQgICAgbmdNb2RlbC4kcGFyc2Vycy5wdXNoKGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0ICAgICAgICBpZighdmFsdWUgfHwgdmFsdWUubGVuZ3RoID09IDApIHJldHVybjtcblxuXHRcdCAgICAgICAgdmFyIHRlc3QsXG5cdFx0ICAgICAgICBcdGV4cHJlc3Npb24gPSAvXFxkLztcblx0XHQgICAgICAgIFxuXHRcdCAgICAgICAgdGVzdCA9IGV4cHJlc3Npb24udGVzdCh2YWx1ZSk7XG5cblx0XHQgICAgICAgIG5nTW9kZWwuJHNldFZhbGlkaXR5KCdudW1iZXInLCB0ZXN0KTtcblx0XHQgICAgICAgIHJldHVybiB2YWx1ZTtcblx0XHQgICAgfSk7XG5cdCAgICB9XG4gIFx0fTtcbn0pO1xuXG5hcHAuZGlyZWN0aXZlKCd2YWxpZE5hbWluZycsIGZ1bmN0aW9uKCkge1xuICBcdHJldHVybiB7XG5cdCAgICByZXF1aXJlIDogJ25nTW9kZWwnLFxuXHQgICAgbGluayA6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgbmdNb2RlbCkge1xuXHRcdCAgICBuZ01vZGVsLiRwYXJzZXJzLnB1c2goZnVuY3Rpb24odmFsdWUpIHtcblx0XHQgICAgICAgIGlmKCF2YWx1ZSB8fCB2YWx1ZS5sZW5ndGggPT0gMCkgcmV0dXJuO1xuXG5cdFx0ICAgICAgICB2YXIgdGVzdCxcblx0XHQgICAgICAgIFx0dGV4dF90eXBlID0gJChlbGVtZW50KS5kYXRhKCdhbHBoYScpLFxuXHRcdCAgICAgICAgXHRleHByZXNzaW9uX2xhdGluID0gL1thLXpBLVrQsC3Rj9CQLdCv0ZHQgdKR0pDRlNCE0ZbQhtGX0IddKy8sXG5cdFx0ICAgICAgICBcdGV4cHJlc3Npb25fY3lyID0gL1vQsC3Rj9CQLdCv0ZHQgdKR0pDRlNCE0ZbQhtGX0IddKy87XG5cdFx0ICAgICAgICBcblx0XHQgICAgICAgIGlmICggdGV4dF90eXBlID09IFwiY3lyaWxsaWNcIiApe1xuXHRcdCAgICAgICAgXHR0ZXN0ID0gZXhwcmVzc2lvbl9jeXIudGVzdCh2YWx1ZSk7XG5cdFx0ICAgICAgICB9IGVsc2V7XG5cdFx0ICAgICAgICBcdHRlc3QgPSBleHByZXNzaW9uX2xhdGluLnRlc3QodmFsdWUpO1xuXHRcdCAgICAgICAgfVxuXG5cdFx0ICAgICAgICBuZ01vZGVsLiRzZXRWYWxpZGl0eSgnbmFtaW5nJywgdGVzdCk7XG5cdFx0ICAgICAgICByZXR1cm4gdmFsdWU7XG5cdFx0ICAgIH0pO1xuXHQgICAgfVxuICBcdH07XG59KTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblx0Ly8gQmFzaWMgdmFyaWFibGVzXG5cdHZhciBkaXNwbGF5X3dpZHRoID0gJCh3aW5kb3cpLm91dGVyV2lkdGgoKTtcblxuXHQvLyBNZWRpYSB2YWxpZGF0aW9uXG5cdHZhciBkaXNwbGF5X3R5cGUsXG4gICAgXHRwcmV2aXVzX2Rpc3BsYXk7XG5cbiAgICAvLyBBbmltYXRpb24gdGltZVxuICAgIFx0dmFyIHRpbWVfZmFzdCA9IDM4MCxcbiAgICBcdFx0dGltZV9zbG93ID0gNjIwO1xuXG4gICAgLy8gRGV0ZWN0IGN1cnJlbnQgZGV2aWNlXG4gICAgaWYoIGRpc3BsYXlfd2lkdGggPj0gMTI4MCl7XG5cdFx0cHJldml1c19kaXNwbGF5ID0gJ2Rlc2snO1xuXHR9IGVsc2UgaWYoIGRpc3BsYXlfd2lkdGggPj0gOTkzICYmIGRpc3BsYXlfd2lkdGggPCAxMjgwKXtcblx0XHRwcmV2aXVzX2Rpc3BsYXkgPSAnbGFwdG9wJztcblx0fSBlbHNlIGlmKCBkaXNwbGF5X3dpZHRoID49IDc2OCAmJiBkaXNwbGF5X3dpZHRoIDwgOTkzKXtcblx0XHRwcmV2aXVzX2Rpc3BsYXkgPSAndGFibGV0Jztcblx0fSBlbHNlIGlmKCBkaXNwbGF5X3dpZHRoIDwgNzY4KXtcblx0XHRwcmV2aXVzX2Rpc3BsYXkgPSAnbW9iaWxlJztcblx0fVxuXG5cdC8vIE92ZXJsYXlcblx0JCgnLm92ZXJsYXknKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdHZhciBlbGVtZW50c19hcnJheSA9IFsnLm5hdi10b2dnbGUnLCAnLmhlYWRlci1vZmZzY3JlZW4nXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHNfYXJyYXkubGVuZ3RoOyBpKyspe1xuXHRcdFx0JChlbGVtZW50c19hcnJheVtpXSlbMF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cdFx0fVxuXG5cdFx0JCh0aGlzKVswXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0fSk7XG5cblx0ZnVuY3Rpb24gdG9nZ2xlX292ZXJsYXkoKXtcblx0XHQkKCcub3ZlcmxheScpWzBdLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuXHR9XG5cblx0Ly8gTmF2aWdhdGlvblxuXHQkKCcubmF2LXRvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGlmKCAhKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSApIHtcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V3aGVlbFwiLCBNb3VzZVdoZWVsSGFuZGxlciwgZmFsc2UpOyBcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiRE9NTW91c2VTY3JvbGxcIiwgTW91c2VXaGVlbEhhbmRsZXIsIGZhbHNlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXdoZWVsXCIsIE1vdXNlV2hlZWxIYW5kbGVyLCBmYWxzZSk7IFxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Nb3VzZVNjcm9sbFwiLCBNb3VzZVdoZWVsSGFuZGxlciwgZmFsc2UpO1xuXHRcdH1cblxuXHRcdCQodGhpcylbMF0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG5cdFx0JCgnLmhlYWRlci1vZmZzY3JlZW4nKVswXS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcblx0XHRcblx0XHQkKHRoaXMpLnBhcmVudHMoJy5oZWFkZXInKS5maW5kKCcubG9naW4nKVswXS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG5cdFx0JCh0aGlzKS5wYXJlbnRzKCdib2R5JylbMF0uY2xhc3NMaXN0LnRvZ2dsZSgnc3RhdGljLXBvc2l0aW9uJyk7XG5cdFx0dG9nZ2xlX292ZXJsYXkoKTtcblx0fSk7XG5cblxuXHQvLyB3aW5kb3cuYmxvY2tNZW51SGVhZGVyU2Nyb2xsID0gZmFsc2U7XG5cdFxuXHQvLyAkKHdpbmRvdykub24oJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcblx0Ly8gICAgIGlmICgkKGUudGFyZ2V0KS5wYXJlbnRzKCcuaGVhZGVyJykubGVuZ3RoID4gMClcblx0Ly8gICAgIHtcblx0Ly8gICAgICAgICBibG9ja01lbnVIZWFkZXJTY3JvbGwgPSB0cnVlO1xuXHQvLyAgICAgfVxuXHQvLyB9KTtcblxuXHQvLyAkKHdpbmRvdykub24oJ3RvdWNoZW5kJywgZnVuY3Rpb24oKXtcblx0Ly8gICAgIGJsb2NrTWVudUhlYWRlclNjcm9sbCA9IGZhbHNlO1xuXHQvLyB9KTtcblxuXHQvLyAkKHdpbmRvdykub24oJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGUpe1xuXHQvLyBcdGlmKCAkKCdib2R5JykuaGFzQ2xhc3MoJ3N0YXRpYy1wb3NpdGlvbicpICl7XG5cdC8vIFx0ICAgIGlmIChibG9ja01lbnVIZWFkZXJTY3JvbGwpXG5cdC8vIFx0ICAgIHtcblx0Ly8gXHQgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblx0Ly8gXHQgICAgfVxuXHQvLyBcdH1cblx0Ly8gfSk7XG5cblx0Ly8gTXVsdGlsZXZlbCBtZW51XG5cdCQoJy5tZW51X19jb250cm9sLCAubWVudV9fY2xhc3RlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdHZhciBtZW51X2xldmVsID0gJCh0aGlzKS5kYXRhKCdsZXZlbCcpO1xuXHRcdCQobWVudV9sZXZlbClbMF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cblx0XHQkKHRoaXMpLnBhcmVudHMoJy5tZW51JylbMF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cdH0pO1xuXG5cdCQoJy5tZW51X19yZXR1cm4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQkKHRoaXMpLnBhcmVudCgpWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG5cdFx0JCh0aGlzKS5wYXJlbnRzKCcubWVudScpWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXHR9KTtcblxuXHQvLyBMYW5nIHRvZ2dsZVxuXHQkKCcubGFuZ19faXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcblx0XHR2YXIgY29udHJvbHMgPSAnLmxhbmdfX2l0ZW0nLFxuXHRcdFx0dGFyZ2V0ID0gJCh0aGlzKSxcblx0XHRcdHRvZ2dsZSA9ICQoJy5sYW5nX190b2dnbGUnKTtcblx0XHRcdHNlbGVjdGVkX2xhbmcgPSB0YXJnZXQuZGF0YSgnbGFuZycpLFxuXHRcdFx0Y3VycmVudF9sYW5nID0gdG9nZ2xlLmRhdGEoJ2N1cnJlbnQnKTtcblxuXHRcdGlmKCBzZWxlY3RlZF9sYW5nICE9IGN1cnJlbnRfbGFuZyApe1xuXHRcdFx0dG9nZ2xlLmRhdGEoJ2N1cnJlbnQnLCBzZWxlY3RlZF9sYW5nKVswXS5jbGFzc0xpc3QudG9nZ2xlKCdjaGFuZ2UnKTtcblxuXHRcdFx0dGFyZ2V0LnNpYmxpbmdzKGNvbnRyb2xzKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdCQodGhpcylbMF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cdFx0XHR9KTtcblx0XHRcdHRhcmdldFswXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblx0XHR9XG5cdH0pO1xuXG5cdCQoJy5sYW5nX190b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdHZhciBjb250cm9scyA9ICcubGFuZ19faXRlbScsXG5cdFx0XHR0b2dnbGUgPSAkKHRoaXMpLFxuXHRcdFx0Y3VycmVudF9sYW5nID0gdG9nZ2xlLmRhdGEoJ2N1cnJlbnQnKTtcblx0XHRcblx0XHRpZiggY3VycmVudF9sYW5nID09IFwicnVcIiApe1xuXHRcdFx0Y2hhbmdlX2xhbmcoJ3VyaycpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjaGFuZ2VfbGFuZygncnUnKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBjaGFuZ2VfbGFuZyhsYW5ndWFnZV9jb2RlKXtcblx0XHRcdHRvZ2dsZS5kYXRhKCdjdXJyZW50JywgbGFuZ3VhZ2VfY29kZSk7XG5cblx0XHRcdHRvZ2dsZS5zaWJsaW5ncyhjb250cm9scykuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0XHQkKHRoaXMpWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXHRcdFx0fSk7XG5cdFx0XHQkKCdbZGF0YS1sYW5nPVwiJyArIGxhbmd1YWdlX2NvZGUgKydcIl0nKVswXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblx0XHR9XG5cblx0XHR0b2dnbGVbMF0uY2xhc3NMaXN0LnRvZ2dsZSgnY2hhbmdlJyk7XG5cdH0pO1xuXG5cdC8vIENvbnRhY3QgaW5mb1xuXHQkKCcuY29udGFjdC1pbmZvX19jb250cm9sJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0JCh0aGlzKVswXS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcblx0XHQkKHRoaXMpLnNpYmxpbmdzKCcuY29udGFjdC1pbmZvX19oZWxwZXInKVswXS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcblx0fSk7XG5cblx0JCgnLmxpbmstLWNhbGwnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHRpZigkKCcuY29udGFjdC1pbmZvX19jb250cm9sJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcblx0XHRcdCQoJy5jb250YWN0LWluZm9fX2NvbnRyb2wnKS50cmlnZ2VyKCdjbGljaycpO1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gVG9vbHRpcFxuXHQkKCcudG9vbHRpcC10cmlnZ2VyJykub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpe1xuXHRcdHZhciB0b29sdGlwID0gJCh0aGlzKS5maW5kKCcudG9vbHRpcCcpO1xuXG5cdFx0dG9vbHRpcFswXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblx0fSkub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpe1xuXHRcdCQodGhpcykuZmluZCgnLnRvb2x0aXAnKVswXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0fSk7XG5cblx0JCgnLnRvb2x0aXAtdHJpZ2dlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHR9KTtcblxuXHQvLyBGb3JtXG5cdCQoJy5mb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgXHRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBcdHZhciBmb3JtID0gJCh0aGlzKTtcblxuICAgICAgXHRpZiAoIGhhc0NsYXNzKHRoaXMsICduZy12YWxpZCcpICl7XG4gICAgICBcdFx0aWYoIGhhc0NsYXNzKHRoaXMsICdjYXB0Y2hhLXZhbGlkYXRlJykpe1xuXG4gICAgICBcdFx0XHRpZiggaGFzQ2xhc3ModGhpcywgJ2Zvcm0tLW1vZGFsJykgKXtcblxuICAgICAgXHRcdFx0XHR3aWRnZXRJZDIgPSBncmVjYXB0Y2hhLnJlbmRlcigncmVjYXB0Y2hhLWFsdCcsIHtcblx0ICAgICAgICAgICAgICAgIFx0J3NpdGVrZXknIDogJzZMZWlLREFVQUFBQUFLZUtlWUFTYnczQXdTYmUyUUg3bDNwcVlSTXQnLFxuXHQgICAgICAgICAgICAgICAgXHQnY2FsbGJhY2snIDogb25TdWJtaXRBbHQsXG5cdCAgICAgICAgICAgICAgICBcdCdzaXplJyA6IFwiaW52aXNpYmxlXCJcblx0ICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICBcdFx0XHRcdGdyZWNhcHRjaGEuZXhlY3V0ZSh3aWRnZXRJZDIpO1xuXG4gICAgICBcdFx0XHR9IGVsc2Uge1xuXG4gICAgICBcdFx0XHRcdHdpZGdldElkMSA9IGdyZWNhcHRjaGEucmVuZGVyKCdyZWNhcHRjaGEnLCB7XG5cdCAgICAgICAgICAgICAgICBcdCdzaXRla2V5JyA6ICc2TGVpS0RBVUFBQUFBS2VLZVlBU2J3M0F3U2JlMlFIN2wzcHFZUk10Jyxcblx0ICAgICAgICAgICAgICAgIFx0J2NhbGxiYWNrJyA6IG9uU3VibWl0LFxuXHQgICAgICAgICAgICAgICAgXHQnc2l6ZScgOiBcImludmlzaWJsZVwiXG5cdCAgICAgICAgICAgICAgICB9KTtcbiAgICAgIFx0XHRcdFx0Z3JlY2FwdGNoYS5leGVjdXRlKHdpZGdldElkMSk7XG5cbiAgICAgIFx0XHRcdH1cbiAgIFxuICAgICAgXHRcdH0gZWxzZSB7XG4gICAgICBcdFx0XHRpZiggaGFzQ2xhc3ModGhpcywgJ2Zvcm0tLW1vZGFsJykgKXtcblx0ICAgICAgXHRcdFx0JCh0aGlzKS5wYXJlbnRzKCcubW9kYWwtY29udGVudCcpWzBdLmNsYXNzTGlzdC5hZGQoJ3N1Ym1pdC1zdWNjZXNzJyk7XG5cdCAgICAgIFx0XHR9XG5cblx0ICAgICAgXHRcdGlmKCBoYXNDbGFzcyh0aGlzLCAnZm9ybS0tdGFicycpICl7XG5cdCAgICAgIFx0XHRcdCQodGhpcykucGFyZW50cygnLnRhYi1wYW5lJylbMF0uY2xhc3NMaXN0LmFkZCgnc3VibWl0LXN1Y2Nlc3MnKTtcblx0ICAgICAgXHRcdH1cblxuXHQgICAgICBcdFx0dmFyIGZvcm1JbnB1dCA9IGZvcm0uc2VyaWFsaXplKCk7XG5cdCAgICAgIFx0XHQkLnBvc3QoZm9ybS5hdHRyKCdhY3Rpb24nKSwgZm9ybUlucHV0KTtcbiAgICAgIFx0XHR9XG4gICAgICBcdH1cblxuICAgIFx0Zm9ybVswXS5jbGFzc0xpc3QuYWRkKCduZy1kaXJ0eScpO1xuXG4gICAgXHRmb3JtLmZpbmQoJy5mb3JtX19lcnJvcicpLmVhY2goZnVuY3Rpb24oKXtcbiAgICBcdFx0JCh0aGlzKVswXS5jbGFzc0xpc3QucmVtb3ZlKCduZy1oaWRlJyk7XG4gICAgXHR9KTtcblxuICAgIFx0Zm9ybS5maW5kKCcubmctdW50b3VjaGVkJykuZWFjaChmdW5jdGlvbigpe1xuICAgIFx0XHQkKHRoaXMpWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ25nLXVudG91Y2hlZCcpO1xuICAgIFx0XHQkKHRoaXMpWzBdLmNsYXNzTGlzdC5hZGQoJ25nLXRvdWNoZWQnKTtcbiAgICBcdH0pO1xuXG4gICAgXHRmb3JtLmZpbmQoJy5mb3JtX19pbnB1dCwgLmNoZWNrYm94JykuZWFjaChmdW5jdGlvbigpe1xuICAgIFx0XHQkKHRoaXMpWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ25nLXByaXN0aW5lJyk7XG4gICAgXHR9KVxuXG4gICAgXHRmb3JtLmZpbmQoJy5jdXN0b20tc2VsZWN0LWJsb2NrW2NsYXNzKj1cInJlcXVpcmVkXCJdJykuZWFjaChmdW5jdGlvbigpe1xuICAgIFx0XHRpZiAoIGhhc0NsYXNzKHRoaXMsICduZy1wcmlzdGluZScpICl7XG4gICAgXHRcdFx0dGhpcy5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkZWQnKTtcbiAgICBcdFx0fVxuICAgIFx0fSk7IFx0XG4gIFx0fSk7XG5cbiAgXHQkKCcuc3VibWl0LWNvbnRyb2wnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgXHRcdGUucHJldmVudERlZmF1bHQoKTtcbiAgXHRcdHZhciBmb3JtX3RhcmdldCA9ICQodGhpcykuZGF0YSgnY29ubmVjdCcpO1xuXG5cdFx0JChmb3JtX3RhcmdldCkuc3VibWl0KCk7ICBcdFx0XG4gIFx0fSk7XG5cbiAgXHQkKCcuYnRuLS1hZGRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICBcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpOyBcdFx0XG4gIFx0fSk7XG5cbiAgXHQkKCcuY2FsYy1zaWRlYmFyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gIFx0XHRlLnByZXZlbnREZWZhdWx0KCk7IFxuXG4gIFx0XHQkKHRoaXMpLnBhcmVudHMoJy5jYWxjdWxhdG9yX19pbmZvJylbMF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cbiAgXHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0ICAgICAgICBzY3JvbGxUb3A6ICQoICQodGhpcykuZGF0YSgndGFyZ2V0JykgKS5vZmZzZXQoKS50b3AgLSAoZGlzcGxheV93aWR0aCA8IDQ4MCA/IDMwIDogLTQwKVxuXHQgICAgfSwgdGltZV9zbG93KTtcdFx0XG4gIFx0fSk7XG5cbiAgXHQkKCcuaW5mby1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICBcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpOyBcbiAgXHRcdCQodGhpcykucGFyZW50cygnLmNhbGN1bGF0b3JfX2luZm8nKVswXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgXHR9KTtcblxuICBcdCQoJy5saW5rLWluZm8tY2FsYycpLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKXtcbiAgXHRcdGlmKGRpc3BsYXlfd2lkdGggPiA3Njgpe1xuICBcdFx0XHQkKHRoaXMpLnNpYmxpbmdzKCcudG9vbHRpcCcpWzBdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICBcdFx0fVxuICBcdH0pLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKXtcbiAgXHRcdGlmKGRpc3BsYXlfd2lkdGggPiA3Njgpe1xuICBcdFx0XHQkKHRoaXMpLnNpYmxpbmdzKCcudG9vbHRpcCcpWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICBcdFx0fVxuICBcdH0pO1xuXG4gIFx0JCgnLmxpbmstaW5mby1jYWxjJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gIFx0��    ��                    ���            Pn�    H��             ��     @       ��            LnNpYmxpbmdzKCcudG9vbHRpcCcpLmhhc0NsYXNzKCdhY3RpdmUnKSApe1xuXHRcdFx0XHQkKHRoaXMpLnNpYmxpbmdzKCcudG9vbHRpcCcpWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFyIHRvb2x0aXAgPSAkKHRoaXMpLnNpYmxpbmdzKCcudG9vbHRpcCcpO1xuXHRcdFx0XHR0b29sdGlwWzBdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXG5cdFx0XHRcdHZhciBib3R0b21fb2ZfZWxlbWVudCA9IHRvb2x0aXAub2Zmc2V0KCkudG9wICsgdG9vbHRpcC5vdXRlckhlaWdodCgpO1xuXHRcdFx0XHR2YXIgYm90dG9tX29mX3NjcmVlbiA9ICQod2luZG93KS5zY3JvbGxUb3AoKSArICQod2luZG93KS5oZWlnaHQoKTtcblxuXHRcdFx0XHRpZihib3R0b21fb2ZfZWxlbWVudCA+IGJvdHRvbV9vZl9zY3JlZW4pe1xuXHRcdFx0XHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHRcdFx0ICAgICAgICBzY3JvbGxUb3A6ICQod2luZG93KS5zY3JvbGxUb3AoKSArIChib3R0b21fb2ZfZWxlbWVudCAtIGJvdHRvbV9vZl9zY3JlZW4pXG5cdFx0XHRcdCAgICB9LCB0aW1lX3Nsb3cpO1xuXHRcdFx0XHR9IFxuXHRcdFx0fVxuICBcdFx0fVxuICBcdH0pO1xuXG4gIFx0JCgnLmVkaXQtZm9ybScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gIFx0XHQkKCcuZWRpdC1jbG9zZScpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gIFx0fSk7XG5cbiAgXHQkKCcuZWRpdC1jYWxjJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gIFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG4gIFx0XHQkKCcuY2FsYy1jbG9zZScpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gIFx0fSk7XG5cblx0JCgnLmZvcm1fX2lucHV0JykuZWFjaChmdW5jdGlvbigpe1xuXHRcdGlmKCAkKHRoaXMpLnZhbCgpLmxlbmd0aCA+IDAgKXtcblx0XHRcdCQodGhpcykucGFyZW50KClbMF0uY2xhc3NMaXN0LmFkZCgncGFzc2VkJyk7XG5cdFx0fVxuXHR9KTtcblxuXHQkKCcuZm9ybV9faW5wdXQnKS5vbignZm9jdXMnLCBmdW5jdGlvbigpe1xuXHRcdCQodGhpcykucGFyZW50KClbMF0uY2xhc3NMaXN0LmFkZCgnZm9jdXNlZCcpO1xuXHR9KS5vbignYmx1cicsIGZ1bmN0aW9uKCl7XG5cdFx0dmFyIHNlbGYgPSAkKHRoaXMpO1xuXHRcdHNlbGYucGFyZW50KClbMF0uY2xhc3NMaXN0LnJlbW92ZSgnZm9jdXNlZCcpO1xuXG5cdFx0aWYoIHNlbGYudmFsKCkubGVuZ3RoID4gMCAmJiAhaGFzQ2xhc3ModGhpcywgJ25nLWludmFsaWQnKSl7XG5cdFx0XHRzZWxmLnBhcmVudCgpWzBdLmNsYXNzTGlzdC5hZGQoJ3Bhc3NlZCcpO1xuXG5cdFx0XHRpZiggc2VsZi5oYXNDbGFzcygnaW5wdXQtY2hhbmdlJykgKXtcblx0XHRcdFx0aWYoc2VsZi5hdHRyKCd0eXBlJykgPT0gJ3RlbCcgKXtcblx0XHRcdFx0XHRzZWxmLnBhcmVudHMoJy5mb3JtJylbMF0uY2xhc3NMaXN0LmFkZCgncGhvbmUtY2hhbmdlZCcpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNlbGYucGFyZW50cygnLmZvcm0nKVswXS5jbGFzc0xpc3QuYWRkKCdlbWFpbC1jaGFuZ2VkJyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0c2VsZi5wYXJlbnQoKVswXS5jbGFzc0xpc3QucmVtb3ZlKCdwYXNzZWQnKTtcblxuXHRcdFx0aWYoIHNlbGYuaGFzQ2xhc3MoJ2lucHV0LWNoYW5nZScpICl7XG5cdFx0XHRcdGlmKHNlbGYuYXR0cigndHlwZScpID09ICd0ZWwnICl7XG5cdFx0XHRcdFx0c2VsZi5wYXJlbnRzKCcuZm9ybScpWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ3Bob25lLWNoYW5nZWQnKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzZWxmLnBhcmVudHMoJy5mb3JtJylbMF0uY2xhc3NMaXN0LnJlbW92ZSgnZW1haWwtY2hhbmdlZCcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQkKCcuaW5wdXQtY2FwaXRhbGl6ZScpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKVxuICAgICAgICBcdGlucHV0X3ZhbHVlID0gc2VsZi52YWwoKTtcblxuICAgICAgICB2YXIgd29yZHMgPSBpbnB1dF92YWx1ZS5zcGxpdCgnICcpLFxuICAgICAgICBcdHJlc3VsdCA9IFtdOztcblxuICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgIFx0cmVzdWx0W2ldID0gd29yZHNbaV0uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB3b3Jkc1tpXS5zdWJzdHIoMSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLnZhbChyZXN1bHQuam9pbignICcpKTtcbiAgICB9KTtcblxuICAgICQoJy5pbnB1dC11cHBlcmNhc2UnKS5vbignaW5wdXQnLCBmdW5jdGlvbihldmVudCkge1xuICAgIFx0dmFyIHNlbGYgPSAkKHRoaXMpO1xuXG4gICAgXHRzZWxmLnZhbChzZWxmLnZhbCgpLnRvVXBwZXJDYXNlKCkpO1xuICAgIFx0c2VsZi50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICB9KTtcblxuICAgICQoJy5pbnB1dC1zZXBhcmF0ZScpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgXHR2YXIgc2VsZiA9ICQodGhpcyksXG4gICAgXHRcdGlucHV0X3ZhbHVlID0gc2VsZi52YWwoKTtcblxuICAgIFx0XHRjbGVhbl92YWx1ZSA9IGlucHV0X3ZhbHVlLnNwbGl0KCctJykuam9pbignJyk7XG4gICAgXHRcdGlmIChjbGVhbl92YWx1ZS5sZW5ndGggPiA4KXtcbiAgICBcdFx0XHRzZWxmLnZhbChjbGVhbl92YWx1ZS5zdWJzdHIoMCw4KSArIFwiLVwiICsgY2xlYW5fdmFsdWUuc3Vic3RyKDgpKTtcbiAgICBcdFx0fVxuICAgIH0pO1xuXG4gICAgJCgnLmlucHV0LWxhdGluJykub24oJ2lucHV0JywgZnVuY3Rpb24oZSkge1xuICAgIFx0dmFyIHNlbGYgPSAkKHRoaXMpLFxuICAgIFx0XHRpbnB1dF92YWx1ZSA9IHNlbGYudmFsKCksXG4gICAgXHRcdGN1cnJlbnRfdmFsdWUgPSBpbnB1dF92YWx1ZS5zbGljZSgtMSksXG4gICAgXHRcdHRlc3RfY3lyaWxsaWMgPSAvW9CwLdGP0JAt0K/RkdCB0pHSkNGU0ITRltCG0ZfQh10vO1xuICAgIFx0XG4gICAgXHRpZiAodGVzdF9jeXJpbGxpYy50ZXN0KGN1cnJlbnRfdmFsdWUpKXtcbiAgICBcdFx0c2VsZi52YWwoaW5wdXRfdmFsdWUuc2xpY2UoMCwgLTEpKTtcbiAgICBcdFx0JCh0aGlzKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICBcdH1cbiAgICB9KTtcblxuICAgICQoJy5pbnB1dC1jeXJpbGxpYycpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKGUpIHtcbiAgICBcdHZhciBzZWxmID0gJCh0aGlzKSxcbiAgICBcdFx0aW5wdXRfdmFsdWUgPSBzZWxmLnZhbCgpLFxuICAgIFx0XHRjdXJyZW50X3ZhbHVlID0gaW5wdXRfdmFsdWUuc2xpY2UoLTEpLFxuICAgIFx0XHR0ZXN0X2N5cmlsbGljID0gL1vQsC3Rj9CQLdCv0ZHQgdKR0pDRlNCE0ZbQhtGX0IddLztcbiAgICBcdFxuICAgIFx0aWYgKCF0ZXN0X2N5cmlsbGljLnRlc3QoY3VycmVudF92YWx1ZSkpe1xuICAgIFx0XHRzZWxmLnZhbChpbnB1dF92YWx1ZS5zbGljZSgwLCAtMSkpO1xuICAgIFx0XHQkKHRoaXMpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgIFx0fVxuICAgIH0pO1xuXG4gICAgJCgnLmxpbWl0LXdvcmRzJykub24oJ2lucHV0JywgZnVuY3Rpb24oZSkge1xuICAgIFx0dmFyIHNlbGYgPSAkKHRoaXMpLFxuICAgIFx0XHRpbnB1dF92YWx1ZSA9IHNlbGYudmFsKCksXG4gICAgXHRcdHdvcmRzID0gaW5wdXRfdmFsdWUuc3BsaXQoJyAnKS5sZW5ndGg7XG5cbiAgICBcdFx0aWYgKHdvcmRzID4gMyl7XG4gICAgXHRcdFx0c2VsZi52YWwoaW5wdXRfdmFsdWUuc2xpY2UoMCwgLTEpKTtcbiAgICBcdFx0XHQkKHRoaXMpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgIFx0XHR9XG4gICAgfSk7XG5cbiAgICAkKCcucGVyc29uYWwtaW5jb21lJykub24oJ2lucHV0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBcdHZhciByZWxhdGVkID0gJCh0aGlzKS5kYXRhKCdzdW0nKTtcbiAgICBcdCQocmVsYXRlZCkuY2hhbmdlKCk7XG4gICAgfSk7XG5cbiAgICAkKCdbbmctbW9kZWw9XCJpbnB1dFBhc3N3b3JkXCJdJykub24oJ2lucHV0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBcdHZhciBzZWxmID0gJCh0aGlzKSxcbiAgICBcdFx0cmVsYXRlZCA9ICQoJ1tuZy1tb2RlbD1cImlucHV0UmVQYXNzd29yZFwiXScpO1xuICAgIFx0XG4gICAgXHRpZiggc2VsZi52YWwoKSA9PSByZWxhdGVkLnZhbCgpICl7XG4gICAgXHRcdCQoJ1tuZy1tb2RlbD1cImlucHV0UmVQYXNzd29yZFwiXScpLmJsdXIoKTtcbiAgICBcdH1cbiAgICB9KTtcblxuXHQkKCcuZm9ybV9fdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciBwYXNzX3RvZ2dsZSA9ICQodGhpcyk7XG5cblx0XHRpZiggaGFzQ2xhc3ModGhpcywgJ2FjdGl2ZScpICl7XG5cdFx0XHRwYXNzX3RvZ2dsZS5zaWJsaW5ncygnLmZvcm1fX2lucHV0JykuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwYXNzX3RvZ2dsZS5zaWJsaW5ncygnLmZvcm1fX2lucHV0JykuYXR0cigndHlwZScsICd0ZXh0Jyk7XG5cdFx0fVxuXHRcblx0XHRwYXNzX3RvZ2dsZVswXS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcblx0fSk7XG5cblx0JCgnLnVwbG9hZC1ncm91cCcpLmVhY2goZnVuY3Rpb24oKXtcblx0XHR2YXIgY3VycmVudF91cGxvYWRzID0gJCh0aGlzKS5maW5kKCcudXBsb2FkLXByZXZpZXcnKS5sZW5ndGg7XG5cdFx0XHRcblx0XHRpZihjdXJyZW50X3VwbG9hZHMgPiAwKXtcblx0XHRcdCQodGhpcykuZmluZCgnLmZpbGVjaGVjaycpLnZhbCgnZXhpc3QnKTtcbiAgICAgICAgICAgXHQkKHRoaXMpLmZpbmQoJy5maWxlY2hlY2snKS50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0XHR9XG5cdH0pO1xuXG5cdCQoJy5zZWxlY3Qtc2VhcmNoJykuanNDdXN0b21TZWxlY3Qoe1xuXHRcdHNlYXJjaDogdHJ1ZSxcblx0XHRzZWFyY2hOb1Jlc3VsdHM6ICfQndC10YIg0YHQvtCy0L/QsNC00LXQvdC40LknLFxuXHRcdHNlYXJjaElucHV0SGVpZ2h0OiA1OCxcblx0XHQnbWF4LWhlaWdodCc6IDI1NSxcblx0XHRwbGFjZWhvbGRlcjogJycsXG4gICAgICAgIHNjcm9sbDoge1xuICAgICAgICAgICAgbWluU2Nyb2xsYmFyTGVuZ3RoOiA0MFxuICAgICAgICB9XG5cdH0pO1xuXG5cdCQoJy5zZWxlY3QtbGlzdCcpLmpzQ3VzdG9tU2VsZWN0KHtcblx0XHRzZWFyY2g6IGZhbHNlLFxuXHRcdHBsYWNlaG9sZGVyOiAnJyxcbiAgICAgICAgc2Nyb2xsOiB7XG4gICAgICAgICAgICBtaW5TY3JvbGxiYXJMZW5ndGg6IDQwXG4gICAgICAgIH0sXG4gICAgICAgIGNoYW5nZTpmdW5jdGlvbihlKXtcbiAgICAgICAgXHQkKGUpLnBhcmVudHMoJy5zZWxlY3QtZ3JvdXAnKS5maW5kKCcuc2VsZWN0LWxpc3QtaXRlbScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgXHRcdCQodGhpcylbMF0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcblxuICAgICAgICBcdFx0aWYgKCAkKHRoaXMpLmRhdGEoJ3ZhbHVlJykgPT0gZS52YWx1ZSApe1xuICAgICAgICBcdFx0XHQkKHRoaXMpWzBdLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgIFx0XHR9XG4gICAgICAgIFx0fSk7XG4gICAgICAgIH1cblx0fSk7XG5cblx0JCgnLnNlbGVjdC1jaG9vc2UnKS5qc0N1c3RvbVNlbGVjdCh7XG5cdFx0c2VhcmNoOiBmYWxzZSxcblx0XHQnbWF4LWhlaWdodCc6IDI1MCxcblx0XHRwbGFjZWhvbGRlcjogJycsXG4gICAgICAgIHNjcm9sbDoge1xuICAgICAgICAgICAgbWluU2Nyb2xsYmFyTGVuZ3RoOiA0MFxuICAgICAgICB9LFxuICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuICAgICAgICBcdCQoZSkucGFyZW50cygnLmNhcmQnKVswXS5jbGFzc0xpc3QuYWRkKCdjYXJkLS1jaGFuZ2UnKTtcblxuICAgICAgICBcdCQoZSkucGFyZW50cygnLnNlbGVjdC1ncm91cCcpLmZpbmQoJy5zZWxlY3QtbGlzdC1pdGVtJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICBcdFx0JCh0aGlzKVswXS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuXG4gICAgICAgIFx0XHRpZiAoICQodGhpcykuZGF0YSgndmFsdWUnKSA9PSBlLnZhbHVlICl7XG4gICAgICAgIFx0XHRcdCQodGhpcylbMF0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgXHRcdH1cbiAgICAgICAgXHR9KTtcbiAgICAgICAgfVxuXHR9KTtcblxuXHQkKCcudmFsdWUtZmllbGQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdHZhciBzZWxmID0gJCh0aGlzKSxcblx0XHRcdHBhcmVudCA9IHNlbGYucGFyZW50cygnLnNlbGVjdCcpLFxuXHRcdFx0ZHJvcGRvd24gPSBwYXJlbnQuZmluZCgnLmN1c3RvbS1zZWxlY3QtbGlzdCcpO1xuXG5cdFx0aWYocGFyZW50Lmhhc0NsYXNzKCdvcGVuJykpe1xuXHRcdFx0dmFyIGJvdHRvbV9vZl9lbGVtZW50ID0gZHJvcGRvd24ub2Zmc2V0KCkudG9wICsgZHJvcGRvd24ub3V0ZXJIZWlnaHQoKTtcbiAgICBcdFx0dmFyIGJvdHRvbV9vZl9zY3JlZW4gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyAkKHdpbmRvdykuaGVpZ2h0KCk7XG5cbiAgICBcdFx0aWYoYm90dG9tX29mX2VsZW1lbnQgPiBib3R0b21fb2Zfc2NyZWVuKXtcbiAgICBcdFx0XHQkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG5cdFx0XHQgICAgICAgIHNjcm9sbFRvcDogJCh3aW5kb3cpLnNjcm9sbFRvcCgpICsgKGJvdHRvbV9vZl9lbGVtZW50IC0gYm90dG9tX29mX3NjcmVlbilcblx0XHRcdCAgICB9LCB0aW1lX3Nsb3cpO1xuICAgIFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQkKCcuc2VsZWN0LWxhYmVsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0JCh0aGlzKS5zaWJsaW5ncygnLnNlbGVjdCcpLmZpbmQoJy52YWx1ZS1maWVsZCcpLnRyaWdnZXIoJ2NsaWNrJyk7XG5cdH0pO1xuXG5cdCQoJy5jYXJkLWNvbmZpcm0nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQkKHRoaXMpLnBhcmVudHMoJy5jYXJkJylbMF0uY2xhc3NMaXN0LnJlbW92ZSgnY2FyZC0tY2hhbmdlJyk7XG5cdH0pO1xuXG5cdCQoJ3NlbGVjdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuXHRcdCQodGhpcykucGFyZW50KClbMF0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcblxuXHRcdCQodGhpcykuc2libGluZ3MoJy5jdXN0b20tc2VsZWN0LWJsb2NrJylbMF0uY2xhc3NMaXN0LnJlbW92ZSgnaW52YWxpZGVkJywgJ25nLXByaXN0aW5lJywgJ25nLXVudG91Y2hlZCcsICduZy1lbXB0eScsICduZy1pbnZhbGlkJyk7XG5cdH0pO1xuXG5cdCQoJ3NlbGVjdCcpLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCl7XG5cdFx0JCh0aGlzKS5vbigna2V5ZG93bicsIGZ1bmN0aW9uKGUpe1xuXHRcdFx0aWYgKCAoZS5rZXlDb2RlID49IDM1ICYmIGUua2V5Q29kZSA8PSA0MCkgKSB7XG5cdCAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblx0ICAgICAgICB9XG5cdFx0fSk7XG5cdH0pO1xuXG5cdGlmICggJCgnLmxpY2VuY2UnKS5sZW5ndGggPiAwICl7XG5cdFx0JCgnLmxpY2VuY2UnKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgbmV3X2lkID0gJCh0aGlzKS5hdHRyKCdpZCcpO1xuXHRcdFx0XG5cdFx0XHRuZXcganNDdXN0b21TY3JvbGwoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmV3X2lkKSk7XG5cdFx0fSk7XG5cdH1cblxuXHRpZiAoICQoJyNub3RpZmljYXRpb24tYm94JykubGVuZ3RoID4gMCApe1xuXHRcdG5ldyBqc0N1c3RvbVNjcm9sbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbm90aWZpY2F0aW9uLWJveCcpKTtcblx0fVxuXG5cdCQoJy51c2VyX19ib3gnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQvLyBTY3JvbGwgdG9wXG5cdFx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuXHQgICAgICAgIHNjcm9sbFRvcDogJCh0aGlzKS5vZmZzZXQoKS50b3AgLSAxMDBcblx0ICAgIH0sIHRpbWVfc2xvdyk7XG5cdFx0JCh0aGlzKS5wYXJlbnQoKVswXS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcblx0fSk7XG5cblx0JCgnLm5vdGlmaWNhdGlvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0fSk7XG5cblx0JCgnLm5vdGlmaWNhdGlvbi1tb3JlJykub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XG5cdFx0JCh0aGlzKVswXS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcblx0XHQkKHRoaXMpLnNpYmxpbmdzKCcubm90aWZpY2F0aW9uLWZ1bGwnKS5zbGlkZVRvZ2dsZSh0aW1lX2Zhc3QpO1xuXHR9KTtcblxuXHQvLyBuZXcganNDdXN0b21TY3JvbGwoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpY2VuY2UnKSk7XG5cblx0XG5cdCQoJy5yZXBlYXQtZ3JvdXAgLmxpbmstLWluZm8nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dmFyIHNlbGYgPSAkKHRoaXMpLFxuXHRcdFx0cGFyZW50ID0gc2VsZi5wYXJlbnQoKSxcblx0XHRcdHRpbWVyID0gcGFyZW50LmZpbmQoJy50aW55LXRpbWVyJyk7XG5cblx0XHR2YXIgdGltZV9sZWZ0ID0gdGltZXIuZmluZCgnLnNlY29uZHMnKS5odG1sKCk7XG5cblx0XHRpZiAoICF0aW1lX2xlZnQgfHwgdGltZV9sZWZ0ID09PSAwICl7XG5cblx0XHRcdHBhcmVudFswXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuXHRcdFx0dmFyIG1pbnV0ZSA9IGFkZFNlY29uZHMoNTkpO1xuXHRcdFx0aW5pdGlhbGl6ZUNsb2NrKHRpbWVyLCBtaW51dGUpO1xuXHRcdFxuXHRcdH1cblxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdHBhcmVudFswXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0XHR9LCA2MDAwMClcblx0fSk7XG5cblx0JCgnLmJ0bi1kZWNsaW5lJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0JCgnI21vZGFsLWRlY2xpbmUnKS5tb2RhbCgnc2hvdycpO1xuXHRcdH0sIDUwMCk7IFxuXHR9KTtcblxuXHQvLyBSYW5nZSBzbGlkZXJcblx0dmFyIHNsaWRlcl9tb25leSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZXItbW9uZXknKSxcblx0XHRpbnB1dF9tb25leSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dC1tb25leScpO1xuXG5cdGlmICggc2xpZGVyX21vbmV5ICl7XG5cdFx0dmFyIG1pbl92YWx1ZSA9IHNsaWRlcl9tb25leS5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWluJykgPT0gMCA/IDAgOiBwYXJzZUludChzbGlkZXJfbW9uZXkuZ2V0QXR0cmlidXRlKCdkYXRhLW1pbicpKSB8fCA1MDAsXG5cdFx0XHRtYXhfdmFsdWUgPSBwYXJzZUludChzbGlkZXJfbW9uZXkuZ2V0QXR0cmlidXRlKCdkYXRhLW1heCcpKSB8fCAzMDAwO1xuXG5cdFx0cmFuZ2Vfc2xpZGVyKHNsaWRlcl9tb25leSwgaW5wdXRfbW9uZXksIHtcblx0XHRcdHN0YXJ0OiBzbGlkZXJfbW9uZXkuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJykgfHwgNTAwLFxuXHRcdFx0c3RlcDogcGFyc2VJbnQoc2xpZGVyX21vbmV5LmdldEF0dHJpYnV0ZSgnZGF0YS1zdGVwJykpIHx8IDUwLFxuXHRcdFx0Y29ubmVjdDogW3RydWUsIGZhbHNlXSxcblx0XHRcdHJhbmdlOiB7XG5cdFx0XHRcdCdtaW4nOiBtaW5fdmFsdWUsXG5cdFx0XHRcdCdtYXgnOiBtYXhfdmFsdWVcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHZhciBzbGlkZXJfdGltZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZXItdGltZScpLFxuXHRcdGlucHV0X3RpbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtdGltZScpO1xuXG5cdGlmICggc2xpZGVyX3RpbWUpIHtcblx0XHR2YXIgbWluX3ZhbHVlID0gc2xpZGVyX3RpbWUuZ2V0QXR0cmlidXRlKCdkYXRhLW1pbicpID09IDAgPyAwIDogcGFyc2VJbnQoc2xpZGVyX3RpbWUuZ2V0QXR0cmlidXRlKCdkYXRhLW1pbicpKSB8fCAxLFxuXHRcdFx0bWF4X3ZhbHVlID0gcGFyc2VJbnQoc2xpZGVyX3RpbWUuZ2V0QXR0cmlidXRlKCdkYXRhLW1heCcpKSB8fCAyMDtcblxuXHRcdHJhbmdlX3NsaWRlcihzbGlkZXJfdGltZSwgaW5wdXRfdGltZSwge1xuXHRcdFx0c3RhcnQ6IHNsaWRlcl90aW1lLmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpIHx8IDIwLFxuXHRcdFx0c3RlcDogMSxcblx0XHRcdGNvbm5lY3Q6IFt0cnVlLCBmYWxzZV0sXG5cdFx0XHRyYW5nZToge1xuXHRcdFx0XHQnbWluJzogMSxcblx0XHRcdFx0J21heCc6IDIwXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRzbGlkZXJfdGltZS5ub1VpU2xpZGVyLm9uKCd1cGRhdGUnLCBmdW5jdGlvbiggdmFsdWVzLCBoYW5kbGUgKSB7XG5cdFx0XHR2YXIgc2xpZGVyX19sYWJlbCA9ICQoJy52YWx1ZS0tdGltZScpLFxuXHRcdFx0XHRjdXJyZW50X2l0ZW0gPSBwYXJzZUludCh2YWx1ZXNbaGFuZGxlXSksXG5cdFx0XHRcdGxhYmVsX3ZhcmlhbnRzID0gWyfQtNC10L3RjCcsICfQtNC90Y8nLCAn0LTQvdC10LknXTtcblxuXHRcdFx0c2xpZGVyX19sYWJlbFswXS5jbGFzc0xpc3QucmVtb3ZlKCdkaW1lbnNpb24tLXNtJyk7XG5cblx0XHRcdGlmKCBjdXJyZW50X2l0ZW0gPT0gMSApe1xuXHRcdFx0XHRzbGlkZXJfX2xhYmVsLm5leHQoKS5odG1sKGxhYmVsX3ZhcmlhbnRzWzBdKTtcblx0XHRcdH0gZWxzZSBpZihjdXJyZW50X2l0ZW0gPT0gMiB8fCBjdXJyZW50X2l0ZW0gPT0gMyB8fCBjdXJyZW50X2l0ZW0gPT0gNCkge1xuXHRcdFx0XHRzbGlkZXJfX2xhYmVsLm5leHQoKS5odG1sKGxhYmVsX3ZhcmlhbnRzWzFdKTtcblx0XHRcdFx0c2xpZGVyX19sYWJlbFswXS5jbGFzc0xpc3QuYWRkKCdkaW1lbnNpb24tLXNtJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzbGlkZXJfX2xhYmVsLm5leHQoKS5odG1sKGxhYmVsX3ZhcmlhbnRzWzJdKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHJhbmdlX3NsaWRlcihpZCwgaW5wdXQsIGNvbmZpZyl7XG5cdFx0bm9VaVNsaWRlci5jcmVhdGUoaWQsIGNvbmZpZyk7XG5cblx0XHRpZC5ub1VpU2xpZGVyLm9uKCd1cGRhdGUnLCBmdW5jdGlvbiggdmFsdWVzLCBoYW5kbGUgKSB7XG5cdFx0XHR2YXIgbnVtYmVyID0gcGFyc2VJbnQodmFsdWVzW2hhbmRsZV0pO1x0XHRcdFxuXHRcdFx0aW5wdXQudmFsdWUgPSBudW1iZXIudG9TdHJpbmcoKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIiBcIik7XG5cdFx0fSk7XG5cblx0XHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy52YWx1ZSA9IHRoaXMudmFsdWUucmVwbGFjZSgvIC9nLCcnKTtcbiAgICBcdFx0aWQubm9VaVNsaWRlci5zZXQodGhpcy52YWx1ZSk7XG5cdFx0fSk7XG5cdH1cblxuXG5cdCQoJy5udW1iZXItZmllbGQnKS5vbigna2V5ZG93bicsIGZ1bmN0aW9uKGUpe1xuXHRcdC8vIEFsbG93OiBiYWNrc3BhY2UsIGRlbGV0ZSwgdGFiLCBlc2NhcGUsIGVudGVyXG4gICAgICAgIGlmICgkLmluQXJyYXkoZS5rZXlDb2RlLCBbNDYsIDgsIDksIDI3LCAxMywgMTEwXSkgIT09IC0xIHx8XG4gICAgICAgICAgICAgLy8gQWxsb3c6IEN0cmwrQSwgQ29tbWFuZCtBXG4gICAgICAgICAgICAoZS5rZXlDb2RlID09PSA2NSAmJiAoZS5jdHJsS2V5ID09PSB0cnVlIHx8IGUubWV0YUtleSA9PT0gdHJ1ZSkpIHx8IFxuICAgICAgICAgICAgLy8gQWxsb3c6IGhvbWUsIGVuZCwgbGVmdCwgcmlnaHQsIGRvd24sIHVwXG4gICAgICAgICAgICAoZS5rZXlDb2RlID49IDM1ICYmIGUua2V5Q29kZSA8PSA0MCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbnN1cmUgdGhhdCBpdCBpcyBhIG51bWJlciBhbmQgc3RvcCB0aGUga2V5cHJlc3NcbiAgICAgICAgaWYgKChlLnNoaWZ0S2V5IHx8IChlLmtleUNvZGUgPCA0OCB8fCBlLmtleUNvZGUgPiA1NykpICYmIChlLmtleUNvZGUgPCA5NiB8fCBlLmtleUNvZGUgPiAxMDUpKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblx0fSk7XG5cblx0JCgnLmxpbWl0LWZpZWxkJykub24oJ2tleWRvd24nLCBmdW5jdGlvbihlKXtcblx0��    ��                    ���            Pn�    H��             ��     @       ��            KCkubGVuZ3RoO1xuXG5cdFx0XHRmdW5jdGlvbiBnZXRTZWxlY3RlZFRleHQoKSB7XG5cdFx0XHQgICAgdmFyIHRleHQgPSBcIlwiO1xuXHRcdFx0ICAgIGlmICh0eXBlb2Ygd2luZG93LmdldFNlbGVjdGlvbiAhPSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHQgICAgICAgIHRleHQgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkudG9TdHJpbmcoKTtcblx0XHRcdCAgICB9IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC5zZWxlY3Rpb24gIT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudC5zZWxlY3Rpb24udHlwZSA9PSBcIlRleHRcIikge1xuXHRcdFx0ICAgICAgICB0ZXh0ID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCkudGV4dDtcblx0XHRcdCAgICB9XG5cdFx0XHQgICAgcmV0dXJuIHRleHQ7XG5cdFx0XHR9XG5cdFx0XHR2YXIgc2VsZWN0ZWRUZXh0ID0gZ2V0U2VsZWN0ZWRUZXh0KCk7XG5cblx0XHRcdGlmICggbGltaXQgPD0gdmFsdWVfc3ltYm9scyAmJiBzZWxlY3RlZFRleHQubGVuZ3RoIDwgMSkge1xuXG5cdFx0XHRcdC8vIEFsbG93OiBiYWNrc3BhY2UsIGRlbGV0ZSwgdGFiLCBlc2NhcGUsIGVudGVyXG5cdFx0XHRcdGlmICgkLmluQXJyYXkoZS5rZXlDb2RlLCBbNDYsIDgsIDksIDI3LCAxMywgMTEwXSkgIT09IC0xIHx8XG5cdCAgICAgICAgICAgICBcdC8vIEFsbG93OiBDdHJsK0EsIENvbW1hbmQrQVxuXHQgICAgICAgICAgICBcdChlLmtleUNvZGUgPT09IDY1ICYmIChlLmN0cmxLZXkgPT09IHRydWUgfHwgZS5tZXRhS2V5ID09PSB0cnVlKSkgfHwgXG5cdCAgICAgICAgICAgIFx0Ly8gQWxsb3c6IGhvbWUsIGVuZCwgbGVmdCwgcmlnaHQsIGRvd24sIHVwXG5cdCAgICAgICAgICAgIFx0KGUua2V5Q29kZSA+PSAzNSAmJiBlLmtleUNvZGUgPD0gNDApKSB7XG5cdCAgICAgICAgICAgICAgIFx0XHRyZXR1cm47XG5cdFx0ICAgICAgICB9IGVsc2Uge1xuXHRcdCAgICAgICAgXHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ICAgICAgICB9XG4gICAgICAgIFx0XG4gICAgICAgIFx0fVxuXHR9KTtcblxuXHQkKCcuY2FsY3VsYXRvcl9faW5mby10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dmFyIGluZm9fYmxvY2sgPSAkKHRoaXMpLnBhcmVudCgpXG5cdFx0aW5mb19ibG9ja1swXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuXHRcdGlmKCBkaXNwbGF5X3dpZHRoIDwgNzY4ICl7XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciBib3R0b21fb2ZfZWxlbWVudCA9IGluZm9fYmxvY2sub2Zmc2V0KCkudG9wICsgaW5mb19ibG9jay5vdXRlckhlaWdodCgpO1xuXHRcdFx0XHR2YXIgYm90dG9tX29mX3NjcmVlbiA9ICQod2luZG93KS5zY3JvbGxUb3AoKSArICQod2luZG93KS5oZWlnaHQoKTtcblxuXHRcdFx0XHRpZihib3R0b21fb2ZfZWxlbWVudCA+IGJvdHRvbV9vZl9zY3JlZW4pe1xuXHRcdFx0XHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHRcdFx0ICAgICAgICBzY3JvbGxUb3A6ICQod2luZG93KS5zY3JvbGxUb3AoKSArIChib3R0b21fb2ZfZWxlbWVudCAtIGJvdHRvbV9vZl9zY3JlZW4pXG5cdFx0XHRcdCAgICB9LCB0aW1lX3Nsb3cpO1xuXHRcdFx0XHR9IFxuXHRcdFx0fSwgdGltZV9zbG93KVxuXHRcdH1cblx0fSk7XG5cblx0JCgnLnRhYnMtdmlldyBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0dmFyIGN1cnJlbnRfc2l0dWF0aW9uID0gJCh0aGlzKS5kYXRhKCd2aWV3Jyk7XG5cblx0XHRpZiAoY3VycmVudF9zaXR1YXRpb24gPT0gJ2xvZ2luJyl7XG5cdFx0XHQkKCdib2R5JylbMF0uY2xhc3NMaXN0LmFkZCgnY2xlYW4tdmlldycpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkKCdib2R5JylbMF0uY2xhc3NMaXN0LnJlbW92ZSgnY2xlYW4tdmlldycpO1xuXHRcdH1cblx0fSk7XG5cblx0JCgnLmFjY29yZGlvbiBhLCAuZmFxLWFjY29yZGlvbiBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0dmFyIHNlbGYgPSAkKHRoaXMpO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuXHRcdCAgICAgICAgc2Nyb2xsVG9wOiBzZWxmLm9mZnNldCgpLnRvcCAtIChkaXNwbGF5X3dpZHRoIDwgNDgwID8gNzAgOiAwKVxuXHRcdCAgICB9LCB0aW1lX3Nsb3cpO1xuXHRcdH0sIDM1MCk7XG5cdH0pO1xuXG5cdGlmKCAkKCdjb250ZW50LS1mYXEnKS5sZW5ndGggPiAwICl7XG5cdFx0YWN0aXZhdG9yKG9iaik7XG5cdH1cblxuXHQvLyBUb2dnbGUgY2FsYyBjb25maWdcblx0JCgnLmNhbGN1bGF0b3ItY29uZmlnJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciBjYWxjID0gJCh0aGlzKS5wYXJlbnRzKCcuY2FsY3VsYXRvcicpO1xuXG5cdFx0Y2FsY1swXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuXHRcdGNhbGMuZmluZCgnLmNhbGN1bGF0b3JfX3ByZWl2ZXctaGVhZGVyJykuc2xpZGVVcCh0aW1lX2Zhc3QpO1xuXHRcdGNhbGMuZmluZCgnLmNhbGN1bGF0b3JfX3RvcCcpLmRlbGF5KHRpbWVfZmFzdCkuc2xpZGVEb3duKHRpbWVfc2xvdyk7XG5cdFx0Y2FsYy5maW5kKCcuY2FsY3VsYXRvcl9fc3VibWl0JykuZGVsYXkodGltZV9mYXN0ICsgdGltZV9zbG93KS5zbGlkZURvd24odGltZV9mYXN0KTtcblx0fSk7XG5cblx0JCgnLmNhbGN1bGF0b3JfX3N1Ym1pdCA+IC5idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dmFyIGNhbGMgPSAkKHRoaXMpLnBhcmVudHMoJy5jYWxjdWxhdG9yJyk7XG5cblx0XHRjYWxjWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG5cdFx0Y2FsYy5maW5kKCcuY2FsY3VsYXRvcl9fc3VibWl0Jykuc2xpZGVVcCh0aW1lX2Zhc3QpO1xuXHRcdGNhbGMuZmluZCgnLmNhbGN1bGF0b3JfX3RvcCcpLmRlbGF5KHRpbWVfZmFzdCkuc2xpZGVVcCh0aW1lX3Nsb3cpO1xuXHRcdGNhbGMuZmluZCgnLmNhbGN1bGF0b3JfX3ByZWl2ZXctaGVhZGVyJykuZGVsYXkodGltZV9mYXN0ICsgdGltZV9zbG93KS5zbGlkZURvd24odGltZV9mYXN0KTtcblx0fSk7XG5cblx0Ly8gRWRpdCBwYWdlIGludGVyYWN0aW9uXG5cdCQoJy5jYWxjLW9wZW4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dmFyIHRvZ2dsZSA9ICQodGhpcyksXG5cdFx0XHRwYXJlbnQgPSB0b2dnbGUucGFyZW50cygnLnRvb2dsZS1zZWN0aW9uJyk7XG5cblx0XHRcdHRvZ2dsZVswXS5jbGFzc0xpc3QuYWRkKCdpbnNpdmlibGUnKVxuXHRcdFx0cGFyZW50LmZpbmQoJy5jcmVkaXQnKVswXS5jbGFzc0xpc3QuYWRkKCdjcmVkaXQtLW9wZW4nKTtcblxuXHRcdFx0cGFyZW50LmZpbmQoJy5jYWxjdWxhdG9yJykuc2xpZGVEb3duKHRpbWVfc2xvdyk7XG5cdFx0XHRwYXJlbnQuZmluZCgnLmNoYW5nZS1jb250cm9scycpLmRlbGF5KHRpbWVfc2xvdykuc2xpZGVEb3duKHRpbWVfZmFzdCk7XG5cblx0XHRcdC8vIEhpZGUgbmV4dFxuXHRcdFx0JCgnLm5leHQtYmxvY2snKS5zbGlkZVVwKHRpbWVfZmFzdCk7XG5cdH0pO1xuXG5cdCQoJy5jYWxjLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciB0b2dnbGUgPSAkKHRoaXMpLFxuXHRcdFx0cGFyZW50ID0gdG9nZ2xlLnBhcmVudHMoJy50b29nbGUtc2VjdGlvbicpLFxuXHRcdFx0YWx0ID0gcGFyZW50LmZpbmQoJy5jYWxjLW9wZW4nKTtcblxuXHRcdFx0YWx0WzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2luc2l2aWJsZScpXG5cdFx0XHRwYXJlbnQuZmluZCgnLmNyZWRpdCcpWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2NyZWRpdC0tb3BlbicpO1xuXG5cdFx0XHRwYXJlbnQuZmluZCgnLmNoYW5nZS1jb250cm9scycpLnNsaWRlVXAodGltZV9mYXN0KTtcblx0XHRcdHBhcmVudC5maW5kKCcuY2FsY3VsYXRvcicpLmRlbGF5KHRpbWVfZmFzdCkuc2xpZGVVcCh0aW1lX3Nsb3cpO1xuXG5cdFx0XHQkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG5cdFx0ICAgICAgICBzY3JvbGxUb3A6IHBhcmVudC5vZmZzZXQoKS50b3AgLSAoZGlzcGxheV93aWR0aCA8IDQ4MCA/IDcwIDogMClcblx0XHQgICAgfSwgdGltZV9zbG93KTtcblxuXHRcdFx0Ly8gSGlkZSBuZXh0XG5cdFx0XHQkKCcubmV4dC1ibG9jaycpLnNsaWRlRG93bih0aW1lX2Zhc3QpO1xuXHR9KTtcblxuXHQvLyBFZGl0IGZvcm0gaW50ZXJhY3Rpb25cblx0JCgnLmVkaXQtb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR2YXIgdG9nZ2xlID0gJCh0aGlzKSxcblx0XHRcdHBhcmVudCA9IHRvZ2dsZS5wYXJlbnRzKCcudG9vZ2xlLXNlY3Rpb24nKTtcblxuXHRcdFx0dG9nZ2xlWzBdLmNsYXNzTGlzdC5hZGQoJ2luc2l2aWJsZScpXG5cdFx0XHRwYXJlbnQuZmluZCgnLnRvZ2dsZS1maXJzdCcpLnNsaWRlVXAodGltZV9zbG93KTtcblx0XHRcdHBhcmVudC5maW5kKCcudG9nZ2xlLXNlY29uZCcpLmRlbGF5KHRpbWVfc2xvdykuc2xpZGVEb3duKHRpbWVfc2xvdyk7XG5cblx0XHRcdC8vIEhpZGUgbmV4dFxuXHRcdFx0JCgnLm5leHQtYmxvY2snKS5zbGlkZVVwKHRpbWVfZmFzdCk7XG5cdH0pO1xuXG5cdCQoJy5lZGl0LWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciB0b2dnbGUgPSAkKHRoaXMpLFxuXHRcdFx0cGFyZW50ID0gdG9nZ2xlLnBhcmVudHMoJy50b29nbGUtc2VjdGlvbicpLFxuXHRcdFx0YWx0ID0gcGFyZW50LmZpbmQoJy5lZGl0LW9wZW4nKTtcblxuXHRcdFx0YWx0WzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2luc2l2aWJsZScpXG5cdFx0XHRwYXJlbnQuZmluZCgnLnRvZ2dsZS1zZWNvbmQnKS5zbGlkZVVwKHRpbWVfc2xvdyk7XG5cdFx0XHRwYXJlbnQuZmluZCgnLnRvZ2dsZS1maXJzdCcpLmRlbGF5KHRpbWVfc2xvdykuc2xpZGVEb3duKHRpbWVfc2xvdyk7XG5cblx0XHRcdC8vIFNjcm9sbCB0b3Bcblx0XHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHQgICAgICAgIHNjcm9sbFRvcDogcGFyZW50Lm9mZnNldCgpLnRvcCAtIChkaXNwbGF5X3dpZHRoIDwgNDgwID8gNzAgOiAwKVxuXHRcdCAgICB9LCB0aW1lX3Nsb3cpO1xuXHRcdFx0XG5cdFx0XHQvLyBTaG93IG5leHRcblx0XHRcdCQoJy5uZXh0LWJsb2NrJykuc2xpZGVEb3duKHRpbWVfZmFzdCk7XG5cdH0pO1xuXG5cdC8vIEludGVyYWN0aXZlIHNlY3Rpb24gY2hhbmdlXG5cdCQoJy50b2dnbGUtbmV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdHZhciB0b2dnbGUgPSAkKHRoaXMpLFxuXHRcdFx0Y3VycmVudF9zZWN0aW9uID0gdG9nZ2xlLmRhdGEoJ2N1cnJlbnQnKSxcblx0XHRcdHRhcmdldF9zZWN0aW9uID0gdG9nZ2xlLmRhdGEoJ3RhcmdldCcpXG5cdFx0XHRwYXJlbnQgPSB0b2dnbGUucGFyZW50cygnLnRvb2dsZS1zZWN0aW9uJyk7XG5cblx0XHRcdHBhcmVudC5maW5kKGN1cnJlbnRfc2VjdGlvbikuc2xpZGVVcCh0aW1lX3Nsb3cpO1xuXHRcdFx0cGFyZW50LmZpbmQodGFyZ2V0X3NlY3Rpb24pLmRlbGF5KHRpbWVfc2xvdykuc2xpZGVEb3duKHRpbWVfc2xvdyk7XG5cdH0pO1xuXG5cdCQoJy5jb25maWctdG9wLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHQkKCcuY29uZmlnLXRvcCcpLnNsaWRlVXAodGltZV9zbG93KTtcblx0fSk7XG5cblx0JCgnLmNvbmZpZy10b3Atc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdCQoJy5jb25maWctdG9wJykuc2xpZGVEb3duKHRpbWVfc2xvdylcblx0fSk7XG5cdFxuXG5cdCQoJy5wYXNzLWNoYW5nZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdCQodGhpcylbMF0uY2xhc3NMaXN0LmFkZCgnaW5zaXZpYmxlJyk7XG5cdFx0JCgnLnBhc3N3b3JkLWZvcm0nKS5zbGlkZURvd24odGltZV9zbG93KTtcblx0fSk7XG5cblx0JCgnLnBhc3MtYmFjaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdCQoJy5wYXNzLWNoYW5nZScpWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2luc2l2aWJsZScpO1xuXHRcdCQoJy5wYXNzd29yZC1mb3JtJykuc2xpZGVVcCh0aW1lX3Nsb3cpO1xuXHR9KTtcblx0XG5cblx0JCgnI3Bhc3Nwb3J0X2lkJykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xuICAgICAgICBcdCQoJy5wYXNzcG9ydC1yZWd1bGFyJykuc2xpZGVVcCh0aW1lX3Nsb3cpO1xuICAgICAgICAgICAgJCgnLnBhc3Nwb3J0LWlkJykuZGVsYXkodGltZV9zbG93KS5zbGlkZURvd24odGltZV9zbG93KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgXHQkKCcucGFzc3BvcnQtaWQnKS5zbGlkZVVwKHRpbWVfc2xvdyk7XG4gICAgICAgICAgICAkKCcucGFzc3BvcnQtcmVndWxhcicpLmRlbGF5KHRpbWVfc2xvdykuc2xpZGVEb3duKHRpbWVfc2xvdyk7XG4gICAgICAgIH0gICAgXG5cbiAgICB9KVxuXG5cdCQoJy5kZXRhaWxfX2NvbnRyb2wnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dmFyIHNlbGYgPSAkKHRoaXMpO1xuXHRcdFx0Y3VycmVudF9zdGF0ZSA9IHNlbGYuaHRtbCgpLFxuXHRcdFx0b3Blbl9zdGF0ZSA9IHNlbGYuZGF0YSgnb3BlbicpLFxuXHRcdFx0Y2xvc2Vfc3RhdGUgPSBzZWxmLmRhdGEoJ2Nsb3NlJyk7XG5cblx0XHRpZiggY3VycmVudF9zdGF0ZSA9PSBvcGVuX3N0YXRlICl7XG5cdFx0XHRzZWxmLmh0bWwoY2xvc2Vfc3RhdGUpO1xuXHRcdFx0c2VsZlswXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0XHRcdHNlbGYuc2libGluZ3MoJy5kZXRhaWwtLW1vcmUnKS5zbGlkZVVwKHRpbWVfZmFzdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNlbGYuaHRtbChvcGVuX3N0YXRlKTtcblx0XHRcdHNlbGZbMF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cdFx0XHRzZWxmLnNpYmxpbmdzKCcuZGV0YWlsLS1tb3JlJykuc2xpZGVEb3duKHRpbWVfZmFzdCk7XG5cdFx0fVxuXHR9KTtcblxuXHQkKCcucHJvbW8tY29kZV9fdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciBzZWxmID0gJCh0aGlzKTtcblxuXHRcdGlmICggc2VsZi5wYXJlbnRzKCcucHJvbW8tY29kZScpLmhhc0NsYXNzKCdwcm9tby1jb2RlLS1zaW5nbGUnKSApe1xuXHRcdFx0c2VsZi5wYXJlbnRzKCcucHJvbW8tY29kZScpLnNpYmxpbmdzKCcuYnRuLWdyb3VwJylbMF0uY2xhc3NMaXN0LmFkZCgnZ3JvdXAtLXNocmluaycpO1xuXHRcdH1cblxuXHRcdHNlbGYuc2xpZGVUb2dnbGUodGltZV9mYXN0KVxuXHRcdHNlbGYuc2libGluZ3MoJy5wcm9tby1jb2RlX19mb3JtJykuZGVsYXkodGltZV9mYXN0KS5zbGlkZVRvZ2dsZSh0aW1lX2Zhc3QpO1xuXHR9KTtcblxuXHQkKCcucHJvbW8tY29kZV9fY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dmFyIHNlbGYgPSAkKHRoaXMpO1xuXG5cdFx0aWYgKCBzZWxmLnBhcmVudHMoJy5wcm9tby1jb2RlJykuaGFzQ2xhc3MoJ3Byb21vLWNvZGUtLXNpbmdsZScpICl7XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHNlbGYucGFyZW50cygnLnByb21vLWNvZGUnKS5zaWJsaW5ncygnLmJ0bi1ncm91cCcpWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2dyb3VwLS1zaHJpbmsnKTtcblx0XHRcdH0sIHRpbWVfZmFzdCk7IFx0XG5cdFx0fVxuXG5cdFx0c2VsZi5wYXJlbnRzKCcucHJvbW8tY29kZV9fZm9ybScpLnNsaWRlVG9nZ2xlKHRpbWVfZmFzdClcblx0XHRzZWxmLnBhcmVudHMoJy5wcm9tby1jb2RlJykuZmluZCgnLnByb21vLWNvZGVfX3RvZ2dsZScpLmRlbGF5KHRpbWVfZmFzdCkuc2xpZGVUb2dnbGUodGltZV9mYXN0KTtcblx0fSk7XG5cbiAgICAkKCcuc2VxdWVuY2UtdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0JCh0aGlzKVswXS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcblx0XHQkKHRoaXMpLm5leHQoKS5zbGlkZVRvZ2dsZSh0aW1lX3Nsb3cpO1xuXHR9KTtcblxuXHQkKCcuZG9jdW1lbnQtdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciBzZWxmID0gJCh0aGlzKSxcblx0XHRcdHRleHRfYmxvY2sgPSBzZWxmLmZpbmQoJy50b2dnbGUtdGV4dCcpLFxuXHRcdFx0Y3VycmVudF9zdGF0ZSA9IHRleHRfYmxvY2suaHRtbCgpLFxuXHRcdFx0b3Blbl9zdGF0ZSA9IHNlbGYuZGF0YSgnb3BlbicpLFxuXHRcdFx0Y2xvc2Vfc3RhdGUgPSBzZWxmLmRhdGEoJ2Nsb3NlJyksXG5cdFx0XHRwYXJlbnRfYmxvY2sgPSBzZWxmLnBhcmVudHMoJy5kb2N1bWVudCcpO1xuXG5cdFx0XHRpZiAoY3VycmVudF9zdGF0ZSA9PSBvcGVuX3N0YXRlKXtcblx0XHRcdFx0dGV4dF9ibG9jay5odG1sKGNsb3NlX3N0YXRlKTtcblx0XHRcdFx0cGFyZW50X2Jsb2NrWzBdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXHRcdFx0XHRwYXJlbnRfYmxvY2suZmluZCgnLmRvY3VtZW50X19wcmV2aWV3Jykuc2xpZGVEb3duKHRpbWVfc2xvdyk7XG5cblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHRcdFx0ICAgICAgICBzY3JvbGxUb3A6IHBhcmVudF9ibG9jay5vZmZzZXQoKS50b3AgLSAoZGlzcGxheV93aWR0aCA8IDQ4MCA/IDcwIDogMClcblx0XHRcdFx0ICAgIH0sIHRpbWVfc2xvdyk7XG5cdFx0XHRcdH0sIHRpbWVfc2xvdyk7XG5cdFx0XHRcdFxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGV4dF9ibG9jay5odG1sKG9wZW5fc3RhdGUpO1xuXHRcdFx0XHRwYXJlbnRfYmxvY2tbMF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cdFx0XHRcdHBhcmVudF9ibG9jay5maW5kKCcuZG9jdW1lbnRfX3ByZXZpZXcnKS5zbGlkZVVwKHRpbWVfc2xvdyk7XG5cdFx0XHR9XG5cblx0fSk7XG5cblx0JCgnLnNpZGViYXInKS50aGVpYVN0aWNreVNpZGViYXIoe1xuXHQgIGNvbnRhaW5lclNlbGVjdG9yOiAnLm1haW4tY29udGVudCcsXG4gICAgICBhZGRpdGlvbmFsTWFyZ2luVG9wOiAyMCxcbiAgICAgIGFkZGl0aW9uYWxNYXJnaW5Cb3R0b206IDIwXG4gICAgfSk7XG5cblx0JCgnLmxvZ2luLXRhcmdldCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdCQodGhpcylbMF0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG5cdFx0JCh0aGlzKS5zaWJsaW5ncygnLmxvZ2luJykuc2xpZGVUb2dnbGUodGltZV9zbG93KTtcblx0fSk7XG5cblx0JCgnLm5hdi1zaWRlYmFyLXRhcmdldCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdCQodGhpcylbMF0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG5cdFx0JCh0aGlzKS5zaWJsaW5ncygnLm5hdi1zaWRlYmFyJykuc2xpZGVUb2dnbGUodGltZV9zbG93KTtcblx0fSk7XG5cblx0JCgnLmZhcS1zaWRlYmFyIC5uYXYtc2lkZWJhcl9faXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR2YXIgc2VsZiA9ICQodGhpcyksXG5cdFx0XHRwYXJlbnQgPSBzZWxmLnBhcmVudHMoJy5mYXEtc2lkZWJhcicpO1xuXG5cdFx0aWYoIGRpc3BsYXlfd2lkdGggPCA5OTMgKXtcblx0XHRcdCQoJy5uYXYtc2lkZWJhci10YXJnZXQnKS50cmlnZ2VyKCdjbGljaycpO1xuXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHRcdCAgICAgICAgc2Nyb2xsVG9wOiAkKHNlbGYuZGF0YSgnZmFxJykpLm9mZnNldCgpLnRvcCAtIChkaXNwbGF5X3dpZHRoIDwgNDgwID8gMTMwIDogNjApXG5cdFx0XHQgICAgfSwgdGltZV9zbG93KTtcblx0XHRcdH0sIHRpbWVfc2xvdyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHQgICAgICAgIHNjcm9sbFRvcDogJChzZWxmLmRhdGEoJ2ZhcScpKS5vZmZzZXQoKS50b3AgLSA2MFxuXHRcdCAgICB9LCB0aW1lX3Nsb3cpO1xuXHRcdH1cblxuXHRcdHBhcmVudC5maW5kKCcubmF2LXNpZGViYXJfX2l0ZW0nKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHQkKHRoaXMpWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXHRcdH0pO1xuXG5cdFx0c2VsZlswXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblx0fSk7XG5cdFxuXHRcblx0JCgnLmxpbmstZmFrZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR2YXIgdGFyZ2V0X2xpbmsgPSAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpO1xuXG5cdFx0Ly8gd2luZG93LmxvY2F0aW9uLnJlcGxhY2UodGFyZ2V0X2xpbmspO1xuXHRcdHdpbmRvdy5vcGVuKHRhcmdldF9saW5rLCAnX2JsYW5rJyk7XG5cdH0pO1xuXG5cdCQoJy5saW5rLW1vcmUnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dmFyIHNlbGYgPSAkKHRoaXMpO1xuXHRcdFx0Y3VycmVudF9zdGF0ZSA9IHNlbGYuaHRtbCgpLFxuXHRcdFx0b3Blbl9zdGF0ZSA9IHNlbGYuZGF0YSgnb3BlbicpLFxuXHRcdFx0Y2xvc2Vfc3RhdGUgPSBzZWxmLmRhdGEoJ2Nsb3NlJyk7XG5cblx0XHRpZiggY3VycmVudF9zdGF0ZSA9PSBvcGVuX3N0YXRlICl7XG5cdFx0XHRzZWxmLmh0bWwoY2xvc2Vfc3RhdGUpO1xuXHRcdFx0c2VsZlswXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblx0XHRcdHNlbGYuc2libGluZ3MoJy5zZW8tZnVsbCcpLnNsaWRlRG93bih0aW1lX2Zhc3QpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzZWxmLmh0bWwob3Blbl9zdGF0ZSk7XG5cdFx0XHRzZWxmWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXHRcdFx0c2VsZi5zaWJsaW5ncygnLnNlby1mdWxsJykuc2xpZGVVcCh0aW1lX2Zhc3QpO1xuXG5cdFx0XHQkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG5cdCAgICAgICAgXHRzY3JvbGxUb3A6IHNlbGYucGFyZW50KCkub2Zmc2V0KCkudG9wIC0gMTIwXG5cdCAgIFx0XHR9LCB0aW1lX3Nsb3cpO1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gU2xpZGVyc1xuXHR2YXIgcHJpY2luZ19zbGlkZXIgPSBuZXcgU3dpcGVyKCcucHJpY2luZy1ncm91cCcsIHtcbiAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgcGFnaW5hdGlvbjogJy5wYWdpbmF0aW9uLXByaWNpbmcnLFxuICAgICAgICBwYWdpbmF0aW9uQ2xpY2thYmxlOiB0cnVlLFxuICAgICAgICBzaW11bGF0ZVRvdWNoOiBmYWxzZSxcbiAgICAgICAgYnJlYWtwb2ludHM6IHtcblx0XHQgICAgNTYwOiB7XG5cdFx0ICAgICBcdHNsaWRlc1BlclZpZXc6IDEsXG5cdFx0ICAgIH0sXG5cdFx0ICAgIDc2ODoge1xuXHRcdCAgICAgIFx0c2xpZGVzUGVyVmlldzogMixcblx0XHQgICAgfSxcblx0XHQgICAgOTkzOiB7XG5cdFx0ICAgICAgc2xpZGVzUGVyVmlldzogMyxcblx0XHQgICAgfSxcblx0XHQgICAgMTI3OToge1xuXHRcdCAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG5cdFx0ICAgIH1cblx0XHR9XG4gICAgfSk7XG5cblx0dmFyIHByaWNpbmdfc2xpZGVyX2Z1bGwgPSBuZXcgU3dpcGVyKCcucHJpY2luZy1yb3cnLCB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXG4gICAgICAgIHNwYWNlQmV0d2VlbjogMzAsXG4gICAgICAgIHBhZ2luYXRpb246ICcucGFnaW5hdGlvbi1wcmljaW5nJyxcbiAgICAgICAgcGFnaW5hdGlvbkNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgYnJlYWtwb2ludHM6IHtcblx0XHQgICAgNTYwOiB7XG5cdFx0ICAgICBcdHNsaWRlc1BlclZpZXc6IDEsXG5cdFx0ICAgIH0sXG5cdFx0ICAgIDc2ODoge1xuXHRc��    ��                    ���            Pn�    H��             ��     @       ��            dzogMyxcblx0XHQgICAgfVxuXHRcdH1cbiAgICB9KTtcblxuXHQvLyB2YXIgaGVyb19zbGlkZXIgPSBuZXcgU3dpcGVyKCcuaGVyby1zbGlkZXInLCB7XG4gICAvLyAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAvLyAgICAgIHBhZ2luYXRpb246ICcucGFnaW5hdGlvbi1oZXJvJyxcbiAgIC8vICAgICAgcGFnaW5hdGlvbkNsaWNrYWJsZTogdHJ1ZSxcbiAgIC8vICAgICAgYXV0b3BsYXk6IDUwMDAsXG4gICAvLyAgICAgIHNwZWVkOiA4NDAsXG4gICAvLyAgICAgIGxvb3A6IHRydWUsXG4gICAvLyAgICAgIHNpbXVsYXRlVG91Y2g6IGZhbHNlXG4gICAvLyAgfSk7XG5cbiAgICB2YXIgZmVhdHVyZV9zbGlkZXIgPSBuZXcgU3dpcGVyKCcuZmVhdHVyZS1zbGlkZXInLCB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgIGF1dG9wbGF5OiA1MDAwLFxuICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICBvblNsaWRlQ2hhbmdlU3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXHRpZihmZWF0dXJlX3NsaWRlcil7XG4gICAgICAgIFx0XHQkKCcudGFiLXBhZ2luYXRpb24gLnRhYl9faXRlbScpLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdCAgICBcdCQodGhpcylbMF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cdFx0XHQgICAgfSk7XG5cdFx0ICAgIFx0JCgnW2RhdGEtcmVmZXJlbmNlPVwiJyArIChmZWF0dXJlX3NsaWRlci5yZWFsSW5kZXggKyAxKSArICdcIl0nKS5wYXJlbnQoKVswXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgXHR9XG5cdFx0fVxuICAgIH0pO1xuICAgIFxuICAgICQoJy50YWItcGFnaW5hdGlvbiAudGFiX19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgXHRlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBcdHZhciByZWZlcmVuY2UgPSAkKHRoaXMpLmRhdGEoJ3JlZmVyZW5jZScpO1xuICAgIFx0ZmVhdHVyZV9zbGlkZXIuc2xpZGVUbyhyZWZlcmVuY2UpO1xuXG4gICAgXHQkKCcudGFiLXBhZ2luYXRpb24gLnRhYl9faXRlbScpLmVhY2goZnVuY3Rpb24oKXtcblx0ICAgIFx0JCh0aGlzKVswXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0ICAgIH0pO1xuICAgIFx0JCh0aGlzKS5wYXJlbnQoKVswXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9KTtcblxuXHR2YXIgbW9iaWxlX2ZlYXR1cmUgPSBuZXcgU3dpcGVyKCcubW9iaWxlLWZlYXR1cmUnLCB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICAgIHBhZ2luYXRpb246ICcucGFnaW5hdGlvbi1mZWF0dXJlJyxcbiAgICAgICAgcGFnaW5hdGlvbkNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgYnJlYWtwb2ludHM6IHtcblx0XHQgICAgNTYwOiB7XG5cdFx0ICAgICBcdHNsaWRlc1BlclZpZXc6IDEsXG5cdFx0ICAgIH1cblx0XHR9XG4gICAgfSk7XG5cblx0Ly8gR2xvYmFsIGNsaWNrIGRldGVjdGlvblxuXHQkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHQvLyBTZWxlY3Qgc2VhcmNoIGF1dG9mb2N1c1xuXHRcdGlmKCAkKGUudGFyZ2V0KS5wYXJlbnRzKCcuc2VsZWN0LXNlYXJjaCcpLmxlbmd0aCA+IDAgKXtcblx0XHRcdHZhciBzZWxmID0gJChlLnRhcmdldCksXG5cdFx0XHRcdHNlYXJjaF9faW5wdXQgPSBzZWxmLnBhcmVudHMoJy5zZWxlY3Qtc2VhcmNoJykuZmluZCgnLnNlYXJjaC1pbnB1dCcpO1xuXHRcdFx0c2VhcmNoX19pbnB1dC5mb2N1cygpO1xuXHRcdH1cblxuXHRcdGlmKCAhJChlLnRhcmdldCkucGFyZW50cygnLmluZm8tY2FsYy1ob2xkZXInKS5sZW5ndGggPiAwICYmICQoJy50b29sdGlwLXNpbmdsZScpLmxlbmd0aCA+IDApe1xuXHRcdFx0JCgnLnRvb2x0aXAtc2luZ2xlJylbMF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cdFx0fVxuXG5cdFx0aWYoICEkKGUudGFyZ2V0KS5wYXJlbnRzKCcudXNlcl9fY29udG9scycpLmxlbmd0aCA+IDAgJiYgJCgnLnVzZXJfX2NvbnRvbHMnKS5sZW5ndGggPiAwKXtcblx0XHRcdCQoJy51c2VyX19jb250b2xzJylbMF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cdFx0fVxuXG5cdFx0aWYoICEkKGUudGFyZ2V0KS5wYXJlbnRzKCcuY29udGFjdC1pbmZvLS1saW5lJykubGVuZ3RoID4gMCl7XG5cdFx0XHRpZigkKCcuY29udGFjdC1pbmZvX19jb250cm9sJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcblx0XHRcdFx0JCgnLmNvbnRhY3QtaW5mb19fY29udHJvbCcpLnRyaWdnZXIoJ2NsaWNrJyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYoICEkKGUudGFyZ2V0KS5wYXJlbnRzKCcubG9naW4nKS5sZW5ndGggPiAwKXtcblx0XHRcdGlmKCAkKCcubG9naW4nKS5oYXNDbGFzcygnYWN0aXZlJykgKXtcblx0XHRcdFx0JCgnLmxvZ2luJylbMF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQkKCcudG9vbHRpcC10cmlnZ2VyJykub24oJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcblx0XHRpZiggJCh0aGlzKS5maW5kKCcudG9vbHRpcCcpLmhhc0NsYXNzKCdhY3RpdmUnKSApe1xuXHRcdFx0JCh0aGlzKS5maW5kKCcudG9vbHRpcCcpWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgdG9vbHRpcCA9ICQodGhpcykuZmluZCgnLnRvb2x0aXAnKTtcblx0XHRcdHRvb2x0aXBbMF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cblx0XHRcdHZhciBib3R0b21fb2ZfZWxlbWVudCA9IHRvb2x0aXAub2Zmc2V0KCkudG9wICsgdG9vbHRpcC5vdXRlckhlaWdodCgpO1xuXHRcdFx0dmFyIGJvdHRvbV9vZl9zY3JlZW4gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyAkKHdpbmRvdykuaGVpZ2h0KCk7XG5cblx0XHRcdHZhciB0b3Bfb2ZfZWxlbWVudCA9IHRvb2x0aXAub2Zmc2V0KCkudG9wO1xuXHRcdFx0dmFyIHRvcF9vZl9zY3JlZW4gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cblx0XHRcdGlmKGJvdHRvbV9vZl9lbGVtZW50ID4gYm90dG9tX29mX3NjcmVlbil7XG5cdFx0XHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHRcdCAgICAgICAgc2Nyb2xsVG9wOiAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyAoYm90dG9tX29mX2VsZW1lbnQgLSBib3R0b21fb2Zfc2NyZWVuKVxuXHRcdFx0ICAgIH0sIHRpbWVfc2xvdyk7XG5cdFx0XHR9IFxuXG5cdFx0XHRpZih0b3Bfb2ZfZWxlbWVudCA8IHRvcF9vZl9zY3JlZW4pe1xuXHRcdFx0XHQkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG5cdFx0XHQgICAgICAgIHNjcm9sbFRvcDogJCh3aW5kb3cpLnNjcm9sbFRvcCgpIC0gdG9vbHRpcC5vdXRlckhlaWdodCgpXG5cdFx0XHQgICAgfSwgdGltZV9zbG93KTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdCQoJy5sb2dpbl9fdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciBzZWxmID0gJCh0aGlzKTtcblxuXHRcdGlmICggZGlzcGxheV93aWR0aCA8IDk5MyApe1xuXHRcdFx0JCh0aGlzKS5wYXJlbnQoKVswXS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcblx0XHR9XG5cdH0pO1xuXG5cdCQoZG9jdW1lbnQpLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG5cdFx0aWYoICEkKGUudGFyZ2V0KS5wYXJlbnRzKCcudG9vbHRpcC10cmlnZ2VyJykubGVuZ3RoID4gMCAmJiAkKCcudG9vbHRpcCcpLmxlbmd0aCA+IDApe1xuXHRcdFx0JCgnLnRvb2x0aXAnKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdCQodGhpcylbMF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpZiggISQoZS50YXJnZXQpLnBhcmVudHMoJy51c2VyX19jb250b2xzJykubGVuZ3RoID4gMCAmJiAkKCcudXNlcl9fY29udG9scycpLmxlbmd0aCA+IDApe1xuXHRcdFx0JCgnLnVzZXJfX2NvbnRvbHMnKVswXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0XHR9XG5cblx0XHRpZiggISQoZS50YXJnZXQpLnBhcmVudHMoJy5jb250YWN0LWluZm8tLWxpbmUnKS5sZW5ndGggPiAwKXtcblx0XHRcdGlmKCQoJy5jb250YWN0LWluZm9fX2NvbnRyb2wnKS5oYXNDbGFzcygnYWN0aXZlJykpe1xuXHRcdFx0XHQkKCcuY29udGFjdC1pbmZvX19jb250cm9sJykudHJpZ2dlcignY2xpY2snKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiggISQoZS50YXJnZXQpLnBhcmVudHMoJy5sb2dpbicpLmxlbmd0aCA+IDApe1xuXHRcdFx0aWYoICQoJy5sb2dpbicpLmhhc0NsYXNzKCdhY3RpdmUnKSApe1xuXHRcdFx0XHQkKCcubG9naW4nKVswXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdCQoZG9jdW1lbnQpLm9uKCdrZXlwcmVzcycsIGZ1bmN0aW9uKGUpIHtcblx0ICAgIGlmICggZS5rZXlDb2RlID09PSAxMyApe1xuICAgICAgICBcdGlmICggJCgnLm5leHQtc3RlcCcpLmxlbmd0aCA+IDAgKXtcbiAgICAgICAgXHRcdGlmICggJCgnLm5leHQtc3RlcCcpLmF0dHIoJ3R5cGUnKSA9PSAnc3VibWl0JyApe1xuICAgICAgICBcdFx0XHQkKCcubmV4dC1zdGVwJykudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgXHRcdH0gZWxzZSB7XG4gICAgICAgIFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKCQoJy5uZXh0LXN0ZXAnKS5hdHRyKCdocmVmJykpO1xuICAgICAgICBcdFx0fVxuICAgICAgICBcdFx0XG4gICAgICAgIFx0fVxuICAgICAgICB9XG5cdH0pO1xuXG5cdC8vIFNlbGVjdCB0YWIgYmVoYXZpb3Jcblx0JChkb2N1bWVudCkub24oJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG5cdCAgICBpZiAoIGUua2V5Q29kZSA9PT0gOSApe1xuXHQgICAgXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdCAgICBcdFx0dmFyICRmb2N1c2VkID0gJCgnOmZvY3VzJyksXG5cdCAgICBcdFx0XHQkdGFyZ2V0ID0gJGZvY3VzZWQuc2libGluZ3MoJy5jdXN0b20tc2VsZWN0LWJsb2NrJyk7XG5cblx0ICAgIFx0XHQkKCcuY3VzdG9tLXNlbGVjdC1ibG9jay5vcGVuJykuZmluZCgnLnZhbHVlLWZpZWxkJykudHJpZ2dlcignY2xpY2snKTtcblx0ICAgIFx0XHRpZiggJHRhcmdldC5sZW5ndGggPiAwICl7XG5cdCAgICBcdFx0XHQkdGFyZ2V0LmZpbmQoJy52YWx1ZS1maWVsZCcpLnRyaWdnZXIoJ2NsaWNrJyk7XHRcblx0ICAgIFx0XHR9XG5cblx0ICAgIFx0fSwgMTIwKTtcbiAgICAgICAgfVxuXHR9KTtcblxuXHQvLyBPbmxvYWQgcnVsZXNcblx0aWYgKCBkaXNwbGF5X3dpZHRoIDwgOTkzICl7XG5cdFx0JCgnLmxhbmcnKS5hcHBlbmRUbygnLmxhbmctbW9iaWxlJyk7XG5cblx0XHQkKCcuZmFzdC1jYWxjJykuYXBwZW5kVG8oJy5tb2JpbGUtY2FsYycpO1xuXG5cdFx0JCgnLnNlby10cmFuc2l0aW9uX19jb250ZW50JykucHJlcGVuZFRvKCcuc2VvLWZ1bGwnKTtcblx0fVxuXG5cdCQoJy5tb2RhbC1yZXNwJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0aWYgKCBkaXNwbGF5X3dpZHRoIDwgNzY4ICl7XG5cdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdH1cblx0fSk7XG5cblx0JCgnLmRldGFpbF9fY29udHJvbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdGlmICggZGlzcGxheV93aWR0aCA8IDc2OCApe1xuXHRcdFx0dmFyIHNlbGYgPSAkKHRoaXMpO1xuXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHRcdCAgICAgICAgc2Nyb2xsVG9wOiBzZWxmLnBhcmVudCgpLm9mZnNldCgpLnRvcCAtIChkaXNwbGF5X3dpZHRoIDwgNDgwID8gNzAgOiAwKVxuXHRcdFx0ICAgIH0sIHRpbWVfc2xvdyk7XG5cdFx0XHR9LCB0aW1lX3Nsb3cpO1xuXHRcdH1cblx0fSk7XG5cblx0JCgnLnBhc3MtY2hhbmdlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0aWYgKCBkaXNwbGF5X3dpZHRoIDwgNzY4ICl7XG5cdFx0XHR2YXIgc2VsZiA9ICQodGhpcyk7XG5cblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuXHRcdFx0ICAgICAgICBzY3JvbGxUb3A6IHNlbGYuc2libGluZ3MoJy5wYXNzd29yZC1mb3JtJykub2Zmc2V0KCkudG9wIC0gKGRpc3BsYXlfd2lkdGggPCA0ODAgPyA1MCA6IC0yMClcblx0XHRcdCAgICB9LCB0aW1lX3Nsb3cpO1xuXHRcdFx0fSwgdGltZV9zbG93KTtcblx0XHR9XG5cdH0pO1xuXG5cdCQoJy5jYWxjdWxhdG9yLWNvbmZpZywgLmNhbGN1bGF0b3JfX3N1Ym1pdCAuYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0aWYgKCBkaXNwbGF5X3dpZHRoIDwgOTkzICl7XG5cdFx0XHR2YXIgc2VsZiA9ICQodGhpcyk7XG5cblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuXHRcdFx0ICAgICAgICBzY3JvbGxUb3A6IHNlbGYucGFyZW50cygnLmNhbGN1bGF0b3InKS5vZmZzZXQoKS50b3AgLSA2NlxuXHRcdFx0ICAgIH0sIHRpbWVfc2xvdyk7XG5cdFx0XHR9LCB0aW1lX3Nsb3cgKyB0aW1lX2Zhc3QpO1xuXHRcdH1cblxuXHR9KTtcblxuXHQkKCcubnVtYmVyLWZpZWxkJykub24oJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbnVtYmVyX3ZhbHVlID0gJCh0aGlzKS52YWwoKS5yZXBsYWNlKC8gL2csJycpO1xuXHRcdCQodGhpcykudmFsKG51bWJlcl92YWx1ZSk7XG5cblx0ICBcdCQodGhpcykuYXR0cigndHlwZScsICdudW1iZXInKTtcblx0fSk7XG5cblx0JCgnLm51bWJlci1maWVsZCArIC5mb3JtX19sYWJlbCcpLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oKSB7XG5cdCAgJCh0aGlzKS5zaWJsaW5ncygnLm51bWJlci1maWVsZCcpLmF0dHIoJ3R5cGUnLCAnbnVtYmVyJyk7XG5cdH0pO1xuXG5cdCQoJy5udW1iZXItZmllbGQnKS5vbigna2V5ZG93biBibHVyJywgZnVuY3Rpb24oKSB7XG5cdCAgJCh0aGlzKS5hdHRyKCd0eXBlJywgJ3RleHQnKTtcblx0fSk7XG5cblx0Ly8gU2Nyb2xsIGV2ZW50c1xuXHQvLyBHbyB0b3AgbGlua1xuXHQvLyAkKFwiLnRvcC1zY3JvbGxcIikuaGlkZSgpO1xuICAvL1xuXHQvLyAkKCcudG9wLXNjcm9sbCcpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG5cdC8vIFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHQvLyAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7XG5cdC8vICAgICAgIHNjcm9sbFRvcDogMFxuXHQvLyAgICAgfSwgODAwKTtcblx0Ly8gICAgIHJldHVybiBmYWxzZTtcblx0Ly8gfSk7XG5cblxuXHR2YXIgdGltZXIsXG5cdFx0bGFzdF9zY3JvbGxfdmFsdWUgPSAwO1xuXG5cdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oZXZlbnQpe1xuXHRcdGlmICggdGltZXIgKSBjbGVhclRpbWVvdXQodGltZXIpO1xuXHRcdHZhciBzY3JvbGxfdmFsdWUgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xuXG5cdFx0dGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcblx0XHRcdC8vIFNjcm9sbCB0b3AgbGlua1xuXHRcdCAgICBpZiAoc2Nyb2xsX3ZhbHVlID4gMjAwKSB7XG5cdFx0ICAgICAgJCgnLnRvcC1zY3JvbGwnKS5mYWRlSW4oNTAwKTtcblx0XHQgICAgfSBlbHNlIHtcblx0XHQgICAgICAkKCcudG9wLXNjcm9sbCcpLmZhZGVPdXQoNTAwKTtcblx0XHQgICAgfVxuXHRcdCAgIFx0bGFzdF9zY3JvbGxfdmFsdWUgPSBzY3JvbGxfdmFsdWU7XG5cdCAgIFx0fSwgMzApOyAgIFxuXHR9KTtcblxuXG5cdCQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24oKXtcbiAgICBcdGRpc3BsYXlfd2lkdGggPSAkKHdpbmRvdykub3V0ZXJXaWR0aCgpO1xuXG4gICAgXHQvLyBEZXRlY3QgbmV3IGRpc3BsYXkgdHlwZVxuICAgIFx0aWYoIGRpc3BsYXlfd2lkdGggPj0gMTI4MCl7XG4gICAgXHRcdGRpc3BsYXlfdHlwZSA9ICdkZXNrJztcbiAgICBcdH0gZWxzZSBpZiggZGlzcGxheV93aWR0aCA+PSA5OTMgJiYgZGlzcGxheV93aWR0aCA8IDEyODApe1xuICAgIFx0XHRkaXNwbGF5X3R5cGUgPSAnbGFwdG9wJztcbiAgICBcdH0gZWxzZSBpZiggZGlzcGxheV93aWR0aCA+PSA3NjggJiYgZGlzcGxheV93aWR0aCA8IDk5Myl7XG4gICAgXHRcdGRpc3BsYXlfdHlwZSA9ICd0YWJsZXQnO1xuICAgIFx0fSBlbHNlIGlmKCBkaXNwbGF5X3dpZHRoIDwgNzY4KXtcbiAgICBcdFx0ZGlzcGxheV90eXBlID0gJ21vYmlsZSc7XG4gICAgXHR9XG5cbiAgICBcdC8vIFJlc3Bvc2l2ZSBiZWhhaW91clxuICAgIFx0aWYgKHByZXZpdXNfZGlzcGxheSAhPSBkaXNwbGF5X3R5cGUpIHtcbiAgICBcdFx0aWYoIGRpc3BsYXlfdHlwZSA9PSAndGFibGV0JyApe1xuICAgIFx0XHRcdCQoJy5sYW5nJykuYXBwZW5kVG8oJy5sYW5nLW1vYmlsZScpO1xuXG4gICAgXHRcdFx0JCgnLmZhc3QtY2FsYycpLmFwcGVuZFRvKCcubW9iaWxlLWNhbGMnKTtcblxuICAgIFx0XHRcdCQoJy5zZW8tdHJhbnNpdGlvbl9fY29udGVudCcpLnByZXBlbmRUbygnLnNlby1mdWxsJyk7XG4gICAgXHRcdH0gZWxzZSBpZiAoIGRpc3BsYXlfdHlwZSA9PSAnbGFwdG9wJyApIHtcbiAgICBcdFx0XHQkKCcubGFuZycpLmFwcGVuZFRvKCcubGFuZy1kZXNrdG9wJyk7XG5cbiAgICBcdFx0XHQkKCcuZmFzdC1jYWxjJykuYXBwZW5kVG8oJy5kZXNrdG9wLWNhbGMnKTtcblxuICAgIFx0XHRcdGlmKCAkKCcubmF2LXRvZ2dsZScpLmhhc0NsYXNzKCdhY3RpdmUnKSApe1xuICAgIFx0XHRcdFx0JCgnLm5hdi10b2dnbGUnKS50cmlnZ2VyKCdjbGljaycpO1xuICAgIFx0XHRcdH1cblxuICAgIFx0XHRcdCQoJy5zZW8tdHJhbnNpdGlvbl9fY29udGVudCcpLnByZXBlbmRUbygnLnNlby10cmFuc2l0aW9uJyk7XG4gICAgXHRcdH1cblx0XHR9XG5cblx0XHRpZiAocHJldml1c19kaXNwbGF5ICE9IGRpc3BsYXlfdHlwZSkge1xuICAgIFx0XHRpZiggZGlzcGxheV90eXBlID09ICdtb2JpbGUnICl7XG4gICAgXHRcdFx0aWYoICQoJy50YWItcGFuZS1sb2FkJykubGVuZ3RoID4gMCAmJiBkaXNwbGF5X3dpZHRoIDwgNzY4ICl7XG5cdFx0XHRcdFx0JCgnLnRhYi1wYW5lLWxvYWQnKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHQkKHRoaXMpWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ3RhYi1wYW5lLWxvYWQnKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoICQoJy5jb2xsYXBzZS1sb2FkJykubGVuZ3RoID4gMCAmJiBkaXNwbGF5X3dpZHRoIDwgNzY4ICl7XG5cdFx0XHRcdFx0JCgnLmNvbGxhcHNlLWxvYWQnKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHQkKHRoaXMpWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNlLWxvYWQnKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cbiAgICBcdFx0fVxuICAgIFx0fVxuXG5cdFx0Ly8gU2V0IHVwIGNvbXBhcmUgdmFsdWVcblx0XHRyZXR1cm4gcHJldml1c19kaXNwbGF5ID0gZGlzcGxheV90eXBlO1xuICAgIH0pO1xuXG4gICAgLy8gSW5pdCBjb3VudGRvd25cblx0JCgnLnRpbWVyJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHR2YXIgZW5kdGltZSxcblx0XHRcdCR0aGlzID0gJCh0aGlzKTsgXG5cblx0XHRpZiggJHRoaXMuaGFzQ2xhc3MoJ3RpbWVyLS1zaG9ydCcpKXtcblx0XHRcdGVuZHRpbWUgPSBhZGRNaW51dGVzKDUpO1xuXHRcdH0gZWxzZXtcblx0XHRcdGVuZHRpbWUgPSBhZGRNaW51dGVzKDE1KTtcblx0XHR9XG5cdFx0XG5cdFx0aW5pdGlhbGl6ZUNsb2NrKCR0aGlzLCBlbmR0aW1lKTtcblx0fSk7XG5cblx0JCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKXtcblx0XHRpZigkKCcjZG9jdW1lbnQtcGFnZScpLmxlbmd0aCA+IDApe1xuXHRcdFx0dmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiI1wiKTtcblx0XHRcdCQoXCIjXCIgKyB1cmxbMV0pLmZpbmQoJy5kb2N1bWVudC10b2dnbGUnKS50cmlnZ2VyKCdjbGljaycpO1xuXHRcdH1cblxuXHRcdGlmKCAkKCcudGFiLXBhbmUtbG9hZCcpLmxlbmd0aCA+IDAgJiYgZGlzcGxheV93aWR0aCA8IDc2OCApe1xuXHRcdFx0JCgnLnRhYi1wYW5lLWxvYWQnKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdCQodGhpcylbMF0uY2xhc3NMaXN0LnJlbW92ZSgndGFiLXBhbmUtbG9hZCcpXG5cdFx0XHR9KVxuXHRcdH1cblxuXHRcdGlmKCAkKCcuY29sbGFwc2UtbG9hZCcpLmxlbmd0aCA+IDAgJiYgZGlzcGxheV93aWR0aCA8IDc2OCApe1xuXHRcdFx0JCgnLmNvbGxhcHNlLWxvYWQnKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdCQodGhpcylbMF0uY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2UtbG9hZCcpXG5cdFx0XHR9KVxuXHRcdH1cblxuXHRcdGlmKCQoJy5zaWRlYmFyJykubGVuZ3RoID4gMCAmJiAkKCcuYm94JykubGVuZ3RoID4gMCl7XG5cdFx0XHR2YXIgc2lkZWJhciA9ICQoJy5zaWRlYmFyJykuaGVpZ2h0KCksXG5cdFx0XHRcdGJveCA9ICQoJy5ib3gnKS5oZWlnaHQoKTtcblxuXHRcdFx0aWYgKCBzaWRlYmFyID4gYm94ICkge1xuXHRcdFx0XHQkKCcuYm94JykuY3NzKCdtaW4taGVpZ2h0Jywgc2lkZWJhcik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0JCgnLnNlbGVjdCAuc2VhcmNoLWlucHV0Jykub24oJ2lucHV0JywgZnVuY3Rpb24oZXZlbnQpIHtcblx0ICAgIFx0dmFyIHNlbGYgPSAkKHRoaXMpXG5cdCAgICAgICAgXHRpbnB1dF92YWx1ZSA9IHNlbGYudmFsKCk7XG5cblx0ICAgICAgICB2YXIgd29yZHMgPSBpbnB1dF92YWx1ZS5zcGxpdCgnICcpLFxuXHQgICAgICAgIFx0cmVzdWx0ID0gW107XG5cblx0ICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7IGkrKyl7XG5cdCAgICAgICAgXHRyZXN1bHRbaV0gPSB3b3Jkc1tpXS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHdvcmRzW2ldLnN1YnN0cigxKTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBzZWxmLnZhbChyZXN1bHQuam9pbignICcpKTtcblx0ICAgIH0pO1xuXHRcdFxuXHR9KTtcbn0pO1xuXG4vLyBSZWNhcHRjaGEgc3VibWlzaW9uXG5mdW5jdGlvbiBvblN1Ym1pdCh0b2tlbil7XG5cdHZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtLXF1ZXN0aW9uXCIpO1xuXG5cdGlmKCBoYXNDbGFzcyhmb3JtLCAnZm9ybS0tdGFicycpICl7XG5cdFx0JChmb3JtdikucGFyZW50cygnLnRhYi1wYW5lJylbMF0uY2xhc3NMaXN0LmFkZCgnc3VibWl0LXN1Y2Nlc3MnKTtcblx0fVxuXG5cdC8vIGZvcm0uc3VibWl0KCk7XG59XG5cbmZ1bmN0aW9uIG9uU3VibWl0QWx0KHRva2VuKXtcblx0dmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm0tcXVlc3Rpb24tYWx0XCIpO1xuXG5cdGlmKCBoYXNDbGFzcyhmb3JtLCAnZm9ybS0tbW9kYWwnKSApe1xuXHRcdCQoZm9ybSkucGFyZW50cygnLm1vZGFsLWNvbnRlbnQnKVswXS5jbGFzc0xpc3QuYWRkKCdzdWJtaXQtc3VjY2VzcycpO1xuXHR9XG5cblx0Ly8gZm9ybS5zdWJtaXQoKTtcbn1cblxuLy8gQ291bnRkb3duXG5mdW5jdGlvbiBnZXRUaW1lUmVtYWluaW5nKGVuZHRpbWUpIHtcbiAgdmFyIHQgPSBEYXRlLnBhcnNlKGVuZHRpbWUpIC0gRGF0ZS5wYXJzZShuZXcgRGF0ZSgpKTtcbiAgdmFyIHNlY29uZHMgPSBNYXRoLmZsb29yKCh0IC8gMTAwMCkgJSA2MCk7XG4gIHZhciBtaW51dGVzID0gTWF0aC5mbG9vcigodCAvIDEwMDAgLyA2MCkgJSA2MCk7XG4gIHZhciBob3VycyA9IE1hdGguZmxvb3IoKHQgLyAoMTAwMCAqIDYwICogNjApKSAlIDI0KTtcbiAgdmFyIGRheXMgPSBNYXRoLmZsb29yKHQgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xuICByZXR1cm4ge1xuICAgICd0b3RhbCc6IHQsXG4gICAgJ2RheXMnOiBkYXlzLFxuICAgICdob3Vycyc6IGhvdXJzLFxuICAgICdtaW51dGVzJzogbWludXRlcyxcbiAgICAnc2Vjb25kcyc6IHNlY29uZHNcbiAgfTtcbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZUNsb2NrKGNsb2NrX2NsYXNzLCBlbmR0aW1lKSB7XG4gIHZhciBjbG9jayA9ICQoY2xvY2tfY2xhc3MpLFxuICBcdCAgZGF5c1NwYW4gPSBjbG9jay5maW5kKCcuZGF5cycpLFxuICBcdCAgaG91cnNTcGFuID0gY2xvY2suZmluZCgnLmhvdXJzJyksXG4gIFx0ICBtaW51dGVzU3BhbiA9IGNsb2NrLmZpbmQoJy5taW51dGVzJyksXG4gIFx0ICBzZWNvbmRzU3BhbiA9IGNsb2NrLmZpbmQoJy5zZWNvbmRzJyk7XG5cbiAgZnVuY3Rpb24gdXBkYXRlQ2xvY2soKSB7XG4gIFx0dmFyIHQgPSBnZXRUaW1lUmVtYWluaW5nKGVuZHRpbWUpO1xuXG4gIFx0ZGF5c1NwYW4uaHRtbCggdC5kYXlzICk7XG5cdGhvdXJzU3Bhbi5odG1sKCAoJzAnICsgdC5ob3Vycykuc2xpY2UoLTIpICk7XG5cdG1pbnV0ZXNTcGFuLmh0bWwoICgnMCcgKyB0Lm1pbnV0ZXMpLnNsaWNlKC0yKSApO1xuXHRzZWNvbmRzU3Bhbi5odG1sKCAoJzAnICsgdC5zZWNvbmRzKS5zbGljZSgtMikgKTsgXG4gICAgXG4gICAgaWYgKHQudG90YWwgPD0gMCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aW1laW50ZXJ2YWwpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUNsb2NrKCk7XG4gIHZhciB0aW1laW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh1cGRhdGVDbG9jaywgMTAwMCk7XG59XG5cbnZhciBvYmogPSBbe1xuICAgICRpdGVtOiAkKCcjcXVlc3Rpb24tYWxsJyksXG4gICAgJG1lbnVJdGVtOiAkKFwiYVtkYXRhLWZhcT0nI3F1ZXN0aW9uLWFsbCddXCIpLFxufSwge1xuICAgICRpdGVtOiAkKCcjcXVlc3Rpb24tZ2VuZXJhbCcpLFxuICAgICRtZW51SXRlbTogJChcImFbZGF0YS1mYXE9JyNxdWVzdGlvbi1nZW5lcmFsJ11cIiksXG59LCB7XG4gICAgJGl0ZW06ICQoJyNxdWVzdGlvbi1nZXQnKSxcbiAgICAkbWVudUl0ZW06ICQoXCJhW2RhdGEtZmFxPScjcXVlc3Rpb24tZ2V0J11cIiksXG59LCB7XG4gICAgJGl0ZW06ICQoJyNxdWVzdGlvbi1wYXknKSxcbiAgICAkbWVudUl0ZW06ICQoXCJhW2RhdGEtZmFxPScjcXVlc3Rpb24tcGF5J11cIiksXG59LCB7XG4gICAgJGl0ZW06ICQoJyNxdWVzdGlvbi1leGlzdCcpLFxuICAgICRtZW51SXRlbTogJChcImFbZGF0YS1mYXE9JyNxdWVzdGlvbi1leGlzdCddXCIpLFxufSwge1xuICAgICRpdGVtOiAkKCcjcXVlc3Rpb24tZGVjbGluZScpLFxuICAgICRtZW51SXRlbTogJChcImFbZGF0YS1mYXE9JyNxdWVzdGlvbi1kZWNsaW5lJ11cIiksXG59LCB7XG4gICAgJGl0ZW06ICQoJyNxdWVzdGlvbi1kZWxheScpLFxuICAgICRtZW51SXRlbTogJChcImFbZGF0YS1mYXE9JyNxdWVzdGlvbi1kZWxheSddXCIpLFxufSwge1xuICAgICRpdGVtOiAkKCcjcXVlc3Rpb24tbGsnKSxcbiAgICAkbWVudUl0ZW06ICQoXCJhW2RhdGEtZmFxPScjcXVlc3Rpb24tbGsnXVwiKSxcbn0sIHtcbiAgICAkaXRlbTogJCgnI3F1ZXN0aW9uLWJhbmsnKSxcbiAgICAkbWVudUl0ZW06ICQoXCJhW2RhdGEtZmFxPScjcXVlc3Rpb24tYmFuayddXCIpLFxufV1cblxuZnVuY3Rpb24gYWN0aXZhdG9yKG9iaikge1xuICAgIHZhciBpbmRleCA9IC0xLCB0aW1lcjtcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKGUpIHtcbiAgICBcdGlmICggdGltZXIgKSBjbGVhclRpbWVvdXQodGltZXIpO1xuXG4gICAgXHR0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0ICAgICAgICB2YXIgdG9wID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICB2YXIgaXRlbVRvVG9wID0gb2JqW2ldLiRpdGVtLm9mZnNldCgpLnRvcCAtIDEwMDtcblx0ICAgICAgICAgICAgaWYgKHRvcCA+IGl0ZW1Ub1RvcCkge1xuXHQgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfTtcblxuXHQgICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgb2JqW2ldLiRtZW51SXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJylcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBvYmpbaW5kZXhdLiRtZW51SXRlbS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdCAgICAgICAgfVxuICAgIFx0fSwgMjApO1xuICAgIH0pO1xufVxuXG4vLyBIZWxwZXJzIGZ1bmN0aW9uXG5mdW5jdGlvbiBoYXNDbGFzcyhlbGVtZW50LCBjbHMpIHtcbiAgICByZXR1cm4gKCcgJyArIGVsZW1lbnQuY2xhc3NOYW1lICsgJyAnKS5pbmRleE9mKCcgJyArIGNscyArICcgJykgPiAtMTtcbn1cblxuLy8gU2V0IHRpbWVcbmZ1bmN0aW9uIGFkZE1pbnV0ZXMobWludXRlcykge1xuICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLm5vdygpICsgbWludXRlcyo2MDAwMCk7XG59XG5cbmZ1bmN0aW9uIGFkZFNlY29uZHMoc2Vjb25kcykge1xuICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLm5vdygpICsgc2Vjb25kcyoxMDAwKTtcbn1cblxuLy8gUGFnZSBzbW9vdGggc2Nyb2xsXG5NYXRoLmVhc2VPdXRRdWFkID0gZnVuY3Rpb24gKHQsIGIsIGMsIGQpIHsgdCAvPSBkOyByZXR1cm4gLWMgKiB0Kih0LTIpICsgYjsgfTtcblxudmFyXG4gIGludGVydmFsLCAvLyBzY3JvbGwgaXMgYmVpbmcgZWFzZWRcbiAgbXVsdCA9IDAsIC8vIGhvdyBmYXN0IGRvIHdlIHNjcm9sbFxuICBkaXIgPSAwLCAvLyAxID0gc2Nyb2xsIGRvd24sIC0xID0gc2Nyb2xsIHVwXG4gIHN0ZXBzID0gNzAsIC8vIGhvdyBtYW55IHN0ZXBzIGluIGFuaW1hdGlvblxuICBsZW5ndGggPSA0MDsgLy8gaG93IGxvbmcgdG8gYW5pbWF0ZVxuZnVuY3Rpb24gTW91c2VXaGVlbEhhbmRsZXIoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgZGVmYXVsdCBicm93c2VyIHNjcm9sbFxuICBjbGVhckludGVydmFsKGludGVydmFsKTsgLy8gY2FuY2VsIHByZXZpb3VzIGFuaW1hdGlvblxuICArK211bHQ7IC8vIHdlIGFyZSBnb2luZyB0byBzY3JvbGwgZmFzdGVyXG4gIHZhciBkZWx0YSA9IC1NYXRoLm1heCgtMSwgTWF0aC5taW4oMSwgKGUud2hlZWxEZWx0YSB8fCAtZS5kZXRhaWwpKSk7IC8vIGNyb3NzLWJyb3dzZXJcbiAgaWYoZGlyIT1kZWx0YSkgeyAvLyBzY3JvbGwgZGlyZWN0aW9uIGNoYW5nZWRcbiAgICBtdWx0ID0gMTsgLy8gc3RhcnQgc2xvd2x5XG4gICAgZGlyID0gZGVsdGE7XG4gIH1cbiAgLy8gaW4gdGhpcyBjeWNsZSwgd2UgZGV0ZXJtaW5lIHdoaWNoIGVsZW1lbnQgdG8gc2Nyb2xsXG4gIGZvcih2YXIgdGd0PWUudGFyZ2V0OyB0Z3QhPWRvY3VtZW50LmRvY3VtZW50RWxlbWVudDsgdGd0PXRndC5wYXJlbnROb2RlKSB7XG4gICAgdmFyIG9sZFNjcm9sbCA9IHRndC5zY3JvbGxUb3A7XG4gICAgdGd0LnNjcm9sbFRvcCs9IGRlbHRhO1xuICAgIGlmKG9sZFNjcm9sbCE9dGd0LnNjcm9sbFRvcCkgYnJlYWs7XG4gICAgLy8gZWxzZSB0aGUgZWxlbWVudCBjYW4ndCBiZSBzY3JvbGxlZCwgdHJ5IGl0cyBwYXJlbnQgaW4gbmV4dCBpdGVyYXRpb25cbiAgfVxuICB2YXIgc3RhcnQgPSB0Z3Quc2Nyb2xsVG9wO1xuICB2YXIgZW5kID0gc3RhcnQgKyBsZW5ndGgqbXVsdCpkZWx0YTsgLy8gd2hlcmUgdG8gZW5kIHRoZSBzY3JvbGxcbiAgdmFyIGNoYW5nZSA9IGVuZCAtIHN0YXJ0OyAvLyBiYXNlIGNoYW5nZSBpbiBvbmUgc3RlcFxuICB2YXIgc3RlcCA9IDA7IC8vIGN1cnJlbnQgc3RlcFxuICBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgIHZhciBwb3MgPSBNYXRoLmVhc2VPdXRRdWFkKHN0ZXArKyxzdGFydCxjaGFuZ2Usc3RlcHMpOyAvLyBjYWxjdWxhdGUgbmV4dCBzdGVwXG4gICAgdGd0LnNjcm9sbFRvcCA9IHBvczsgLy8gc2Nyb2xsIHRoZSB0YXJnZXQgdG8gbmV4dCBzdGVwXG4gICAgaWYoc3RlcD49c3RlcHMpIHsgLy8gc2Nyb2xsIGZpbmlzaGVkIHdpdGhvdXQgc3BlZWQgdXAgLSBzdG9wIGFuaW1hdGlvblxuICAgICAgbXVsdCA9IDA7IC8vIG5leHQgc2Nyb2xsIHdpbGwgc3RhcnQgc2xvd2x5XG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICB9XG4gIH0sMTApO1xufVxuXG4vLyBub25zdGFuZGFyZDogQ2hyb21lLCBJRSwgT3BlcmEsIFNhZmFyaVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXdoZWVsXCIsIE1vdXNlV2hlZWxIYW5kbGVyLCBmYWxzZSk7IFxuLy8gbm9uc3RhbmRhcmQ6IEZpcmVmb3hcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NTW91c2VTY3JvbGxcIiwgTW91c2VXaGVlbEhhbmRsZXIsIGZhbHNlKTsiXSwiZmlsZSI6ImFwcC5qcyJ9
