<?php

/**
 * render.php – Serverseitiges Rendern des Wohnung-Blocks (Pseudo-Accordion)
 */

defined('ABSPATH') || exit;

function ud_wohnung_block_render($attributes) {
    $mediaUrls   = $attributes['mediaUrls'] ?? [];
    $title       = wp_strip_all_tags(trim($attributes['title'] ?? ''));
    $text        = wp_kses_post($attributes['text'] ?? '');
    $nameAddress = wp_kses_post($attributes['nameAddress'] ?? '');

    // Rohdaten bereinigen
    $raw_phone  = wp_strip_all_tags(trim($attributes['phone'] ?? ''));
    $raw_mobile = wp_strip_all_tags(trim($attributes['mobile'] ?? ''));
    $email      = wp_strip_all_tags(trim($attributes['email'] ?? ''));
    $url        = wp_strip_all_tags(trim($attributes['url'] ?? ''));
    $url_display = preg_replace('#^https?://#', '', $url); // entfernt http:// oder https://

    $pdf        = esc_url_raw(trim($attributes['pdf'] ?? ''));
    $pdfLabel   = wp_strip_all_tags(trim($attributes['pdfLabel'] ?? ''));

    // Telefonnummern vorbereiten
    $phone_link  = normalize_swiss_phone($raw_phone);
    $mobile_link = normalize_swiss_phone($raw_mobile);

    $phone_label  = $phone_link ? format_ch_phone_display($phone_link) : '';
    $mobile_label = $mobile_link ? format_ch_phone_display($mobile_link) : '';

    ob_start();
?>
    <div class="wp-block-ud-wohnung-block ud-wohnung-block">

        <div class="wohnung-block-content">
            <?php if (!empty($mediaUrls)) : ?>
                <div class="wohnung-gallery">
                    <?php foreach ($mediaUrls as $img) : ?>
                        <figure class="wohnung-gallery-item">
                            <img src="<?php echo esc_url($img); ?>" alt="">
                        </figure>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>

            <div class="wohnung-content">
                <?php if ($title) : ?>
                    <h3 class="wohnung-title"><?php echo esc_html($title); ?></h3>
                <?php endif; ?>

                <div class="wp-block-ud-accordion-block ud-accordion">
                    <div class="ud-accordion__title" aria-expanded="false">
                        <h3 class="ud-accordion__toggle"><?php esc_html_e('Details', 'ud-wohnung-block-ud'); ?></h3>
                        <span class="ud-accordion__icon"><i class="fa-sharp fa-solid fa-arrow-right-long"></i></span>
                    </div>
                    <div class="ud-accordion__content">
                        <div class="ud-accordion__content-inner">
                            <?php if ($text) : ?>
                                <p class="wohnung-text"><?php echo wp_kses_post($text); ?></p>
                            <?php endif; ?>

                            <div class="wohnung-contacts">
                                <?php if ($nameAddress) : ?>
                                    <div class="wohnung-nameaddress">
                                        <img src="<?php echo esc_url(
                                                        plugins_url('assets/icons/user-sharp-solid-full.svg', dirname(__DIR__) . '/ud-wohnung-block.php')
                                                    ); ?>" alt="User Icon" class="icon" />
                                        <?php echo $nameAddress; ?>
                                    </div>
                                <?php endif; ?>

                                <?php if ($phone_link) : ?>
                                    <div class="wohnung-phone">
                                        <img src="<?php echo esc_url(
                                                        plugins_url('assets/icons/phone-sharp-solid-full.svg', dirname(__DIR__) . '/ud-wohnung-block.php')
                                                    ); ?>" alt="Telefon Icon" class="icon" />
                                        <a href="tel:<?php echo esc_attr($phone_link); ?>">
                                            <?php echo esc_html($phone_label); ?>
                                        </a>
                                    </div>
                                <?php endif; ?>

                                <?php if ($mobile_link) : ?>
                                    <div class="wohnung-mobile">
                                        <img src="<?php echo esc_url(
                                                        plugins_url('assets/icons/mobile-screen-button-sharp-solid-full.svg', dirname(__DIR__) . '/ud-wohnung-block.php')
                                                    ); ?>" alt="Mobile Icon" class="icon" />
                                        <a href="tel:<?php echo esc_attr($mobile_link); ?>">
                                            <?php echo esc_html($mobile_label); ?>
                                        </a>
                                    </div>
                                <?php endif; ?>

                                <?php if ($email) : ?>
                                    <div class="wohnung-email">
                                        <img src="<?php echo esc_url(
                                                        plugins_url('assets/icons/envelope-sharp-solid-full.svg', dirname(__DIR__) . '/ud-wohnung-block.php')
                                                    ); ?>" alt="E-Mail Icon" class="icon" />
                                        <a href="mailto:<?php echo antispambot($email); ?>">
                                            <?php echo antispambot($email); ?>
                                        </a>
                                    </div>
                                <?php endif; ?>

                                <?php if ($url) : ?>
                                    <div class="wohnung-url">
                                        <img src="<?php echo esc_url(
                                                        plugins_url('assets/icons/arrow-up-right-from-square-sharp-solid-full.svg', dirname(__DIR__) . '/ud-wohnung-block.php')
                                                    ); ?>" alt="Website Icon" class="icon" />
                                        <a href="<?php echo esc_url($url); ?>" target="_blank" rel="noopener noreferrer">
                                            <?php echo esc_html($url_display); ?>
                                        </a>
                                    </div>
                                <?php endif; ?>

                                <?php if ($pdf) : ?>
                                    <div class="wohnung-pdf">
                                        <img src="<?php echo esc_url(
                                                        plugins_url('assets/icons/file-pdf-sharp-solid-full.svg', dirname(__DIR__) . '/ud-wohnung-block.php')
                                                    ); ?>" alt="PDF Icon" class="icon" />
                                        <a href="<?php echo esc_url($pdf); ?>" target="_blank" rel="noopener noreferrer">
                                            <?php echo $pdfLabel ? esc_html($pdfLabel) : __('PDF herunterladen', 'ud-wohnung-block-ud'); ?>
                                        </a>
                                    </div>
                                <?php endif; ?>
                            </div>




                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php
    return ob_get_clean();
}
