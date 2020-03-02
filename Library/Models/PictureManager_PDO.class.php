<?php
namespace Library\Models;

use \Library\Entities\Picture;

class PictureManager_PDO extends PictureManager
{
  protected function add(Picture $picture) {
    $q = $this->dao->prepare('INSERT INTO picture SET title = :title, description = :description, sourceUrl = :sourceUrl, artist = :artist, year = :year');

    $q->bindValue('title', $picture->getTitle());
    $q->bindValue('description', $picture->getDescription());
    $q->bindValue('sourceUrl', $picture->getSourceUrl());
    $q->bindValue('artist', $picture->getArtist());
    $q->bindValue('year', $picture->getYear()->format("Y"));

    $q->execute();

    $picture->setPictureId($this->dao->lastInsertId());
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
        ON p.artist = a.artistId
        WHERE p.id = '. (int) $id);

    $q->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, '\Library\Entities\Picture');
  }

  public function getList($collectionName = NULL, $start = -1, $limit = -1) {

      $sql = 'SELECT p.pictureId, p.title, p.description, p.sourceUrl, CONCAT(a.firstName, \' \', a.lastName) AS artist, p.year 
                  FROM picture p  
                  LEFT JOIN artist a ON p.artist = a.artistId';


      if($collectionName) {
          $sql .= ' LEFT JOIN picturecollection pc ON p.pictureId = pc.pictureId
                  LEFT JOIN collection c ON pc.collectionId = c.collectionId
                  WHERE c.name = :collectionName ORDER BY orderShow';
      }

      if($start != -1 && $limit != -1)
          $sql .= ' LIMIT '. (int) $limit. ' OFFSET '. (int) $start;

      if(!$collectionName) {
          $q = $this->dao->query($sql);
      } else {
          $q = $this->dao->prepare($sql);
          $q->bindValue('collectionName', $collectionName);
          $q->execute();
      }
      $q->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, '\Library\Entities\Picture');

      return $q->fetchAll();
  }


  protected function modify(Picture $picture) {

  }
}