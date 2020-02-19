<?php

namespace Library\Models;

use Library\Entities\Artist;
use Library\Entities\Collection;
use Library\Manager\ArtistManager_PDO;

class ArtistManager_PDO extends ArtistManager {

    /**
     * Méthode permettant d'ajouter un artiste
     * @param $artist Artist L'artiste à ajouter
     * @return void
     **/
    protected function add(Artist $artist)
    {
        // TODO: Implement add() method.
    }

    /**
     * Méthode permettant de compter le nombre d'artistes
     * @return int
     **/
    public function count()
    {
        // TODO: Implement count() method.
    }

    /**
     * Méthode permettant de supprimer un artiste
     * @param $id int Id de l'artiste à supprimer
     * @return Download
     **/
    public function delete($id)
    {
        // TODO: Implement delete() method.
    }

    /**
     * Méthode permettant de récupérer un artiste
     * @param $id int Id de l'artiste à récupérer
     * @return Artist
     **/
    public function get($id)
    {
        // TODO: Implement get() method.
    }

    /**
     * Méthode permettant de récupérer la liste des artistes
     * @return Artist
     **/
    public function getList()
    {
        $q = $this->dao->query('SELECT * FROM artist');

        print_r(($q));
        // TODO: Implement getList() method.
    }

    /**
     * Méthode permettant de modifier un artiste
     * @param $artist Artist L'artiste à modifier
     * @return Download
     **/
    protected function modify(Artist $artist)
    {
        // TODO: Implement modify() method.
    }
}