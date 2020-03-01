<?php
namespace Library\Models;

use \Library\Entities\Collection;

class CollectionManager_PDO extends \Library\Manager
{
    protected function add(Collection $collection) {
        $q = $this->dao->prepare('INSERT INTO collection SET :name, :description');

        $q->bindValue('name', $collection->getName());
        $q->bindValue('description', $collection->getDescription());
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
        $sql = 'SELECT c.collectionId, c.name, c.description, (SELECT MIN(p.pictureId) FROM picture_collection p WHERE p.collectionId = c.collectionId) AS firstPictureId FROM collection c GROUP BY c.collectionId';

        if($start != -1 && $limit != -1)
            $sql .= ' LIMIT '. (int) $limit. ' OFFSET '. (int) $start;

        $q = $this->dao->query($sql);
        $q->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, '\Library\Entities\Collection');

        return $q->fetchAll();
    }


    protected function modify(Picture $picture) {

    }
}