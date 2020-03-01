<?php
namespace Applications\Frontend\Modules\Photoshow;

class PhotoShowController extends \Library\BackController
{
  protected $mustLogout;

  public function executeIndex(\Library\HTTPRequest $request)
  {
      $collectionName = urldecode($request->getData('collectionName'));

      $pictures = $this->managers->getManagerOf('Picture')->getList($collectionName, 1);

      if(!$pictures)
          $this->app->httpResponse()->redirect404();

      $picturesURL = $this->app()->config()->get('picturesURL');
      $picturesExtension = $this->app()->config()->get('picturesExtension');

      $this->page()->addVar('pictures', $pictures);
      $this->page()->addVar('picturesURL', $picturesURL);
      $this->page()->addVar('picturesExtension', $picturesExtension);
  }
}