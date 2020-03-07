<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="none">
  <title><?= isset($title) ? $title : 'Backend'; ?></title>
  <!-- <link rel="stylesheet" href="../css/Backend/style.css"> -->
  <link type="text/css" rel="stylesheet" href="../css/bootstrap.min.css">
  <script type="javascript" src="../js/jquery-3.4.1.slim.min.js"></script>
  <script type="javascript" src="../js/popper.min.js"></script>
  <script type="javascript" src="../js/bootstrap.min.js"></script>
  <style>
    #logout
    {
      float: right;
      list-style-type: none;
      font-size: 1.2em;
      margin-right: 1%;
    }
  #logout a:hover
    {
      color: red;
    }
    a, a:visited
    {
      color: #777;
      text-decoration: none;
    }
    a:hover
    {
      color: black;
      text-decoration: underline;
    }
  </style>
</head>
<body>
<?php if ($user->isAuthenticated($this->app->name())) { ?>
  <header>
    <h1>PG</h1>
    <ul>
      <li id="logout"><a href="logout">X</a></li>
    </ul>
  </header>
<div id="page">
<?php } ?>

<?= $content; ?>
<?= $user->isAuthenticated($this->app->name()) ? '</div>' : ''; ?>
</body>
</html>