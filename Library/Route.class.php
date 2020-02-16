<?php
namespace Library;

class Route
{
  protected $action;
  protected $module;
  protected $url;
  protected $varNames;
  protected $vars = array();

  public function __construct($url, $module, $action, $varNames)
  {
    $this->setUrl($url);
    $this->setModule($module);
    $this->setAction($action);
    $this->setVarNames($varNames);
  }

  public function hasVars()
  {
    return !empty($this->varNames);
  }

  public function match($url)
  {
    if (preg_match('`^'. $this->url. '$`', $url, $matches))
    {
      return $matches;
    }
    else
    {
      return false;
    }
  }

  public function setAction($action)
  {
    if (is_string($action))
    {
      $this->action = $action;
    }
  }

  public function setModule($module)
  {
    if (is_string($module))
    {
      $this->module = $module;
    }
  }

  public function setUrl($url)
  {
    if (is_string($url))
    {
      $this->url = $url;
    }
  }

  public function setVarNames(array $varNames)
  {
    $this->varNames = $varNames;
  }

  public function setVars(array $vars)
  {
    $this->vars = $vars;
  }

  public function action()
  {
    return $this->action;
  }

  public function module()
  {
    return $this->module;
  }

  public function url()
  {
    return $this->url;
  }

  public function varNames()
  {
    return $this->varNames;
  }

  public function vars()
  {
    return $this->vars;
  }
}