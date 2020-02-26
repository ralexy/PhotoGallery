<header><h1>PhotoGallery</h1></header>

<div id="collections">
    <?php
    foreach($collection as $line) {
        ?>
        <article style="background: url('<?= $appConfig->get('picturesURL'). '/'.  $line->getFirstPictureId(). $appConfig->get('picturesExtension'); ?>'); background-style: cover;">
            <a href="/collection/<?= $line->getName() ?>/"><?= $line->getName() ?></a>
        </article>
        <?php
    }
    ?>
</div>
