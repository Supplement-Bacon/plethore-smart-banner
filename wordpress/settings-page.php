<?php

/**
 * Register the plugin configuration page
 */
function plethore_smart_banner_register_settings_page()
{
    $page = add_options_page(
        esc_html__('Plethore Smart Banner', 'plethore-smart-banner'),
        esc_html__('Plethore Smart Banner', 'plethore-smart-banner'),
        'administrator',
        'plethore-smart-banner-setup',
        'plethore_smart_banner_render_page',
    );

    if ($page === false) {
        return;
    }

    add_settings_section(
        'plethore-smart-banner-setup-section',
        esc_html__('Plethore Smart Banner', 'plethore-smart-banner'),
        null,
        'plethore-smart-banner-setup',
    );

    add_settings_field(
        'plethore-smart-banner-setup-section-option-account',
        esc_html__('Account slug', 'plethore-smart-banner'),
        'plethore_smart_banner_field_account_slug_callback',
        'plethore-smart-banner-setup',
        'plethore-smart-banner-setup-section',
    );

    register_setting(
        'plethore-smart-banner-setup',
        Plethore_Smart_Banner::SETTING_ACCOUNT_SLUG
    );
}
function plethore_smart_banner_field_account_slug_callback()
{
    $name = Plethore_Smart_Banner::SETTING_ACCOUNT_SLUG;
    $value = esc_attr(get_option($name, ''));
    echo "<input type=\"text\" required name=\"{$name}\" value=\"{$value}\" />";
}

function plethore_smart_banner_render_page()
{
?>
    <div class="wrap">
        <h1><?= esc_html_e('Plethore Smart Banner Settings', 'plethore-smart-banner') ?></h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('plethore-smart-banner-setup');
            do_settings_sections('plethore-smart-banner-setup');
            submit_button();
            ?>
        </form>
    </div>
<?php
}
