<?php $images = get_field('gallery'); ?>
<?php if ($images): ?>
  <div class="gallery-thumbs">
    <?php foreach( $images as $image ): ?>
    <a href="#" class="link js-gallery-link" data-src="<?php echo $image['url']; ?>">
      <div class="background" style="background-image: url(<?php echo $image['sizes']['thumbnail']; ?>);"></div>
      <span class="corner -top-left"></span>
      <span class="corner -top-right"></span>
      <span class="corner -bottom-left"></span>
      <span class="corner -bottom-right"></span>
    </a>
    <?php endforeach; ?>
  </div>
<?php endif; ?>