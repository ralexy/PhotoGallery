<table id="members">
  <tr>
    <th></th>
    <th>Email</th>
    <th>Register</th>
    <!--<th>Expiry</th>-->
    <th>IP</th>
    <th></th>
  </tr>

  <?php
  foreach($members as $member)
  {
  ?>
    <tr>
    <td><?= strip_tags($member['id']) ?></td>
    <td><?= strip_tags($member['email']) ?></td>
    <td><?= strip_tags($member['registerDate']) ?></td>
    <!--<td><?= strip_tags($member['expiryDate']) ?></td>-->
    <td><?= strip_tags($member['ip']) ?></td>
    <td><a href="member-e<?= strip_tags($member->id()) ?>" target="_blank" title="Edit">E</a> <a href="member-d<?= strip_tags($member['id']); ?>" title="Delete">X</a></td>
    </tr>   
  <?php
  }
  ?>
</table>
<?= isset($pager) ? $pager : ''; ?>
