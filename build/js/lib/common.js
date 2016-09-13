/* Common JS */
$(document).ready(function(){

	//for IE9
	svg4everybody();

	$.validate({
		form: '.form'
	});

	// Clear placeholder
	(function() {
		var el = $('input, textarea');
		el.focus(function(){
			$(this).data('placeholder',$(this).attr('placeholder'));
			$(this).attr('placeholder','');
		});
		el.blur(function(){
			$(this).attr('placeholder',$(this).data('placeholder'));
		});
	}());

	(function () {
		var btn = $('.js-play'),
			video = $('.js-video');

		if (btn.length) {
			btn.on('click', function () {
				if (!$(this).hasClass('is-active')) {
					$(this).addClass('is-active');
					$(this).css('opacity', '0.2').siblings(video).get(0).play();
				} else {
					$(this).removeClass('is-active');
					$(this).css('opacity', '1').siblings(video).get(0).pause();
				}
			});
		}
	})();

	(function () {
		var searchBtn = $('.js-search-btn'),
			searchInput = $('.js-search-input'),
			nextBtn = $('.js-next-btn');

		searchBtn.on('click', function () {
			searchInput.fadeToggle();
		});

		nextBtn.on('click', function () {
			$('html, body').animate({scrollTop: $(window).height()}, 500);
		});
	})();

	(function () {

		var sliderFor = $('.js-slider-for'),
			sliderForItem = sliderFor.children(),
			sliderControls = $('.js-slider-controls'),
			sliderPrev = sliderControls.children().eq(0),
			sliderNext = sliderControls.children().eq(1),
			sliderNav = $('.js-slider-nav'),
			sliderText = $('.js-slider-text'),
			sliderTextHeight = 0,
			currentHeight,
			animationDuration = 1000,
			sliderWidth = $('.slider__item').outerWidth();

		$(window).on('resize', function () {
			sliderWidth = $('.slider__item').outerWidth();
		});

		if (sliderForItem.filter('.is-active').is(':first-child')) {
			sliderPrev.addClass('is-disabled');
		}

		$(window).load(function () {
			sliderText.children().each(function () {
				currentHeight = $(this).outerHeight();
				if (currentHeight > sliderTextHeight) {
					sliderTextHeight = currentHeight;
				}
			});
			sliderText.css('height', sliderTextHeight).children().css('display', 'none');
			sliderText.children().eq(0).css('display', 'block');
		});

		sliderNextInit();
		sliderPrevInit();

		function sliderPrevInit() {
			sliderPrev.on('click', function () {
				if ($(this).hasClass('is-disabled')) return false;

				var sliderIndex = sliderForItem.filter('.is-active').prev().index();

				sliderNav.children().removeClass('is-active').eq(sliderIndex).addClass('is-active');
				sliderText.children().filter('.is-active').removeClass('is-active').fadeOut(animationDuration/2, function () {
					$(this).prev().addClass('is-active').fadeIn(animationDuration/2);
				});

				sliderPrev.unbind();
				sliderNext.unbind();

				animatePrev();
			});
		}

		function sliderNextInit() {
			sliderNext.on('click', function () {
				if ($(this).hasClass('is-disabled')) return false;

				var sliderIndex = sliderForItem.filter('.is-active').next().index();

				sliderNav.children().removeClass('is-active').eq(sliderIndex).addClass('is-active');
				sliderText.children().filter('.is-active').removeClass('is-active').fadeOut(animationDuration/2, function () {
					$(this).next().addClass('is-active').fadeIn(animationDuration/2);
				});

				sliderNext.unbind();
				sliderPrev.unbind();

				animateNext();
			});
		}

		function animatePrev() {
			sliderForItem.filter('.is-active').removeClass('is-active').prev().addClass('is-active').animate({width: sliderWidth}, animationDuration, function () {
				$(this).animate({opacity: 1});
				if (sliderForItem.filter('.is-active').is(':first-child')) {
					sliderPrev.addClass('is-disabled');
				} else {
					sliderPrev.removeClass('is-disabled');
				}
				if (sliderForItem.filter('.is-active').is(':last-child')) {
					sliderNext.addClass('is-disabled');
				} else {
					sliderNext.removeClass('is-disabled');
				}
				sliderPrevInit();
				sliderNextInit();
			});
		}

		function animateNext() {
			sliderForItem.filter('.is-active').animate({opacity: 0}, animationDuration/2, function () {
				$(this).next().addClass('is-active');
				$(this).animate({width: 0}, animationDuration, function () {
					$(this).removeClass('is-active');
					if (sliderForItem.filter('.is-active').is(':first-child')) {
						sliderPrev.addClass('is-disabled');
					} else {
						sliderPrev.removeClass('is-disabled');
					}
					if (sliderForItem.filter('.is-active').is(':last-child')) {
						sliderNext.addClass('is-disabled');
					} else {
						sliderNext.removeClass('is-disabled');
					}
					sliderNextInit();
					sliderPrevInit();
				});
			});
		}

	})();

});