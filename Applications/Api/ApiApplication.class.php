<?php
namespace Applications\Api;

class ApiApplication extends \Library\Application
{
  const GET_LAYOUT = FALSE;

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

      if($this->config->get('apiKey') != $this->httpRequest->getData('apiKey'))
        $this->httpResponse()->redirect404(self::GET_LAYOUT);

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