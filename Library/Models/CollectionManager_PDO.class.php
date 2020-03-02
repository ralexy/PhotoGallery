<?php
namespace Library\Models;

use \Library\Entities\Collection;

class CollectionManager_PDO extends CollectionManager
{
    protected function add(Collection $collection) {
        $q = $this->dao->prepare('INSERT INTO collection SET name = :name, description = :description');

        $q->bindValue('name', $collection->getName());
        $q->bindValue('description', $collection->getDescription());

        $q->execute();

        $collection->setCollectionId($this->dao->lastInsertId());
    }

    public function count() {
        return $this->dao->query('SELECT COUNT(id) FROM collection')->fetchColumn();
    }

    public function delete($id){
        $this->dao->exec('DELETE FROM collection WHERE id = '. (int) $id);
    }

    public function get($id) {
        $q = $this->dao->query('SELECT collectionId, name, description FROM collection WHERE p.id = '. (int) $id);

        $q->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, '\Library\Entities\Collection');
    }

    public function getList($start = -1, $limit = -1) {
        $sql = 'SELECT c.collectionId, c.name, c.description, (SELECT MIN(p.pictureId) FROM picturecollection p WHERE p.collectionId = c.collectionId) AS firstPictureId FROM collection c GROUP BY c.collectionId';

        if($start != -1 && $limit != -1)
            $sql .= ' LIMIT '. (int) $limit. ' OFFSET '. (int) $start;

        $q = $this->dao->query($sql);
        $q->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, '\Library\Entities\Collection');

        return $q->fetchAll();
    }


    protected function modify(Collection $collection) {

    }
}