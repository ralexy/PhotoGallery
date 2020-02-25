<header><h1>PhotoGallery</h1></header>

<div id="collections">
    <?php
    for($i = 0; $i < 10; $i++) {
        ?>
        <article>
            <a href="#<?= $i ?>">Ma superbe collection</a>
        </article>
        <?php
    }
    ?>
</div>
