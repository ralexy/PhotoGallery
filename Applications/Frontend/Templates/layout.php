<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title><?= !empty($title) ? $title : 'Galerie Photo'; ?></title>
    <link rel="stylesheet" href="/css/sheet.css">
</head>
<body>

<?= $content; ?>

<script src="/js/jquery-3.4.1.min.js"></script>
<script src="/js/gallery.js"></script>
</body>
</html>