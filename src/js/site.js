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

	// Loading animation
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
}();