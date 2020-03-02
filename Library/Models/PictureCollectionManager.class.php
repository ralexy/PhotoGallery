<?php
namespace Library\Models;

use \Library\Entities\PictureCollection;

abstract class PictureCollectionManager extends \Library\Manager
{
  /**
  * Méthode permettant d'ajouter une PictureCollection
  * @param $pictureCollection PictureCollection Le lien à ajouter
  * @return void
  **/
  abstract protected function add(PictureCollection $picture);


  /**
  * Méthode permettant de compter le nombre d'images dans la collection
  * @param $idCollection L'id de la collection sur laquelle faire un compte
  * @return int
  **/
  abstract public function count($idCollection);

  /**
  * Méthode permettant de supprimer une image
  * @param $id int Id de l'image à supprimer
  * @return Picture
  **/
  abstract public function delete($id);

  /**
  * Méthode permettant de supprimer une image de la collection
  * @param $id int Id de l'image à supprimer
  * @return Picture
  **/
  abstract public function get($id);

  /**
  * Méthode permettant de récupérer la liste des images dans la collection
  * @return Picture
  **/
  abstract public function getList();


  /**
  * Méthode permettant de modifier une collection
  * @param $pictureCollection La PictureCollection à modifier
  * @return Picture
  **/
  abstract protected function modify(PictureCollection $pictureCollection);

  /**
  * Méthode permettant d'enregistrer une image dans la collection
  * @param $pictureCollection  PictureCollection L'image à enregistrer
  * @see self::add()
  * @see self::modify()
  * @return void
  */
  public function save(PictureCollection $pictureCollection)
  {
    if ($pictureCollection->isValid())
      $pictureCollection->isNew() ? $this->add($pictureCollection) : $this->modify($pictureCollection);

    else
      throw new \RuntimeException('L\'entité PictureCollection doit être valide pour être enregistrée.');
  }

  /**
  * Méthode permettant de rechercher une image
  * @param $query string La valeur à rechercher
  * @return mixed
  */
  //abstract public function search($query);
}