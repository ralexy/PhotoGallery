<?php
namespace Applications\Backend;

class BackendApplication extends \Library\Application
{
  public function __construct()
  {
    parent::__construct();

    $this->name = 'Backend';
  }

  public function run()
  {
    try
    {   
      $isAuthenticated = $this->user()->isAuthenticated($this->name);

      if ($isAuthenticated)
      {
        $controller = $this->getController();
      }
      else
      {
        $controller = new Modules\Login\LoginController($this, 'Login', 'index');
      }

      $controller->execute();

      $this->httpResponse->setPage($controller->page());
      $this->httpResponse->send();
    }
    
    catch(Exception $e)
    {
      echo 'Error: ', $e->getMessage();
    }
  }
}