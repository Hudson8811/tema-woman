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

	$(document).on('click', '.postcard__inter__btn', function () {
	    let btn = $(this);
        let msg = $('#js-contacts__form__textarea').val();
        if (postcardSlider instanceof Swiper) {
            let activeSlideIndex = postcardSlider.activeIndex;

            //ТЕСТОВЫЙ
           /* $.ajax({
                url: '/documents/text.html',
                type: 'GET',
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
                            let a = $('<a>').attr('href', imageLink).attr('download', imageLink.substring(imageLink.lastIndexOf('/') + 1));
                            $('body').append(a);
                            a[0].click();
                            a.remove();
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
                }
            });*/

            //БОЕВОЙ
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
                            let a = $('<a>').attr('href', imageLink).attr('download', imageLink.substring(imageLink.lastIndexOf('/') + 1));
                            $('body').append(a);
                            a[0].click();
                            a.remove();
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
                }
            });
        }



	});
	
	
});
