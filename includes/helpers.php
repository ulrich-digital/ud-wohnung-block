<?php
/**
 * helpers.php – Hilfsfunktionen für Telefonnummern (Schweiz)
 */

/**
 * Normalisiert Schweizer Telefonnummern:
 * - akzeptiert lokale Formatierungen wie 0761234567
 * - gibt gültige +41xxxxxxxxx-Nummer zurück oder leeren String
 */
if ( ! function_exists('normalize_swiss_phone') ) {
    function normalize_swiss_phone($input) {
        $input = preg_replace('/[\s\p{Z}\xA0]+/u', '', $input); // Unicode-Zwischenräume

        // Lokales Format: 0XX xxx xx xx → +41
        if (preg_match('/^0([1-9][0-9])([0-9]{3})([0-9]{2})([0-9]{2})$/', $input, $m)) {
            return '+41' . $m[1] . $m[2] . $m[3] . $m[4];
        }

        // International: +41XXXXXXXXX
        if (preg_match('/^\+41\d{9}$/', $input)) {
            return $input;
        }

        return '';
    }
}

/**
 * Gibt Telefonnummer im Format 0XX XXX XX XX aus
 */
if ( ! function_exists('format_ch_phone_display') ) {
    function format_ch_phone_display($phone) {
        if (preg_match('/^\+41(\d{2})(\d{3})(\d{2})(\d{2})$/', $phone, $m)) {
            return '0' . $m[1] . ' ' . $m[2] . ' ' . $m[3] . ' ' . $m[4];
        }
        return $phone;
    }
}




/**
 * Extrahiert Bilder aus InnerBlocks (core/gallery oder core/image)
 * und rendert sie in der einheitlichen Galerie-Struktur.
 *
 * @param array $inner_blocks Array von parse_blocks() innerhalb des Blocks.
 * @return string HTML-Ausgabe der Galerie
 */
if ( ! function_exists('ud_render_gallery_from_innerblocks') ) {
    function ud_render_gallery_from_innerblocks($inner_blocks) {
        $output = '';

        foreach ($inner_blocks as $block) {
            // Galerie (mehrere Bilder)
            if ($block['blockName'] === 'core/gallery' && !empty($block['innerBlocks'])) {
                foreach ($block['innerBlocks'] as $imageBlock) {
                    if ($imageBlock['blockName'] === 'core/image') {
                        $attrs = $imageBlock['attrs'] ?? [];
                        $url   = $attrs['url'] ?? '';
                        if ($url) {
                            $output .= '<figure class="wohnung-gallery-item">';
                            $output .= '<img src="' . esc_url($url) . '" alt="">';
                            $output .= '</figure>';
                        }
                    }
                }
            }

            // Einzelnes Bild
            if ($block['blockName'] === 'core/image') {
                $attrs = $block['attrs'] ?? [];
                $url   = $attrs['url'] ?? '';
                if ($url) {
                    $output .= '<figure class="wohnung-gallery-item">';
                    $output .= '<img src="' . esc_url($url) . '" alt="">';
                    $output .= '</figure>';
                }
            }
        }

        if ($output) {
            return '<div class="wohnung-gallery">' . $output . '</div>';
        }

        return '';
    }
}

