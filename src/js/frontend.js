import domReady from "@wordpress/dom-ready";
/*
domReady(() => {
    const galleries = document.querySelectorAll('.ud-wohnung-block .wohnung-gallery');

    galleries.forEach((gallery) => {
        const items = gallery.querySelectorAll('img');

        items.forEach((img) => {
            // Beispiel: feste Höhe für alle Galerie-Bilder setzen
            img.style.objectFit = 'cover';
            img.style.width = '100%';
            img.style.height = '250px'; // gewünschte Höhe
        });
    });
});
*/

import $ from "jquery";
import "slick-carousel";

// ========== Slick Slider Initialisierung ==========

function initWohnungSlider() {
	const slider = $(".wp-block-ud-wohnung-block .wohnung-gallery");

	if (slider.length) {
		slider.slick({
			arrows: true,
			dots: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: false,

			prevArrow:
				'<button type="button" class="slick-prev" aria-label="Previous"><span class="slick-icon"><i class="fa-sharp fa-solid fa-circle-chevron-left"></i></span></button>',
			nextArrow:
				'<button type="button" class="slick-next" aria-label="Next"><span class="slick-icon"><i class="fa-sharp fa-solid fa-circle-chevron-right"></i></span></button>',
		});
	}
}

// ========== DOM Ready Hook ==========

$(function () {
	initWohnungSlider();
});

/**
 * frontend.js – Verhalten des Wohnungs-Masonry
 *
 * - Initialisiert Isotope auf .is-style-masonry-loop
 * - Nutzt .ud-wohnung-block als masonry items
 * - Reagiert auf Accordion-Toggles (Layout neu berechnen)
 * - Mehrfaches Re-Layout nach Init, um Slick- und Accordion-Inhalte abzufangen
 */

import Isotope from "isotope-layout";
import "../css/frontend.scss";

document.addEventListener("DOMContentLoaded", () => {
	const containers = document.querySelectorAll(
		".is-style-wohnung-block-masonry"
	);
	const grids = [];

	containers.forEach((container) => {
		// Finde alle .ud-wohnung-block Elemente
		const items = container.querySelectorAll(".ud-wohnung-block");
		if (!items.length) return;

		// Initialisiere Isotope
		const iso = new Isotope(container, {
			itemSelector: ".ud-wohnung-block",
			layoutMode: "masonry",
			transitionDuration: "0.3s",
			percentPosition: true,
		});

		grids.push({ container, iso });

		// Re-Layouts direkt nach Init
		[0, 100, 500].forEach((delay) => setTimeout(() => iso.layout(), delay));
		iso.on("layoutComplete", () => {
			container.classList.add("initialized");
		});

		iso.on("arrangeComplete", () => {
			container.classList.add("initialized");
		});
	});

	// Bei Accordion-Toggles Layout neu berechnen
	document.querySelectorAll(".ud-accordion__title").forEach((toggle) => {
		toggle.addEventListener("click", () => {
			grids.forEach(({ iso }) => {
				[0, 100, 200, 500].forEach((delay) =>
					setTimeout(() => iso.layout(), delay)
				);
			});
		});
	});

	// Optional: Bei Slick-Events Layout triggern
	// (falls Slick das Markup verändert und Items „springen“)
	const slickEvents = ["setPosition", "afterChange"];
	slickEvents.forEach((evt) => {
		document.addEventListener(evt, () => {
			grids.forEach(({ iso }) => {
				setTimeout(() => iso.layout(), 100);
			});
		});
	});
});
