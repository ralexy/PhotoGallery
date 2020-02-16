<?php
namespace Library;

session_start();

class User extends ApplicationComponent
{
  public function getAttribute($attr)
  {
    return isset($_SESSION[$attr]) ? $_SESSION[$attr] : '';
  }

  public function isAuthenticated($appName)
  {
    return isset($_SESSION[$appName]['auth']) && $_SESSION[$appName]['auth'] === true;
  }

  public function logout()
  {
    setcookie('PHPSESSID', null, -1, '/');

    $_SESSION = array();
    session_destroy();
  }

  public function setAttribute($attr, $value)
  {
    $_SESSION[$attr] = $value;
  }

  public function setAuthenticated($appName, $authenticated = true)
  {
    if (!is_bool($authenticated))
    {
      throw new \InvalidArgumentException('La valeur spécifiée à User::setAuthenticated() doit être un boléen.');
    }

    $_SESSION[$appName]['auth'] = $authenticated;
  }
}