<article id="pictureShow" style="background-image: url('<?= $picturesURL. (int) $pictures[0]->getPictureId(). $picturesExtension ?>'); background-size: auto 100%;">
    <div id="cross"></div>
    <div id="info"></div>
    <div id="arrow-left"></div>
    <div id="arrow-right"></div>

    <div id="description">
        <h1 id="title"><?= strip_tags($pictures[0]->getTitle()); ?></h1>
        <h2 id="artist"><?= strip_tags($pictures[0]->getArtist()); ?></h2>
        <h2 id="year"><?= strip_tags($pictures[0]->getYear()); ?></h2>
    </div>
</article>

<script src="/js/jquery-3.4.1.min.js"></script>
<script src="/js/gallery.js"></script>