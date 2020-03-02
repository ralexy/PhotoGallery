<?php
namespace Library\Models;

use \Library\Entities\Artist;

class ArtistManager_PDO extends ArtistManager
{
    protected function add(Artist $artist) {
        $q = $this->dao->prepare('INSERT INTO artist SET firstName = :firstName, lastName = :lastName, birthDate = :birthDate, deathDate = :deathDate, biography = :biography');

        $q->bindValue('firstName', $artist->getFirstName());
        $q->bindValue('lastName', $artist->getLastName());
        $q->bindValue('birthDate', $artist->getBirthDate()->format("Y-m-d"));
        $q->bindValue('deathDate', $artist->getDeathDate()->format("Y-m-d"));
        $q->bindValue('biography', $artist->getBiography());

        $q->execute();

        $artist->setArtistId($this->dao->lastInsertId());
    }

    public function count() {
        return $this->dao->query('SELECT COUNT(id) FROM artist')->fetchColumn();
    }

    public function delete($id){
        $this->dao->exec('DELETE FROM artist WHERE id = '. (int) $id);
    }

    public function get($id) {
        $q = $this->dao->query('SELECT * FROM artist WHERE artistId = '. (int) $id);

        $q->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, '\Library\Entities\Artist');
    }

    public function getList($start = -1, $limit = -1) {
        /*$sql = 'SELECT c.collectionId, c.name, c.description, (SELECT MIN(p.pictureId) FROM picturecollection p WHERE p.collectionId = c.collectionId) AS firstPictureId FROM collection c GROUP BY c.collectionId';

        if($start != -1 && $limit != -1)
            $sql .= ' LIMIT '. (int) $limit. ' OFFSET '. (int) $start;

        $q = $this->dao->query($sql);
        $q->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, '\Library\Entities\Collection');

        return $q->fetchAll();*/
    }


    protected function modify(Artist $artist) {

    }
}