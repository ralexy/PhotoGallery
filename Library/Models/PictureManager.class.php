<?php
namespace Library\Models;

use \Library\Entities\Picture;

abstract class PictureManager extends \Library\Manager
{
  /**
  * Méthode permettant d'ajouter un artiste
  * @param $picture Picture L'image à ajouter
  * @return void
  **/
  abstract protected function add(Picture $picture);


  /**
  * Méthode permettant de compter le nombre d'images
  * @return int
  **/
  abstract public function count();


  /**
  * Méthode permettant de supprimer une image
  * @param $id int Id de l'image à supprimer
  * @return Picture
  **/
  abstract public function delete($id);

  /**
  * Méthode permettant de récupérer une image
  * @param $id int Id de l'image à récupérer
  * @return Picture
  **/
  abstract public function get($id);

  /**
  * Méthode permettant de récupérer la liste des images
  * @return Picture
  **/
  abstract public function getList();


  /**
  * Méthode permettant de modifier un artiste
  * @param $picture Picture L'artiste à modifier
  * @return Picture
  **/
  abstract protected function modify(Picture $picture);

  /**
  * Méthode permettant d'enregistrer une image
  * @param $picture Picture\ L'image à enregistrer
  * @see self::add()
  * @see self::modify()
  * @return void
  */
  public function save(Picture $picture)
  {
    if ($picture->isValid())
      $picture->isNew() ? $this->add($picture) : $this->modify($picture);

    else
      throw new \RuntimeException('L\'entité Picture doit être valide pour être enregistrée.');
  }

  /**
  * Méthode permettant de rechercher une image
  * @param $query string La valeur à rechercher
  * @return mixed
  */
  //abstract public function search($query);
}