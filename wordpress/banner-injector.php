<?php

add_action('wp_enqueue_scripts', 'plethore_smart_banner_enqueue_scripts');

/**
 * Enqueue the banner script and style
 */
function plethore_smart_banner_enqueue_scripts()
{
    $accountSlug = get_option(Plethore_Smart_Banner::SETTING_ACCOUNT_SLUG);

    if (! $accountSlug) {
        return;
    }

    wp_enqueue_script(
        'plethore-smart-banner-script',
        plugin_dir_url(__FILE__) . 'assets/banner.js',
        array('jquery'),
        '1.0',
        true
    );

    wp_enqueue_style(
        'plethore-smart-banner-style',
        plugin_dir_url(__FILE__) . 'assets/banner.css',
        array(),
        '1.0'
    );

    // Pass PHP data to JS
    wp_localize_script('plethore-smart-banner-script', 'PlethoreBannerData', [
        'dataUrl' => Plethore_Smart_Banner::BANNER_DATA_URL . $accountSlug . '.json',
        'templateUrl' => plugin_dir_url(__FILE__) . 'template/banner.html',
    ]);
}
