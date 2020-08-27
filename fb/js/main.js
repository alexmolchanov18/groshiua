$(function(){

    	$(function(){
    		$('.slider-1').slider({
			  animate: 600,
			  max: 15000,
			  min: 500,
			  step:100,
			  slide: function(event, ui) {    
			    $('.amount_slider').text( ui.value );
			    $(ui.value).val($('.amount_slider').text());
			    // $(function() {
			    //     calculate();
			    // });
			    var $Handle = $('.slider-1').find('.ui-slider-handle');
			    $Handle.css('margin-left', -1 * $Handle.width() * ($('.slider-1').slider('value') / $('.slider-1').slider('option', 'max')));
			  }
			});
			$('.amount_slider').change(function() {
			    $('.slider-1').slider("value" , $(this).val())
			});
			$('.slider-2').slider({
			  animate: 600,
			  max: 15,
			  min:5,
			  step: 1,
			  slide: function(event, ui) {    
			    $('.days_amount').text( ui.value );
			    $(ui.value).val($('.days_amount').text());
			    var $Handle = $('.slider-2').find('.ui-slider-handle');
			    $Handle.css('margin-left', -1 * $Handle.width() * ($('.slider-2').slider('value') / $('.slider-2').slider('option', 'max')));
			  }
			});
			$('.cpc').change(function() {
			    $('.slider-2').slider("value" , $(this).val())
			});

    });

     $(".phone").mask("+38 (099) 999-99-99");
     $(".phone").keyup(function(){
    		let lnph = $(".phone").val().length;
    		//console.log(lnph)
    		if(lnph == 19){
                $(".submit_button").prop("disabled","false");
                $(".submit_button").removeAttr("disabled");
                $(".submit_button").text("Отправить");
            }else{
                $(".submit_button").prop("disabled","true");
                $(".submit_button").text("Введите данные");
            }
    	});
});
