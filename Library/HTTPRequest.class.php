<?php
namespace Library;

class HTTPRequest extends ApplicationComponent
{
  public function cookieData($key)
  {
    return isset($_COOKIE[$key]) ? $_COOKIE[$key] : null;
  }

  public function cookieExists($key)
  {
    return isset($_COOKIE[$key]);
  }

  public function getData($key = 0)
  {
      if($key)
        return isset($_GET[$key]) ? $_GET[$key] : null;

      return $_GET;
  }

  public function getExists($key)
  {
    return $_GET[$key];
  }

  public function language()
  {
    return isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) ? substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2) : null;
  }

  public function method()
  {
    return $_SERVER['REQUEST_METHOD'];
  }

  public function postData($key = 0)
  {
    if($key)
      return isset($_POST[$key]) ? $_POST[$key] : null;

    return $_POST;
  }

  public function postExists($key)
  {
    return isset($_POST[$key]);
  }

  public function requestURL()
  {
    return $_SERVER['REQUEST_URI'];
  }

  public function remoteADDR()
  {
    return $_SERVER['REMOTE_ADDR'];
  }
}