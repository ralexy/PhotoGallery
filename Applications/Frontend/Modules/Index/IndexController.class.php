<?php
namespace Applications\Frontend\Modules\Index;

class IndexController extends \Library\BackController
{
  protected $mustLogout;

  public function executeIndex()
  {
      $collection = $this->managers->getManagerOf('Collection')->getList();

      $this->page->addVar('title', 'Accueil');
      $this->page->addVar('collection', $collection);
      $this->page->addVar('appConfig', $this->app()->config());
  }
}