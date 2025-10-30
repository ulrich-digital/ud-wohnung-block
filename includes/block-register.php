<?php

/**
 * block-register.php – Registrierung des Wohnung-Blocks
 */

defined('ABSPATH') || exit;

add_action('init', function () {
    register_block_type_from_metadata(
        __DIR__ . '/../',
        [
            'render_callback' => 'ud_wohnung_block_render',
        ]
    );
});
