$(document).ready(function() {

	'use strict';

	// Detecting Base64 Encoded Image Support
	var img = new Image;

	img.onload = img.onerror = function() {
		
		if (img.width !== 1 || img.height !== 1) {

			$('body img').attr('src', function(index, attr) {

				return $(this).attr('data-fallback-src');

			});

		} else {

			document.body.classname += ' no-base64';

		}

	};

	// Test image to try and load
	img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

	// Handling the background colour
	var $body = $('body'),
		hue = Math.round(Math.random() * 359),
		saturation = '39%',
		lightness = '34%';

	// Helper to return an incremented HSL value
	function getColour() {

		hue++;
		return 'hsl(' + hue + ', ' + saturation + ', ' + lightness + ')';

	}

	// Set the random background colour
	$body.animate({
		'background-color': getColour()
	}, 3000);

	// Fade out the overlay
	$('#overlay').fadeOut(3000, function() {

		// Remove it from the layout completely
		$(this).css({
			zIndex: -1,
			display: 'none'
		});

		// Recursive function to animate background colour
		function animateColour() {

			$body.animate({
				'background-color': getColour()
			}, 100, animateColour);

		}

		animateColour();

	});

	// Hacky way to handle scrolling between sections, should really improve this
	$('#main-nav li').on('click', function(e) {

		var $a = $(this).find('> a');

		// Ignore the mailto link
		if ($a.data('scroll') == true) {

			e.preventDefault();

			var target = $a.attr('href');
			var offsets = {
				'#about': 0,
				'#projects': $('#scroll-container').find('> #about').height(),
				'#experiments': $('#scroll-container').find('> #about').height() + $('#scroll-container').find('> #projects').height()
			};

			$('#scroll-container').animate({marginTop: '-' + offsets[target] + 'px'}, 500);

			return false;

		}

	});

});