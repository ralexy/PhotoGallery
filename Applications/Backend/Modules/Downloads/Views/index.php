<table id="downloads"> 
  <tr>
    <th></th>
    <th>IP</th>
    <th>Name</th>
    <th>Date</th>
    <th>Size</th>
    <th>Success</th>
  </tr>

  <?php
  foreach($downloads as $download)
  {
  ?>
    <tr>
      <td><?= strip_tags($download['id']) ?></td>
      <td><?= strip_tags($download['ip']) ?></td>
      <td><a href="<?= $download['link'] ?>" target="_blank" title="<?= $download['success'] ? strip_tags($download['name']) : '' ?>" ><?= $download['success'] ==  1 ? mb_strimwidth(strip_tags($download['name']), 0, 50, '[...]') : $download['link'] ?></a></td>
      <td><?= strip_tags($download['date']) ?></td>
      <td><?= strip_tags($download['size']) ?></td>
      <td><?= strip_tags($download['success']) ?></td>
      <td><a href="download-d<?= strip_tags($download['id']) ?>" title="Delete">X</a></td>
    </tr>    
  <?php
  }
  ?>
</table>
<?= isset($pager) ? $pager : ''; ?>