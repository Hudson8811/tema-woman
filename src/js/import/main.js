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

	let postcardNum = document.querySelector(".js-postcard__theme.swiper-slide-active");
	let message = document.getElementById("js-contacts__form__textarea");
	let postcardLink = document.getElementById("js-download");
	let messageValue;
	let interBtn = document.querySelector(".postcard__inter__btn");
	
	message.addEventListener('input', function handleChange(event) {
		messageValue = event.target.value;
	});
	interBtn.addEventListener('click', ()=> {
		console.log(postcardLink)
		// postcardLink.href = messageValue;
		// postcardLink.appendChild(messageValue);
		$.ajax({
			type: "POST",
			url: "http://localhost:4000/documents/text.json",
			data: { postcard : postcardNum, text: messageValue, link: ""},
			success: function(data) {
				// alert(data);
				// console.log(postcardLink)
					//ответ от сервера
					var parse = JSON.parse(data);
					var linkValue = parse.link;

					// console.log(postcardLink)
					if (linkValue != '' && linkValue != undefined){
						postcardLink.href = linkValue;
						postcardLink.click();
					}
			}
		});
		// $.ajax({
		// 	type: "get",
		// 	url: "http://localhost:4000/documents/text.json",
		// 	data: { postcard : postcardNum, text: messageValue, link: ""},
		// 	success: function(data) {
		// 		// alert(data);
		// 		// console.log(postcardLink)
		// 			//ответ от сервера
		// 			var parse = JSON.parse(data);
		// 			var linkValue = parse.link;

		// 			// console.log(postcardLink)
		// 			if (linkValue != '' && linkValue != undefined){
		// 				postcardLink.href = linkValue;
		// 				postcardLink.click();
		// 			}
		// 	}
		// });

	})
	
	
});
