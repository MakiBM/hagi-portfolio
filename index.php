<!doctype html>
<html lang="">
  <?php get_template_part('components/head'); ?>
  <body>

    <div class="root">
      <div class="background -video-8"></div>
      <?php get_template_part('components/header'); ?>

      <main class="main">
        <?php 
          if (is_page('home')) {
            get_template_part('components/quote'); 
            get_template_part('components/footer');
          }
          if (is_page('gallery')) get_template_part('components/gallery-thumbs'); 
          if (is_page('making-of')) echo 'blog goes here';
        ?>
      </main>
    </div>

    <?php get_template_part('components/foot'); ?>
  </body>
</html>
