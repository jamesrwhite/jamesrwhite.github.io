$(document).ready(function() {

	'use strict';

	// Detecting Base64 Encoded Image Support
	(function() {

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

	}());

	function supports_local_storage() {

		try {

			return window['localStorage'] !== undefined;

		} catch (e) {

			return false;

		}

	}

	function get_random_index(array_length) {

		return Math.round(Math.random() * (array_length - 1));

	}

	function randomise_background() {

		var background_colours = [
				'rgb(86, 56, 163)', // Purple
				'rgb(162, 43, 43)', // Red
				'rgb(56, 82, 163)' // Blue
			],
			$body = $('body'),
			random_index;

		// Is localStorage supported by the client?
		if (supports_local_storage()) {

			var local_storage = window.localStorage;

			// If they don't have a value stored, we can just pick a random one
			if (localStorage['background-colour'] === undefined) {

				random_index = get_random_index(background_colours.length);

			// If they do have one stored we need to check we aren't showing the same
			// colour twice!
			} else {

				do {

					random_index = get_random_index(background_colours.length);

				} while (random_index == localStorage['background-colour']);

			}

			// Store the value for next time
			localStorage['background-colour'] = random_index;

		// If they don't support localStorage just pick a random colour and hope for
		// the best!
		} else {

			random_index = get_random_index(background_colour.length);

		}

		// Set the random background colour
		$body.animate({
			'background-color': background_colours[random_index]
		}, 1500);

		// Fade out and hide the overlay
		$('#overlay').fadeOut(1500, function() {

			$(this).css({
				zIndex: -1,
				display: 'none'
			});

		});

	}

	// Run on page load
	randomise_background();

});