<?php
namespace Library\Models;

use \Library\Entities\Picture;

class PictureManager_PDO extends \Library\Manager
{

  protected function add(Picture $picture) {

  }

  public function count() {
    return $this->dao->query('SELECT COUNT(id) FROM picture')->fetchColumn();
  }


  public function delete($id){
    $this->dao->exec('DELETE FROM picture WHERE id = '. (int) $id);
  }

  public function get($id) {
    $q = $this->dao->query('
        SELECT p.pictureId, p.title, p.description, p.sourceUrl, CONCAT(a.firstName, \' \', a.lastName) AS artist, p.year 
        FROM picture p  LEFT JOIN artist a
        ON p.artist = a.authorId
        WHERE p.id = '. (int) $id);

    $q->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, '\Library\Entities\Picture');
  }

  public function getList($start = -1, $limit = -1) {
      $sql = 'SELECT p.pictureId, p.title, p.description, p.sourceUrl, CONCAT(a.firstName, \' \', a.lastName) AS artist, p.year 
              FROM picture p  LEFT JOIN artist a
              ON p.artist = a.authorId';

      if($start != -1 && $limit != -1)
          $sql .= ' LIMIT '. (int) $limit. ' OFFSET '. (int) $start;

      $q = $this->dao->query($sql);
      $q->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, '\Library\Entities\Picture');

      return $q->fetchAll();
  }


  protected function modify(Picture $picture) {

  }
}