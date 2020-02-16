<table id="purchases"> 
  <tr>
    <th></th>
    <th>Email</th>
    <th>Date</th>
    <th>Price</th>
    <th></th>
  </tr>

  <?php
  if($payments)
  {
    foreach($payments as $payment)
    {
    ?>
      <tr>
        <td><?= strip_tags($payment['id']) ?></td>
        <td><?= strip_tags($payment['email']) ?></td>
        <td><?= strip_tags($payment['date']) ?></td>
        <td><?= strip_tags($payment['price']) ?></td>
        <td><a href="#" title="Bill">B</a> <a href="payment-d<?= $payment['id'] ?>" title="Delete">X</a></td>
      </tr>
    <?php
    }
  }
  ?>
</table>

<?= isset($pager) ? $pager : ''; ?>