<figure class="photo -stacked -framed">
  <?php if (isset($content->admin_link)): ?>
    <div class="admin-edit">
      <a class="button -secondary" href="<?php print $content->admin_link; ?>"><?php print t('Edit Status'); ?></a>
    </div>
  <?php endif; ?>
  <img src="<?php print $content->media['uri']; ?>" alt="<?php print filter_xss($content->caption); ?>" />
  <figcaption class="__copy"><?php print filter_xss($content->caption); ?></figcaption>
</figure>
