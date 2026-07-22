<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://github.com/Supplement-Bacon/plethore-smart-banner-wordpress
 * @package           Plethore_Smart_Banner
 *
 * @wordpress-plugin
 * Plugin Name:       Pléthore Smart Banner
 * Description:       Display a smart banner on your website to promote your mobile app.
 * Version:           1.0.0
 * Requires PHP:      7.4.0
 * Author:            Plethore
 * Author URI:        https://supplement-bacon.com
 * Text Domain:       plethore-smart-banner
 * Domain Path:       /plethore-smart-banner
 */

use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

// If this file is called directly, abort.
if (! defined('WPINC')) {
    die;
}


class Plethore_Smart_Banner
{
    const SETTING_ACCOUNT_SLUG = 'plethore_smart_banner_account_slug';
    const BANNER_DATA_URL = 'https://smart-banner.pletho.re/';

    protected static $instance = null;

    public static function get_instance()
    {
        if (! isset(static::$instance)) {
            static::$instance = new static;
        }

        return static::$instance;
    }

    protected function __construct()
    {
        $this->register_self_update();
        $this->register_settings_page();
        $this->register_banner_injector();
    }

    private function register_self_update()
    {
        require 'plugin-update-checker/plugin-update-checker.php';

        PucFactory::buildUpdateChecker(
            // TODO: Replace the URL with the actual URL of the update checker
            'https://smart-banner.pletho.re/plugin-metadata.json',
            __FILE__, //Full path to the main plugin file or functions.php.
            'plethore-smart-banner'
        );
    }

    private function register_settings_page()
    {
        require 'settings-page.php';
        add_action('admin_menu', 'plethore_smart_banner_register_settings_page');
    }

    private function register_banner_injector()
    {
        require 'banner-injector.php';
    }
}

add_action('init', 'plethore_smart_banner_init');

function plethore_smart_banner_init()
{
    Plethore_Smart_Banner::get_instance();
}

register_activation_hook(__FILE__, 'plethore_smart_banner_activate');

function plethore_smart_banner_activate()
{
    if (false === get_option(Plethore_Smart_Banner::SETTING_ACCOUNT_SLUG)) {
        update_option(
            Plethore_Smart_Banner::SETTING_ACCOUNT_SLUG,
            '%%DEFAULT_ACCOUNT_SLUG%%'
        );
    }
}
