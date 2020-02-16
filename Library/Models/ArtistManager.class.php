<?php
namespace Library\Models;

use Library\Entities\Collection;

abstract class CollectionManager extends \Library\Manager
{
  /**
  * Méthode permettant d'ajouter une collection
  * @param $collection Collection La collection à ajouter
  * @return void
  **/
  abstract protected function add(Collection $collection);


  /**
  * Méthode permettant de compter le nombre de collections
  * @return int
  **/
  abstract public function count();


  /**
  * Méthode permettant de supprimer une collection
  * @param $id int Id de la collection à supprimer
  * @return void
  **/
  abstract public function delete($id);

  /**
  * Méthode permettant de récupérer une collection
  * @param $id int Id de la collection à récupérer
  * @return Collection
  **/
  abstract public function get($id);

  /**
  * Méthode permettant de récupérer la liste des collections
  * @return Collection
  **/
  abstract public function getList();


  /**
  * Méthode permettant de modifier une collection
  * @param $collection Collection La collection à modifier
  * @return Collection
  **/
  abstract protected function modify(Collection $collection);

  /**
  * Méthode permettant d'enregistrer une collection
  * @param $artist Artist La collection à enregistrer
  * @see self::add()
  * @see self::modify()
  * @return void
  */
  public function save(Collection $collection)
  {
    if ($collection->isValid())
      $collection->isNew() ? $this->add($collection) : $this->modify($collection);

    else
      throw new \RuntimeException('L\'entité Collection doit être valide pour être enregistrée.');
  }

  /**
  * Méthode permettant de rechercher une collection
  * @param $query string La valeur à rechercher
  * @return mixed
  */
  //abstract public function search($query);
}