<?php
namespace Library\Models;

use Library\Entities\Artist;

abstract class DownloadsManager extends \Library\Manager
{
  /**
  * Méthode permettant d'ajouter un artiste
  * @param $artist Artist L'artiste à ajouter
  * @return void
  **/
  abstract protected function add(Artist $artist);


  /**
  * Méthode permettant de compter le nombre d'artistes
  * @return int
  **/
  abstract public function count();


  /**
  * Méthode permettant de supprimer un artiste
  * @param $id int Id de l'artiste à supprimer
  * @return Download
  **/
  abstract public function delete($id);

  /**
  * Méthode permettant de récupérer un artiste
  * @param $id int Id de l'artiste à récupérer
  * @return Artist
  **/
  abstract public function get($id);

  /**
  * Méthode permettant de récupérer la liste des artistes
  * @return Artist
  **/
  abstract public function getList();


  /**
  * Méthode permettant de modifier un artiste
  * @param $artist Artist L'artiste à modifier
  * @return Download
  **/
  abstract protected function modify(Artist $artist);

  /**
  * Méthode permettant d'enregistrer un artiste
  * @param $artist Artist L'artiste à enregistrer
  * @see self::add()
  * @see self::modify()
  * @return void
  */
  public function save(Artist $artist)
  {
    if ($artist->isValid())
      $artist->isNew() ? $this->add($artist) : $this->modify($artist);

    else
      throw new \RuntimeException('L\'entité Artist doit être valide pour être enregistrée.');
  }

  /**
  * Méthode permettant de rechercher un artiste
  * @param $query string La valeur à rechercher
  * @return mixed
  */
  //abstract public function search($query);
}