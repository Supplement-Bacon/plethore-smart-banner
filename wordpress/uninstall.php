<?php

// if uninstall.php is not called by WordPress, die
if (! defined('WP_UNINSTALL_PLUGIN')) {
    die;
}

unregister_setting(
    'plethore-smart-banner-setup',
    Plethore_Smart_Banner::SETTING_ACCOUNT_SLUG
);

delete_option(Plethore_Smart_Banner::SETTING_ACCOUNT_SLUG);
