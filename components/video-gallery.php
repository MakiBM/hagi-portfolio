<?php if (have_rows('videos')): ?>
  <footer class="footer">
    <div class="video-thumbs">
      <?php while ( have_rows('videos') ) : the_row(); ?>
      <a href="#" class="link js-video-link" data-mp4="<?php the_sub_field('mp4') ?>">
        <div class="background" style="background-image: url(<?php the_sub_field('thumbnail') ?>);"></div>
        <span class="corner -top-left"></span>
        <span class="corner -top-right"></span>
        <span class="corner -bottom-left"></span>
        <span class="corner -bottom-right"></span>
      </a>
      <?php endwhile; ?>
    </div>
  </footer>
<?php endif; ?>