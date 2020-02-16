<?php
namespace Library;

abstract class Application
{
  protected $config;
  protected $defaultLang;
  protected $httpRequest;
  protected $httpResponse;
  protected $lang;
  protected $name;
  protected $user;

  public function __construct()
  {
    $this->config       = new Config($this);
    $this->defaultLang  = 'en';
    $this->httpRequest  = new HTTPRequest($this);
    $this->httpResponse = new HTTPResponse($this);
    $this->name         = '';
    $this->user         = new User($this);
  }

  public function getController()
  {
    $routeur = new \Library\Router;

    $xml = new \DOMDocument;
    $xml->load(__DIR__. '/../Applications/'. $this->name. '/Config/routes.xml');

    $routes = $xml->getElementsByTagName('route');

    // On parcourt les routes du fichier XML.
    foreach ($routes as $route)
    {
      $vars = array();

      // On regarde si des variables sont présentes dans l'URL.
      if ($route->hasAttribute('vars'))
      {
        $vars = explode(',', $route->getAttribute('vars'));
      }

      // On ajoute la route au routeur.
      $routeur->addRoute(new Route($route->getAttribute('url'), $route->getAttribute('module'), $route->getAttribute('action'), $vars));
    }

    try
    {
      // On récupère la route correspondante à l'URL.
      $matchedRoute = $routeur->getRoute($this->httpRequest->requestURL());
    }

    catch(\RuntimeException $e)
    {
      if ($e->getCode() == \Library\Router::NO_ROUTE)
      {
        // Si aucune route ne correspond c'est que la page demandée n'existe pas.
        $this->httpResponse->redirect404();
      }
    }
    $matchedRoute = $routeur->getRoute($this->httpRequest->requestURL());

    // On ajoute les variables de l'URL au tableau $_GET.
    $_GET = array_merge($_GET, $matchedRoute->vars());

    // On instancie le contrôleur.
    $controllerClass = 'Applications\\'. $this->name. '\\Modules\\'. $matchedRoute->module(). '\\'. $matchedRoute->module(). 'Controller';
    return new $controllerClass($this, $matchedRoute->module(), $matchedRoute->action()); 
  }

  abstract public function run();

  public function config()
  {
    return $this->config;
  }

  public function defaultLang()
  {
    return $this->defaultLang;
  }

  public function httpRequest()
  {
    return $this->httpRequest;
  }

  public function httpResponse()
  {
    return $this->httpResponse;
  }

  public function lang()
  {
    return $this->lang;
  }

  public function name()
  {
    return $this->name;
  }

  public function user()
  {
    return $this->user;
  }

  public function setLang($lang)
  {
    $this->lang = $lang;
  }
}