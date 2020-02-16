<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="none">
  <title><?= isset($title) ? $title : 'Backend'; ?></title>
  <link rel="stylesheet" href="../css/Backend/style.css">
</head>
<body>
<?php if ($user->isAuthenticated($this->app->name())) { ?>
  <header>
    <h1>PG</h1>
    <ul>
      <li><a href="#">Members</a></li>
      <li><a href="#">Collections</a></li>
      <li><a href="#">Artists</a></li>
      <li id="logout"><a href="logout">X</a></li>
    </ul>

    <?php if(empty($hideSearch)) { ?>
    <form method="post" action="<?= isset($this->module) ? strtolower($this->module). '-s' : '#'; ?>">
      <input type="text" name="query" placeholder="Search">
    </form>
    <?php } ?>
  </header>
<div id="page">
<?php } ?>

<?= $content; ?>
<?= $user->isAuthenticated($this->app->name()) ? '</div>' : ''; ?>
</body>
</html>