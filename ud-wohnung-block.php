<?php
/**
 * Plugin Name:     UD Block: Wohnung
 * Description:     Block für Ferienwohnungen und Mietwohnungen mit Bild, Titel, Beschreibung und Kontaktdaten.
 * Version:         1.0.0
 * Author:          ulrich.digital gmbh
 * Author URI:      https://ulrich.digital/
 * License:         GPL v2 or later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     ud-wohnung-block-ud
 */

/**
 * ud-wohnung-block.php – zentrale Einstiegspunkt des Plugins
 *
 * - Enthält nur die Plugin-Metadaten
 * - Lädt automatisch alle PHP-Dateien im Verzeichnis /includes/
 * - Die eigentliche Block-Logik ist modular organisiert (Render, Enqueue, Helpers etc.)
 */

defined('ABSPATH') || exit;

// Alle PHP-Dateien im includes/-Ordner laden
foreach ([
    'helpers.php',
    'render.php',
    'block-register.php',
    'enqueue.php',
] as $file) {
    $path = __DIR__ . '/includes/' . $file;
    if ( file_exists( $path ) ) {
        require_once $path;
    }
}
