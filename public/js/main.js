$(window).load(function() {

	function supports_local_storage() {

		try {

			return 'localStorage' in window && window['localStorage'] !== null;

		} catch (e) {

			return false;

		}

	}

	function get_random_index(array_length) {

		return Math.round(Math.random() * (array_length - 1));

	}

	function randomise_background() {

		var background_colours = [
				"#447C2B",	// Green
				"#702F92",	// Purple
				"#2C96AF",	// Turquiose
				"#AA2F34",	// Red
				"#2D44AA"	// Blue
			],
			$body = $("body"),
			random_index;

		// Is localStorage supported by the client?
		if (supports_local_storage()) {

			var local_storage = window.localStorage;

			// If they don't have a value stored, we can just pick a random one
			if (localStorage["background_colour"] === undefined) {

				random_index = get_random_index(background_colours.length);

			// If they do have one stored we need to check we aren't showing the same
			// colour twice!
			} else {

				do {

					random_index = get_random_index(background_colours.length);

				} while (random_index == localStorage["background_colour"]);

			}

			// Store the value for next time
			localStorage["background_colour"] = random_index;

		// If they don't support localStorage just pick a random colour and hope for
		// the best!
		} else {

			random_index = get_random_index(background_colour.length);

		}

		// Set the random background colour
		$body.animate({
			"background-color": background_colours[random_index]
		}, 1500);

		// Fade out and hide the overlay
		$("#overlay").fadeOut(1500, function() {

			$(this).css({
				zIndex: -1,
				display: "none"
			});

		});

	}

	// Run on page load
	randomise_background();

});