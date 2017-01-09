!function() {
	// Web Font Loader
	WebFont.load({
		google: {
			families: ['Open Sans:400']
		}
	});

	// Unveil
	$('.card__image, .logo, .lazy').unveil(550, function() {
		$(this).css('opacity', 1);

	});

	// menu
	$('#js-menu-toggle').click(function() {
   	$(this).toggleClass('active');
   	$('#js-menu-overlay').toggleClass('open');
  });

	$('#js-menu-overlay a').bind('click touch', function() {
		$('#js-menu-overlay').toggleClass('open');
		$('#js-menu-toggle').toggleClass('active');
	});

	//navbar
	$(window).on('load scroll resize', function() {
    var scrollPos = $(window).scrollTop(),
        navbar = $('.navbar-default');

		var pos = $('.band--business').offset().top;
    if (scrollPos > pos - navbar.outerHeight()) {
      navbar.addClass('navbar-scroll');
    } else {
      navbar.removeClass('navbar-scroll');
    }
  });

	// Scroll to top
	$('[data-plugin="scrollTo"]').on('click touch', function(e) {
		e.preventDefault();
		var href= $(this).attr('href'),
				navbar = $('.navbar-default');

		if( href != 0) {
			$("html, body").animate({ scrollTop: $(href).offset().top - navbar.outerHeight() }, 1000);
		} else {
			$("html, body").animate({ scrollTop: 0 }, 1000);
		}
	});

	// Homepage Carousel
	$('.carousel').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 300,
		fade: true,
		cssEase: 'linear',
		dots: true,
		arrows: false,
		lazyload: 'ondemand',
		autoplay: true,
		autoplaySpeed: 3000,
		centerMode: true,
		pauseOnHover: false,
		pauseOnDotsHover: true
	});

	$(".animsition").animsition({
		inClass: 'fade-in',
		outClass: 'fade-out',
		inDuration: 1500,
		outDuration: 800,
		loading: true,
		loadingParentElement: 'body',
		loadingClass: 'animsition-loading',
		loadingInner: '<div class="loader"></div>',
		overlay : false,
    overlayClass : 'animsition-overlay-slide',
    overlayParentElement : 'body',
	});

	//
	$('.js-play-btn').magnificPopup({

		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});

	$('.js-newsletter-form').magnificPopup({
		type: 'inline',
		preloader: false,
		removalDelay: 300,
		mainClass: 'modal--zoom-in',
	});

	$('.js-newsletter-form').on('mfpOpen', function(e) {
		$('.modal__progress--inner').animate({width: '50%'}, 500);
	});

	$('.modal__button--back, .modal__close').bind('click touch', function() {
		$.magnificPopup.close();
	});

	$('.form').submit(function(e) {
		e.preventDefault();
		var postdata = $('.form').serialize();

		$.ajax({
			type: 'POST',
			url: window.location.protocol + '//' + window.location.host + '/assets/lib/mailchimp/submit.php',
			data: postdata,
			dataType: 'json',
			success: function(json) {
				if(json.valid == 0) {
					$('.error-message').hide();
					$('.error-message').html(json.message);
					$('.error-message').fadeIn('fast', function(){});
					$('#js-email').addClass('modal__input--error');
				}
				else {
					$('.error-message').hide();
					$('.form__content').fadeOut(function() {
						$('.form__success').fadeIn();
					});
					$('.modal__progress--inner').animate({width: '100%'}, 500);
					$('.modal__button').text('← BACK TO SITE').addClass('modal__button--back');
					$('.modal__button--back').bind('click touch', function() {
						$.magnificPopup.close();
					});
					$('.js-newsletter-form').hide();
				}
			}
		});
	});

}();
