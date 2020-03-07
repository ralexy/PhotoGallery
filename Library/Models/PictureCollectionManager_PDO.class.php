<?php
namespace Library\Models;

use \Library\Entities\Picture;
use Library\Entities\PictureCollection;

class PictureCollectionManager_PDO extends PictureCollectionManager
{
  protected function add(PictureCollection $pictureCollection) {
    $q = $this->dao->prepare('INSERT INTO pictureCollection SET pictureId = :pictureId, collectionId = :collectionId, orderShow = :orderShow');

    $q->bindValue('pictureId', $pictureCollection->getPictureId());
    $q->bindValue('collectionId', $pictureCollection->getCollectionId());
    $q->bindValue('orderShow', $pictureCollection->getOrderShow());

    $q->execute();
  }

  public function count($collectionId) {
    return $this->dao->query('SELECT COUNT(pictureId) FROM pictureCollection WHERE collectionId = '. (int) $collectionId)->fetchColumn();
  }

  public function delete($collectionId){
    $this->dao->exec('DELETE FROM pictureCollection WHERE collectionId = '. (int) $collectionId);
  }

  public function deleteAll() {
        $this->dao->exec('DELETE FROM pictureCollection');
  }

  public function get($pictureId) {
    /*$q = $this->dao->query('
        SELECT p.pictureId, p.title, p.description, p.sourceUrl, CONCAT(a.firstName, \' \', a.lastName) AS artist, p.year 
        FROM picture p  LEFT JOIN artist a
        ON p.artist = a.artistId
        WHERE p.id = '. (int) $id);

    $q->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, '\Library\Entities\Picture');*/
  }

  public function getList($collectionId = NULL, $start = -1, $limit = -1) {

      $sql = 'SELECT * FROM pictureCollection ';


      if($collectionId) {
          $sql .= ' WHERE collectionId = '. (int) $collectionId;
      }

      if($start != -1 && $limit != -1) {
          $sql .= ' LIMIT '. (int) $limit. ' OFFSET '. (int) $start;

          $q = $this->dao->query($sql);
          $q->execute();
      }
      $q->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, '\Library\Entities\PictureCollection');

      return $q->fetchAll();
  }


  protected function modify(PictureCollection $pictureCollection) {

  }
}