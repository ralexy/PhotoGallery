<form method="post">
  <p><?= isset($success) ? $success : '' ?></p>
  <p><input type="email" name="email" value="<?= strip_tags($member['email']) ?>" placeHolder="Email Adress" required></p>
  <p><input type="password" name="password" placeHolder="Password"></p>
  <p><input type="text" name="expiryDate" value="<?= strip_tags($member->expiryDate()->format('Y-m-d H:i:s')) ?>" placeHolder="Expiry date" required></p>
  <p><input type="text" name="ip" value="<?= strip_tags($member['ip']) ?>" readonly required></p>
  <p><input type="submit" value="Edit"></p>
</form>