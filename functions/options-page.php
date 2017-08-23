<?php

    if( function_exists('acf_add_options_page') ) {

        acf_add_options_page(array(

            'page_title' => 'Theme Options',
            'menu_title' => 'Theme options',
            'menu_slug'  => 'qo-theme-options',
            'capability' => 'edit_posts',
            'redirect'   => true

        ));

    }