jQuery(function () { 

	var clientsSlider
	$('.js-clients__slider').each(function(){
		var slider=$(this)
		var clientsSlider = new Swiper(slider[0], {
			// watchOverflow: true,
			// watchSlidesVisibility: true,
			// watchSlidesProgress: true,
			// preventInteractionOnTransition: true,
			// loop: true,
			spaceBetween: 30,
			slidesPerView: 1,
			navigation: {
				nextEl: ".clients-button-next",
				prevEl: ".clients-button-prev"
			},
		});
	
	})
	var postcardSlider
	$('.js-postcard__slider').each(function(){
		var slider=$(this)
		var postcardSlider = new Swiper(slider[0], {
			// watchOverflow: true,
			// watchSlidesVisibility: true,
			// watchSlidesProgress: true,
			// preventInteractionOnTransition: true,
			// loop: true,
			spaceBetween: 30,
			slidesPerView: 1,
			navigation: {
				nextEl: ".postcard-button-next",
				prevEl: ".postcard-button-prev"
			},
		});
	
	})

	var partnersSlider
	$('.js-partners__slider').each(function(){
		var slider=$(this)
		var partnersSlider = new Swiper(slider[0], {
			spaceBetween: 79,
			speed: 10000,
			freeMode: true,
			loop: true,
			pagination: false,
			// centeredSlides: true,
			slidesPerView: 'auto',
			// setWrapperSize: true,
			allowTouchMove: false,
			autoplay: {
				delay: 0,
				// reverseDirection: true,
				disableOnInteraction: false,
			},	
		});

	})

	$('.contacts__form__textarea').on('input', function (e) {
		var state = e.target.value;
		if (state.length > 0) {
			$(this).addClass( "value" );
		} else {
			$(this).removeClass( "value" );
		}
	});


});
