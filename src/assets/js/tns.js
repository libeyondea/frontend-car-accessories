var slider = tns({
	container: ".hero-slider",
	slideBy: "page",
	autoplay: true,
	autoplayButtonOutput: false,
	mouseDrag: true,
	gutter: 0,
	items: 1,
	nav: false,
	controls: true,
	controlsText: [
		'<i class="lni lni-chevron-left"></i>',
		'<i class="lni lni-chevron-right"></i>',
	],
});

//======== Brand Slider
var slider2 = tns({
	container: ".brands-logo-carousel",
	autoplay: true,
	autoplayButtonOutput: false,
	mouseDrag: true,
	gutter: 15,
	nav: false,
	controls: false,
	responsive: {
		0: {
			items: 1,
		},
		540: {
			items: 3,
		},
		768: {
			items: 5,
		},
		992: {
			items: 6,
		},
	},
});
