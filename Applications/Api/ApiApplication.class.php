<?php
namespace Applications\Api;

class ApiApplication extends \Library\Application
{
  public function __construct()
  {
    parent::__construct();

    $this->name = 'Api';
  }

  public function run()
  {
    try
    {
      $controller = $this->getController();

      $controller->execute();

      $this->httpResponse->setPage($controller->page());
      $this->httpResponse->send();

    }
    catch(Exception $e)
    {
      exit('Erreur: '. $e->getMessage());
    }
  }
}