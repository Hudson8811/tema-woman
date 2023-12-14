jQuery(function () { 
    new Skroll()
    .add(".love-spb__desc", {
        animation: "fadeInUp",
        delay: 200,
        duration: 750
    })
    .add(".spb-slider__section", {
        animation: "fadeInUp",
        delay: 200,
        duration: 750
    })
    .add(".rules__top", {
        animation: "fadeInUp",
        delay: 200,
        duration: 750
    })
    .add(".rules__top", {
        animation: "fadeInUp",
        delay: 200,
        duration: 750
    })
    .add(".rules__list", {
        animation: "fadeInUp",
        delay: 200,
        duration: 750
    })
    .add(".rules-prisez", {
        animation: "fadeInUp",
        delay: 200,
        duration: 750
    })
    .add(".rules-prisez", {
        animation: "fadeInUp",
        delay: 200,
        duration: 750
    })
    .add(".promo-code", {
        animation: "fadeInUp",
        delay: 200,
        duration: 750
    })
    .add(".promo-code__desc", {
        animation: "fadeInUp",
        delay: 200,
        duration: 750
    })
    .add(".postcard__section", {
        animation: "fadeInUp",
        delay: 200,
        duration: 750
    })
    .add(".gallery__section", {
        animation: "fadeInUp",
        delay: 200,
        duration: 750
    })

    .init();

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
		postcardSlider = new Swiper(slider[0], {
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


	var gallerySlider
	$('.js-gallery__slider').each(function(){
		var slider=$(this)
		gallerySlider = new Swiper(slider[0], {
			// watchOverflow: true,
			// watchSlidesVisibility: true,
			// watchSlidesProgress: true,
			// preventInteractionOnTransition: true,
			// loop: true,
			spaceBetween: 0,
			slidesPerView: 1,
            breakpoints: {
                698: {
                  slidesPerView: 3,
                  spaceBetween: 33
                },
            },
			navigation: {
				nextEl: ".gallery-button-next",
				prevEl: ".gallery-button-prev"
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

	let message = document.getElementById("js-contacts__form__textarea");

	var allowAjax = true;
	$(document).on('click', '.js-send-text', function () {
	    event.preventDefault();
	    let btn = $(this);
        let msg = $('#js-contacts__form__textarea').val();
        if (msg.trim() !== '' && allowAjax) {
            if (postcardSlider instanceof Swiper) {
                let activeSlideIndex = postcardSlider.activeIndex;
                allowAjax = false;
                $.ajax({
                    url: '/save_collage/',
                    type: 'POST',
                    data: {
                        postcard: activeSlideIndex,
                        text: msg
                    },
                    beforeSend: function(xhr) {
                        btn.attr('disabled',true);
                    },
                    success: function(response) {
                        try {
                            let parsedResponse = JSON.parse(response);
                            if (parsedResponse.hasOwnProperty('link')){
                                let imageLink = parsedResponse.link;
                                $('.js-image-download').attr('href', imageLink);
                                $('.js-link-input').val(imageLink);
                                $('.postcard__inter__btns--1').remove();
                                $('.postcard__inter__btns--2').addClass('active');
                                $('#js-contacts__form__textarea').attr('disabled', true);

                                postcardSlider.removeAllSlides();
                                postcardSlider.appendSlide('<div class="postcard__slide swiper-slide js-postcard__theme"><img src="'+imageLink+'" alt=""></div>');
                                postcardSlider.update();
                            }

                        } catch (error) {
                            console.log('Response is not valid JSON');
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log('Error:', errorThrown);
                    },
                    complete: function() {
                        btn.attr('disabled', false);
                        allowAjax = true;
                    }
                });
            }
        } else {
            $('#js-contacts__form__textarea').focus().addClass('error').parent().addClass('error');
        }
	});

	$(document).on('change keyup paste','#js-contacts__form__textarea',function (){
        $('#js-contacts__form__textarea').removeClass('error').parent().removeClass('error');
    });


	$(document).on('change keyup','.modal__input input',function (){
        let value = $(this).val();
        if (value !== '') {
            $(this).parent().addClass('active');
        } else {
            $(this).parent().removeClass('active');
        }
    });

    $(document).on('submit', '.modal__form', function () {
        event.preventDefault();
        let image = $(this).find('input[name=image]').val().trim();
        let email = $(this).find('input[name=email]').val().trim();
        let name = $(this).find('input[name=name]').val().trim();
        if (image !== '' && email !== '' && name !== '' && allowAjax){
            allowAjax = false;
            let btn = $(this).find('button[type=submit]');
            $.ajax({
                url: '/save_user/',
                type: 'POST',
                data: {
                    name: name,
                    email: email,
                    image: image
                },
                beforeSend: function(xhr) {
                    btn.attr('disabled',true);
                },
                success: function(response) {
                    try {
                        let isError = false;
                        let parsedResponse = JSON.parse(response);
                        if (parsedResponse.hasOwnProperty('error')){
                            let error = parsedResponse.error;
                            if (error !== ''){
                                isError = true;
                                $('.modal__error').text(error).show();
                            }
                        }
                        if (!isError){
                            $('.modal__inner').remove();
                            $('.modal__thanks').show();
                        }
                    } catch (error) {
                        console.log('Response is not valid JSON');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Error:', errorThrown);
                },
                complete: function() {
                    btn.attr('disabled', false);
                    allowAjax = true;
                }
            });
        } else {
            $('.modal__error').text('Заполнены не все поля').show();
        }
    });


	
	
});
