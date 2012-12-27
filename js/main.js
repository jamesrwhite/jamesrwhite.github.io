$(function() {

	function randomise_background() {

		var background_colours = [
				"#2C96AF",	// Turquiose
				"#702F92",	// Purple
				"#447C2B",	// Green
				"#C1642E",	// Orange
				"#AA2F34",	// Red
				"#2D44AA"	// Blue
			],
			$body = $("body"),
			current_colour = $body.css("");

		// Set the random background colour
		$body.animate({
			"background-color": background_colours[
				Math.round(Math.random() * (background_colours.length - 1))
			]
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