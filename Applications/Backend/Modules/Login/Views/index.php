<h1 class="center">Hello</h1>
<?= isset($invalidLogin) ? '<p class="center">Invalid IDs.</p>' : ''; ?>
<form method="post" action="">
  <p><input type="text" name="login" placeHolder="Username" required></p>
  <p><input type="password" name="password" placeHolder="Password" required></p>
  <p><input type="submit" value="Log In"></p>
</form>