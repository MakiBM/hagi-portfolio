<?php

    // Function to register WP menus
    function bm_register_menus() {

        register_nav_menus(array(

            'primary_nav' => 'Primary navigation',

        ));

    }

    // Register the menus on init
    add_action('init', 'bm_register_menus');