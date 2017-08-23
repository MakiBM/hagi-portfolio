<!doctype html>
<html lang="">
  <?php get_template_part('components/head'); ?>
  <body>

    <div class="root">
      <div class="background" style="background-image: url(<?php the_field('background', 'option'); ?>)"></div>
      <?php get_template_part('components/header'); ?>

      <main class="main">
        <?php

          if (is_page('home')) {
            get_template_part('components/quote');
            get_template_part('components/video-gallery');
          }

          if (is_page('gallery')) get_template_part('components/image-gallery'); 

          // if (is_page('home')) {
          //    
          //   get_template_part('components/footer');
          // }
          // if (is_page('making-of')) echo 'blog goes here';
        ?>
      </main>
    </div>

    <?php get_template_part('components/foot'); ?>
  </body>
</html>
