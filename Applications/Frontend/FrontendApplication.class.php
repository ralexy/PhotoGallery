<?php
namespace Applications\Frontend;

class FrontendApplication extends \Library\Application
{
  public function __construct()
  {
    parent::__construct();

    $this->name = 'Frontend';

    if($this->httpRequest->getData('hl'))
    {
      $this->lang = strip_tags($this->httpRequest->getData('hl'));
      $this->httpResponse->setCookie('lang', strip_tags($this->httpRequest->getData('hl')), time() + 31556952, '/');
    }

    elseif($this->httpRequest->cookieData('lang'))
      $this->lang = strip_tags($this->httpRequest->cookieData('lang'));

    elseif($this->httpRequest->language())
      $this->lang = strip_tags($this->httpRequest->language());
  }

  public function run()
  {
    try
    {
      $controller = $this->getController();

      $isAuthenticated = $this->user()->isAuthenticated($this->name);
      $mustLogin       = property_exists($controller, 'mustLogin') ? 1 : 0;
      $mustLogout      = property_exists($controller, 'mustLogout') ? 1 : 0;

      if($mustLogin && !$isAuthenticated)
        exit($this->httpResponse->redirect('/logout'));

      elseif($mustLogout && $isAuthenticated)
        exit($this->httpResponse->redirect('/account'));

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